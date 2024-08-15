/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import normalize from 'json-api-normalizer';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VendorBatchLotList from '../components/VendorBatchLotList';
import Pagination from '../components/pagination/Pagination';
import {
  BulkDeleteLots,
  CSVExportLots,
  DeleteLot,
  ListPaginatedLots,
} from '../../../common/api-collection/Telephony/Lots';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import { GetBatch } from '../../../common/api-collection/Telephony/Batches';
import CommonModal from '../../../common/components/modals/CommonModal';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';

function VendorBatchLotDetails() {
  const params = useParams();

  const [batchDetails, setBatchDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [paginatedLotData, setPaginatedLotData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [normalizedData, setNormalizedData] = useState();

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [selectedItemsForBulkExport, setSelectedItemsForBulkExport] = useState([]);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = () => {
    setLoading(true);

    DeleteLot(show?.lotId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'lot deleted You have successfully deleted the lot',
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
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Something went wrong.',
            type: 'failed',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBulkExport = (data, type) => {
    CSVExportLots(data, type).then((res) => {
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Lots.csv'; // Set the desired file name
      // Trigger the click event to start the download
      a.click();
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    });
  };

  const handleBulkSelection = (selectedGroup) => {
    const existingItem = selectedItemsForBulkExport.find(
      (group) => group?.id === selectedGroup?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkExport.filter(
        (group) => group?.id !== selectedGroup?.id
      );
      setSelectedItemsForBulkExport(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkExport([...selectedItemsForBulkExport, selectedGroup]);
    }
  };

  const handleBulkDelete = () => {
    setLoading(true);
    if (selectedItemsForBulkExport?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Lot',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      BulkDeleteLots(selectedItemsForBulkExport)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'lot deleted You have successfully deleted the lot',
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
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong.',
              type: 'failed',
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setPaginatedLotData({
      isLoading: true,
    });
    ListPaginatedLots(searchTerm, params?.id, '', page)?.then((response) => {
      setPaginatedLotData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });

      setNormalizedData(normalize(response));
    });

    GetBatch(params?.id)?.then((response) => {
      setBatchDetails(response.data);
    });
  }, [page, searchTerm, refresh]);

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
                    </Link>
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
                          {batchDetails?.attributes?.name} / Lots
                        </h5>
                        <p className="mb-0">
                          <span className="text-primary fw-medium">
                            {paginatedLotData?.meta?.pagination?.total}{' '}
                          </span>
                          <span className="text-secondary">Lots are available</span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search Lot"
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
                                <p className="mb-0">Region</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  value={1}
                                  disabled
                                >
                                  <option value={1}>All</option>
                                  <option value="1">Organization admin</option>
                                  <option value="2">Product admin</option>
                                  <option value="3">Agent</option>
                                  <option value="4">Supervisor</option>
                                </select>
                              </div>
                              <div className="d-flex flex-column">
                                <p className="mb-0">carrier group</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  value={1}
                                  disabled
                                >
                                  <option value={1}>All</option>
                                  <option value="1">Active</option>
                                  <option value="2">Inactive</option>
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-2">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  value={1}
                                  disabled
                                >
                                  <option value={1}>All</option>
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
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 gap-3 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                          <Link
                            to={`/comm-telephony/vendor-batch-add-lot/${params?.id}`}
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px newCarrier plan-btn-mob"
                          >
                            Add Lot
                          </Link>

                          <div className="dropdown">
                            <a href="/#" data-bs-toggle="dropdown">
                              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                <img src="/assets/dot-menu-black.svg" alt="# " />
                              </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                              <a href="/#" data-bs-toggle="dropdown" />
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-4"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleBulkExport(selectedItemsForBulkExport, 'csv');
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
                                    handleBulkDelete(selectedItemsForBulkExport);
                                  }}
                                >
                                  <img className="me-2" src="/assets/export-black.svg" alt="" />
                                  Delete
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
                              <th scope="col">
                                <div className="check-box">
                                  <input
                                    type="checkbox"
                                    // id="carrierName"
                                  />
                                  <label className="text-primary mb-0" htmlFor="carrierName">
                                    Lot name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Carrier</th>
                              <th scope="col">MRC/MRC(Inc)</th>
                              <th scope="col">DID/TF Plan</th>
                              <th scope="col">DID/TF Count</th>
                              <th scope="col">Type</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {/* Data Table Loader start  */}
                            {paginatedLotData?.isLoading && (
                              <tr>
                                <td />
                                <td />
                                <td />
                                <td>
                                  <SpinningLoader />
                                </td>
                                <td />
                                <td />
                                <td />
                              </tr>
                            )}
                            {/* Data Table Loader end  */}

                            {paginatedLotData?.data?.length > 0 &&
                              paginatedLotData?.data?.map((lot, index) => (
                                <VendorBatchLotList
                                  lotId={lot?.id}
                                  batchId={lot?.attributes?.batch_id}
                                  key={index}
                                  carrierId="groupId001"
                                  lotName={lot?.attributes?.name}
                                  carrier={
                                    normalizedData?.carrier[
                                      normalizedData?.batch[lot?.attributes?.batch_id]?.attributes
                                        ?.carrierId
                                    ]?.attributes?.name
                                  }
                                  mrc={
                                    normalizedData?.latestMonthlyRecurringCosts[
                                      lot?.relationships?.latestMonthlyRecurringCosts?.data[0]?.id
                                    ]?.attributes?.monthlyRecurringCost
                                  }
                                  mrcInc={
                                    normalizedData?.latestMonthlyRecurringCosts[
                                      lot?.relationships?.latestMonthlyRecurringCosts?.data[0]?.id
                                    ]?.attributes?.monthlyFreeUsageAmount
                                  }
                                  didPlan={
                                    normalizedData?.numberPlan[
                                      lot?.relationships?.numberPlan?.data?.id
                                    ]?.attributes?.name
                                  }
                                  didCount={
                                    Object.values(normalizedData.records || '')?.filter(
                                      (itm) =>
                                        itm.attributes.numberPlanId ===
                                        lot?.attributes?.number_plan_id
                                    )?.length
                                  }
                                  type={
                                    normalizedData?.numberPlan[
                                      lot?.relationships?.numberPlan?.data?.id
                                    ]?.attributes?.numberType
                                  }
                                  setShow={setShow}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkExport={selectedItemsForBulkExport}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {/* <!-- pagination --> */}
                      {paginatedLotData?.meta?.pagination && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedLotData?.meta?.pagination?.current_page}
                          totalPages={paginatedLotData?.meta?.pagination?.total_pages}
                          count={paginatedLotData?.meta?.pagination?.per_page}
                        />
                      )}
                    </div>
                    {/* <!-- pagination end --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'delete-lot'}
        title="Delete Lot"
        actionType="Delete "
        text={`the Lot ${show?.lotName} from the list .`}
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={loading}
        handleAction={() => {
          handleDelete();
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
    </Layout>
  );
}

export default VendorBatchLotDetails;
