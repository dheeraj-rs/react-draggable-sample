import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import normalize from 'json-api-normalizer';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import VendorBatchList from '../components/VendorBatchList';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import AddNewBatchModal from '../../../common/components/common/AddNewBatchModal';
import EditBatchModal from '../../../common/components/common/EditBatchModal';
import BatchDetails from '../../../common/components/common/BatchDetails';
import {
  BulkDeleteBatch,
  CSVExportBatchesAll,
  CSVExportBatchesSelected,
  CreateBatch,
  DeleteBatch,
  ListPaginatedVendorBatches,
  UpdateBatch,
} from '../../../common/api-collection/Telephony/Batches';
import { ListAllCarriers } from '../../../common/api-collection/Telephony/VendorCarriers';
import { ListPaginatedCarrierPackages } from '../../../common/api-collection/Telephony/CarrierPackages';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import Pagination from '../components/pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import CommonModal from '../../../common/components/modals/CommonModal';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import { ListAllLots } from '../../../common/api-collection/Telephony/Lots';

function VendorBatch() {
  const temp = [];

  const [show, setShow] = useState({ isVisible: false, type: ' ' });
  const [unPaginatedCarriersList, setUnPaginatedCarriersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemsForBulkDelete, setSelectedItemsForBulkDelete] = useState([]);
  const [allLotsSelected, setAllLotsSelected] = useState(false);

  const [paginatedBatches, setPaginatedBatches] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [normalizedBatchList, setNormalizedBatchList] = useState();

  const [unPaginatedCarrierPackages, setUnPaginatedCarrierPackages] = useState([]);

  const [unPaginatedLots, setUnPaginatedLots] = useState([]);

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState();
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleBulkSelection = (selectedCarrier) => {
    const existingItem = selectedItemsForBulkDelete.find(
      (carrier) => carrier?.id === selectedCarrier?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkDelete.filter(
        (carrier) => carrier?.id !== selectedCarrier?.id
      );
      setSelectedItemsForBulkDelete(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkDelete([...selectedItemsForBulkDelete, selectedCarrier]);
    }
  };

  const bulkDeleteCarrierGroups = () => {
    if (selectedItemsForBulkDelete?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Batch',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setIsLoading(true);
      BulkDeleteBatch(selectedItemsForBulkDelete)
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
          setSelectedItemsForBulkDelete([]);
        });
    }
  };

  const deleteBatch = () => {
    setIsLoading(true);

    DeleteBatch(show?.selectedBatchForDelete?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'batch deleted You have successfully deleted the batch',
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
        setIsLoading(false);
      });
  };

  const handleBulkExport = (type) => {
    if (selectedItemsForBulkDelete?.length > 0) {
      CSVExportBatchesSelected(selectedItemsForBulkDelete, type).then((res) => {
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'batch.csv'; // Set the desired file name
        // Trigger the click event to start the download
        a.click();
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      });
    } else {
      CSVExportBatchesAll([], type).then((res) => {
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'batch.csv'; // Set the desired file name
        // Trigger the click event to start the download
        a.click();
        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      });
    }
  };

  const validate = (data) => {
    const errors = {};

    if (!data.batchName) {
      errors.batchName = 'bath name is required';
    }
    if (!data.carrier) {
      errors.carrier = 'carrier is required';
    }
    if (!data.carrierPlanInPackage.name) {
      errors.carrierPlanInPackage = 'package is required';
    }

    if (!data.carrierPlanOutPackage.name) {
      errors.carrierPlanOutPackage = 'package is required';
    }
    if (!data.batchDescription) {
      errors.batchDescription = 'bath description is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      batchName: '',
      carrier: '',
      lots: [],
      carrierPlanInPackage: { id: '', name: '' },
      carrierPlanOutPackage: { id: '', name: '' },
      batchDescription: '',
    },
    validate,
    onSubmit: () => {
      if (show?.type === 'add-batch') {
        setIsLoading(true);
        const data = {
          type: 'telephony_vendor_batches',
          attributes: {
            carrier_id: formik?.values?.carrier,
            inward_carrier_package_id: formik?.values?.carrierPlanInPackage?.id,
            outward_carrier_package_id: formik?.values?.carrierPlanOutPackage?.id,
            name: formik?.values?.batchName,
            description: formik?.values?.batchDescription,
          },
          relationships: {
            lots: {
              data: formik?.values?.lots,
            },
          },
        };

        CreateBatch(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Batch has been created successfully',
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
      } else if (show?.type === 'edit-batch') {
        setIsLoading(true);
        const data = {
          type: 'telephony_vendor_batches',
          id: parseInt(show?.batchId, 10),
          attributes: {
            carrier_id: formik?.values?.carrier,
            inward_carrier_package_id: formik?.values?.carrierPlanInPackage?.id,
            outward_carrier_package_id: formik?.values?.carrierPlanOutPackage?.id,
            name: formik?.values?.batchName,
            description: formik?.values?.batchDescription,
          },
          relationships: {
            lots: {
              data: formik?.values?.lots,
            },
          },
        };
        UpdateBatch(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'You have successfully saved the changes',
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
      }
    },
  });

  useEffect(() => {
    ListAllCarriers()?.then((response) => {
      setUnPaginatedCarriersList(response?.data);
    });

    ListPaginatedCarrierPackages()?.then((response) => {
      setUnPaginatedCarrierPackages(response?.data);
    });

    ListAllLots()?.then((response) => {
      setUnPaginatedLots(response?.data);
    });
  }, []);

  useEffect(() => {
    setPaginatedBatches({ isLoading: true });
    ListPaginatedVendorBatches(searchTerm, page)?.then((response) => {
      const normalizedData = normalize(response);
      setNormalizedBatchList(normalizedData);
      setPaginatedBatches({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm]);

  useEffect(() => {
    if (isAllSelected) {
      paginatedBatches?.data?.map((batch) => {
        setSelectedItemsForBulkDelete([
          ...selectedItemsForBulkDelete,
          {
            type: 'telephony_vendor_carrier_plans',
            id: parseInt(batch?.id, 10),
          },
        ]);
        return null;
      });
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (allLotsSelected) {
      unPaginatedLots?.map((lot) => {
        temp.push({ id: lot?.id, type: 'lots' });
        return null;
      });
    }
    formik.setFieldValue('lots', temp);
  }, [allLotsSelected]);

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
                    Vendor Operations
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block ">
                    <div className="h-100 shadow-10 rounded">
                      <div className="scroll-custom scroll-carrier pt-3">
                        <SideMenu active={2} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0">Batch</h6>
                        <p className="mb-0">
                          <span className="fw-medium">
                            {paginatedBatches?.meta?.pagination?.total}
                          </span>{' '}
                          Batch available
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search Batch"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                            clearBtn={() => {
                              setSearchTerm('');
                            }}
                            searchTerm={searchTerm}
                          />
                        </div>
                        <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
                          <div id="roleSelection">
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
                              <div className="d-flex flex-column mt-3">
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
                                  >
                                    Apply
                                  </button>
                                  <a
                                    href="/#"
                                    type="button"
                                    id="roleCancel"
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
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
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex gap-3 align-items-center justify-content-start justify-content-sm-between justify-content-md-end">
                          <a
                            href="/#"
                            // data-bs-toggle="modal"
                            // data-bs-target="#newBatchModal"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px plan-btn-mob"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-batch' });
                            }}
                          >
                            Add Batch
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
                                    setShow({ isVisible: true, type: 'bulk-delete-batch' });
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
                                    id="batchName"
                                    checked={isAllSelected}
                                    onChange={() => {}}
                                    onClick={() => {
                                      setIsAllSelected(!isAllSelected);
                                    }}
                                  />
                                  <label className="text-primary mb-0" htmlFor="batchName">
                                    Batch name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Carrier</th>
                              <th scope="col">Lot</th>
                              <th scope="col">DID/TF Count</th>
                              <th scope="col">Channels</th>
                              <th scope="col">MRC / MRC(Inc)</th>
                              <th scope="col " className="d-none">
                                Type
                              </th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedBatches?.isLoading && (
                              <tr className="horizontal-table">
                                <td />
                                <td />
                                <td />
                                <td>
                                  <SpinningLoader />
                                </td>
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr>
                            )}
                            {paginatedBatches?.data?.length > 0 &&
                              paginatedBatches?.data?.map((batch, index) => (
                                <VendorBatchList
                                  key={index}
                                  batchId={batch?.id}
                                  batchName={batch?.attributes?.name}
                                  carrier={{
                                    name: normalizedBatchList?.carrier[
                                      batch?.attributes?.carrier_id
                                    ]?.attributes?.name,
                                    id: batch?.attributes?.carrier_id,
                                  }}
                                  lot={`${batch?.attributes?.lots_count} Lot`}
                                  didCount={batch?.attributes?.did_count}
                                  tfCount={batch?.attributes?.tf_count}
                                  channels={batch?.attributes?.channel_count_2}
                                  totalMrc={batch?.attributes?.total_mrc_2}
                                  totalIncludedMrc={batch?.attributes?.total_included_mrc_2}
                                  type="---"
                                  setShow={setShow}
                                  carrierPlanIn={{
                                    name: normalizedBatchList?.inwardCarrierPackage[
                                      batch?.attributes?.inward_carrier_package_id
                                    ]?.attributes?.name,
                                    id: batch?.attributes?.inward_carrier_package_id,
                                  }}
                                  carrierPlanInPackage={{
                                    name: normalizedBatchList?.inwardCarrierPackage[
                                      batch?.attributes?.inward_carrier_package_id
                                    ]?.attributes?.name,
                                    id: batch?.attributes?.inward_carrier_package_id,
                                  }}
                                  carrierPlanOut={{
                                    name: normalizedBatchList?.inwardCarrierPackage[
                                      batch?.attributes?.inward_carrier_package_id
                                    ]?.attributes?.name,
                                    id: batch?.attributes?.inward_carrier_package_id,
                                  }}
                                  carrierPlanOutPackage={{
                                    name: normalizedBatchList?.outwardCarrierPackage[
                                      batch?.attributes?.outward_carrier_package_id
                                    ]?.attributes?.name,
                                    id: batch?.attributes?.outward_carrier_package_id,
                                  }}
                                  formik={formik}
                                  description={batch?.attributes?.description}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkDelete={selectedItemsForBulkDelete}
                                  selectedLots={batch?.relationships?.lots?.data}
                                />
                              ))}
                          </tbody>
                        </table>
                        {paginatedBatches?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {paginatedBatches?.meta?.pagination?.total > 0 && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedBatches?.meta?.pagination?.current_page}
                          totalPages={paginatedBatches?.meta?.pagination?.total_pages}
                          count={paginatedBatches?.meta?.pagination?.per_page}
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

      <AddNewBatchModal
        show={show?.isVisible && show?.type === 'add-batch'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        unPaginatedCarriersList={unPaginatedCarriersList}
        unPaginatedCarrierPackages={unPaginatedCarrierPackages}
        unPaginatedLots={unPaginatedLots}
        isLoading={isLoading}
      />

      <EditBatchModal
        show={show?.isVisible && show?.type === 'edit-batch'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        unPaginatedCarriersList={unPaginatedCarriersList}
        unPaginatedCarrierPackages={unPaginatedCarrierPackages}
        unPaginatedLots={unPaginatedLots}
        isLoading={isLoading}
        allLotsSelected={allLotsSelected}
        setAllLotsSelected={setAllLotsSelected}
      />
      <BatchDetails
        show={show?.isVisible && show?.type === 'batch-details'}
        setShow={setShow}
        batchDetails={show?.batchDetails}
      />

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'delete-batch'}
        title="Delete Carrier group"
        actionType="Delete "
        text={`the batch “ ${show?.selectedBatchForDelete?.name} ” .`}
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={isLoading}
        handleAction={() => {
          deleteBatch();
        }}
      />
      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-batch'}
        title="Delete Batch"
        actionType="Delete "
        text="the selected Batches."
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

export default VendorBatch;
