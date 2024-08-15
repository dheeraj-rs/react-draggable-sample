import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import normalize from 'json-api-normalizer';
import moment from 'moment';

import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VendorBatchMRCList from '../components/VendorBatchMRCList';
import Layout from '../../../common/layout';
import VendorViewAddNewCarrierModal from '../components/Modals/VendorViewAddNewCarrierModal';
import Delete from '../components/Delete';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import {
  BulkDeleteLots,
  CSVExportLots,
  ListPaginatedVendorLots,
} from '../../../common/api-collection/Telephony/Lots';
import Pagination from '../components/pagination/Pagination';
import { GetBatch } from '../../../common/api-collection/Telephony/Batches';
import CommonModal from '../../../common/components/modals/CommonModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VendorBatchMRCDetails() {
  const temp = [];

  const params = useParams();

  const [page, setPage] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [show, setShow] = useState({ isVisible: false, type: ' ' });
  const [normalizedData, setNormalizedData] = useState();
  const [batchDetails, setBatchDetails] = useState();
  const [selectedItemsForBulkAction, setSelectedItemsForBulkAction] = useState([]);
  const [isAllLotsSelected, setIsAllLotsSelected] = useState(false);
  const [allAvilableLots, setAllAvilableLots] = useState({});
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [refresh, setRefresh] = useState(false);
  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [paginatedLots, setPaginatedLots] = useState({
    data: [],
    links: {},
    meta: {},
    isLoading: false,
  });

  const [filter, setFilter] = useState({
    isEnable: '',
  });

  const [activeFilter, setActiveFilter] = useState({
    isEnable: '',
  });

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const validate = (data) => {
    const errors = {};

    if (!data.carrierName) {
      errors.carrierName = 'Carrier name is required';
    }

    return errors;
  };

  const handleBulkSelection = (selectedLot) => {
    const existingItem = selectedItemsForBulkAction.find(
      (carrier) => carrier?.id === selectedLot?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkAction.filter(
        (carrier) => carrier?.id !== selectedLot?.id
      );
      setSelectedItemsForBulkAction(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkAction([...selectedItemsForBulkAction, selectedLot]);
    }
  };

  const bulkDeleteCarrierGroups = () => {
    if (selectedItemsForBulkAction?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Lot',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setDataSubmitting(true);
      BulkDeleteLots(selectedItemsForBulkAction)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: "Lots's deleted You have successfully deleted Lots's",
            type: 'success',
          });
          setShow({ isVisible: false, type: '' });
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
              type: 'failed',
              message: error?.response?.data?.error?.message
                ? error?.response?.data?.error?.message
                : 'Something went wrong!',
            });
          }
        })
        .finally(() => {
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
          setSelectedItemsForBulkAction([]);
          setIsAllLotsSelected(false);
        });
    }
  };

  const handleBulkExport = (type) => {
    if (selectedItemsForBulkAction?.length > 0) {
      CSVExportLots(selectedItemsForBulkAction, type).then((res) => {
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lots.csv'; // Set the desired file name
        // Trigger the click event to start the download
        a.click();
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
        setSelectedItemsForBulkAction([]);
        setIsAllLotsSelected(false);
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      carrierName: '',
    },
    validate,
    onSubmit: () => {},
  });

  useEffect(() => {
    setPaginatedLots({
      isLoading: true,
    });
    setPaginatedLots({ isLoading: true });
    ListPaginatedVendorLots(searchTerm, page, params?.batchId, activeFilter?.isEnable)?.then(
      (response) => {
        response?.data?.map((lot) => {
          temp.push({ id: parseInt(lot?.id, 10), type: 'telephony_vendor_lots' });
          return null;
        });

        setAllAvilableLots(temp);
        setNormalizedData(normalize(response));

        setPaginatedLots({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      }
    );
  }, [page, searchTerm, refresh, activeFilter?.isEnable]);

  useEffect(() => {
    GetBatch(params?.batchId)?.then((response) => {
      setBatchDetails(response?.data);
    });
  }, []);

  useEffect(() => {
    if (isAllLotsSelected) {
      setSelectedItemsForBulkAction(allAvilableLots);
    } else {
      setSelectedItemsForBulkAction([]);
    }
  }, [isAllLotsSelected]);

  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a href="/comm-telephony/vendor-batch" className="d-flex justify-content-center">
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
                    Vendor Operations
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block">
                    <div className="h-100 shadow-10 rounded">
                      <div className="scroll-custom scroll-carrier pt-3">
                        <SideMenu active={2} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h5 className="mb-0 fs-14px fw-bold">
                          <a href="/comm-telephony/vendor-batch/">Batch</a> -{' '}
                          {batchDetails?.attributes?.name} / MRC Details
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search"
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
                              <div className="d-flex flex-column mt-2">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setFilter({ isEnable: e.target.value });
                                  }}
                                  value={filter?.isEnable || ''}
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
                                      setActiveFilter({ isEnable: filter?.isEnable });
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
                                      setActiveFilter({ isEnable: '' });
                                      setFilter({ isEnable: '' });
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
                                setFilter({ isEnable: '' });
                                setActiveFilter({ isEnable: '' });
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
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end gap-3">
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
                                    handleBulkExport('csv');
                                  }}
                                >
                                  <img className="me-2" src="/assets/export-black.svg" alt="" />
                                  Export
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-4"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'bulk-delete-lots' });
                                  }}
                                >
                                  <img src="/assets/Trash-img.svg" alt="" /> Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mb-0 d-flex p-2 rounded align-items-center bg-pattens-blue justify-content-between d-none">
                        <div>
                          <p className="mb-0">
                            <span className="text-secondary">Total Lot MRC/MRC(Inc):</span>
                            <span className="fw-medium text-primary">5000/3500</span>
                          </p>
                        </div>
                        <div>
                          <select
                            className="form-control form-select border-0 bg-white"
                            id="update"
                          >
                            <option>Update_05/05/2023</option>
                            <option>Update_05/05/2023</option>
                            <option>Update_05/04/2023</option>
                            <option>Update_05/05/2023</option>
                          </select>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="check-box">
                                  <input
                                    type="checkbox"
                                    //  id="carrierName"
                                    checked={isAllLotsSelected}
                                  />
                                  <label
                                    className="text-primary mb-0"
                                    htmlFor="carrierName"
                                    onClick={() => {
                                      setIsAllLotsSelected(!isAllLotsSelected);
                                    }}
                                  >
                                    Lot
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Lot MRC</th>
                              <th scope="col">Lot MRC(Inc)</th>
                              <th scope="col">Last Updated</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {/* Data Table Loader start  */}
                            {paginatedLots?.isLoading && (
                              <tr>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box">
                                    <SpinningLoader />
                                  </div>
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

                            {paginatedLots.data?.map((item) => (
                              <VendorBatchMRCList
                                key={item?.id}
                                lotName={item?.attributes?.name}
                                lotId={item?.id}
                                mrc={
                                  normalizedData?.latestMonthlyRecurringCosts[
                                    item?.relationships?.latestMonthlyRecurringCosts?.data[0]?.id
                                  ]?.attributes?.monthlyRecurringCost
                                }
                                mrcInc={
                                  normalizedData?.latestMonthlyRecurringCosts[
                                    item?.relationships?.latestMonthlyRecurringCosts?.data[0]?.id
                                  ]?.attributes?.monthlyRecurringCost
                                }
                                updateDate={moment(item?.attributes?.updated_at)?.format(
                                  'DD/MM/YYYY hh:mm A'
                                )}
                                setShow={setShow}
                                handleBulkSelection={handleBulkSelection}
                                selectedItemsForBulkAction={selectedItemsForBulkAction}
                              />
                            ))}
                          </tbody>
                        </table>
                        {paginatedLots?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {/* <!-- pagination --> */}
                      {paginatedLots?.meta?.pagination && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedLots?.meta?.pagination?.current_page}
                          totalPages={paginatedLots?.meta?.pagination?.total_pages}
                          count={paginatedLots?.meta?.pagination?.per_page}
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

      <VendorViewAddNewCarrierModal
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        show={show?.isVisible && show?.type === 'new-carrier-modal'}
        formik={formik}
      />

      <Delete
        heading="Delete Batch"
        part1="This action will Delete the Batch  "
        part2={show?.batch?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-batch'}
        dataSubmitting={false}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={() => {}}
      />

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-lots'}
        title="Delete Lots"
        actionType="Delete "
        text="the selected Lots's."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={dataSubmitting}
        handleAction={() => {
          bulkDeleteCarrierGroups();
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
          <span>
            {toastAction?.statusCode === 500 ? 'something went wrong!' : toastAction?.message}
          </span>
        </ToastError>
      )}
    </Layout>
  );
}

export default VendorBatchMRCDetails;
