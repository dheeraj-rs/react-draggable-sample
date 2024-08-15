/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import normalize from 'json-api-normalizer';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VendorLotList from '../components/VendorLotList';
import Pagination from '../components/pagination/Pagination';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import Delete from '../components/Delete';
import ToastError from '../../../common/components/toast/ToastError';
import {
  BulkDeleteLots,
  CSVExportLots,
  DeleteLot,
  DisableLot,
  EnableLot,
  ListPaginatedVendorLots,
} from '../../../common/api-collection/Telephony/Lots';
import { ListAllBatches } from '../../../common/api-collection/Telephony/Batches';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import CommonModal from '../../../common/components/modals/CommonModal';

function VendorLot() {
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [selectedItemsForBulkAction, setSselectedItemsForBulkAction] = useState([]);

  const [page, setPage] = useState();

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [batches, setBatches] = useState([]);
  const [isAllLotsSelected, setIssAllLotsSelected] = useState(false);

  const [paginatedLots, setPaginatedLots] = useState({
    data: undefined,
    links: {},
    meta: {},
    isLoading: false,
  });

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [normalizedData, setNormalizedData] = useState();

  const [filter, setFilter] = useState({
    batchId: '',
    isEnable: '',
  });

  const [activeFilter, setActiveFilter] = useState({
    batchId: '',
    isEnable: '',
  });

  const deleteLot = () => {
    setIsLoading(true);
    DeleteLot(show?.lot.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Deleted : You have successfully deleted the Lot',
          type: 'success',
        });
        setShow({ isVisible: false, type: 'delete-lot' });
        setRefresh(!refresh);
      })
      ?.catch((error) => {
        setShow({ isVisible: false, type: 'delete-lot' });
        if (error?.response?.status === 500) {
          setToastAction({
            isVisible: true,
            message: 'Something went wrong.',
            type: 'failed',
          });
        } else {
          setShow({ isVisible: false, type: 'delete-lot' });
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
        setShow({ isVisible: false, type: 'delete-lot' });
        setIsLoading(false);
      });
  };

  const listLots = () => {
    setPaginatedLots({ isLoading: true });
    ListPaginatedVendorLots(searchTerm, page, activeFilter?.batchId, activeFilter?.isEnable)?.then(
      (response) => {
        setNormalizedData(normalize(response));

        setPaginatedLots({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      }
    );
  };

  const changePlanStatus = () => {
    if (show?.type === 'enable-lot') {
      setIsLoading(true);
      EnableLot(show?.id)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Enabled.',
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
    } else if (show?.type === 'disable-lot') {
      setIsLoading(true);
      DisableLot(show?.id)
        ?.then(() => {
          setRefresh(!refresh);
          setToastAction({
            isVisible: true,
            message: 'Disabled.',
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

  const handleBulkSelection = (selectedLot) => {
    const existingItem = selectedItemsForBulkAction.find((lot) => lot?.id === selectedLot?.id);

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkAction.filter((lot) => lot?.id !== selectedLot?.id);
      setSselectedItemsForBulkAction(newArray);
    } else {
      // If the value is not present, add it
      setSselectedItemsForBulkAction([...selectedItemsForBulkAction, selectedLot]);
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
      setIsLoading(true);
      BulkDeleteLots(selectedItemsForBulkAction)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Batche deleted You have successfully deleted Batch',
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
              message: error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong!',
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
          setShow({ isVisible: false, type: '' });
          setSselectedItemsForBulkAction([]);
        });
    }
  };

  const handleBulkExport = (type) => {
    CSVExportLots(selectedItemsForBulkAction, type)
      .then((res) => {
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
      ?.finally(() => {
        setSselectedItemsForBulkAction([]);
      });
  };

  useEffect(() => {
    ListAllBatches()?.then((response) => {
      setBatches(response.data);
    });
  }, []);

  useEffect(() => {
    listLots();
  }, [refresh, page, searchTerm, activeFilter?.batchId, activeFilter?.isEnable]);

  useEffect(() => {
    if (isAllLotsSelected === true) {
      paginatedLots?.data?.map((lot) => {
        setSselectedItemsForBulkAction((prevArray) => [
          ...prevArray,
          {
            type: 'telephony_vendor_lots',
            id: parseInt(lot?.id, 10),
          },
        ]);
        return null;
      });
    }

    if (isAllLotsSelected === false) {
      setSselectedItemsForBulkAction([]);
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
                  <Link to="/comm-telephony/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
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
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block ">
                    <div className="h-100 shadow-10 rounded">
                      <div className="scroll-custom scroll-carrier pt-3">
                        <SideMenu active={3} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0 fs-14px fw-medium">Lot</h6>
                        <p className="mb-0">
                          <span className="fw-medium">{paginatedLots.data?.length}</span>
                          <span className="text-secondary">&nbsp;Lot available</span>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search Lot"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                            clearBtn={() => {
                              setSearchTerm('');
                            }}
                            searchTerm={searchTerm || ''}
                          />
                        </div>
                        <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
                          <div id="roleSelection" className={isFilterApplied ? 'd-none' : ''}>
                            <a
                              href="/#"
                              className="filter-btn p-10px fw-medium rounded border role-selection"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={(e) => e.preventDefault()}
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
                                <p className="mb-0">Batches</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    // setBatchFilter(e.target.value);
                                    setFilter({ ...filter, batchId: e.target.value });
                                  }}
                                  value={filter.batchId ? filter.batchId : 'all'}
                                >
                                  <option value="all">All</option>
                                  {batches?.map((batch) => (
                                    <option value={batch.id} key={batch.id}>
                                      {batch.attributes.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-3">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setFilter({ ...filter, isEnable: e.target.value });
                                  }}
                                  value={filter.isEnable ? filter.isEnable : ''}
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
                                      setActiveFilter(filter);
                                      setIsFilterApplied(true);
                                    }}
                                  >
                                    Apply
                                  </button>
                                  <a
                                    href="/#"
                                    type="button"
                                    id="roleCancel"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActiveFilter({ batchId: '', isEnable: '' });
                                      setFilter({ batchId: '', isEnable: '' });
                                    }}
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
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
                                setActiveFilter({ batchId: '', isEnable: '' });
                                setFilter({ batchId: '', isEnable: '' });
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
                            to="/comm-telephony/vendor-lot-new-lot/new"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px plan-btn-mob"
                          >
                            Add Lot
                          </Link>
                          <div className="dropdown">
                            <a
                              href="/#"
                              data-bs-toggle="dropdown"
                              onClick={(e) => e.preventDefault()}
                            >
                              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                <img src="/assets/dot-menu-black.svg" alt="# " />
                              </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                              <a
                                href="/#"
                                data-bs-toggle="dropdown"
                                onClick={(e) => e.preventDefault()}
                              >
                                {' '}
                              </a>
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleBulkExport();
                                  }}
                                >
                                  <img className="me-2" src="/assets/export-black.svg" alt="" />
                                  Export
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-2 px-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                      selectedItemsForBulkAction.some(
                                        (item) => item.carriersCount !== 0
                                      )
                                    ) {
                                      setShow({ isVisible: true, type: 'bulk-delete-group' });
                                    }
                                  }}
                                >
                                  <img src="/assets/Trash-img.svg" alt="" /> Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div />
                      </div>

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="check-box">
                                  <input
                                    type="checkbox"
                                    onChange={() => {}}
                                    checked={isAllLotsSelected}
                                  />
                                  <label
                                    className="text-primary mb-0"
                                    htmlFor="carrierName"
                                    onClick={() => {
                                      setIssAllLotsSelected(!isAllLotsSelected);
                                    }}
                                  >
                                    Lot name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Batch</th>
                              <th scope="col">Carrier</th>
                              <th scope="col">MRC/MRC(Inc)</th>
                              <th scope="col">DID/TF Plan</th>
                              <th scope="col">Type</th>
                              <th scope="col">DID/TF Count</th>
                              <th scope="col">Channels</th>
                              <th scope="col">Local switch</th>
                              <th className="text-center" scope="col">
                                Description
                              </th>
                              <th scope="col">Enable</th>
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
                            {/* Lot Component */}
                            {paginatedLots.data?.map((item) => (
                              <VendorLotList
                                key={item?.id}
                                lotId={item?.id}
                                carrier={
                                  normalizedData.batch[item?.relationships?.batch?.data.id]
                                    ?.attributes.carrierId
                                }
                                description={item?.attributes.description}
                                lotName={item?.attributes.name}
                                batch={
                                  normalizedData.batch[item?.relationships?.batch?.data.id]
                                    ?.attributes?.name
                                }
                                mrc={
                                  normalizedData.latestMonthlyRecurringCosts[
                                    item?.relationships.latestMonthlyRecurringCosts?.data[0]?.id
                                  ]?.attributes?.monthlyRecurringCost
                                }
                                mrcInc={
                                  normalizedData.latestMonthlyRecurringCosts[
                                    item?.relationships.latestMonthlyRecurringCosts?.data[0]?.id
                                  ]?.attributes?.monthlyFreeUsageAmount
                                }
                                tfPlan={
                                  normalizedData.numberPlan[item?.attributes?.number_plan_id]
                                    ?.attributes.name
                                }
                                type={
                                  normalizedData.numberPlan[item?.attributes?.number_plan_id]
                                    ?.attributes?.numberType
                                }
                                tfCount={
                                  Object.values(normalizedData.records || '')?.filter(
                                    (itm) =>
                                      itm.attributes.numberPlanId ===
                                      item?.attributes?.number_plan_id
                                  )?.length
                                }
                                channel={
                                  normalizedData.latestMonthlyRecurringCosts[
                                    item?.relationships.latestMonthlyRecurringCosts?.data[0]?.id
                                  ]?.attributes?.channelCount
                                }
                                switchList={item?.relationships?.switches?.data[0]?.id}
                                totalSwitchCount={item?.relationships?.switches?.data?.length}
                                title="description"
                                setShow={setShow}
                                normalizedData={normalizedData}
                                isEnabled={item?.attributes?.is_enabled}
                                handleBulkSelection={handleBulkSelection}
                                selectedItemsForBulkAction={selectedItemsForBulkAction}
                              />
                            ))}
                          </tbody>
                        </table>
                        {paginatedLots?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {paginatedLots?.meta?.pagination != null && (
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
      </div>{' '}
      <Delete
        heading="Delete Lot"
        part1="This action will Delete the lot"
        part2={show?.lot?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-lot'}
        dataSubmitting={false}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteLot}
        switchName={show?.switch?.name}
      />
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="smsSendButtonMsg"
          onClose={() => {
            setToastAction({ isVisible: false });
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
      <CommonModal
        isVisible={show?.isVisible && (show?.type === 'enable-lot' || show?.type === 'disable-lot')}
        title={show?.type === 'enable-lot' ? ' Enable Lot' : ' Disable Lot'}
        actionType={show?.key}
        text=" rate sheet."
        label={`To confirm this action please type “${show?.key}”`}
        btnLabel={show?.key}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey={show?.key}
        isProcessing={isLoading}
        handleAction={changePlanStatus}
      />
      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-group'}
        title="Delete Lots"
        actionType="Delete "
        text="the selected Lots's."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={isLoading}
        handleAction={() => {
          bulkDeleteCarrierGroups();
        }}
      />
    </Layout>
  );
}

export default VendorLot;
