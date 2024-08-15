/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../../../common/layout';
import ChatChannelTab from '../components/ChatChannelTab';
import ChannelBox from '../../../common/components/common/ChannelBox';
import HelpCanvas from '../../../common/components/canvas/HelpCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import RenameWidgetModal from '../../../common/components/modals/RenameWidgetModal';
import NewWidgetCreationModal from '../../../common/components/modals/NewWidgetCreationModal';
import WidgetEmbededCodeModal from '../../../common/components/modals/WidgetEmbededCodeModal';
import DeleteModal from '../../../common/components/modals/DeleteModal';
import {
  CreateChatWidget,
  DeleteChatWidget,
  ListChatWidgets,
  UpdateChatTopic,
} from '../../../common/api-collection/ChatWidget/ChatWidgets';
import ToastError from '../../../common/components/toast/ToastError';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function NewChatWidget() {
  const navigate = useNavigate();

  const [showCreateNewWidgetModal, setShowCreateNewWidgetModal] = useState(false);
  const [showDeleteWidgetModal, setShowDeleteWidgetModal] = useState({
    id: '',
    isVisible: false,
    loading: false,
    name: '',
  });
  const [showRenameWidgetModal, setShowRenameWidgetModal] = useState({
    id: '',
    isVisible: false,
    loading: false,
    name: '',
  });
  const [showWidgetEmbededCodeModal, setShowWidgetEmbededCodeModal] = useState({
    id: '',
    isVisible: false,
  });
  const [isCreatingNewWidget, setIsCreatingNewWidget] = useState(false);

  const [chatWidgetsList, setChatWidgetsList] = useState({
    data: [],
    meta: {},
    isLoading: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });

  const [onMobileView, setOnMobileView] = useState({
    isMobile: false,
    type: '',
  });

  const dataChannels = [
    {
      id: 1,
      img: '/assets/chat-new.svg',
      active: true,
      title: 'Chat widget',
      desc: 'Configure chat widget.',
      path: '',
      type: 'chat_widget',
    },
    {
      id: 2,
      img: '/assets/fbimg.svg',
      active: false,
      title: 'Facebook',
      desc: 'Configure facebook IM',
      path: '',
    },
    {
      id: 3,
      img: '/assets/watsappimg.svg',
      active: false,
      title: 'WhatsApp',
      desc: 'Configure whatsapp chat',
      path: '',
    },
    {
      id: 4,
      img: '/assets/instaimg.svg',
      active: false,
      title: 'Instagram DM',
      desc: 'Configure instagram DM',
      path: '',
    },
  ];

  const handleCreateNewWidget = (values) => {
    setIsCreatingNewWidget(true);
    const data = {
      type: 'chat_widgets',
      attributes: {
        name: values?.widgetName,
      },
    };

    CreateChatWidget(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'You have successfully created the Widget',
        });
        setShowCreateNewWidgetModal(false);
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Creating the Widget!',
        });
      })
      ?.finally(() => {
        setIsCreatingNewWidget(false);
      });
  };

  const handleRenameWidget = (widgetName = '') => {
    const data = {
      type: 'chat_topics',
      id: parseInt(showRenameWidgetModal?.id, 10),
      attributes: {
        name: widgetName,
      },
    };
    setShowRenameWidgetModal({ ...showRenameWidgetModal, loading: true });
    UpdateChatTopic(data, showRenameWidgetModal?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'You have successfully Renamed the Widget',
        });
        setShowRenameWidgetModal({ isVisible: false });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Renaming the Widget!',
        });
      })
      ?.finally(() => {
        setShowRenameWidgetModal({ isVisible: false, loading: false });
      });
  };

  const handleDeleteWidget = () => {
    setShowDeleteWidgetModal({ ...showDeleteWidgetModal, loading: true });
    DeleteChatWidget(showDeleteWidgetModal?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'You have successfully Deleted the Widget',
        });
        setShowDeleteWidgetModal({ isVisible: false });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while Deleting the Widget!',
        });
      })
      ?.finally(() => {
        setShowDeleteWidgetModal({ isVisible: false, loading: false });
      });
  };

  const handleEscKeyPress = (event) => {
    if (event.key === 'Escape') {
      // User pressed the "Escape" key
      setShowDeleteWidgetModal({ isVisible: false });
      setShowWidgetEmbededCodeModal({
        id: '',
        isVisible: false,
      });
      setShowRenameWidgetModal({ isVisible: false });
    }
  };

  useEffect(() => {
    setChatWidgetsList({ isLoading: true });
    ListChatWidgets()?.then((response) => {
      setChatWidgetsList({
        data: response?.data,
        meta: response?.meta,
        included: response?.included,
        isLoading: false,
      });
    });
  }, [refresh]);

  useEffect(() => {
    setOnMobileView({ ...onMobileView, isMobile: window.innerWidth <= 1180 });
    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  return (
    <>
      <Layout title="comm chat" headerTitle="Settings" favIcon="/favicon.svg">
        <div className="wrapper">
          <div className="d-flex">
            <div className="bg-gray-bright w-100">
              <div className="d-flex flex-column flex-lg-row gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit me-0 me-lg-2">
                <div
                  className="col-lg-3 col-sm-12 bg-white rounded shadow-1 panel-social"
                  style={
                    onMobileView?.isMobile === true
                      ? onMobileView?.type === ''
                        ? {}
                        : { display: 'none' }
                      : {}
                  }
                >
                  <div className="scroll-channel scroll-custom">
                    <div className="d-flex gap-3 p-23px">
                      <div
                        role="button"
                        className="left-widget d-none d-lg-block"
                        onClick={() => {
                          navigate('/chat-widget');
                        }}
                      >
                        <Link to="/chat-widget" className="d-flex justify-content-center">
                          <img src="/assets/leftback.svg" alt="leftback" />
                        </Link>
                      </div>
                      <div className="d-flex flex-column">
                        <p className="fs-14px fw-bolder text-primary mb-0">Channels</p>
                        <p className="fs-13px text-secondary mb-0">
                          <span className="fw-medium">4</span>
                          {' channels available '}
                        </p>
                      </div>
                    </div>
                    {dataChannels?.map((channels, index) => (
                      <ChatChannelTab
                        key={index}
                        img={channels?.img}
                        active={channels?.active}
                        title={channels?.title}
                        desc={channels?.desc}
                        path={channels?.path}
                        onMobileView={onMobileView}
                        setOnMobileView={setOnMobileView}
                        type={channels?.type}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="col-lg-9 col-sm-12 left-sec bg-white bg-white rounded  d-lg-block "
                  style={
                    onMobileView?.isMobile && onMobileView?.type === 'chat_widget'
                      ? {}
                      : { display: 'none' }
                  }
                  id="channel-box"
                >
                  <div className="pt-28px pb-20px ps-23px pe-25px scroll-channel scroll-custom">
                    <div className="d-flex gap-2 left-mob justify-content-between">
                      <div className="d-flex">
                        <div>
                          <h6 className="fw-500 fs-16px mb-2 d-flex gap-2 main-head">
                            <Link to="/chat-widget" className="d-block d-lg-none">
                              <img
                                src="/assets/left-arrow-black.svg"
                                className="me-2"
                                alt="left-arrow-black"
                              />
                            </Link>
                            <span>&nbsp;</span>
                            Chat widget
                          </h6>
                          <p className="text-secondary fs-6 mb-1">
                            Lorem ipsum dolor sit amet, consectetur cons ectetur adipiscing elit.
                          </p>
                        </div>
                      </div>
                      <div>
                        <a
                          href="/#"
                          className="text-blue-active ms-2 d-flex fw-medium align-items-center"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                        >
                          <img className="pe-2" src="../../assets/need-help.svg" alt="Need Help" />
                          <span className="d-none d-lg-block"> Need help</span>
                        </a>
                      </div>
                    </div>

                    {showCreateNewWidgetModal ? (
                      <NewWidgetCreationModal
                        isLoading={isCreatingNewWidget}
                        handleCreateNewWidget={(data) => {
                          handleCreateNewWidget(data);
                        }}
                        onClose={() => {
                          setShowCreateNewWidgetModal(false);
                        }}
                      />
                    ) : (
                      <div
                        id="createWidgetBtnBox"
                        className="bg-amour d-flex flex-column flex-md-row flex-lg-row gap-4 p-4 mb-4 mt-4 rounded align-items-sm-start align-items-lg-center justify-content-between"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div>
                            <img src="/assets/create-widget.svg" alt="create-widget" />
                          </div>

                          <div>
                            <p className="text-secondary fw-medium mb-0">
                              Start creating a new widget for your website to simplify the customer
                              interaction. Click on
                              <a
                                href="/#"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                {' '}
                                Create new widget
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="create-wid">
                          <button
                            type="button"
                            id="createWidgetBtn"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                            onClick={() => {
                              setShowCreateNewWidgetModal(true);
                            }}
                          >
                            Create new widget
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="d-flex align-items-center flex-wrap justify-content-between mt-5">
                      <div className="d-flex flex-column mb-3">
                        <p className="text-dark fs-14 mb-0">
                          Available widgets ({chatWidgetsList?.data?.length})
                        </p>
                      </div>
                      <div className="ms-lg-auto ms-sm-0 search-sm">
                        <SearchWithBorder
                          placeholderText="Search Widget"
                          onChange={(e) => {
                            setSearchTerm(e?.target?.value);
                          }}
                          clearBtn={() => {
                            setSearchTerm('');
                          }}
                          searchTerm={searchTerm}
                        />
                      </div>
                    </div>
                    {chatWidgetsList?.isLoading && (
                      <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <SpinningLoader />
                      </div>
                    )}
                    <div className="row">
                      {chatWidgetsList &&
                        chatWidgetsList?.data?.length > 0 &&
                        chatWidgetsList?.data?.map((widget, index) => (
                          <ChannelBox
                            key={widget?.id}
                            widget={widget}
                            channelImg="/assets/chabt1.svg"
                            isDefault={index === 0}
                            path={`/chat-widget/chat-widget-configuration/${widget?.id}`}
                            setShowDeleteWidgetModal={setShowDeleteWidgetModal}
                            setShowRenameWidgetModal={setShowRenameWidgetModal}
                            setShowWidgetEmbededCodeModal={setShowWidgetEmbededCodeModal}
                            creatdBy={`${chatWidgetsList?.included[0]?.attributes?.first_name} ${chatWidgetsList?.included[0]?.attributes?.last_name}`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <DeleteModal
        isOpen={showDeleteWidgetModal?.isVisible}
        onClose={() => {
          setShowDeleteWidgetModal({ isVisible: false });
        }}
        text={` the widget ${showDeleteWidgetModal?.name} from the list.`}
        label="To confirm this action please type "
        btnLabel="Delete Widget"
        action='"Delete"'
        callBack={handleDeleteWidget}
        isDeleting={showDeleteWidgetModal?.loading}
      />
      <WidgetEmbededCodeModal
        isOpen={showWidgetEmbededCodeModal.isVisible}
        onClose={() => {
          setShowWidgetEmbededCodeModal({
            id: '',
            isVisible: false,
          });
        }}
        id={showWidgetEmbededCodeModal.id}
      />
      <RenameWidgetModal
        isOpen={showRenameWidgetModal?.isVisible}
        onClose={() => {
          setShowRenameWidgetModal({ isVisible: false });
        }}
        heading="Rename Widget"
        label="Widget name"
        action={handleRenameWidget}
        showRenameWidgetModal={showRenameWidgetModal}
      />
      <HelpCanvas />
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </>
  );
}

export default NewChatWidget;
