import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import AccountDueList from '../components/AccountDueList';
import AddTransactionModal from '../components/Modals/AddTransactionModal';
import DeleteAccountDetailsModal from '../components/Modals/DeleteAccountDetailsModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import {
  CreateCarrierGroupUsage,
  DeleteCarrierGroupUsage,
  ListPaginatedCarrierGroupsUsage,
} from '../../../common/api-collection/Telephony/CarrierGroupsUsage';
import Pagination from '../components/pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import { GetCarrierGroup } from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import ToastError from '../../../common/components/toast/ToastError';
import '../../../styles/formvalidation.css';
import EditTransactionModal from '../components/Modals/EditTransactionModal';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';

function VendorAccountDue() {
  const params = useParams();

  const [page, setPage] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [show, setShow] = useState({ isVisible: false, type: ' ' });
  const [paginatedUsageData, setPaginatedUsageData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [carrierGroupDetails, setCarrierGroupDetails] = useState();

  const [loading, setLoading] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [refresh, setRefresh] = useState(false);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const validate = (data) => {
    const errors = {};

    if (!data.amountPaid) {
      errors.amountPaid = 'Carrier name is required';
    }

    if (!data.totalTaxPaid) {
      errors.totalTaxPaid = 'Carrier name is required';
    }

    if (!data.paymentMethod) {
      errors.paymentMethod = 'Carrier name is required';
    }

    if (!data.transRefNo) {
      errors.transRefNo = 'Carrier name is required';
    }
    if (!data.description) {
      errors.description = 'description is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amountPaid: '',
      totalTaxPaid: '',
      paymentMethod: '',
      transRefNo: '',
      reciptUrl: '',
      description: '',
    },
    validate,
    onSubmit: () => {
      setLoading(true);
      if (show?.type === 'add-transaction') {
        // CreateCarrierGroupUsage
        const data = {
          type: 'telephony_vendor_carrier_group_usages',
          attributes: {
            // carrier_id: 2,
            carrier_group_id: params?.groupId,
            type: 'payment',
            description: formik.values.description,
            payment_method: formik.values.paymentMethod, //
            transaction_reference_no: 'hftgr43657546', //
            amount: formik.values.amountPaid,
            tax_amount: formik.values.totalTaxPaid,
            carrier_group_usage_image: '{{recent_momentary_file}}', //
          },
        };

        CreateCarrierGroupUsage(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Transaction added successfully',
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
                message: error?.response?.data?.error?.message
                  ? error?.response?.data?.error?.message
                  : 'Something went wrong!',
              });
            }
          })
          .finally(() => {
            setLoading(false);
            setShow({ isVisible: false, type: '' });
            formik.resetForm();
          });
      }
    },
  });

  const handleDelete = () => {
    setLoading(true);

    DeleteCarrierGroupUsage(show?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Carrier deleted successfully',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while deleting policy!',
        });
      })
      .finally(() => {
        setLoading(false);
        setShow({ isVisible: false, type: '' });
      });
  };

  const handleFileInputChange = (event) => {
    const formData = new FormData();
    formData.append('upload_file', event.target.files[0]);
    MomentaryFileUpload(formData).then((response) => {
      formik.setFieldValue('reciptUrl', response?.data?.data?.attributes?.storage_name);
    });
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const imageSr = e.target.result;
    //   setImageSrc(imageSr);
    // };
    // reader.readAsDataURL(file);
  };

  useEffect(() => {
    setPaginatedUsageData({ isLoading: true });
    ListPaginatedCarrierGroupsUsage(searchTerm, page, '', '', params?.groupId)?.then((response) => {
      setPaginatedUsageData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [page, searchTerm, refresh]);

  useEffect(() => {
    GetCarrierGroup(params?.groupId)?.then((response) => {
      setCarrierGroupDetails(response?.data);
    });
  }, []);

  return (
    <Layout
      title="Gsoft admin"
      headerTitle="Gsoft admin"
      favIcon="/assets/admin-logos.svg"
      active="/app/comm-telephony/vendor-account-due"
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a
                    href="/comm-telephony/vendor-plans-and-packges/"
                    className="d-flex justify-content-center"
                  >
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
                    </Link>{' '}
                    Vendor Plan & Packages
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block">
                    <div className="h-100 shadow-10 rounded">
                      <div className="scroll-custom scroll-carrier pt-3">
                        <SideMenu active={0} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-2 align-items-center mb-3">
                        <h5 className="mb-0 fs-14px">
                          <a href="/comm-telephony/vendor-plans-and-packges/">Carrier Group</a> -
                          {carrierGroupDetails?.attributes?.name} / Carriers Usage
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search User"
                            searchTerm={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e?.target?.value);
                            }}
                            clearBtn={() => {
                              setSearchTerm('');
                            }}
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
                              <div className="d-flex flex-column">
                                <p className="mb-0">Type</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                >
                                  <option selected>All</option>
                                  <option value="1">Organization admin</option>
                                  <option value="2">Product admin</option>
                                  <option value="3">Agent</option>
                                  <option value="4">Supervisor</option>
                                </select>
                              </div>

                              <div className="d-flex flex-column mt-2">
                                <p className="mb-0">Carrier</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
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
                                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                                    onClick={() => {
                                      setIsFilterApplied(true);
                                    }}
                                  >
                                    Apply
                                  </button>
                                  <a
                                    href="/"
                                    type="button"
                                    id="roleCancel"
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
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
                          <div id="selectedRole" className={isFilterApplied ? '' : 'd-none'}>
                            <a
                              href="/#"
                              className="p-10px rounded text-blue-active border border-blue-active position-relative"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsFilterApplied(false);
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
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end  gap-3">
                          <a
                            href="/#"
                            // data-bs-toggle="modal"
                            // data-bs-target="#newTransactionModal"
                            id="newTransaction"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px newCarrier"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-transaction' });
                            }}
                          >
                            Add Transaction
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

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Type</th>
                              <th scope="col">Carrier</th>
                              <th scope="col">Amount</th>

                              <th scope="col">Tax</th>
                              <th className="text-center" scope="col">
                                Receipt
                              </th>
                              <th className="text-center" scope="col">
                                Description
                              </th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {/* Data Table Loader start  */}
                            {paginatedUsageData?.isLoading && (
                              <tr>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <SpinningLoader />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                              </tr>
                            )}
                            {/* Data Table Loader end  */}

                            {paginatedUsageData?.data?.length > 0 &&
                              paginatedUsageData?.data?.map((usage) => (
                                <AccountDueList
                                  id={usage?.id}
                                  date={moment(usage?.attributes?.created_at)?.format(
                                    'DD-MM-YYYY hh:mm A'
                                  )}
                                  type={usage?.attributes?.payment_method}
                                  carrier="--"
                                  amount={`$ ${parseFloat(usage?.attributes?.amount, 10)?.toFixed(
                                    2
                                  )}`}
                                  tax={`$ ${parseFloat(usage?.attributes?.tax_amount, 10)?.toFixed(
                                    2
                                  )}`}
                                  receipt="d-none"
                                  description={usage?.attributes?.description}
                                  setShow={setShow}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {paginatedUsageData?.meta?.pagination && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedUsageData?.meta?.pagination?.current_page}
                          totalPages={paginatedUsageData?.meta?.pagination?.total_pages}
                          count={paginatedUsageData?.meta?.pagination?.per_page}
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

      <AddTransactionModal
        show={show?.isVisible && show?.type === 'add-transaction'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        carrierGroupName={carrierGroupDetails?.attributes?.name}
        formik={formik}
        handleFileInputChange={handleFileInputChange}
        loading={loading}
      />

      <EditTransactionModal
        show={show?.isVisible && show?.type === 'edit-transaction'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
      />

      <DeleteAccountDetailsModal
        show={show?.isVisible && show?.type === 'delete-account-details'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        handleDelete={handleDelete}
        loading={loading}
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

export default VendorAccountDue;
