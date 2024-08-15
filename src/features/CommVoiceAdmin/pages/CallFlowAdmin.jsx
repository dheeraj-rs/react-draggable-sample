import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../../../common/layout';
import NewCallFlowModal from '../components/modals/NewCallFlowModal';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import SuccessBadge from '../../../common/components/badges/SuccessBadge';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SampleFlows from '../components/SampleFlows';
import TemplateFlow from '../components/TemplateFlow';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import {
  CreateCallFLow,
  DeleteCallFlow,
  DisableCallFlow,
  EnableCallFlow,
  ListCallFlows,
  UpdateCallFlow,
} from '../../../common/api-collection/Telephony/CallFlow';
import {
  DeleteTemplates,
  ListPaginatedTemplates,
} from '../../../common/api-collection/Telephony/Templates';
import ToastError from '../../../common/components/toast/ToastError';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import Pagination from '../../CommVoice/components/pagination/Pagination';
import CommonModal from '../../../common/components/modals/CommonModal';
import EditCallFlowModal from '../components/modals/EditCallFlowModal';

function CallFlowAdmin({ title = '', sideNavIcon = '' }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [paginatedData, setPaginatedData] = useState({
    data: [],
    links: {},
    meta: {},
    isLoading: false,
  });

  const [paginatedTemplateData, setPaginatedTemplateData] = useState({
    data: [],
    links: {},
    meta: {},
    isLoading: false,
  });

  const [page, setPage] = useState();

  const [templatePage, setTemplatePage] = useState();

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);
  const [refreshTemplate, setRefreshTemplate] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermTemplate, setSearchTermTemplate] = useState('');

  const validate = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = 'name is required';
    }

    return errors;
  };

  const handleCreateCallFlow = (formik) => {
    const data = {
      type: 'telephony_call-flow',
      attributes: {
        name: formik.values.name,
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

  const handleUpdateCallFlow = (formik) => {
    const data = {
      type: 'telephony_call-flow',
      id: show?.id,
      attributes: {
        name: formik.values.name,
      },
    };
    UpdateCallFlow(data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Call Flows Updated.',
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

  const formik = useFormik({
    initialValues: {
      name: '',
      flowType: '',
      callFlowTypeId: '',
    },
    validate,
    onSubmit: () => {
      setIsLoading(true);
      if (show?.type === 'new-call-flow') {
        handleCreateCallFlow(formik);
      } else if (show?.type === 'edit-call-flow') {
        handleUpdateCallFlow(formik);
      }
    },
  });

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleTemplatePaginationFunction = (newPage) => {
    setTemplatePage(newPage);
  };

  const handleDisableTemplate = () => {};

  const handleEnableTemplate = () => {};

  const handleDeleteTemplate = () => {
    setIsLoading(true);
    DeleteTemplates(show?.id)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Template Deleted.',
        });
        setRefreshTemplate(!refreshTemplate);
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
    ListPaginatedTemplates(searchTermTemplate, templatePage)?.then((response) => {
      setPaginatedTemplateData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [templatePage, refreshTemplate, searchTermTemplate]);

  return (
    <Layout
      favIcon="/assets/favIcons/favicon-voice.ico"
      title={title}
      sideNavIcon={sideNavIcon}
      headerTitle={title}
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob mb-0 mb-sm-3">
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
                    <a href="/comm-telephony/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </a>{' '}
                    Call Flows
                  </h5>
                  <p className="mb-0 text-secondary">
                    Configure and set up call flows for the customer.
                  </p>
                </div>
              </div>
              <div className="equal-pad scroll-custom pb-3 scroll-roles-virtual mt-1 pt-3">
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <div className="shadow-11 d-flex justify-content-between p-4 rounded px-4 mb-4 new-call">
                      <div className="row">
                        <div className="d-flex gap-4 align-items-center col-lg-8">
                          <img src="/assets/new-call.svg" alt="" />
                          <p className="mb-0">Build a new call flow and save as a template.</p>
                        </div>
                        <div className="col-lg-4">
                          <a
                            href="/#"
                            id="adminCallFlowbtn"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  mt-3 mt-sm-0"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'new-call-flow' });
                            }}
                          >
                            New Call Flow
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="shadow-11 d-flex justify-content-between p-4 rounded px-4 mb-4 row">
                      <div className="row">
                        <div className="d-flex gap-4 align-items-center col-lg-8">
                          <img src="/assets/flow-setting-icon.svg" alt="" />
                          <p className="mb-0">
                            Configure call flow components and related settings
                          </p>
                        </div>
                        <div className="col-lg-4">
                          <Link
                            to="/comm-telephony/call-flow-admin/call-flow-template/"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  mt-3 mt-sm-0"
                          >
                            Flow Settings
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="carrier-pad">
                  <div className="con mt-0 mt-lg-2">
                    <ul
                      className="nav nav-tabs d-flex ps-0 mb-0 col-lg-12"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item pe-4" role="presentation">
                        <a
                          href="/"
                          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary active"
                          id="did"
                          data-bs-toggle="tab"
                          data-bs-target="#tab-did"
                          type="button"
                          role="tab"
                          aria-controls="did-tab"
                          aria-selected="true"
                        >
                          Sample Flows
                        </a>
                      </li>
                      <li className="nav-item pe-4" role="presentation">
                        <a
                          href="/"
                          className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
                          id="toll-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#tab-toll-free"
                          type="button"
                          role="tab"
                          aria-controls="call"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          Templates
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade active show"
                        id="tab-did"
                        role="tabpanel"
                        aria-labelledby="did-tab"
                      >
                        <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-4 mt-sm-4 mb-4 row px-1">
                          <div className="col-lg-4 col-sm-4 col-10">
                            <SearchWithBorder
                              placeholderText="Search flow"
                              onChange={(e) => {
                                setSearchTerm(e.target.value);
                              }}
                              clearBtn={() => {
                                setSearchTerm('');
                              }}
                              searchTerm={searchTerm}
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
                                  <p className="mb-0">Type</p>
                                  <select
                                    className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                    aria-label="Default select example"
                                  >
                                    <option selected>All</option>
                                    <option value="1">Organization admin</option>
                                    <option value="2">Product admin</option>
                                    <option value="3">Agent</option>
                                    <option value="4">Supervisor</option>
                                  </select>
                                </div>
                                <div className="d-flex flex-column mt-3 filter-title">
                                  <p className="mb-0">Enabled/disabled</p>
                                  <select
                                    className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                    aria-label="Default select example"
                                  >
                                    <option selected>All</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                  </select>

                                  <div className="setting-buttons d-flex align-items-end mt-4">
                                    <button
                                      id="applyBtn"
                                      type="button"
                                      className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                    >
                                      Apply
                                    </button>
                                    <a
                                      href="/"
                                      type="button"
                                      id="roleCancel"
                                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                    >
                                      Clear
                                    </a>
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
                            {paginatedData?.meta?.pagination?.total} flows available
                          </div>
                        </div>

                        {paginatedData?.isLoading && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <SpinningLoader />
                          </div>
                        )}

                        {paginatedData?.isLoading === false && paginatedData?.data?.length === 0 ? (
                          <NoMatchingRecords />
                        ) : null}

                        {paginatedData?.data?.map((callFlow, index) => (
                          <SampleFlows
                            key={index}
                            id={callFlow?.id}
                            flowsIcon="/assets/flow-stream.svg"
                            flowsName={callFlow?.attributes?.name}
                            flowsId={`ID: ${callFlow?.id}`}
                            updatedDate={`Updated on: ${moment(
                              callFlow?.attributes?.updated_at
                            )?.format('DD-MM-YYYY')}`}
                            countryName="India (Airtel)"
                            voiceType="DRAFT"
                            permissionsLink="#"
                          >
                            {!callFlow?.attributes?.is_published && (
                              <div className="col-lg-1 col-sm-2 col-4 voice-mob mt-sm-0 mt-3">
                                <button
                                  type="button"
                                  className="btn bg-tropical-blue text-blueberry fs-10px p-1 fw-bolder btn-voice"
                                >
                                  Draft
                                </button>
                              </div>
                            )}

                            {callFlow?.attributes?.is_published && (
                              <div className="col-lg-1 col-sm-2 col-4 voice-mob mt-sm-0 mt-3">
                                <SuccessBadge title="Published" />
                              </div>
                            )}

                            <div className="d-flex gap-2 align-items-center col-lg-2 col-sm-2 col-3 mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-end">
                              <p className="mb-0 d-flex gap-1" />
                              <CheckboxTickChat
                                active={callFlow?.attributes?.is_enabled}
                                onClick={() => {
                                  setShow({
                                    isVisible: true,
                                    type: `${
                                      callFlow?.attributes?.is_enabled ? 'disable' : 'enable'
                                    }`,
                                    name: callFlow?.attributes?.name,
                                    key: `${
                                      callFlow?.attributes?.is_enabled ? 'Disable' : 'Enable'
                                    }`,
                                    id: callFlow?.id,
                                  });
                                }}
                                onChange={() => {}}
                              />
                              <div className="dropup">
                                <a
                                  href="/"
                                  role="button"
                                  className=""
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <img src="/assets/vertical-dot.svg" alt="" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-group p-1">
                                  <li className="d-none">
                                    <a
                                      href="/#"
                                      className="dropdown-item py-3 px-3"
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                    >
                                      Duplicate
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="/#"
                                      className="dropdown-item py-3 px-3"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        formik.setFieldValue();
                                        setShow({
                                          isVisible: true,
                                          type: 'edit-call-flow',
                                          id: callFlow?.id,
                                          name: callFlow?.attributes?.name,
                                        });
                                        formik.setFieldValue('name', callFlow?.attributes?.name);
                                      }}
                                    >
                                      <img className="me-2" src="/assets/pencil.svg" alt="" />
                                      Edit
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
                          </SampleFlows>
                        ))}

                        {/* <!-- pagination --> */}
                        {paginatedData?.meta?.pagination != null && (
                          <Pagination
                            handlePagination={handlePaginationFunction}
                            currentPage={paginatedData?.meta?.pagination?.current_page}
                            totalPages={paginatedData?.meta?.pagination?.total_pages}
                            count={paginatedData?.meta?.pagination?.per_page}
                          />
                        )}
                        {/* <!-- pagination end --> */}
                      </div>
                      {/* <!-- pagination end --> */}
                      <div
                        className="tab-pane fade"
                        id="tab-toll-free"
                        role="tabpanel"
                        aria-labelledby="toll-free-tab"
                      >
                        <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-4 mt-sm-4 mb-4 row px-1">
                          <div className="col-lg-4 col-sm-4 col-10">
                            <SearchWithBorder
                              placeholderText="Search template"
                              onChange={(e) => {
                                setSearchTermTemplate(e.target.value);
                              }}
                              clearBtn={() => {
                                setSearchTermTemplate('');
                              }}
                              searchTerm={searchTermTemplate}
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
                                  <p className="mb-0">Type</p>
                                  <select
                                    className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                    aria-label="Default select example"
                                  >
                                    <option selected>All</option>
                                    <option value="1">Organization admin</option>
                                    <option value="2">Product admin</option>
                                    <option value="3">Agent</option>
                                    <option value="4">Supervisor</option>
                                  </select>
                                </div>
                                <div className="d-flex flex-column mt-3 filter-title">
                                  <p className="mb-0">Enabled/disabled</p>
                                  <select
                                    className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                    aria-label="Default select example"
                                  >
                                    <option selected>All</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                  </select>

                                  <div className="setting-buttons d-flex align-items-end mt-4">
                                    <button
                                      id="applyBtn"
                                      type="button"
                                      className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                    >
                                      Apply
                                    </button>
                                    <a
                                      href="/"
                                      type="button"
                                      id="roleCancel"
                                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                    >
                                      Clear
                                    </a>
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
                            {paginatedTemplateData?.meta?.pagination?.total} templates available
                          </div>
                        </div>

                        <div className="d-flex justify-content-between bg-seashell rounded p-4">
                          <p className="mb-0">
                            <strong>{paginatedTemplateData?.meta?.pagination?.total}</strong>{' '}
                            Templates available
                          </p>
                          <Link to="/comm-telephony/call-flow-admin/call-flow-template/">
                            <img src="/assets/template-img.svg" alt="" /> Manage Templates
                          </Link>
                        </div>

                        {paginatedTemplateData?.data?.map((template, index) => (
                          <TemplateFlow
                            key={index}
                            tempImage="/assets/call-add-connt.svg"
                            tempText="Connect Agent"
                            flowsIcon=""
                            flowId={`ID: ${template?.id}`}
                            flowsName={template?.attributes?.name}
                            updatedDate={`Updated on: ${moment(
                              template?.attributes?.updated_at
                            )?.format('DD-MM-YYYY')}`}
                          >
                            {template?.attributes?.is_published === 1 && (
                              <div className="col-lg-1 col-sm-2 col-4 voice-mob mt-sm-0 mt-3">
                                <SuccessBadge title="Published" />
                              </div>
                            )}

                            {template?.attributes?.is_published === 0 && (
                              <div className="col-lg-1 col-sm-2 col-4 voice-mob mt-sm-0 mt-3">
                                <button
                                  type="button"
                                  className="btn bg-tropical-blue text-blueberry fs-10px p-1 fw-bolder btn-voice"
                                >
                                  Draft
                                </button>
                              </div>
                            )}

                            <div className="d-flex gap-2 align-items-center col-lg-2 col-sm-2 col-3 mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-end">
                              <p className="mb-0 d-flex gap-1" />
                              <CheckboxTickChat
                                active={template?.attributes?.is_enabled}
                                onClick={() => {
                                  setShow({
                                    isVisible: true,
                                    type: `${
                                      template?.attributes?.is_enabled
                                        ? 'disable-template'
                                        : 'enable-template'
                                    }`,
                                    name: template?.attributes?.name,
                                    key: `${
                                      template?.attributes?.is_enabled ? 'Disable' : 'Enable'
                                    }`,
                                    id: template?.id,
                                  });
                                }}
                                onChange={() => {}}
                              />
                              <div className="dropup">
                                <a
                                  href="/"
                                  role="button"
                                  className=""
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <img src="/assets/vertical-dot.svg" alt="" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-group p-1">
                                  <li className="d-none">
                                    <a
                                      href="/#"
                                      className="dropdown-item py-3 px-3 "
                                      onClick={(e) => {
                                        e.preventDefault();
                                      }}
                                    >
                                      {/* <img class="me-2" src="/assets/note-pencil.svg" /> */}
                                      Duplicate
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="/#"
                                      className="dropdown-item py-3 px-3 "
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setShow({
                                          isVisible: true,
                                          type: 'delete-templated',
                                          id: template?.id,
                                          templateName: template?.attributes?.name,
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
                          </TemplateFlow>
                        ))}

                        {/* <!-- pagination --> */}
                        {paginatedTemplateData?.meta?.pagination != null && (
                          <Pagination
                            handlePagination={handleTemplatePaginationFunction}
                            currentPage={paginatedTemplateData?.meta?.pagination?.current_page}
                            totalPages={paginatedTemplateData?.meta?.pagination?.total_pages}
                            count={paginatedTemplateData?.meta?.pagination?.per_page}
                          />
                        )}
                        {/* <!-- pagination end --> */}
                      </div>
                    </div>
                  </div>
                </div>
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
        />

        <EditCallFlowModal
          formik={formik}
          show={show?.isVisible && show?.type === 'edit-call-flow'}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
            formik.resetForm();
          }}
          isLoading={isLoading}
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
          isVisible={
            show?.isVisible &&
            (show?.type === 'enable-template' || show?.type === 'disable-template')
          }
          title={show?.type === 'enable' ? ' Enable Template' : ' Disable Template'}
          actionType={show?.key}
          text={` the Template ${show?.name}`}
          label={`To confirm this action please type “${show?.key}”`}
          btnLabel={show?.key}
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          actionKey={show?.key}
          isProcessing={isLoading}
          handleAction={show?.type === 'enable' ? handleEnableTemplate : handleDisableTemplate}
        />

        <CommonModal
          isVisible={show?.isVisible && show?.type === 'delete'}
          title="Delete Call Flow"
          actionType="delete"
          text={` the Call Flow ${show?.flowsName}`}
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

        <CommonModal
          isVisible={show?.isVisible && show?.type === 'delete-templated'}
          title="Delete Template"
          actionType="delete"
          text={` the Template ${show?.templateName}`}
          label="To confirm this action please type “delete”"
          btnLabel="Delete"
          onClose={() => {
            setShow({ isVisible: false, type: '' });
          }}
          actionKey="delete"
          isProcessing={isLoading}
          handleAction={() => {
            handleDeleteTemplate();
          }}
        />

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

export default CallFlowAdmin;
