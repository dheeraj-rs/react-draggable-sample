/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import normalize from 'json-api-normalizer';
import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import CallBackQueue from '../components/call-back-list/CallBackQueue';
import CompletedCalls from '../components/call-back-list/CompletedCalls';
import CallConnecting from '../components/call-back-list/CallConnecting';
import DeleteCallBackModal from '../components/call-back-list/DeleteCallBackModal';
import {
  DeleteCallback,
  ListAllNotInQueue,
  ListPaginatedCallbacks,
} from '../../../common/api-collection/Telephony/CallBack';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import PaginationWithCount from '../../../common/components/pagination/PaginationWithCount';

function CallBackList() {
  const [toastAction, setToastAction] = useState({
    isVisible: false,
    message: '',
    type: '',
  });
  const [activeTab, setActiveTab] = useState({ type: 'callback-queue' });
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [paginatedCallBackList, setPaginatedCallBackList] = useState({
    data: [],
    included: [],
    links: {},
    meta: {},
    isLoading: false,
  });
  const [paginatedCompletedCallList, setPaginatedCompletedCallList] = useState({
    data: [],
    included: [],
    links: {},
    meta: {},
    isLoading: false,
  });
  const [page, setPage] = useState();
  const [normalizedCallbacks, setNormalizedCallbacks] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef(null);
  const [audioIndex, setAudioIndex] = useState('');
  const [isPlaying, setIsPlaying] = useState({ type: 'play' });

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteCallBackList = () => {
    if (show.type === 'delete-callback-modal') {
      setIsLoading(true);

      DeleteCallback(show?.callBackId)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: (
              <>
                You have successfully deleted the number{' '}
                <span className="fw-medium">{show?.callBackNumber}</span> from the queue.
              </>
            ),
            type: 'success',
          });
          setShow({ isVisible: false, type: '' });
          setRefresh(!refresh);
        })
        ?.catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        })
        .finally(() => {
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const handleReorder = () => {
    setToastAction({
      isVisible: true,
      message: 'You have successfully reorded the list',
      type: 'success',
    });
  };
  const getStatusImg = (status) => {
    const lowerCaseStatus = status.toLowerCase();

    if (lowerCaseStatus === 'completed') {
      return 'dark-green-dark';
    }
    if (lowerCaseStatus === 'no answer') {
      return 'secondary';
    }
    if (lowerCaseStatus === 'failed') {
      return 'fire-engine';
    }
    if (lowerCaseStatus === 'busy') {
      return 'mango-orange';
    }
    return null;
  };

  const handlePlayStop = (itemId, audioId) => {
    setAudioIndex(audioId);
    if (isPlaying.type === 'stop') {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying({ type: 'play' });
    } else {
      if (audioIndex === itemId) {
        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        audioRef.current.play();
      }
      audioRef.current.play();
      setIsPlaying({ type: 'stop' });
    }
  };

  const handlePause = (itemId) => {
    setAudioIndex(itemId);
    audioRef.current.pause();
    setIsPlaying({ type: 'play' });
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  };
  const handleAudioEnd = () => {
    setIsPlaying({ type: 'play' });
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    setPaginatedCallBackList({ isLoading: true });
    const filter = 'In Queue';
    ListPaginatedCallbacks(searchTerm, page, filter)?.then((response) => {
      setNormalizedCallbacks(normalize({ included: response?.included }));

      setPaginatedCallBackList({
        data: response?.data,
        included: response?.included,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm]);
  useEffect(() => {
    setPaginatedCompletedCallList({ isLoading: true });
    ListAllNotInQueue()?.then((response) => {
      setPaginatedCompletedCallList({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm]);

  // useEffect(() => {
  //   console.log('show--->', show);
  //   console.log('normalizedCallback ===>', normalizedCallbacks);
  //   console.log('callbacks ===>', paginatedCallBackList);
  //   console.log('completedCB ===>', paginatedCompletedCallList);
  // }, [show, normalizedCallbacks, paginatedCallBackList, paginatedCompletedCallList]);
  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0 h-100">
          <div className="row h-100">
            <div className="col-12 h-100 pe-md-1">
              <div className="row gx-0 rounded content-area scroll-custom scroll-caller-list h-100">
                <div
                  id="voice-expand"
                  className="col-lg-12 col-sm-12 bg-white p-4  callerlist-main rounded shadow"
                >
                  <div className="scroll-custom scroll-callback carrier-pad">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div className="d-flex gap-2 align-items-center">
                        <a href="/#" className="d-block d-lg-none">
                          <img alt="" src="/assets/left-arrow-black.svg" className="me-2" />
                        </a>
                        <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                          <Link to="/comm-voice-admin/" className="d-flex justify-content-center">
                            <img alt="" src="/assets/leftback.svg" />
                          </Link>
                        </div>
                        <div className="d-flex flex-column">
                          <h4 className="fs-16px text-black fw-medium mb-0">Callback list</h4>
                        </div>
                      </div>
                      <div>
                        <div className="ms-auto d-flex align-items-center gap-3 my-3 my-md-0 filter-inside-tab">
                          <div className="filter-inside-search">
                            <SearchWithBorder
                              placeholderText="Search number"
                              onChange={(e) => {
                                setSearchTerm(e.target.value);
                              }}
                              searchTerm={searchTerm}
                              setSearchTerm={setSearchTerm}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="con mt-0 mt-lg-2">
                      <ul
                        className="nav nav-tabs d-flex ps-0 mb-0 col-lg-12"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item pe-4" role="presentation">
                          <a
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab({ type: 'callback-queue' });
                            }}
                            className={`nav-calendar-link py-3 px-0 fw-medium nav-link text-primary ${
                              activeTab.type === 'callback-queue' ? 'active' : ''
                            }`}
                            type="button"
                            role="tab"
                            aria-controls="did-tab"
                            aria-selected="true"
                          >
                            Callback Queue
                          </a>
                        </li>
                        <li className="nav-item pe-4" role="presentation">
                          <a
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab({ type: 'completed-calls' });
                            }}
                            className={`nav-calendar-link py-3 px-0 fw-medium nav-link text-primary ${
                              activeTab.type === 'completed-calls' ? 'active' : ''
                            }`}
                            type="button"
                            role="tab"
                            aria-controls="call"
                            aria-selected="false"
                            tabIndex="-1"
                          >
                            Completed Calls
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className={`tab-pane fade active mb-2 ${
                            activeTab.type === 'callback-queue' ? 'show' : ''
                          }`}
                          style={
                            activeTab.type === 'callback-queue'
                              ? { display: 'block' }
                              : { display: 'none' }
                          }
                          id="tab-did"
                          aria-labelledby="did-tab"
                        >
                          <div className="table-responsive vendor-plans-table mt-2">
                            <table className="table table-width-mobile mb-0">
                              <thead>
                                <tr>
                                  <th scope="col"> Queue</th>
                                  <th scope="col">Number</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">DID Number</th>
                                  <th scope="col">Region</th>
                                  <th scope="col">Callback Time</th>
                                  <th scope="col">Assigned To</th>
                                  <th scope="col" />
                                  <th scope="col" />
                                </tr>
                              </thead>
                              <tbody>
                                {paginatedCallBackList?.isLoading && (
                                  <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>
                                      <SpinningLoader />
                                    </td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                  </tr>
                                )}

                                {paginatedCallBackList?.data?.map((item, index) => (
                                  <CallBackQueue
                                    key={index}
                                    rank={item.attributes.queue}
                                    number={item.attributes.number}
                                    name={item.name}
                                    region={
                                      normalizedCallbacks?.city[
                                        normalizedCallbacks?.didNumberPlanRecord[
                                          item?.relationships?.didNumberPlanRecord?.data?.id
                                        ]?.attributes?.cityId
                                      ]?.attributes?.name
                                    }
                                    callbackScheduled={item.callbackScheduled}
                                    status={item.attributes.status}
                                    assigne={item.assigne}
                                    initials={item.initials}
                                    setShow={setShow}
                                    handleReorder={handleReorder}
                                    setToastAction={setToastAction}
                                    id={item.id}
                                    didNumber={
                                      normalizedCallbacks?.didNumberPlanRecord[
                                        item?.relationships?.didNumberPlanRecord?.data?.id
                                      ]?.attributes?.number
                                    }
                                  />
                                ))}
                                {paginatedCallBackList?.data?.length === 0 &&
                                paginatedCallBackList?.isLoading === false ? (
                                  <tr>
                                    <td colSpan={9}>
                                      <NoMatchingRecords />
                                    </td>
                                  </tr>
                                ) : null}
                              </tbody>
                            </table>
                          </div>
                          {paginatedCallBackList?.meta?.pagination?.total > 0 && (
                            <PaginationWithCount
                              handlePagination={handlePaginationFunction}
                              currentPage={paginatedCallBackList?.meta?.pagination?.current_page}
                              totalPages={paginatedCallBackList?.meta?.pagination?.total_pages}
                              count={paginatedCallBackList?.meta?.pagination?.per_page}
                              recordCount={paginatedCallBackList?.meta?.pagination?.count}
                              totalCount={paginatedCallBackList?.meta?.pagination?.total}
                            />
                          )}
                        </div>

                        <div
                          className={`tab-pane fade mb-2 ${
                            activeTab.type === 'completed-calls' ? 'show' : ''
                          }`}
                          style={
                            activeTab.type === 'completed-calls'
                              ? { display: 'block' }
                              : { display: 'none' }
                          }
                          id="tab-toll-free"
                          aria-labelledby="toll-free-tab"
                        >
                          <div className="table-responsive vendor-plans-table mt-3">
                            <table className="table table-width-mobile mb-0">
                              <thead>
                                <tr>
                                  <th scope="col">Number</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Callback Date</th>
                                  <th scope="col">Performed By</th>
                                  <th scope="col">Duration</th>
                                  <th scope="col"> Status</th>
                                  <th scope="col">Call Record</th>
                                </tr>
                              </thead>
                              <tbody>
                                {paginatedCompletedCallList?.isLoading && (
                                  <tr>
                                    <td />
                                    <td />
                                    <td />
                                    <td>
                                      <SpinningLoader />
                                    </td>
                                    <td />
                                    <td />
                                    <td />
                                  </tr>
                                )}

                                {paginatedCompletedCallList?.data?.map((item, index) => (
                                  <CompletedCalls
                                    key={index}
                                    number={item?.attributes?.number}
                                    name={item.name}
                                    callbackDate={item.callbackDate}
                                    performedBy={item.performedBy}
                                    duration={item.duration}
                                    statusImg={getStatusImg(item?.attributes?.status)}
                                    visibility={
                                      item?.attributes?.status === 'Completed' ? '' : 'invisible'
                                    }
                                    status={item?.attributes?.status}
                                    audioSrc="https://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3"
                                    handlePlayStop={handlePlayStop}
                                    handlePause={handlePause}
                                    handleAudioEnd={handleAudioEnd}
                                    formatTime={formatTime}
                                    isPlaying={isPlaying}
                                    audioRef={audioRef}
                                    audioId={item.id}
                                    itemId={item.id}
                                    setAudioIndex={setAudioIndex}
                                    audioIndex={audioIndex}
                                  />
                                ))}
                                {paginatedCompletedCallList?.data?.length === 0 &&
                                paginatedCompletedCallList?.isLoading === false ? (
                                  <tr>
                                    <td colSpan={7}>
                                      <NoMatchingRecords />
                                    </td>
                                  </tr>
                                ) : null}
                              </tbody>
                            </table>
                          </div>

                          {/* <!-- pagination --> */}
                          {paginatedCompletedCallList?.meta?.pagination?.total > 0 && (
                            <PaginationWithCount
                              handlePagination={handlePaginationFunction}
                              currentPage={
                                paginatedCompletedCallList?.meta?.pagination?.current_page
                              }
                              totalPages={paginatedCompletedCallList?.meta?.pagination?.total_pages}
                              count={paginatedCompletedCallList?.meta?.pagination?.per_page}
                              recordCount={paginatedCompletedCallList?.meta?.pagination?.count}
                              totalCount={paginatedCallBackList?.meta?.pagination?.total}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- All caller  ends --> */}
              </div>
            </div>
            {/* <!--.col--9--> */}
          </div>
        </div>
      </div>

      {/* <!-- connection call starts --> */}
      <CallConnecting
        show={show.isVisible && show.type === 'call-now-popup'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
      />
      {/* <!-- connection call Ends --> */}

      <DeleteCallBackModal
        show={show.isVisible && show.type === 'delete-callback-modal'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        action={handleDeleteCallBackList}
        isProcessing={isLoading}
      />
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="publishToastMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="publishToastMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </Layout>
  );
}

export default CallBackList;
