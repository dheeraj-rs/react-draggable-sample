import React, { useEffect, useState } from 'react';
import moment from 'moment';
import normalize from 'json-api-normalizer';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SideMenu from '../components/common/SideMenu';
import VendorPackageList from '../components/VendorPackageList';
import AddVendorPackage from '../components/AddVendorPackage';
import ConditionalBilling from '../components/ConditionalBilling';
import SlabBilling from '../components/SlabBilling';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import {
  CreateCarrierPackage,
  DeleteCarrierPackage,
  ListPaginatedCarrierPackages,
  UpdateCarrierPackage,
} from '../../../common/api-collection/Telephony/CarrierPackages';
import Pagination from '../components/pagination/Pagination';
import { ListAllCarrierPlans } from '../../../common/api-collection/Telephony/CarrierPlans';
import CommonModal from '../../../common/components/modals/CommonModal';
import Delete from '../components/Delete';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import ModalClose from '../../../common/components/modals/ModalClose';
import Modal from '../../../common/components/modals/Modal';

import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import CarrierPackageDetails from '../components/CarrierPackageDetails';

function VendorPackages() {
  const tempSlabBilling = [];
  const tempConditionBilling = [];

  const [show, setShow] = useState({ isVisible: false, type: ' ' });
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [searchTermIn, setSearchTermIn] = useState('');
  const [searchTermOut, setSearchTermOut] = useState('');

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [page, setPage] = useState();

  const [packageName, setPackageName] = useState('');

  const [billingMode, setBillingMode] = useState({ type: 'slab_billing' });

  const [paginatedPackagesData, setPaginatedPackagesData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [unPaginatedCarrierPlans, setUnPaginatedCarrierPlans] = useState([]);

  const [packageType, setPackageType] = useState('in');

  const [isFilterAppliedIn, setIsFilterAppliedIn] = useState(false);
  const [isFilterAppliedOut, setIsFilterAppliedOut] = useState(false);

  const [billingSlabs, setBillingSlabs] = useState({});
  const [billingConditions, setBillingConditions] = useState({});

  const [conditionalBillingElseCondition, setConditionalBillingElseCondition] = useState({});

  const [slabs, setSlabs] = useState([
    {
      id: 1,
      startMinute: 0,
      endMinute: -1,
      carrierPlan: 'select',
    },
  ]);
  const [conditions, setConditions] = useState([
    {
      id: 1,
      condition: 'select',
      conditionalMinute: '',
      startMinute: '',
      endMinute: '',
      carrierPlan: 'select',
    },
  ]);

  const [normalizedData, setNormalizedData] = useState([]);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const addVendorPackage = () => {
    setDataSubmitting(true);

    const data = {
      type: 'telephony_vendor_carrier_packages',
      attributes: {
        name: packageName,
        billing_mode: billingMode?.type,
        is_enabled: true,
        type: packageType === 'in' ? 'incoming' : 'outgoing',
      },
      relationships: {
        ...(billingSlabs?.length > 0 && {
          billing_slabs: {
            data: billingSlabs,
          },
        }),
        ...(billingConditions?.length > 0 && {
          billing_conditions: {
            data: billingConditions,
          },
        }),
      },
    };

    CreateCarrierPackage(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Condition Added : You have successfully added the condition.',
        });
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
            statusCode: error?.response.status,
          });
        }
      })
      .finally(() => {
        setBillingSlabs([]);
        setBillingConditions([]);
        setDataSubmitting(false);
        setPackageName('');
        setBillingMode({ type: 'slab_billing' });
        setSlabs([
          {
            id: 1,
            startMinute: 0,
            endMinute: -1,
            carrierPlan: 'select',
          },
        ]);
      });
  };

  const editVendorPackage = () => {
    setDataSubmitting(true);

    const data = {
      type: 'telephony_vendor_carrier_packages',
      id: parseInt(show?.id, 10),
      attributes: {
        name: packageName,
        billing_mode: billingMode?.type,
        is_enabled: true,
      },
    };

    UpdateCarrierPackage(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Condition Added : You have successfully added the condition.',
        });
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
            statusCode: error?.response.status,
          });
        }
      })
      .finally(() => {
        setDataSubmitting(false);
        setPackageName('');
        setBillingMode({ type: 'slab_billing' });
        setSlabs([
          {
            id: 1,
            startMinute: 0,
            endMinute: -1,
            carrierPlan: 'select',
          },
        ]);
      });
  };

  const handleBillingAction = () => {
    if (show?.attributes?.actionType === 'add-carrier-package') {
      addVendorPackage();
    }
    if (show?.attributes?.actionType === 'edit-carrier-package') {
      editVendorPackage();
    }
  };

  const changePackagStatus = () => {
    if (show?.type === 'enable-carrier-package') {
      const data = {
        type: 'telephony_vendor_carrier_packages',
        id: parseInt(show?.id, 10),
        attributes: {
          name: show?.packageName,
          billing_mode: show?.billingModeType,
          is_enabled: true,
        },
      };

      setDataSubmitting(true);
      UpdateCarrierPackage(data)
        ?.then(() => {
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
        ?.finally(() => {
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
        });
    } else if (show?.type === 'disable-carrier-package') {
      const data = {
        type: 'telephony_vendor_carrier_packages',
        id: parseInt(show?.id, 10),
        attributes: {
          name: show?.packageName,
          billing_mode: show?.billingModeType,
          is_enabled: false,
        },
      };

      setDataSubmitting(true);
      UpdateCarrierPackage(data)
        ?.then(() => {
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
        ?.finally(() => {
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const deleteCarrierPackage = () => {
    setDataSubmitting(true);

    DeleteCarrierPackage(show?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Deleted : You have successfully deleted the plan from the list',
          type: 'success',
        });
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
            message: error?.response?.data?.error?.message
              ? error?.response?.data?.error?.message
              : 'Something went wrong!',
          });
        }
      })
      .finally(() => {
        setShow({ isVisible: false, type: '' });
        setDataSubmitting(false);
      });
  };

  useEffect(() => {
    setPaginatedPackagesData({
      isLoading: true,
    });
    setNormalizedData([]);
    if (packageType === 'in') {
      ListPaginatedCarrierPackages(searchTermIn, page, 'incoming')?.then((response) => {
        setNormalizedData(normalize(response));
        setPaginatedPackagesData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      });
    }

    if (packageType === 'out') {
      ListPaginatedCarrierPackages(searchTermOut, page, 'outgoing')?.then((response) => {
        setNormalizedData(normalize(response));
        setPaginatedPackagesData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      });
    }
  }, [refresh, page, searchTermIn, searchTermOut, packageType]);

  useEffect(() => {
    ListAllCarrierPlans('', '')?.then((response) => {
      setUnPaginatedCarrierPlans(response?.data);
    });
  }, []);

  useEffect(() => {
    if (show?.type === 'edit-carrier-package') {
      setPackageName(show?.packageName);
      setBillingMode({ type: show?.billingModeType });
    }
  }, [show]);

  useEffect(() => {
    if (slabs?.length > 0 && billingMode?.type === 'slab_billing') {
      slabs?.map((slab) => {
        tempSlabBilling.push({
          type: 'telephony_vendor_carrier_package_slabs',
          id: slab?.id,
          attributes: {
            plan_id: parseInt(slab?.carrierPlan, 10),
            start_minute: slab?.startMinute,
            end_minute: slab?.endMinute,
          },
        });
        return null;
      });
      setBillingSlabs(tempSlabBilling);
    }

    if (conditions?.length > 0 && billingMode?.type === 'conditional_billing') {
      conditions?.map((condition) => {
        tempConditionBilling.push({
          type: 'telephony_vendor_carrier_package_conditions',
          id: condition?.id,
          attributes: {
            plan_id: parseInt(condition?.carrierPlan, 10),
            condition: condition?.condition,
            conditional_minute: condition?.conditionalMinute,
            start_minute: condition?.startMinute,
            end_minute: condition?.endMinute,
          },
        });
        return null;
      });
      setBillingConditions(tempConditionBilling);
    }
  }, [slabs, billingMode, conditions]);
  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
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
                    Vendor Operations
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block">
                    <div className="h-100 shadow-6 rounded">
                      <div className="scroll-custom scroll-carrier pt-2">
                        <SideMenu active={7} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0 fs-15px">Carrier Package</h6>
                        <p className="mb-0">
                          <span className="fw-medium">
                            {paginatedPackagesData?.meta?.pagination?.total > 0
                              ? paginatedPackagesData?.meta?.pagination?.total
                              : ''}
                          </span>{' '}
                          Packages available
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
                                setPackageType('in');
                              }}
                            >
                              Carrier Plan In Package
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
                                setPackageType('out');
                              }}
                            >
                              Carrier Plan Out Package
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
                              <div className="col-lg-4 col-sm-4 col-md-5 col-10">
                                <SearchWithBorder
                                  placeholderText="Search plan"
                                  onChange={(e) => {
                                    setSearchTermIn(e.target.value);
                                  }}
                                  clearBtn={() => {
                                    setSearchTermIn('');
                                  }}
                                  searchTerm={searchTermIn}
                                />
                              </div>
                              <div className="col-lg-4 col-sm-3 col-md-2 col-2 filter-col">
                                <div
                                  id="roleSelection"
                                  className={` ${isFilterAppliedIn ? 'd-none' : 'filter-wrap'}`}
                                >
                                  <a
                                    href="/#"
                                    className="filter-btn p-10px fw-medium rounded-3 border role-selection"
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
                                    <div className="d-flex flex-column">
                                      <p className="mb-0">Type</p>
                                      <select
                                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                        aria-label="Default select example"
                                        value="select"
                                      >
                                        <option value="select" disabled>
                                          All
                                        </option>
                                        <option value="1">Organization admin</option>
                                        <option value="2">Product admin</option>
                                        <option value="3">Agent</option>
                                        <option value="4">Supervisor</option>
                                      </select>
                                    </div>
                                    <div className="d-flex flex-column mt-3 filter-title">
                                      <p className="mb-0">Enabled/disabled</p>
                                      <select
                                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                        aria-label="Default select example"
                                        value="select"
                                        disabled
                                      >
                                        <option value="select">All</option>
                                        <option value="1">Active</option>
                                        <option value="2">Inactive</option>
                                      </select>

                                      <div className="setting-buttons d-flex align-items-end mt-4">
                                        <button
                                          id="applyBtn"
                                          type="button"
                                          className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                          onClick={() => {
                                            setIsFilterAppliedIn(true);
                                          }}
                                        >
                                          Apply
                                        </button>
                                        <a
                                          href="/#"
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
                                <div
                                  id="selectedRole"
                                  className={isFilterAppliedIn ? '' : 'd-none'}
                                >
                                  <a
                                    href="/#"
                                    className="p-10px rounded text-blue-active border border-blue-active position-relative"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsFilterAppliedIn(false);
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
                              <div className="col-lg-4 col-sm-5 col-12 mt-4 mt-sm-0 text-end d-flex gap-3 align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                                <a
                                  href="/#"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#newPackageModal"
                                  className="btn bg-black fw-medium fs-14px text-white px-3 py-12px plan-btn-mob px-sm-3 px-lg-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({
                                      id: null,
                                      attributes: {
                                        stage: 1,
                                        isVisible: true,
                                        billingModeType: null,
                                        actionType: 'add-carrier-package',
                                        packageName: null,
                                        type: 'in',
                                      },
                                    });
                                  }}
                                >
                                  Add Carrier Package
                                </a>
                                <div className="dropdown">
                                  <a href="/#" data-bs-toggle="dropdown">
                                    <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                      <img src="/assets/dot-menu-black.svg" alt="# " />
                                    </span>
                                  </a>
                                  <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group">
                                    <a href="/#" data-bs-toggle="dropdown">
                                      {' '}
                                    </a>
                                    <li>
                                      <a
                                        href="/#"
                                        className="dropdown-item py-2 px-3"
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                      >
                                        <img
                                          className="me-2"
                                          src="/assets/export-black.svg"
                                          alt=""
                                        />
                                        Export
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div />
                            </div>
                            {/* Data Table Loader start  */}
                            {paginatedPackagesData?.isLoading && (
                              <div className="row justify-content-center align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3  roles-box mx-1 flex-wrap">
                                <SpinningLoader />
                              </div>
                            )}
                            {/* Data Table Loader end  */}

                            {paginatedPackagesData?.data?.length === 0 && <NoMatchingRecords />}

                            {paginatedPackagesData?.data?.length > 0 &&
                              paginatedPackagesData?.data?.map((carrierPackage, index) => (
                                <VendorPackageList
                                  key={index}
                                  id={carrierPackage?.id}
                                  packageName={carrierPackage?.attributes?.name}
                                  billingMode={carrierPackage?.attributes?.billing_mode}
                                  lastUpdatedOn={moment(
                                    carrierPackage?.attributes?.created_at
                                  )?.format('DD/MM/YYYY')}
                                  enabled={carrierPackage?.attributes?.is_enabled}
                                  setShow={setShow}
                                  billingConditions={
                                    carrierPackage?.relationships?.billingConditions?.data
                                  }
                                  billingSlabs={carrierPackage?.relationships?.billingSlabs?.data}
                                />
                              ))}

                            {paginatedPackagesData?.meta?.pagination?.total > 0 && (
                              <Pagination
                                handlePagination={handlePaginationFunction}
                                currentPage={paginatedPackagesData?.meta?.pagination?.current_page}
                                totalPages={paginatedPackagesData?.meta?.pagination?.total_pages}
                                count={paginatedPackagesData?.meta?.pagination?.per_page}
                              />
                            )}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab-toll-free"
                            role="tabpanel"
                            aria-labelledby="toll-free-tab"
                          >
                            <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-3 mt-sm-4 mb-4 row">
                              <div className="col-lg-4 col-sm-4 col-md-5 col-10">
                                <SearchWithBorder
                                  placeholderText="Search plan"
                                  onChange={(e) => {
                                    setSearchTermOut(e.target.value);
                                  }}
                                  clearBtn={() => {
                                    setSearchTermOut('');
                                  }}
                                  searchTerm={searchTermOut}
                                />
                              </div>
                              <div className="col-lg-4 col-sm-3 col-md-2 col-2 filter-col">
                                <div
                                  id="roleSelection"
                                  className={`filter-wrap ${isFilterAppliedOut ? 'd-none' : ''}`}
                                >
                                  <a
                                    href="/#"
                                    className="filter-btn p-10px fw-medium rounded-3 border role-selection"
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
                                    <div className="d-flex flex-column">
                                      <p className="mb-0">Type</p>
                                      <select
                                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                        aria-label="Default select example"
                                        value="select"
                                        disabled
                                      >
                                        <option value="select">All</option>
                                        <option value="1">Organization admin</option>
                                        <option value="2">Product admin</option>
                                        <option value="3">Agent</option>
                                        <option value="4">Supervisor</option>
                                      </select>
                                    </div>
                                    <div className="d-flex flex-column mt-3 filter-title">
                                      <p className="mb-0">Enabled/disabled</p>
                                      <select
                                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                        aria-label="Default select example"
                                        value="select"
                                        disabled
                                      >
                                        <option value="select">All</option>
                                        <option value="1">Active</option>
                                        <option value="2">Inactive</option>
                                      </select>

                                      <div className="setting-buttons d-flex align-items-end mt-4">
                                        <button
                                          id="applyBtn"
                                          type="button"
                                          className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                          onClick={() => {
                                            setIsFilterAppliedOut(true);
                                          }}
                                        >
                                          Apply
                                        </button>
                                        <a
                                          href="/#"
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
                                <div
                                  id="selectedRole"
                                  className={isFilterAppliedOut ? '' : 'd-none'}
                                >
                                  <a
                                    href="/#"
                                    className="p-10px rounded text-blue-active border border-blue-active position-relative"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsFilterAppliedOut(false);
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
                              <div className="col-lg-4 col-sm-5 col-12 mt-4 mt-sm-0 text-end d-flex gap-3 align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                                <a
                                  href="/#"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#newPackageModal"
                                  className="btn bg-black fw-medium fs-14px text-white px-3 py-12px plan-btn-mob px-sm-3 px-lg-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({
                                      id: null,
                                      attributes: {
                                        stage: 1,
                                        isVisible: true,
                                        billingModeType: null,
                                        actionType: 'add-carrier-package',
                                        packageName: null,
                                        type: 'out',
                                      },
                                    });
                                  }}
                                >
                                  Add Carrier Package
                                </a>
                                <div className="dropdown">
                                  <a href="/#" data-bs-toggle="dropdown">
                                    <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                      <img src="/assets/dot-menu-black.svg" alt="# " />
                                    </span>
                                  </a>
                                  <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                                    <a href="/#" data-bs-toggle="dropdown">
                                      {' '}
                                    </a>
                                    <li>
                                      <a
                                        href="/#"
                                        className="dropdown-item py-3 px-4"
                                        onClick={(e) => {
                                          e.preventDefault();
                                        }}
                                      >
                                        <img
                                          className="me-2"
                                          src="/assets/export-black.svg"
                                          alt=""
                                        />
                                        Export
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div />
                            </div>
                            {/* Data Table Loader start  */}
                            {paginatedPackagesData?.isLoading && (
                              <div className="row justify-content-center align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3  roles-box mx-1 flex-wrap">
                                <SpinningLoader />
                              </div>
                            )}
                            {/* Data Table Loader end  */}

                            {paginatedPackagesData?.data?.length === 0 && <NoMatchingRecords />}

                            {paginatedPackagesData?.data?.length > 0 &&
                              paginatedPackagesData?.data?.map((carrierPackage, index) => (
                                <VendorPackageList
                                  key={index}
                                  id={carrierPackage?.id}
                                  packageName={carrierPackage?.attributes?.name}
                                  billingMode={carrierPackage?.attributes?.billing_mode}
                                  lastUpdatedOn={moment(
                                    carrierPackage?.attributes?.created_at
                                  )?.format('DD/MM/YYYY')}
                                  enabled={carrierPackage?.attributes?.is_enabled}
                                  setShow={setShow}
                                  billingConditions={
                                    carrierPackage?.relationships?.billingConditions?.data
                                  }
                                  billingSlabs={carrierPackage?.relationships?.billingSlabs?.data}
                                />
                              ))}
                            {/* <!-- pagination --> */}
                            {paginatedPackagesData?.meta?.pagination?.total > 0 && (
                              <Pagination
                                handlePagination={handlePaginationFunction}
                                currentPage={paginatedPackagesData?.meta?.pagination?.current_page}
                                totalPages={paginatedPackagesData?.meta?.pagination?.total_pages}
                                count={paginatedPackagesData?.meta?.pagination?.per_page}
                              />
                            )}
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

        <Modal width="429px" id="changeBillingMode">
          <div className="d-flex justify-content-between">
            <p className="fs-14px text-primary fw-medium mb-24px">Change billing mode</p>
            <ModalClose />
          </div>
          <p className="fs-12px text-primary">This action will update the billing mode</p>
          <div className="d-flex rounded p-23px bg-aqua-squeeze">
            <div>
              <img src="/assets/info-blue.svg" alt="" />
            </div>
            <div>
              <p className="mb-0 text-mariner ps-3">
                Once make these change previously applied changes will be lost.
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-start mt-5">
            <a
              href="/#"
              data-bs-toggle="modal"
              data-bs-target="#conditionBillingModal"
              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
            >
              Save
            </a>
            <ButtonWhiteModalCancel text="Cancel" />
          </div>
        </Modal>
      </div>

      <AddVendorPackage
        details={show}
        show={
          show?.attributes?.isVisible &&
          (show?.attributes?.actionType === 'add-carrier-package' ||
            show?.attributes?.actionType === 'edit-carrier-package') &&
          show?.attributes?.stage === 1
        }
        onClose={() => {
          setShow({ isVisible: false, type: '' });
          setPackageName('');
        }}
        setShow={setShow}
        packageName={packageName}
        setPackageName={setPackageName}
        billingMode={billingMode}
        setBillingMode={setBillingMode}
      />

      <ConditionalBilling
        details={show}
        show={
          show?.attributes?.isVisible &&
          show?.attributes?.billingModeType === 'conditional_billing' &&
          show?.attributes?.stage === 2
        }
        onClose={() => {
          setPackageName('');
          setShow({ isVisible: false, type: '' });
        }}
        setShow={setShow}
        action={() => {
          handleBillingAction();
        }}
        unPaginatedCarrierPlans={unPaginatedCarrierPlans}
        isLoading={dataSubmitting}
        billingMode={billingMode?.type}
        conditions={conditions}
        setConditions={setConditions}
        conditionalBillingElseCondition={conditionalBillingElseCondition}
        setConditionalBillingElseCondition={setConditionalBillingElseCondition}
      />

      <SlabBilling
        details={show}
        show={
          show?.attributes?.isVisible &&
          show?.attributes?.billingModeType === 'slab_billing' &&
          show?.attributes?.stage === 2
        }
        onClose={() => {
          setPackageName('');
          setShow({ isVisible: false, type: '' });
        }}
        setShow={setShow}
        action={() => {
          handleBillingAction();
        }}
        unPaginatedCarrierPlans={unPaginatedCarrierPlans}
        isLoading={dataSubmitting}
        billingMode={billingMode?.type}
        setPackageName={setPackageName}
        setSlabs={setSlabs}
        slabs={slabs}
      />

      <CommonModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'enable-carrier-package' || show?.type === 'disable-carrier-package')
        }
        title={
          show?.type === 'enable-carrier-package'
            ? ' Enable Carrier package'
            : ' Disable Carrier package'
        }
        actionType={show?.key}
        text=" the carrier package."
        label={`To confirm this action please type “${show?.key}”`}
        btnLabel={show?.key}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey={show?.key}
        isProcessing={dataSubmitting}
        handleAction={changePackagStatus}
      />

      <Delete
        heading="Delete carrier package"
        part1="This action will Delete the carrier package "
        part2={show?.packageName}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-carrier-package'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteCarrierPackage}
        loading={dataSubmitting}
      />

      <CarrierPackageDetails
        show={show?.isVisible && show?.type === 'carrier-package-details'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        setShow={setShow}
        data={show?.data}
        billingDetails={
          show?.data?.billingMode === 'slab_billing'
            ? normalizedData?.billingSlabs
            : normalizedData?.billingConditions
        }
        unPaginatedCarrierPlans={unPaginatedCarrierPlans}
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

export default VendorPackages;
