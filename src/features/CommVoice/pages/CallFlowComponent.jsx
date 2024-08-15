/* eslint-disable indent */
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideNavFlow from '../components/SideNavFlow';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import Input from '../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../components/ButtonWhiteModalCancel';
import Layout from '../../../common/layout';
import BotFilter from '../components/BotFilter';
import FlowsComponents from '../components/FlowsComponents';
import PreviewOffCanvas from '../components/PreviewOffCanvas';
import PublishComponentModal from '../components/PublishComponentModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import DisableComponentModal from '../components/DisableComponentModal';
import EnableComponentModal from '../components/EnableComponentModal';
import EditComponentModal from '../components/EditComponentModal';
import {
  DisableComponent,
  EnableComponent,
  ListAllComponents,
  ListPaginatedComponents,
  PublishAllComponents,
  UpdateComponent,
} from '../../../common/api-collection/Telephony/Components';
import Pagination from '../components/pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function CallFlowComponent() {
  const [show, setShow] = useState({ isVisible: false, type: '' });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewComponents, setPreviewComponents] = useState({ data: {}, isLoading: false });
  const [page, setPage] = useState();
  const [paginatedComponents, setPaginatedComponents] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [allComponents, setAllComponents] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const getDynamicIconPath = (componentName) => {
    const iconMapping = {
      Callback: '/assets/call-flows-hours/callBack.svg',
      'Go to flow': '/assets/call-flows-hours/goToFlow.svg',
      Passthru: '/assets/call-flows-hours/passValue.svg',
      'Get value': '/assets/call-flows-hours/getValue.svg',
      Shortcut: '/assets/call-flows-hours/shortcut.svg',
      Hangup: '/assets/call-flows-hours/hangUp.svg',
      'Caller List': '/assets/call-flows-hours/callerList.svg',
      'Caller ID': '/assets/call-flows-hours/callerID.svg',
      Email: '/assets/call-flows-hours/email.svg',
      Voicemail: '/assets/call-flows-hours/voicemail.svg',
      Hours: '/assets/call-flows-hours/hours.svg',
      Connect: '/assets/call-flows-hours/connect.svg',
      'IVR menu': '/assets/call-flows-hours/ivr.svg',
      Greetify: '/assets/greetify.svg',
    };
    return iconMapping[componentName];
  };
  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };
  const handlePublishComponent = () => {
    setIsLoading(true);

    PublishAllComponents(allComponents)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Component has been Published successfully.',
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
  };
  const handleDisableComponent = () => {
    if (show.type === 'disable-component') {
      setIsLoading(true);
      DisableComponent(show?.componentId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Component has been disabled successfully.',
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
  const handleEnableComponent = () => {
    if (show.type === 'enable-component') {
      setIsLoading(true);
      EnableComponent(show?.componentId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: '  Component has been enabled successfully.',
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
  const handlePreview = () => {
    setShow({ isVisible: true, type: 'preview-offcanvas' });
    setPreviewComponents({ isLoading: true });
    ListAllComponents()?.then((response) => {
      setPreviewComponents({ data: response?.data, isLoading: false });
    });
  };
  const editComponent = (formik) => {
    setIsLoading(true);
    let changedValues = '';
    const initialValuesFromEdit = {
      componentName: show.name,
    };

    if (formik.values.componentName !== initialValuesFromEdit.componentName) {
      changedValues = formik.values.componentName;
    }

    const updatedValues = {
      description: formik?.values?.componentDescription,
      is_enabled: formik?.values?.isEnabled,
    };

    if (changedValues !== '') {
      updatedValues.name = changedValues;
    }

    const data = {
      type: 'telephony_vendor_lots',
      id: parseInt(show?.componentId, 10),
      attributes: updatedValues,
    };
    UpdateComponent(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: ' Component has been saved successfully.',
          type: 'success',
        });
        setRefresh(!refresh);
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
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
            type: 'failed',
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        formik.resetForm();
        setShow({ isVisible: false, type: '' });
      });
  };
  function validate(data) {
    const errors = {};

    if (!data.componentName) {
      errors.componentName = 'please enter a component name';
    }
    if (!data.componentDescription) {
      errors.componentDescription = 'please enter component description';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      componentName: '',
      componentDescription: '',
      isEnabled: true,
    },
    validate,

    onSubmit: () => {
      if (show.type === 'edit-component-modal') {
        editComponent(formik);
      }
    },
  });

  useEffect(() => {
    setPaginatedComponents({ isLoading: true });
    ListPaginatedComponents(searchTerm, page)?.then((response) => {
      setPaginatedComponents({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm]);
  useEffect(() => {
    setAllComponents([]);
    ListAllComponents()?.then((response) => {
      response?.data?.map((item) => {
        setAllComponents((prevArray) => [
          ...prevArray,
          { type: 'telephony_vendor_lots', id: parseInt(item.id, 10) },
        ]);
        return null;
      });
    });
  }, [refresh]);

  return (
    <Layout
      headerTitle="Settings"
      title="comm voice"
      favIcon="/assets/favIcons/favicon-voice.ico"
      sideNavIcon="/assets/sidenav/comm-voice-logo.svg"
    >
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area">
                <div id="headerVoice" className="d-none d-lg-block">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-3 w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link to="/comm-voice-admin/call-flows" className="d-block d-lg-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/call-flows"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Flows Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Configure call flow components and related settings
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  <div className="col-lg-12">
                    <div className="bg-white rounded px-3 pt-4 w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link
                              id="voiceHeaderMainMob"
                              to="/comm-telephony/call-flow-admin/call-flow-admin-mobile/"
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>

                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-telephony/call-flow-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Components</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block d-none">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3  pe-2">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="scroll-custom scroll-admin-left">
                        <div>
                          <SideNavFlow active={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="voice-expand" className="col-lg-9 col-sm-12">
                  <div className="scroll-custom scroll-carrier carrier-pad">
                    <div className="shadow-6  rounded mt-3 mb-2">
                      <div className=" p-3">
                        <div className="row mb-4 ">
                          <div className="col-12 col-md-6">
                            <div className="d-flex gap-1 flex-column">
                              <h6 className="mb-0">Components</h6>
                              <p className="mb-0 text-secondary">
                                <span className="fw-medium text-primary fs-12px ">
                                  {paginatedComponents?.meta?.pagination?.total}
                                </span>{' '}
                                Components available
                              </p>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end gap-3">
                            <a
                              href="/#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePreview();
                              }}
                              aria-controls="offcanvasPreviewComponent"
                              className="blue-btn d-flex align-items-center px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                            >
                              Preview
                            </a>
                            <a
                              href="/#"
                              onClick={(e) => {
                                e.preventDefault();
                                setShow({ isVisible: true, type: 'publish-component-modal' });
                              }}
                              aria-controls="PublishTemplate"
                              id="PublishTemplateId"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                            >
                              Publish
                            </a>
                          </div>
                          <div className="row mt-3 d-flex align-items-center">
                            <div className="col-lg-4 col-sm-4 col-md-5 col-10 vendor-mobile-search">
                              <SearchWithBorder
                                placeholderText="Search component"
                                onChange={(e) => {
                                  setSearchTerm(e.target.value);
                                }}
                                clearBtn={() => {
                                  setSearchTerm('');
                                }}
                                searchTerm={searchTerm}
                              />
                            </div>
                            <div className="col-lg-4 col-sm-3 col-md-2 col-2 filter-col">
                              <BotFilter
                                setIsFilterApplied={setIsFilterApplied}
                                isFilterApplied={isFilterApplied}
                              />
                            </div>
                          </div>
                        </div>
                        {paginatedComponents?.isLoading && (
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
                        {paginatedComponents?.data?.length > 0 &&
                          paginatedComponents?.data?.map((item, index) => (
                            <FlowsComponents
                              componentDetail={item.attributes?.description}
                              flowsIcon={getDynamicIconPath(item.attributes?.name)}
                              flowsName={item.attributes?.name}
                              key={index}
                              isEnabled={item.attributes?.is_enabled}
                              id={item?.id}
                              setShow={setShow}
                              formik={formik}
                            />
                          ))}

                        {paginatedComponents?.meta?.pagination?.total > 0 && (
                          <Pagination
                            handlePagination={handlePaginationFunction}
                            currentPage={paginatedComponents?.meta?.pagination?.current_page}
                            totalPages={paginatedComponents?.meta?.pagination?.total_pages}
                            count={paginatedComponents?.meta?.pagination?.per_page}
                          />
                        )}
                        {paginatedComponents?.data?.length === 0 &&
                        paginatedComponents?.isLoading === false ? (
                          <NoMatchingRecords />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal width="450px" id="deleteComponent">
            <div className="d-flex justify-content-between">
              <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Component</p>
              <ModalClose />
            </div>
            <p className="fs-13px text-primary mb-2">
              This action will delete the selected component{' '}
              <span className="text-primary fw-medium">Greetify</span> permanently from the
              component list.
            </p>

            <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
              <div>
                <img src="/assets/info-blue.svg" alt="" />
              </div>
              <div>
                <p className="mb-0 text-mariner">
                  Once delete the component, It won’t be affect the customers who already using this
                  component.
                </p>
              </div>
            </div>
            <Input
              label="To confirm this action please type “Delete”"
              id="delete"
              placeholder="Type “Delete”"
              type="text"
              disabled={false}
            />

            <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
              <button
                id="deleteCategoryToastBtn"
                className="btn bg-faded-red text-white px-4 py-12px"
                data-bs-dismiss="modal"
                type="button"
              >
                Delete
              </button>
              <ButtonWhiteModalCancel text="Cancel" />
            </div>
          </Modal>

          <PreviewOffCanvas
            setShow={setShow}
            show={show?.isVisible && show?.type === 'preview-offcanvas'}
            previewComponents={previewComponents}
          />

          <PublishComponentModal
            show={show.isVisible && show.type === 'publish-component-modal'}
            setShow={setShow}
            onClose={() => {
              setShow({ isVisible: false, type: '' });
            }}
            actionKey="publish"
            action={handlePublishComponent}
            isProcessing={isLoading}
          />
          <DisableComponentModal
            show={show.isVisible && show.type === 'disable-component'}
            onClose={() => {
              setShow({ isVisible: false, type: '' });
            }}
            actionKey="disable"
            action={handleDisableComponent}
            isProcessing={isLoading}
            title={show?.componentName}
          />
          <EnableComponentModal
            show={show.isVisible && show.type === 'enable-component'}
            onClose={() => {
              setShow({ isVisible: false, type: '' });
            }}
            actionKey="enable"
            action={handleEnableComponent}
            isProcessing={isLoading}
            title={show?.componentName}
          />
          <EditComponentModal
            show={show.isVisible && show.type === 'edit-component-modal'}
            setShow={setShow}
            onClose={() => {
              setShow({ isVisible: false, type: '' });
            }}
            formik={formik}
            title={show?.data}
            icon={show?.icon}
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

          {/* <ToastSuccessNew id="deleteToastMsg">
            SMS Component has been deleted successfully.
          </ToastSuccessNew>

          <ToastSuccessNew id="saveTemplatebtnMsg">
            Component has been saved successfully.
          </ToastSuccessNew>

          <ToastSuccessNew id="publishTemplatebtnMsg">
            Component has been Published successfully.
          </ToastSuccessNew>
          <ToastSuccessNew id="enableComponentSaveMsg">
            Component has been enabled successfully.
          </ToastSuccessNew>
          <ToastSuccessNew id="disableComponentSaveMsg">
            Component has been disabled successfully.
          </ToastSuccessNew> */}
        </div>
      </div>
    </Layout>
  );
}

export default CallFlowComponent;
