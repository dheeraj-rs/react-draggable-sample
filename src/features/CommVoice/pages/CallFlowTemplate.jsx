import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import Layout from '../../../common/layout';

import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import SideNavFlow from '../components/SideNavFlow';
import FlowsTemplateAdmin from '../components/FlowsTemplateAdmin';

import PublishTemplateModal from '../components/PublishTemplateModal';
import AddNewTemplateModal from '../components/AddNewTemplateModal';
import DeleteTemplateModal from '../components/DeleteTemplateModal';
import DisableModal from '../components/DisableModal';
import EnableModal from '../components/EnableModal';
import EditTemplateModal from '../components/EditTemplateModal';
import {
  CreateTemplates,
  DeleteTemplates,
  DisableTemplates,
  EnableTemplates,
  ListAllTemplates,
  ListPaginatedTemplates,
  PublishAllTemplates,
  PublishTemplates,
  UnPublishTemplates,
  UpdateTemplates,
} from '../../../common/api-collection/Telephony/Templates';
import Pagination from '../components/pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import ListWithoutPagination from '../../../common/api-collection/Telephony/AgentAvailability';
import PublishSingleTemplateModal from '../components/PublishSingleTemplateModal';
import UnpublishSingleTemplateModal from '../components/UnpublishSingleTemplateModal';

function CallFlowTemplate() {
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [show, setShow] = useState({ isVisible: false, type: '' });

  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState();
  const [allTemplates, setAllTemplates] = useState([]);
  const [allCallFlow, setAllCallFlow] = useState([]);
  const [paginatedTemplate, setPaginatedTemplate] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handlePublishTemplate = () => {
    setIsLoading(true);

    PublishAllTemplates(allTemplates)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been published successfully.',
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
  const handlePublishSingleTemplate = () => {
    setIsLoading(true);

    PublishTemplates(show?.templateId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been published successfully.',
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
  const handleUnPublishSingleTemplate = () => {
    setIsLoading(true);

    UnPublishTemplates(show?.templateId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been unpublished successfully.',
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
  const handleDisableTemplate = () => {
    if (show.type === 'disable-template') {
      setIsLoading(true);
      DisableTemplates(show?.templateId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Template has been disabled successfully.',
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
  const handleEnableTemplate = () => {
    if (show.type === 'enable-template') {
      setIsLoading(true);
      EnableTemplates(show?.templateId)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Template has been enabled successfully.',
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
  function validate(data) {
    const errors = {};

    if (!data.templateName) {
      errors.templateName = 'please enter template name';
    }
    if (!data.templateDescription) {
      errors.templateDescription = 'please enter template description';
    }

    return errors;
  }
  const addNewTemplate = (formik) => {
    setIsLoading(true);

    const data = {
      type: 'telephony_templates',
      id: 1,
      attributes: {
        name: formik.values.templateName,
        description: formik.values.templateDescription,
        is_enabled: formik.values.isEnabled,
        ...(formik.values.linkCallFlow !== '' && { call_flow_id: formik.values.linkCallFlow }),
      },
    };

    CreateTemplates(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been added successfully.',
          type: 'success',
        });
        setRefresh(!refresh);

        formik.resetForm();
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
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        formik.resetForm();
        setShow({ isVisible: false, type: '' });
      });
  };
  const editTemplate = (formik) => {
    setIsLoading(true);
    const data = {
      type: 'telephony_templates',
      id: parseInt(show?.templateId, 10),
      attributes: {
        name: formik?.values?.templateName,
        description: formik?.values?.templateDescription,
        is_enabled: formik?.values?.isEnabled,
        call_flow_id: formik?.values?.linkCallFlow === 'select' ? '' : formik?.values?.linkCallFlow,
      },
    };

    UpdateTemplates(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been saved successfully.',
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
  const editFlowsTemplate = (id, templateHead, templateSubHead, isEnabled, selectCallFlow) => {
    setIsLoading(true);
    const data = {
      type: 'telephony_templates',
      id: parseInt(id, 10),
      attributes: {
        name: templateHead,
        description: templateSubHead,
        is_enabled: isEnabled,
        call_flow_id: selectCallFlow,
      },
    };
    UpdateTemplates(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been saved successfully.',
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
        setShow({ isVisible: false, type: '' });
      });
  };
  const deleteTemplate = () => {
    setIsLoading(true);

    DeleteTemplates(show?.templateId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Template has been deleted successfully.',
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
  };
  const handleDeleteTemplate = () => {
    deleteTemplate();
  };
  const formik = useFormik({
    initialValues: {
      templateName: '',
      templateDescription: '',
      isEnabled: true,
      linkCallFlow: '',
    },
    validate,

    onSubmit: () => {
      if (show.type === 'add-new-template-modal') {
        addNewTemplate(formik);
      }
      if (show.type === 'edit-template-modal') {
        editTemplate(formik);
      }
    },
  });
  useEffect(() => {
    setAllTemplates([]);
    ListAllTemplates()?.then((response) => {
      response?.data?.map((item) => {
        setAllTemplates((prevArray) => [
          ...prevArray,
          { type: 'telephony_vendor_templates', id: parseInt(item.id, 10) },
        ]);
        return null;
      });
    });
  }, [refresh]);
  useEffect(() => {
    setPaginatedTemplate({ isLoading: true });
    ListPaginatedTemplates('', page)?.then((response) => {
      setPaginatedTemplate({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page]);
  useEffect(() => {
    ListWithoutPagination().then((response) => {
      setAllCallFlow(response.data);
    });
  }, []);

  return (
    <Layout
      title="comm voice"
      headerTitle="Settings"
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
                            <Link
                              to="/comm-telephony/call-flow-admin/"
                              className="d-block d-lg-none"
                            >
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
                    <div className="bg-white rounded px-3 w-100 pt-4">
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
                              <h4 className="fs-16px text-black fw-medium">Templates</h4>
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
                          <SideNavFlow active={0} />
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
                              <h6 className="mb-0">Templates</h6>
                              <p className="mb-0 text-secondary">
                                <span className="fw-medium text-primary">
                                  {paginatedTemplate?.meta?.pagination?.total}
                                </span>{' '}
                                Templates available
                              </p>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end gap-3">
                            <a
                              href="/#"
                              id="addConditionBtn"
                              className="blue-btn d-flex align-items-center px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active"
                              onClick={(e) => {
                                e.preventDefault();
                                setShow({ isVisible: true, type: 'publish-modal' });
                              }}
                            >
                              Publish
                            </a>
                            <a
                              href="/#"
                              // aria-controls="addTemplate"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                              onClick={(e) => {
                                e.preventDefault();
                                setShow({ isVisible: true, type: 'add-new-template-modal' });
                              }}
                            >
                              New Template
                            </a>
                          </div>
                        </div>
                        {paginatedTemplate?.isLoading && (
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
                        {paginatedTemplate?.data?.length > 0 &&
                          paginatedTemplate?.data?.map((item, index) => (
                            <FlowsTemplateAdmin
                              key={index}
                              templateHead={item.attributes?.name}
                              templateSubHead={item.attributes?.description}
                              setShow={setShow}
                              isEnabled={item.attributes?.is_enabled}
                              id={item?.id}
                              formik={formik}
                              allCallFlow={allCallFlow}
                              callFlowId={item.attributes?.call_flow_id}
                              editFlowsTemplate={editFlowsTemplate}
                              isPublished={item?.attributes?.is_published}
                            />
                          ))}

                        {paginatedTemplate?.meta?.pagination?.total > 0 && (
                          <Pagination
                            handlePagination={handlePaginationFunction}
                            currentPage={paginatedTemplate?.meta?.pagination?.current_page}
                            totalPages={paginatedTemplate?.meta?.pagination?.total_pages}
                            count={paginatedTemplate?.meta?.pagination?.per_page}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <ToastSuccess id="deleteToastMsg"
          >Template has been deleted successfully.</ToastSuccess> */}

          {/* <ToastSuccess id="addToastMsg">Tem
          plate has been added successfully.</ToastSuccess> */}

          {/* <ToastSuccess id="editToas
          tMsg">Template has been saved successfully.</ToastSuccess> */}
          {/* <ToastSuccess id="disableToastMsg">Template
           has been disabled successfully.</ToastSuccess> */}
          {/* <ToastSuccess id="publishToastMsg">
            Template has been published successfully.
          </ToastSuccess> */}
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
      </div>
      <PublishTemplateModal
        show={show.isVisible && show.type === 'publish-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="publish"
        handleAction={handlePublishTemplate}
        isProcessing={isLoading}
      />
      <PublishSingleTemplateModal
        show={show.isVisible && show.type === 'publish-single-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        templateName={show?.name}
        actionKey="publish"
        handleAction={handlePublishSingleTemplate}
        isProcessing={isLoading}
      />
      <UnpublishSingleTemplateModal
        show={show.isVisible && show.type === 'unpublish-single-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        templateName={show?.name}
        actionKey="unpublish"
        handleAction={handleUnPublishSingleTemplate}
        isProcessing={isLoading}
      />
      <AddNewTemplateModal
        show={show.isVisible && show.type === 'add-new-template-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        isProcessing={isLoading}
        allCallFlow={allCallFlow}
      />
      <EditTemplateModal
        show={show.isVisible && show.type === 'edit-template-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        isProcessing={isLoading}
        allCallFlow={allCallFlow}
      />
      <DeleteTemplateModal
        show={show.isVisible && show.type === 'delete-modal'}
        setShow={setShow}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        templateName={show?.name}
        actionKey="delete"
        handleAction={handleDeleteTemplate}
        isProcessing={isLoading}
      />
      <DisableModal
        show={show.isVisible && show.type === 'disable-template'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="disable"
        handleAction={handleDisableTemplate}
        isProcessing={isLoading}
        name={show?.name}
      />
      <EnableModal
        show={show.isVisible && show.type === 'enable-template'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="enable"
        handleAction={handleEnableTemplate}
        isProcessing={isLoading}
        name={show?.name}
      />
    </Layout>
  );
}

export default CallFlowTemplate;
