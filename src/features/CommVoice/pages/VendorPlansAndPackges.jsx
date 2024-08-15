import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VirtualPlanList from '../components/VirtualPlanList';

import {
  BulkDeleteCarrierGroup,
  ExportCarrierGroups,
  CreateCarrierGroup,
  DeleteCarrierGroup,
  GetCarrierGroup,
  ListPaginatedCarrierGroups,
  UpdateCarrierGroup,
} from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import AddNewCarrierGroup from '../components/AddNewCarrierGroup';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import EditCarrierGroup from '../components/EditCarrierGroup';
import Pagination from '../components/pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import CommonModal from '../../../common/components/modals/CommonModal';
import { ListAllCarriers } from '../../../common/api-collection/Telephony/VendorCarriers';
import AddExistingCarrierGroup from '../components/AddExistingCarrierGroup';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VendorPlansAndPackges() {
  const navigate = useNavigate();

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [paginatedCarrierGroupsData, setPaginatedCarrierGroupsData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState();

  const [carrierGroupDetails, setCarrierGroupDetails] = useState();

  const [searchTerm, setSearchTerm] = useState('');

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [unPaginatedCarriersList, setUnPaginatedCarriersList] = useState([]);

  const [carriersselected, setCarriersselected] = useState([]);

  const [selectedItemsForBulkDelete, setSelectedItemsForBulkDelete] = useState([]);

  const [isAllCarrierGroupsSelected, setIsAllCarrierGroupsSelected] = useState(false);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const addNewGroup = (formik, name = '') => {
    const data = {
      type: 'telephony_vendor_carrier_groups',
      attributes: {
        name,
      },
      relationships: {
        carriers: {
          data: formik?.values?.carriers,
        },
      },
    };

    setDataSubmitting(true);

    CreateCarrierGroup(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Carrier group created You have successfully created carrier group',
          type: 'success',
        });
        formik.resetForm();
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
        setDataSubmitting(false);
        formik.resetForm();
      });
  };

  const getCarrierGroupDetails = (groupId) => {
    GetCarrierGroup(groupId)?.then((response) => {
      setCarrierGroupDetails(response);
    });
  };

  const editCarrierGroup = (formik, data, groupId) => {
    setDataSubmitting(true);

    UpdateCarrierGroup(data, groupId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Carrier group updated You have successfully updated carrier group',
          type: 'success',
        });
        formik.resetForm();
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
        setDataSubmitting(false);
      });
  };

  const deleteCarrierGroup = () => {
    setDataSubmitting(true);

    DeleteCarrierGroup(show?.selectedGroupForDelete?.id)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Carrier group deleted You have successfully deleted carrier group',
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
        setDataSubmitting(false);
      });
  };

  const bulkDeleteCarrierGroups = () => {
    if (selectedItemsForBulkDelete?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Group',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setDataSubmitting(true);
      BulkDeleteCarrierGroup(selectedItemsForBulkDelete)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: "Carrier group's deleted You have successfully deleted carrier group's",
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
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
          setSelectedItemsForBulkDelete([]);
        });
    }
  };

  const handleAddCarriersToGroup = () => {
    setDataSubmitting(true);
    const data = {
      type: 'telephony_vendor_carrier_groups',
      id: parseInt(show?.data?.groupId, 10),
      attributes: {
        name: show?.data.groupName,
      },
      relationships: {
        carriers: {
          data: carriersselected,
        },
      },
    };

    UpdateCarrierGroup(data, show?.data?.groupId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Carrier group updated You have successfully updated carrier group',
          type: 'success',
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
          });
        }
      })
      .finally(() => {
        setDataSubmitting(false);
      });
  };

  const handleBulkSelection = (selectedGroup) => {
    const existingItem = selectedItemsForBulkDelete.find(
      (group) => group?.id === selectedGroup?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkDelete.filter(
        (group) => group?.id !== selectedGroup?.id
      );
      setSelectedItemsForBulkDelete(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkDelete([...selectedItemsForBulkDelete, selectedGroup]);
    }
  };

  const handleBulkExport = (data, type) => {
    ExportCarrierGroups(data, type).then((res) => {
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CarrierGroups.csv'; // Set the desired file name
      // Trigger the click event to start the download
      a.click();
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    setPaginatedCarrierGroupsData({
      isLoading: true,
    });

    ListPaginatedCarrierGroups(searchTerm, page)?.then((response) => {
      setPaginatedCarrierGroupsData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
    });
  }, [refresh, page, searchTerm, isFilterApplied]);

  useEffect(() => {
    ListAllCarriers()?.then((response) => {
      setUnPaginatedCarriersList(response?.data);
    });
  }, []);

  useEffect(() => {
    if (show?.data?.carriers?.length > 0) {
      setCarriersselected(show?.data?.carriers);
    }
  }, [show?.data?.carriers]);

  useEffect(() => {
    if (isAllCarrierGroupsSelected === true) {
      paginatedCarrierGroupsData?.data?.map((group) => {
        setSelectedItemsForBulkDelete((prevArray) => [
          ...prevArray,
          {
            type: 'telephony_vendor_carrier_groups',
            id: parseInt(group?.id, 10),
            carriersCount: group?.relationships?.carriers?.data?.length,
          },
        ]);
        return null;
      });
    }

    if (isAllCarrierGroupsSelected === false) {
      setSelectedItemsForBulkDelete([]);
    }
  }, [isAllCarrierGroupsSelected]);

  return (
    <Layout
      title="Gsoft admin"
      headerTitle="Gsoft admin"
      favIcon="/assets/favIcons/favicon-voice.ico"
      sideNavIcon="/assets/comm-voice-logo.svg"
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div
                  className="bg-dark-gray-color left-widget d-none d-lg-block"
                  onClick={() => {
                    navigate('/comm-telephony');
                  }}
                >
                  <Link to="/comm-telephony" className="d-flex justify-content-center">
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
                  <div className=" col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0">Carrier group</h6>
                        <p className="mb-0">
                          <span className="fw-medium">
                            {paginatedCarrierGroupsData?.meta?.pagination?.total}
                          </span>{' '}
                          Groups available
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search Group"
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
                              onChange={(e) => {
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
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={() => {}}
                                  value="select"
                                >
                                  <option value="select">select</option>
                                  <option>Organization admin</option>
                                  <option>Product admin</option>
                                  <option>Agent</option>
                                  <option>Supervisor</option>
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-3">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  value="select"
                                  onChange={() => {}}
                                >
                                  <option value="">All</option>
                                  <option value>Active</option>
                                  <option value={false}>Inactive</option>
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
                                    href="/#"
                                    type="button"
                                    id="roleCancel"
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setIsFilterApplied(false);
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
                              className="p-10px rounded text-blue-active border border-blue-active position-relative "
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
                            id="newCarrierGroup"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-new-group' });
                            }}
                          >
                            Add Group
                          </a>

                          <div className="dropdown">
                            <a
                              href="/#"
                              className="hor-dots"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <img src="/assets/3-dots-horizontal.svg" alt="" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-group py-2 px-1 mt-1">
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-2 px-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleBulkExport(selectedItemsForBulkDelete, 'csv');
                                  }}
                                >
                                  <img src="/assets/export-icon-blue.svg" alt="" /> Export
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-2 px-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                      selectedItemsForBulkDelete.some(
                                        (item) => item.carriersCount !== 0
                                      )
                                    ) {
                                      setToastAction({
                                        isVisible: true,
                                        message:
                                          'Remove carriers from selected carrier groups to delete',
                                        type: 'failed',
                                      });
                                    } else {
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
                      </div>

                      <div className="table-responsive vendor-plans-table">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="check-box">
                                  <input
                                    type="checkbox"
                                    id="groupId"
                                    onChange={() => {}}
                                    onClick={() => {
                                      setIsAllCarrierGroupsSelected(!isAllCarrierGroupsSelected);
                                    }}
                                    checked={isAllCarrierGroupsSelected}
                                    disabled={paginatedCarrierGroupsData?.data?.length === 0}
                                  />
                                  <label className="text-primary mb-0" htmlFor="groupId">
                                    Group name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Carriers</th>
                              <th scope="col">Carrier Usage</th>
                              <th scope="col">Total MRC/MRC(Inc)</th>
                              <th scope="col">Created on</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Data Table Loader start  */}
                            {paginatedCarrierGroupsData?.isLoading && (
                              <tr>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box">
                                    {' '}
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

                            {paginatedCarrierGroupsData?.data?.length > 0 &&
                              paginatedCarrierGroupsData?.data?.map((group, index) => (
                                <VirtualPlanList
                                  key={index}
                                  groupId={group?.id}
                                  GroupName={group?.attributes?.name}
                                  carriersNumber={`${group?.relationships?.carriers?.data?.length} Carries`}
                                  carriersUsage={group?.attributes?.carrier_usage}
                                  totalMrc={group?.attributes?.total_mrc}
                                  totalMrcInc={group?.attributes?.total_mrc_included}
                                  createdDate={
                                    group?.attributes?.created_at &&
                                    moment(group?.attributes?.created_at)?.format('DD/MM/YYYY')
                                  }
                                  handleEditGroup={getCarrierGroupDetails}
                                  setShow={setShow}
                                  carriersCount={group?.relationships?.carriers?.data?.length}
                                  carriers={group?.relationships?.carriers?.data}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkDelete={selectedItemsForBulkDelete}
                                />
                              ))}
                          </tbody>
                        </table>
                        {paginatedCarrierGroupsData?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {paginatedCarrierGroupsData?.meta?.pagination?.total > 0 && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedCarrierGroupsData?.meta?.pagination?.current_page}
                          totalPages={paginatedCarrierGroupsData?.meta?.pagination?.total_pages}
                          count={paginatedCarrierGroupsData?.meta?.pagination?.per_page}
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

      <AddNewCarrierGroup
        addNewGroup={addNewGroup}
        show={show?.isVisible && show?.type === 'add-new-group'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        unPaginatedCarriersList={unPaginatedCarriersList}
      />

      <EditCarrierGroup
        editCarrierGroup={editCarrierGroup}
        show={show?.isVisible && show?.type === 'edit-carrier-group'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
          setCarrierGroupDetails();
        }}
        unPaginatedCarriersList={unPaginatedCarriersList}
        carrierGroupDetails={carrierGroupDetails}
      />

      <AddExistingCarrierGroup
        show={show?.isVisible && show?.type === 'add-existing-carriers-modal'}
        carriersselected={carriersselected}
        setCarriersselected={setCarriersselected}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        handleAddCarriersToGroup={handleAddCarriersToGroup}
        dataSubmitting={dataSubmitting}
        groupName={show?.data?.GroupName}
        unPaginatedCarriersList={unPaginatedCarriersList}
      />

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'delete-group'}
        title="Delete Carrier group"
        actionType="Delete "
        text={`the carrier group “ ${show?.selectedGroupForDelete?.name} ” .`}
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={dataSubmitting}
        handleAction={() => {
          deleteCarrierGroup();
        }}
      />

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-group'}
        title="Delete Carrier groups"
        actionType="Delete "
        text="the selected carrier group's."
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
    </Layout>
  );
}

export default VendorPlansAndPackges;
