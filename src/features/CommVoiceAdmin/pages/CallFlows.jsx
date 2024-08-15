import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from 'moment';

import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CallFlowsList from '../components/CallFlowList';
import CheckboxSlider from '../../../common/components/forms/CheckboxSlider';
import SuccessBadge from '../../../common/components/badges/SuccessBadge';
import Selectbox from '../../../common/components/forms/SelectBox';
import NewCallFlowModal from '../components/flow/NewCallFlowModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

import SMSTemplateModal from '../components/modals/SMSTemplateModal';
import SMSTemplateModalSuccess from '../components/modals/SMSTemplateModalSuccess';
import ComponentSelectPopup from '../components/modals/ComponentSelectPopup';
import CallBackModal from '../components/modals/CallBackModal';
import '../../../styles/formvalidation.css';
import {
  CreateCallFLow,
  DeleteCallFlow,
  DisableCallFlow,
  EnableCallFlow,
  ListCallFlows,
} from '../../../common/api-collection/Telephony/CallFlow';
import ToastError from '../../../common/components/toast/ToastError';
import Pagination from '../../CommVoice/components/pagination/Pagination';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import CommonModal from '../../../common/components/modals/CommonModal';
import { ListAllTemplates } from '../../../common/api-collection/Telephony/Templates';

function CallFlows({ title = '', sideNavIcon = '' }) {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [templatesArray, setTemplatesArray] = useState([]);

  const [show, setShow] = useState({ isVisible: false, type: '' });

  const [searchTerm, setSearchTerm] = useState('');

  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });

  const [paginatedData, setPaginatedData] = useState({
    data: [],
    links: {},
    meta: {},
    isLoading: false,
  });

  const [page, setPage] = useState(1);

  const handleEnable = () => {
    setIsLoading(true);
    EnableCallFlow(show?.id)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Call Flows Enabled.',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const handleDisable = () => {
    setIsLoading(true);

    DisableCallFlow(show?.id)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Call Flows Disabled.',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const handleDeleteCallFlow = () => {
    setIsLoading(true);
    DeleteCallFlow(show?.id)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Call Flow Deleted.',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleCreateCallFlow = (formik) => {
    const data = {
      type: 'telephony_call-flow',
      attributes: {
        name: formik.values.name,
        template_id: formik.values.templatedId,
        is_published: formik.values.is_published,
      },
    };
    CreateCallFLow(data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Call Flows Created.',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: 'Something went wrong.',
          });
        } else {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.error?.message,
          });
        }
      })
      .finally(() => {
        formik.resetForm();
        setIsLoading(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const validate = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = 'name is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      flowType: '',
      templatedId: '',
      is_published: '',
    },
    validate,
    onSubmit: () => {
      setIsLoading(true);
      if (show?.type === 'new-call-flow') {
        handleCreateCallFlow(formik);
      }
    },
  });

  useEffect(() => {
    setPaginatedData({ isLoading: true });
    ListCallFlows(searchTerm, page)?.then((response) => {
      setPaginatedData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [page, refresh, searchTerm]);

  useEffect(() => {
    ListAllTemplates()?.then((response) => {
      setTemplatesArray(response?.data);
    });
  }, []);
  return (
    <Layout
      title="comm voice"
      headerTitle={title}
      favIcon="/assets/favIcons/favicon-voice.ico"
      sideNavIcon={sideNavIcon}
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a
                    href="/#"
                    className="d-flex justify-content-center"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  >
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link to="/comm-voice-admin/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    Call Flows
                  </h5>
                  <p className="mb-0 text-secondary">
                    Configure and set up call flows for the customer.
                  </p>
                </div>
              </div>
              <div className="equal-pad scroll-custom pb-3 scroll-roles-virtual mt-1">
                <div className="bg-thin-blue-gray d-flex justify-content-between p-4 rounded-3 px-4 mb-4 align-items-center gap-3 flex-md-nowrap flex-wrap">
                  <div className="d-flex gap-lg-4 align-items-sm-center gap-3 flex-sm-row flex-column align-items-start">
                    <div>
                      <img src="/assets/screen-flow.svg" alt="" />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0">
                        Start a new call flow from a template or as a new flow. Simplify the
                        customer interaction more easier.
                      </p>
                      <p className="mb-0">Click on New Call Flow button.</p>
                    </div>
                  </div>
                  <div className="mt-3 mt-sm-0 new-call-flow">
                    <a
                      href="/#"
                      id="newCallFlow"
                      className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  text-nowrap"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow({ isVisible: true, type: 'new-call-flow' });
                      }}
                    >
                      New Call Flow
                    </a>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row px-1">
                  <div className="col-lg-4 col-sm-4 col-10">
                    <SearchWithBorder
                      placeholderText="Search flow"
                      searchTerm={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      clearBtn={() => {
                        setSearchTerm('');
                      }}
                    />
                  </div>
                  <div className="col-lg-5 col-sm-5 col-2 d-none">
                    <div id="roleSelection" className="filter-wrap">
                      <a
                        href="/#"
                        className="filter-btn p-10px fw-medium rounded-3 border role-selection"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <span className="filter-text">Filter</span>
                        <img
                          className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                          src="/assets/black-filter.svg"
                          alt=""
                        />
                      </a>

                      <ul className="dropdown-menu p-4">
                        <div className="d-flex flex-column">
                          <div className="mb-3">
                            <Selectbox
                              label="Type"
                              options={[
                                'All',
                                'Organization admin',
                                'Product admin',
                                'Agent',
                                'Superviso',
                              ]}
                              onchange={() => {}}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-column mt-3 filter-title">
                          <div className="mb-3">
                            <Selectbox
                              label="Enabled/disabled"
                              options={['All', 'Active', 'Inactive']}
                              onchange={() => {}}
                            />
                          </div>

                          <div className="setting-buttons d-flex align-items-end mt-4">
                            <button
                              id="applyBtn"
                              type="button"
                              className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              id="roleCancel"
                              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </ul>
                    </div>
                    <div id="selectedRole" className="d-none">
                      <a
                        href="/#"
                        className="p-10px rounded text-blue-active border border-blue-active position-relative"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                        <span className="filter-text">Filter</span>
                        <img
                          id="clearFilter"
                          className="ps-0 ps-md-4"
                          src="/assets/close-blue.svg"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-3 col-12 mt-4 mt-lg-0 mt-sm-0 text-end">
                    <span className="fw-medium text-primary">
                      {paginatedData?.meta?.pagination?.total}
                    </span>{' '}
                    flows available
                  </div>
                  <div />
                </div>

                {paginatedData?.isLoading && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SpinningLoader />
                  </div>
                )}
                {paginatedData?.isLoading === false && paginatedData?.data?.length === 0 ? (
                  <NoMatchingRecords />
                ) : null}
                {paginatedData?.data?.map((callFlow, index) => (
                  <CallFlowsList
                    key={index}
                    id={callFlow?.id}
                    flowsIcon="/assets/flow-stream.svg"
                    flowsName={callFlow?.attributes?.name}
                    flowsId={callFlow?.id}
                    updatedDate={moment(callFlow?.attributes?.updated_at)?.format('DD-MM-YYYY')}
                    countryName="India (Airtel)"
                    voiceType="DRAFT"
                    permissionsLink="#"
                  >
                    {callFlow?.attributes?.is_published && (
                      <div className="col-lg-1 col-sm-2 col-4 voice-mob mt-sm-0 mt-3">
                        <SuccessBadge title="Published" />
                      </div>
                    )}
                    {!callFlow?.attributes?.is_published && (
                      <div
                        className="col-lg-1 col-sm-2 col-4 voice-mob mt-sm-0 mt-3"
                        style={{ width: '112px' }}
                      >
                        {/* <UserStatusBadge title="Not Published" /> */}
                      </div>
                    )}

                    <div className="d-flex gap-3 align-items-center col-lg-2 col-sm-2 col-3 mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-end">
                      <div>
                        <CheckboxSlider
                          checked={callFlow?.attributes?.is_enabled}
                          onClick={() => {
                            setShow({
                              isVisible: true,
                              type: `${callFlow?.attributes?.is_enabled ? 'disable' : 'enable'}`,
                              name: callFlow?.attributes?.name,
                              key: `${callFlow?.attributes?.is_enabled ? 'Disable' : 'Enable'}`,
                              id: callFlow?.id,
                            });
                          }}
                        />
                      </div>
                      <div className="dropup">
                        <a
                          href="/"
                          role="button"
                          className=""
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img src="/assets/vertical-dot.svg" alt="" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-group p-1">
                          <li>
                            <a
                              href="/#"
                              className="dropdown-item py-3 px-3 d-none"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img className="me-2" src="/assets/note-pencil.svg" alt="" />
                              Duplicate
                            </a>
                          </li>
                          <li>
                            <a
                              href="/#"
                              className="dropdown-item py-3 px-3"
                              onClick={(e) => {
                                e.preventDefault();
                                setShow({
                                  isVisible: true,
                                  type: 'delete',
                                  id: callFlow?.id,
                                  flowsName: callFlow?.attributes?.name,
                                });
                              }}
                            >
                              <img className="me-2" src="/assets/trash.svg" alt="" />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CallFlowsList>
                ))}

                {/* <!-- pagination --> */}
                {paginatedData?.data?.length > 0 && paginatedData?.meta?.pagination != null && (
                  <Pagination
                    handlePagination={handlePaginationFunction}
                    currentPage={paginatedData?.meta?.pagination?.current_page}
                    totalPages={paginatedData?.meta?.pagination?.total_pages}
                    count={paginatedData?.meta?.pagination?.per_page}
                  />
                )}

                {/* <!-- pagination end --> */}
              </div>
            </div>
          </div>
        </div>

        <NewCallFlowModal
          formik={formik}
          show={show?.isVisible && show?.type === 'new-call-flow'}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
            formik.resetForm();
          }}
          isLoading={isLoading}
          templatesArray={templatesArray}
        />

        <CommonModal
          isVisible={show?.isVisible && (show?.type === 'enable' || show?.type === 'disable')}
          title={show?.type === 'enable' ? ' Enable Call Flow' : ' Disable Call Flow'}
          actionType={show?.key}
          text={` the Call Flow ${show?.name}`}
          label={`To confirm this action please type “${show?.key}”`}
          btnLabel={show?.key}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          actionKey={show?.key}
          isProcessing={isLoading}
          handleAction={show?.type === 'enable' ? handleEnable : handleDisable}
        />

        <CommonModal
          isVisible={show?.isVisible && show?.type === 'delete'}
          title="Delete Call Flow"
          actionType="delete"
          text={`the Call Flow ${show?.flowsName}`}
          label="To confirm this action please type “delete”"
          btnLabel="Delete"
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          actionKey="delete"
          isProcessing={isLoading}
          handleAction={() => {
            handleDeleteCallFlow();
          }}
        />

        <SMSTemplateModal />

        <SMSTemplateModalSuccess />

        <ComponentSelectPopup />

        <CallBackModal />

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
      </div>
    </Layout>
  );
}

export default CallFlows;
