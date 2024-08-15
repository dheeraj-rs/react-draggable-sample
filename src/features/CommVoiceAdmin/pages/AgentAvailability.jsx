/* eslint-disable indent */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import DeleteAgentModal from '../components/modals/DeleteAgentModal';
import DefaultTimeSlotModal from '../components/modals/DefaultTimeSlotModal';
import AgentListRow from '../components/AgentListRow';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import ToastError from '../../../common/components/toast/ToastError';
import DisableAgentModal from '../components/DisableAgentModal';
import EnableAgentModal from '../components/EnableAgentModal';
import {
  DefaultAgentAvailability,
  DeleteAgentAvailability,
  DisableAgentAvailability,
  EnableAgentAvailability,
  ListAgentAvailabilities,
} from '../../../common/api-collection/Telephony/AgentAvailability';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import Pagination from '../../CommVoice/components/pagination/Pagination';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function AgentAvailability() {
  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [defaultAgent, setDefaultAgent] = useState(false);
  const [paginatedAgentAvailability, setPaginatedAgentAvailability] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [page, setPage] = useState();

  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };
  const handleDisableAgent = () => {
    if (show.type === 'disable-agent') {
      setIsLoading(true);
      DisableAgentAvailability(show?.agentId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Agent has been disabled successfully.',
            type: 'success',
          });
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              message: error?.response?.data?.error?.message
                ? error?.response?.data?.error?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };
  const handleEnableAgent = () => {
    if (show.type === 'enable-agent') {
      setIsLoading(true);
      EnableAgentAvailability(show?.agentId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Agent has been enabled successfully.',
            type: 'success',
          });
        })
        ?.catch((error) => {
          if (error?.response?.status === 500) {
            setToastAction({
              isVisible: true,
              message: 'Something went wrong.',
              type: 'failed',
            });
          } else {
            setToastAction({
              isVisible: true,
              message: error?.response?.data?.error?.message
                ? error?.response?.data?.error?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        ?.finally(() => {
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };
  const handleDeleteAgent = () => {
    if (show.type === 'delete-agent-modal') {
      setIsLoading(true);

      DeleteAgentAvailability(show?.agentId)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Default agent time slot has been deleted successfully!',
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
  const handleDefaultAgent = () => {
    if (show.type === 'default-agent-modal') {
      setIsLoading(true);

      DefaultAgentAvailability(show?.agentId)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Default agent time slot has been changed successfully!',
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
  useEffect(() => {
    setPaginatedAgentAvailability({ isLoading: true });
    ListAgentAvailabilities(searchTerm, page)?.then((response) => {
      setPaginatedAgentAvailability({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm]);
  // useEffect(() => {
  //   console.log(show);
  // }, [show]);

  return (
    <Layout title="comm voice" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link to="/comm-voice-admin/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link to="/comm-voice-admin/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    Agent Availability
                  </h5>
                  <p className="mb-0 text-secondary">
                    Configure agent availability and working hours.
                  </p>
                </div>
              </div>
              <div className="equal-pad scroll-custom pb-3 scroll-agent-avilability mt-1">
                <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row px-1 mt-2">
                  <div className="col-lg-4 col-sm-4 col-12">
                    <SearchWithBorder
                      placeholderText="Search by name"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      clearBtn={() => {
                        setSearchTerm('');
                      }}
                      searchTerm={searchTerm}
                    />
                  </div>

                  <div className="col-lg-3 col-sm-5 col-12 mt-4 mt-lg-0 mt-sm-0 text-end">
                    <Link
                      to="agent-time-slot"
                      id="buyNumber"
                      className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  newCarrier"
                    >
                      Add agent time slot
                    </Link>
                  </div>
                  <div />
                </div>
                {paginatedAgentAvailability?.isLoading && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <SpinningLoader />
                    </div>
                  </div>
                )}

                {paginatedAgentAvailability?.data?.length > 0 &&
                  paginatedAgentAvailability?.data?.map((item, index) => (
                    <AgentListRow
                      name={item?.attributes?.name}
                      time={item?.attributes?.timezone}
                      opacity="50"
                      setShow={setShow}
                      id={item.id}
                      key={index}
                      isDefault={item?.attributes?.is_default}
                      setDefaultAgent={setDefaultAgent}
                      defaultAgent={defaultAgent}
                      isEnabled={item?.attributes?.is_enabled}
                    />
                  ))}
                {paginatedAgentAvailability?.data?.length === 0 &&
                paginatedAgentAvailability?.isLoading === false ? (
                  <NoMatchingRecords />
                ) : null}
                {/* <!-- pagination --> */}

                {paginatedAgentAvailability?.meta?.pagination?.total > 0 && (
                  <Pagination
                    handlePagination={handlePaginationFunction}
                    currentPage={paginatedAgentAvailability?.meta?.pagination?.current_page}
                    totalPages={paginatedAgentAvailability?.meta?.pagination?.total_pages}
                    count={paginatedAgentAvailability?.meta?.pagination?.per_page}
                  />
                )}
                {/* <!-- pagination end --> */}
              </div>
            </div>
          </div>
        </div>
        <DefaultTimeSlotModal
          show={show.isVisible && show.type === 'default-agent-modal'}
          setShow={setShow}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          id={show?.id}
          actionKey="default"
          handleAction={handleDefaultAgent}
          isProcessing={isLoading}
        />
        <DeleteAgentModal
          show={show.isVisible && show.type === 'delete-agent-modal'}
          setShow={setShow}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          agentName={show?.agentName}
          actionKey="delete"
          handleAction={handleDeleteAgent}
          isProcessing={isLoading}
        />
        <DisableAgentModal
          show={show.isVisible && show.type === 'disable-agent'}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          actionKey="disable"
          action={handleDisableAgent}
          title={show?.agentName}
          isProcessing={isLoading}
        />
        <EnableAgentModal
          show={show.isVisible && show.type === 'enable-agent'}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          actionKey="enable"
          action={handleEnableAgent}
          title={show?.agentName}
          isProcessing={isLoading}
        />

        <ToastSuccess id="defaultTimeMsg">
          Default agent time slot has been changed successfully!
        </ToastSuccess>

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
      </div>
    </Layout>
  );
}

export default AgentAvailability;
