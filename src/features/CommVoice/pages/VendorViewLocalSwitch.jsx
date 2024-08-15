import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';

import { Link, useParams } from 'react-router-dom';
import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CarrierLocalSwitch from '../components/CarrierLocalSwitch';
import Pagination from '../components/pagination/Pagination';
import AddLocalSwitch from '../components/AddLocalSwitch';
import EditLocalSwitch from '../components/EditLocalSwitch';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import Delete from '../components/Delete';
import {
  BulkDeleteSwitch,
  CSVExportLocalSwitchAll,
  CSVExportLocalSwitchSelected,
  CreateLocalSwitch,
  DeleteSwitch,
  DisableLocalSwitch,
  EnableLocalSwitch,
  ListPaginatedLocalSwitches,
  UpdateLocalSwitch,
} from '../../../common/api-collection/Telephony/LocalSwitches';
import { ListAllCarrierGroups } from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import { ListAllCarriers } from '../../../common/api-collection/Telephony/VendorCarriers';
import GetCountries from '../../../common/api-collection/Common/Countries';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import CommonModal from '../../../common/components/modals/CommonModal';
import { isValidIPAddress } from '../../../common/helpers/utils';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VendorViewLocalSwitch() {
  const params = useParams();

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [paginatedLocalSwitchData, setPaginatedLocalSwitchData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [page, setPage] = useState();

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filter, setFilter] = useState({
    carrierGroupId: '',
    carrierId: '',
    isEnabled: '',
  });
  const [activeFilter, setActiveFilter] = useState();

  const [key, setKey] = useState('');

  const [unpaginatedCarriers, setUnpaginatedCarriers] = useState([]);
  const [unpaginatedCarrierGroups, setUnpaginatedCarrierGroups] = useState([]);

  const [countries, setCountries] = useState([]);

  const [selectedItemsForBulkDelete, setSelectedItemsForBulkDelete] = useState([]);

  const validate = (data) => {
    const errors = {};

    if (!data.switchName) {
      errors.switchName = 'switch name is required';
    }
    if (!data.carrierGroup) {
      errors.carrierGroup = 'select a group';
    }
    if (!data.switchName) {
      errors.switchName = 'switch name is required';
    }
    if (!data.switchIP) {
      errors.switchIP = 'switch ip is required';
    } else if (isValidIPAddress(data.switchIP) === false) {
      errors.switchIP = 'not a valid ip';
    }

    if (!data.switchPort) {
      errors.switchPort = 'switch port is required';
    }
    if (!data.switchRegion) {
      errors.switchRegion = 'switch region is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      switchName: '',
      carrierGroup: '',
      switchIP: '',
      switchPort: '',
      switchRegion: '',
      enable: false,
    },
    validate,
    onSubmit: () => {
      setDataSubmitting(true);
      if (show?.type === 'add-switch') {
        const data = {
          type: 'telephony_vendor_local_switches',
          attributes: {
            carrier_group_id: formik?.values?.carrierGroup,
            carrier_id: params?.id,
            name: formik?.values?.switchName,
            ip: formik?.values?.switchIP,
            port: formik?.values?.switchPort,
            region: formik?.values?.switchRegion,
            is_enabled: formik?.values?.enable,
          },
        };

        CreateLocalSwitch(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Switch created : You have successfully created the switch',
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
                type: 'failed',
                message: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'Something went wrong!',
              });
            }
          })
          .finally(() => {
            setShow({ isVisible: false, type: '' });
            setDataSubmitting(false);
            formik.resetForm();
          });
      } else if (show?.type === 'edit-switch') {
        const data = {
          type: 'telephony_vendor_local_switches',
          id: parseInt(show?.switchId, 10),
          attributes: {
            carrier_group_id: formik?.values?.carrierGroup,
            carrier_id: params?.id,
            name: formik?.values?.switchName,
            ip: formik?.values?.switchIP,
            port: formik?.values?.switchPort,
            region: formik?.values?.switchRegion,
            is_enabled: formik?.values?.enable,
          },
        };

        UpdateLocalSwitch(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Switch edited : You have successfully edited the switch',
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
                type: 'failed',
                message: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'Something went wrong!',
              });
            }
          })
          .finally(() => {
            setShow({ isVisible: false, type: '' });
            setDataSubmitting(false);
            formik.resetForm();
          });
      }
    },
  });

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const deleteSwitch = () => {
    setDataSubmitting(true);

    DeleteSwitch(show?.switch?.switchId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Deleted : You have successfully deleted the switch',
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
        setShow({ isVisible: false, type: '' });
      });
  };

  const bulkDeleteSwitch = () => {
    if (selectedItemsForBulkDelete?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Batch',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setDataSubmitting(true);
      BulkDeleteSwitch(selectedItemsForBulkDelete)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: ' Deleted : You have successfully deleted the switch',
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
          setShow({ isVisible: false, type: '' });
          setSelectedItemsForBulkDelete([]);
        });
    }
  };

  const handleBulkSelection = (selectedSwitch) => {
    const existingItem = selectedItemsForBulkDelete.find(
      (localSwitch) => localSwitch?.id === selectedSwitch?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkDelete.filter(
        (group) => group?.id !== selectedSwitch?.id
      );
      setSelectedItemsForBulkDelete(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkDelete([...selectedItemsForBulkDelete, selectedSwitch]);
    }
  };

  const handleBulkExport = (type) => {
    if (selectedItemsForBulkDelete?.length > 0) {
      CSVExportLocalSwitchSelected(selectedItemsForBulkDelete, type)
        .then((res) => {
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
          setSelectedItemsForBulkDelete([]);
        });
    } else {
      CSVExportLocalSwitchAll([], type)
        .then((res) => {
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
          setSelectedItemsForBulkDelete([]);
        });
    }
  };

  const changeSwitchStatus = () => {
    if (show?.type === 'enable-local-switch') {
      setDataSubmitting(true);
      EnableLocalSwitch(show?.id)
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
    } else if (show?.type === 'disable-local-switch') {
      setDataSubmitting(true);
      DisableLocalSwitch(show?.id)
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
  useEffect(() => {
    ListAllCarrierGroups()?.then((response) => {
      setUnpaginatedCarrierGroups(response?.data);
    });

    ListAllCarriers()?.then((response) => {
      setUnpaginatedCarriers(response?.data);
    });

    GetCountries()?.then((response) => {
      setCountries(response?.data);
    });
  }, []);

  useEffect(() => {
    setPaginatedLocalSwitchData({ isLoading: true });

    ListPaginatedLocalSwitches(
      key,
      page,
      activeFilter?.carrierGroupId,
      params?.id,
      activeFilter?.isEnabled
    )
      ?.then((response) => {
        setPaginatedLocalSwitchData({ isLoading: false });
        setPaginatedLocalSwitchData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      })
      ?.finally(() => {
        setFilter({});
      });
  }, [refresh, key, page, activeFilter]);

  return (
    <Layout
      title="Gsoft admin"
      headerTitle="Gsoft admin"
      favIcon="/assets/favIcons/favicon-voice.ico"
      active="/app/comm-telephony/vendor-carriers-local-switch"
    >
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
                        <SideMenu active={1} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0 fs-14px">Local Switch</h6>
                        <p className="mb-0">
                          <span>{paginatedLocalSwitchData?.meta?.pagination?.total}</span> Groups
                          available
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search User"
                            onChange={(e) => {
                              setKey(e.target.value);
                            }}
                            clearBtn={() => {
                              setKey('');
                            }}
                            searchTerm={key || ''}
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
                                <p className="mb-0">carrier</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setFilter({ ...filter, carrierId: e.target.value });
                                  }}
                                  value={filter.carrierId || ''}
                                >
                                  <option value="">All</option>
                                  {unpaginatedCarriers?.map((group) => (
                                    <option value={group?.id} key={group?.id}>
                                      {group?.attributes?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="d-flex flex-column">
                                <p className="mb-0">carrier group</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setFilter({ ...filter, carrierGroupId: e.target.value });
                                  }}
                                  value={filter.carrierGroupId || ' '}
                                >
                                  <option value="">All</option>
                                  {unpaginatedCarrierGroups?.map((group) => (
                                    <option value={group?.id} key={group?.id}>
                                      {group?.attributes?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-2">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setFilter({ ...filter, isEnabled: e.target.value });
                                  }}
                                  value={filter?.isEnabled || ''}
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setFilter({
                                        carrierGroupId: '',
                                        carrierId: '',
                                        isEnabled: '',
                                      });
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
                                setActiveFilter({
                                  carrierGroupId: '',
                                  carrierId: '',
                                  isEnabled: '',
                                });
                                setFilter({
                                  carrierGroupId: '',
                                  carrierId: '',
                                  isEnabled: '',
                                });
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
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-switch' });
                            }}
                            id="newCarrier"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px newCarrier"
                          >
                            Add Switch
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
                                    handleBulkExport('csv');
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

                                    setShow({ isVisible: true, type: 'bulk-delete-switch' });
                                  }}
                                >
                                  <img src="/assets/Trash-img.svg" alt="" /> Delete
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
                                    Switch name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Region</th>
                              <th scope="col">Switch IP</th>
                              <th scope="col">Switch Port</th>
                              <th scope="col">Created on</th>

                              <th scope="col">Enable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedLocalSwitchData?.isLoading && (
                              <tr className="carrier-table">
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

                            {paginatedLocalSwitchData?.data?.length > 0 &&
                              paginatedLocalSwitchData?.data?.map((localSwitch, index) => (
                                <CarrierLocalSwitch
                                  key={index}
                                  switchId={localSwitch?.id}
                                  carrierGroupId={localSwitch?.attributes?.carrier_group_id}
                                  carrierId={localSwitch?.attributes?.carrier_id}
                                  switchName={localSwitch?.attributes?.name}
                                  region={localSwitch?.attributes?.region}
                                  switchIp={localSwitch?.attributes?.ip}
                                  switchPort={localSwitch?.attributes?.port}
                                  switchMapping="---"
                                  enable={localSwitch?.attributes?.is_enabled}
                                  createdOn={moment(localSwitch?.attributes?.created_at)?.format(
                                    'DD/MM/YYYY hh.mm A'
                                  )}
                                  setShow={setShow}
                                  formik={formik}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkDelete={selectedItemsForBulkDelete}
                                />
                              ))}
                          </tbody>
                        </table>
                        {paginatedLocalSwitchData?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {/* <!-- pagination --> */}
                      {paginatedLocalSwitchData?.meta?.pagination && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedLocalSwitchData?.meta?.pagination?.current_page}
                          totalPages={paginatedLocalSwitchData?.meta?.pagination?.total_pages}
                          count={paginatedLocalSwitchData?.meta?.pagination?.per_page}
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
      </div>{' '}
      <AddLocalSwitch
        show={show?.isVisible && show?.type === 'add-switch'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        unpaginatedCarriers={unpaginatedCarriers}
        unpaginatedCarrierGroups={unpaginatedCarrierGroups}
        countries={countries}
        formik={formik}
      />
      <EditLocalSwitch
        show={show?.isVisible && show?.type === 'edit-switch'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        unpaginatedCarriers={unpaginatedCarriers}
        unpaginatedCarrierGroups={unpaginatedCarrierGroups}
        countries={countries}
        formik={formik}
      />
      {/* <!-- delete modal --> */}
      <Delete
        heading="Delete Switch"
        part1="This action will Delete the switch"
        part2={show?.switch?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-switch'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteSwitch}
      />
      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-switch'}
        title="Delete Switch"
        actionType="Delete "
        text="the selected switch."
        label="To confirm this action please type “Delete”"
        btnLabel="Delete"
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey="Delete"
        isProcessing={dataSubmitting}
        handleAction={() => {
          bulkDeleteSwitch();
        }}
      />
      <CommonModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'enable-local-switch' || show?.type === 'disable-local-switch')
        }
        title={
          show?.type === 'enable-local-switch' ? ' Enable Local Switch' : ' Disable Local Switch'
        }
        actionType={show?.key}
        text=" the Local switch."
        label={`To confirm this action please type “${show?.key}”`}
        btnLabel={show?.key}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey={show?.key}
        isProcessing={dataSubmitting}
        handleAction={changeSwitchStatus}
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

export default VendorViewLocalSwitch;
