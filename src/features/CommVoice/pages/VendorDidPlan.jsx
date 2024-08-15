/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import DidPlanList from '../components/DidPlanList';
import SideMenu from '../components/common/SideMenu';
import AddNumberingPlan from '../components/AddNumberingPlan';
import EditNumberingPlan from '../components/EditNumberingPlan';
import Pagination from '../components/pagination/Pagination';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import Delete from '../components/Delete';
import {
  CreateNumberPlan,
  DeleteNumberPaln,
  ListPaginatedNumberPlans,
  UpdateNumberPlan,
} from '../../../common/api-collection/Telephony/NumberPlans';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VendorDidPlan() {
  const [numberPlanType, setNumberPlanType] = useState('did');

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [searchTermDid, setSearchTermDid] = useState('');
  const [searchTermTf, setSearchTermTf] = useState('');

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [page, setPage] = useState(1);

  const [paginatedPlansDid, setPaginatedPlansDid] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [paginatedPlansTf, setPaginatedPlansTf] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [toastAction, setToastAction] = useState({
    isVisible: false,
    type: '',
    message: '',
  });

  const [refresh, setRefresh] = useState(false);
  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [filter, setFilter] = useState({ enable: '' });
  const [activeFilter, setActiveFilter] = useState({ enable: '' });

  const validate = (data) => {
    const errors = {};

    if (!data.planName) {
      errors.planName = 'plan name is required';
    }

    if (!data.numberType) {
      errors.numberType = 'number type is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      planName: '',
      numberType: 'did',
      enable: true,
    },
    validate,
    onSubmit: () => {
      if (show.type === 'add-numbering-plan') {
        setShow({ isVisible: true, type: '' });

        const data = {
          type: 'telephony_vendor_number_plans',
          attributes: {
            number_type: formik.values.numberType,
            name: formik.values.planName,
            is_enabled: formik.values.enable,
          },
        };

        CreateNumberPlan(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Plan created : You have successfully created Plan',
              type: 'success',
            });
            formik.resetForm();
            setShow({ isVisible: false, type: '' });
            setRefresh(!refresh);
          })
          ?.catch((error) => {
            if (error?.response?.status === 500 || error?.response?.status === 404) {
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
            setDataSubmitting(false);
          });
      }

      if (show.type === 'edit-numbering-plan') {
        const data = {
          type: 'telephony_vendor_number_plans',
          id: parseInt(show?.planDetails?.id, 10),
          attributes: {
            number_type: formik.values.numberType,
            name: formik.values.planName,
            is_enabled: formik.values.enable,
          },
        };

        UpdateNumberPlan(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              type: 'success',
              message: 'Saved : You have successfully saved the changes',
            });
            formik.resetForm();
            setShow({ isVisible: false, type: '' });
            setRefresh(!refresh);
          })
          ?.catch((error) => {
            if (error?.response?.status === 500 || error?.response?.status === 404) {
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
            setDataSubmitting(false);
          });
      }
    },
  });

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const deletePlan = () => {
    setDataSubmitting(true);
    if (show?.numberPlan?.id) {
      DeleteNumberPaln(show?.numberPlan?.id)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Deleted : You have successfully deleted the plan from the list',
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
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  useEffect(() => {
    if (numberPlanType === 'did') {
      setPaginatedPlansDid({ isLoading: true });

      ListPaginatedNumberPlans(searchTermDid, page, numberPlanType, activeFilter?.enable)?.then(
        (response) => {
          setPaginatedPlansDid({
            data: response?.data,
            links: response?.links,
            meta: response?.meta,
            isLoading: false,
          });
        }
      );
    }

    if (numberPlanType === 'tf') {
      setPaginatedPlansTf({ isLoading: true });

      ListPaginatedNumberPlans(searchTermTf, page, numberPlanType, activeFilter?.enable)?.then(
        (response) => {
          setPaginatedPlansTf({
            data: response?.data,
            links: response?.links,
            meta: response?.meta,
            isLoading: false,
          });
        }
      );
    }
  }, [refresh, numberPlanType, page, searchTermDid, searchTermTf, activeFilter]);

  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a href="/comm-telephony/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                    <Link
                      to="/comm-telephony/vendor-plans-and-packges-mobile/"
                      className="d-block d-lg-none"
                    >
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Vendor Plan & Packages
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block ">
                    <div className="h-100 shadow-10 rounded">
                      <div className="scroll-custom scroll-carrier pt-3">
                        <SideMenu active={6} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0">DID/TF Plan</h6>
                        <p className="mb-0">
                          <span className="fw-medium">
                            {numberPlanType === 'did'
                              ? paginatedPlansDid?.data?.length
                              : paginatedPlansTf?.data?.length}
                          </span>{' '}
                          Plans available
                        </p>
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
                              className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary active"
                              id="did"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-did"
                              type="button"
                              role="tab"
                              aria-controls="did-tab"
                              aria-selected="true"
                              onClick={() => {
                                setNumberPlanType('did');
                                formik.setFieldValue('numberType', 'did');
                              }}
                            >
                              DID Plan
                            </a>
                          </li>
                          <li className="nav-item pe-4" role="presentation">
                            <a
                              href="/#"
                              className="nav-calendar-link py-3 px-0 fw-medium nav-link text-primary"
                              id="toll-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#tab-toll-free"
                              type="button"
                              role="tab"
                              aria-controls="call"
                              aria-selected="false"
                              tabIndex="-1"
                              onClick={() => {
                                setNumberPlanType('tf');
                                formik.setFieldValue('numberType', 'tf');
                              }}
                            >
                              Toll Free Plan (TF)
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
                            <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-3 mt-sm-4 mb-4 row">
                              <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                                <SearchWithBorder
                                  placeholderText="Search plan"
                                  onChange={(e) => {
                                    setSearchTermDid(e.target.value);
                                  }}
                                  clearBtn={() => {
                                    setSearchTermDid('');
                                  }}
                                  searchTerm={searchTermDid}
                                />
                              </div>
                              <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
                                <div id="roleSelection" className={isFilterApplied ? 'd-none' : ''}>
                                  <a
                                    href="/#"
                                    className="filter-btn p-10px fw-medium rounded border role-selection"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <span className="filter-text">Filter</span>
                                    <img
                                      className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                                      src="/assets/black-filter.svg"
                                      alt=""
                                    />
                                  </a>

                                  <ul className="dropdown-menu p-4">
                                    <div className="d-flex flex-column mt-3">
                                      <p className="mb-0">Enabled/disabled</p>
                                      <select
                                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                        aria-label="Default select example"
                                        value={filter?.enable || ''}
                                        onChange={(e) => {
                                          setFilter({ enable: e.target.value });
                                        }}
                                      >
                                        <option value="">All</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                      </select>

                                      <div className="setting-buttons d-flex align-items-end mt-4">
                                        <button
                                          id="applyBtn"
                                          type="button"
                                          className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                                          onClick={() => {
                                            setIsFilterApplied(true);
                                            setActiveFilter(filter);
                                          }}
                                        >
                                          Apply
                                        </button>
                                        <a
                                          href="/#"
                                          type="button"
                                          id="roleCancel"
                                          className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                                          onClick={() => {
                                            setActiveFilter({ enable: '' });
                                          }}
                                        >
                                          Clear
                                        </a>
                                      </div>
                                    </div>
                                  </ul>
                                </div>
                                <div id="selectedRole" className={isFilterApplied ? '' : 'd-none'}>
                                  <a
                                    href="/#"
                                    className="p-10px rounded text-blue-active border border-blue-active position-relative"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsFilterApplied(false);
                                      setActiveFilter({ enable: '' });
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
                              <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-lg-0 mt-sm-0 gap-3 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                                <a
                                  href="/#"
                                  className="btn bg-black fw-medium fs-14px text-white px-4 py-12px plan-btn-mob"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'add-numbering-plan' });
                                  }}
                                >
                                  Add Plan
                                </a>
                                <div className="dropdown">
                                  <a
                                    href="/#"
                                    className="hor-dots"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <img src="/assets/3-dots-horizontal.svg" alt="" />
                                  </a>
                                  <ul className="dropdown-menu dropdown-menu-group py-2 px-1 mt-1">
                                    <li>
                                      <a href="/#" className="dropdown-item py-2 px-3">
                                        <img src="/assets/export-icon-blue.svg" alt="" /> Export
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {paginatedPlansDid?.isLoading && (
                              <div
                                className="row bg-white border-transparent shadow-6 align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3 roles-box cursor-pointer mx-1 flex-wrap"
                                style={{ justifyContent: 'center' }}
                              >
                                <SpinningLoader />
                              </div>
                            )}
                            {paginatedPlansDid?.data?.length > 0 &&
                              paginatedPlansDid?.data?.map((plan, index) => (
                                <DidPlanList
                                  key={index}
                                  id={plan?.id}
                                  numberPaln={plan?.attributes?.name}
                                  planNumber={plan?.attributes?.records_count}
                                  planDate={moment(plan?.attributes?.updated_at).format(
                                    'DD/MM/YYYY'
                                  )}
                                  isEnabled={plan?.attributes?.is_enabled}
                                  setShow={setShow}
                                  numberType={plan?.attributes?.number_type}
                                  formik={formik}
                                />
                              ))}

                            {paginatedPlansDid?.data?.length > 0 &&
                              paginatedPlansDid?.meta?.pagination != null && (
                                <Pagination
                                  handlePagination={handlePagination}
                                  currentPage={paginatedPlansDid?.meta?.pagination?.current_page}
                                  totalPages={paginatedPlansDid?.meta?.pagination?.total_pages}
                                  count={paginatedPlansDid?.meta?.pagination?.per_page}
                                />
                              )}
                            {paginatedPlansDid?.data?.length === 0 && <NoMatchingRecords />}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab-toll-free"
                            role="tabpanel"
                            aria-labelledby="toll-free-tab"
                          >
                            <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-3 mt-sm-4 mb-4 row">
                              <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                                <SearchWithBorder
                                  placeholderText="Search plan"
                                  onChange={(e) => {
                                    setSearchTermTf(e.target.value);
                                  }}
                                  clearBtn={() => {
                                    setSearchTermTf('');
                                  }}
                                  searchTerm={searchTermTf}
                                />
                              </div>
                              <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
                                <div id="roleSelection" className={isFilterApplied ? 'd-none' : ''}>
                                  <a
                                    href="/#"
                                    className="filter-btn p-10px fw-medium rounded border role-selection"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <span className="filter-text">Filter</span>
                                    <img
                                      className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                                      src="/assets/black-filter.svg"
                                      alt=""
                                    />
                                  </a>

                                  <ul className="dropdown-menu p-4">
                                    <div className="d-flex flex-column mt-3">
                                      <p className="mb-0">Enabled/disabled</p>
                                      <select
                                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                        aria-label="Default select example"
                                        value={filter?.enable || ''}
                                        onChange={(e) => {
                                          setFilter({ enable: e.target.value });
                                        }}
                                      >
                                        <option value="">All</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                      </select>

                                      <div className="setting-buttons d-flex align-items-end mt-4">
                                        <button
                                          id="applyBtn"
                                          type="button"
                                          className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                                          onClick={() => {
                                            setIsFilterApplied(true);
                                            setActiveFilter(filter);
                                          }}
                                        >
                                          Apply
                                        </button>
                                        <a
                                          href="/#"
                                          type="button"
                                          id="roleCancel"
                                          className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                                          onClick={() => {
                                            setActiveFilter({ enable: '' });
                                          }}
                                        >
                                          Clear
                                        </a>
                                      </div>
                                    </div>
                                  </ul>
                                </div>
                                <div id="selectedRole" className={isFilterApplied ? '' : 'd-none'}>
                                  <a
                                    href="/#"
                                    className="p-10px rounded text-blue-active border border-blue-active position-relative"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsFilterApplied(false);
                                      setActiveFilter({ enable: '' });
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
                              <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-lg-0 mt-sm-0 gap-3 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                                <a
                                  href="/#"
                                  className="btn bg-black fw-medium fs-14px text-white px-4 py-12px plan-btn-mob"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'add-numbering-plan' });
                                  }}
                                >
                                  Add Plan
                                </a>
                                <div className="dropdown">
                                  <a
                                    href="/#"
                                    className="hor-dots"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <img src="/assets/3-dots-horizontal.svg" alt="" />
                                  </a>
                                  <ul className="dropdown-menu dropdown-menu-group py-2 px-1 mt-1">
                                    <li>
                                      <a href="/#" className="dropdown-item py-2 px-3">
                                        <img src="/assets/export-icon-blue.svg" alt="" /> Export
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            {paginatedPlansTf?.isLoading && (
                              <div
                                className="row bg-white border-transparent shadow-6 align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3 roles-box cursor-pointer mx-1 flex-wrap"
                                style={{ justifyContent: 'center' }}
                              >
                                <SpinningLoader />
                              </div>
                            )}

                            {paginatedPlansTf?.data?.length > 0 &&
                              paginatedPlansTf?.data?.map((plan, index) => (
                                <DidPlanList
                                  key={index}
                                  id={plan?.id}
                                  numberPaln={plan?.attributes?.name}
                                  planNumber={plan?.attributes?.records_count}
                                  planDate={moment(plan?.attributes?.updated_at).format(
                                    'DD/MM/YYYY'
                                  )}
                                  isEnabled={plan?.attributes?.is_enabled}
                                  setShow={setShow}
                                  numberType={plan?.attributes?.number_type}
                                  formik={formik}
                                />
                              ))}

                            {paginatedPlansTf?.data?.length > 0 &&
                              paginatedPlansTf?.meta?.pagination != null && (
                                <Pagination
                                  handlePagination={handlePagination}
                                  currentPage={paginatedPlansTf?.meta?.pagination?.current_page}
                                  totalPages={paginatedPlansTf?.meta?.pagination?.total_pages}
                                  count={paginatedPlansTf?.meta?.pagination?.per_page}
                                />
                              )}
                            {paginatedPlansTf?.data?.length === 0 && <NoMatchingRecords />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddNumberingPlan
        show={show?.isVisible && show?.type === 'add-numbering-plan'}
        onClose={() => {
          formik.resetForm();
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        dataSubmitting={dataSubmitting}
      />

      <EditNumberingPlan
        show={show?.isVisible && show?.type === 'edit-numbering-plan'}
        onClose={() => {
          formik.resetForm();
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        planDetails={show?.planDetails}
        dataSubmitting={dataSubmitting}
      />

      <Delete
        heading="Delete plan"
        part1="This action will Delete the number plan "
        part2={show?.numberPaln?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-numbering-plan'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deletePlan}
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
    </Layout>
  );
}

export default VendorDidPlan;
