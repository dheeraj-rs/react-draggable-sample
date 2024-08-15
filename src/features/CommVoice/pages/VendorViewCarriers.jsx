import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CarrierGroupList from '../components/CarrierGroupList';
import Pagination from '../components/pagination/Pagination';
import AddExistingCarrierGroup from '../components/AddExistingCarrierGroup';
import EditGroupCarrierView from '../components/EditGroupCarrierView';
import VendorViewCarrierBatch from '../components/VendorViewCarrierBatch';
import VendorViewCarrierUsage from '../components/VendorViewCarrierUsage';
import VendorViewAddCarrier from '../components/VendorViewAddCarrier';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import VendorViewAddNewCarrierModal from '../components/Modals/VendorViewAddNewCarrierModal';
import ToastError from '../../../common/components/toast/ToastError';
import {
  ExportCarriers,
  GetCarrierGroup,
  ListAllCarrierGroups,
} from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import { isValidIPAddress } from '../../../common/helpers/utils';
import {
  AddExistingCarriersToGroup,
  CreateCarrier,
  DeleteCarrier,
  ListAllCarriers,
  ListCountries,
  ListPaginatedCarriers,
  UpdateCarrier,
} from '../../../common/api-collection/Telephony/VendorCarriers';
import Delete from '../components/Delete';
import EditCarrier from '../components/EditCarrier';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import ManageLocalSwitches from '../components/ManageLocalSwitches';

function VendorViewCarriers() {
  const params = useParams();

  const [page, setPage] = useState();

  const [searchTerm, setSearchTerm] = useState('');

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [paginatedCarriersData, setPaginatedCarriersData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [carriersselected, setCarriersselected] = useState([]);

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const [allCarrierGroups, setAllCarrierGroups] = useState([]);

  const [unPaginatedCarriersList, setUnPaginatedCarriersList] = useState([]);

  const [selectedItemsForBulkExport, setSelectedItemsForBulkExport] = useState([]);

  const [countries, setCountries] = useState();

  const [filter, setFilter] = useState({ region: '', enable: '', carrierGroup: '' });

  const [activeFilter, setActiveFilter] = useState({ region: '', enable: '' });

  const [carrierGroupName, setCarrierGroupName] = useState('');

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const AddExistingCarriers = () => {
    setDataSubmitting(true);
    AddExistingCarriersToGroup(params?.id, carriersselected)
      .then(() => {
        setShow({ isVisible: false, type: '' });
        setToastAction({
          isVisible: true,
          message: 'Added: You have successfully Added Carriers to group ',
          type: 'success',
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Something went wrong!',
          statusCode: error?.response.status,
        });
      })
      .finally(() => {
        setDataSubmitting(false);
      });
  };

  const validate = (data) => {
    const errors = {};

    if (!data.carrierName) {
      errors.carrierName = 'Carrier name is required';
    }

    if (!data.carrierRegion) {
      errors.carrierRegion = 'Carrier region is required';
    }

    if (!data.carrierGroup || data.carrierGroup === '') {
      errors.carrierGroup = 'Carrier group is required';
    }

    if (!data.carrierIp) {
      errors.carrierIp = 'carrier ip is required';
    } else if (isValidIPAddress(data.carrierIp) === false) {
      errors.carrierIp = 'not a valid ip';
    }

    if (!data.carrierPort) {
      errors.carrierPort = 'Invalid port';
    }

    if (data.isCarrierCredentialsActive) {
      if (!data.userName.trim()) {
        errors.userName = 'username is required';
      }
      if (!data.password.trim()) {
        errors.password = 'password is required';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      carrierName: '',
      carrierRegion: '',
      carrierGroup: params?.id,
      batch: '',
      carrierIp: '',
      carrierPort: '',
      isCarrierCredentialsActive: false,
      userName: '',
      password: '',
      enable: false,
    },
    validate,
    onSubmit: () => {
      if (show?.type === 'new-carrier-modal') {
        setDataSubmitting(true);

        const data = {
          type: 'telephony_vendor_carriers',
          attributes: {
            carrier_group_id: formik.values.carrierGroup,
            name: formik.values.carrierName,
            region: formik.values.carrierRegion,
            ip: formik.values.carrierIp,
            port: formik.values.carrierPort,
            is_authentication_required: formik.values.isCarrierCredentialsActive,
            username: formik.values.userName,
            password: formik.values.password,
            is_enabled: formik.values.enable,
          },
        };
        CreateCarrier(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Carrier created : You have successfully created carrier',
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

      if (show?.type === 'edit-carrier') {
        const data = {
          type: 'telephony_vendor_carriers',
          id: parseInt(show?.carrierId, 10),
          attributes: {
            carrier_group_id: formik.values.carrierGroup,
            name: formik.values.carrierName,
            region: formik.values.carrierRegion,
            ip: formik.values.carrierIp,
            port: formik.values.carrierPort,
            is_authentication_required: formik.values.isCarrierCredentialsActive,
            username: formik.values.username,
            password: formik.values.password,
            is_enabled: formik.values.enable,
          },
        };
        UpdateCarrier(data, show?.carrierId)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Carrier created : You have successfully created carrier',
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
    },
  });

  const deleteCarrier = () => {
    setDataSubmitting(true);

    DeleteCarrier(show?.carrier?.id)
      .then(() => {
        setToastAction({
          isVisible: true,
          message: 'Deleted : You have successfully deleted the carrier',
          type: 'success',
        });
        setShow({ isVisible: false, type: '' });
        setRefresh(!refresh);
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Something went wrong!',
          statusCode: error?.response.status,
        });
      })
      .finally(() => {
        setDataSubmitting(false);
      });
  };

  const handleBulkExport = (data, type) => {
    ExportCarriers(data, type).then((res) => {
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'LocalSwitch.csv'; // Set the desired file name
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

  useEffect(() => {
    ListAllCarrierGroups()?.then((response) => {
      setAllCarrierGroups(response?.data);
    });
  }, [page, searchTerm]);

  useEffect(() => {
    if (params?.id) {
      setPaginatedCarriersData({
        isLoading: true,
      });
      ListPaginatedCarriers(
        searchTerm,
        page,
        activeFilter?.enable,
        activeFilter?.region,
        params?.id
      )?.then((response) => {
        setPaginatedCarriersData({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
      });
    }
  }, [searchTerm, page, params?.id, refresh, activeFilter?.enable, activeFilter?.region]);

  const listCarriers = () => {
    ListAllCarriers()
      .then((response) => {
        if (response?.data) {
          setUnPaginatedCarriersList(response?.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    if (params?.id) {
      ListCountries().then((response) => {
        if (response?.data) {
          setCountries(response?.data);
        }
      });
      listCarriers();

      GetCarrierGroup(params?.id)?.then((response) => {
        setCarrierGroupName(response?.data?.attributes?.name);
      });
    }
  }, [params?.id]);

  return (
    <>
      <Layout
        title="Gsoft admin"
        headerTitle="Gsoft admin"
        favIcon="/assets/admin-logos.svg"
        active="/app/comm-telephony/vendor-view-carriers"
      >
        <div className="wrapper">
          <div className="bg-gray-bright w-100">
            <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100 roles-mobile-padding">
                <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                  <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                    <Link
                      to="/comm-telephony/vendor-plans-and-packges/"
                      className="d-flex justify-content-center"
                    >
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
                        <div className="d-flex gap-4 align-items-center mb-3">
                          <h5 className="mb-0 fs-14px">
                            <Link to="/comm-telephony/vendor-plans-and-packges/">
                              Carrier Group
                            </Link>{' '}
                            - &nbsp;
                            {carrierGroupName}
                            &nbsp;/ Carriers
                          </h5>
                          <p className="mb-0 fs-14px">
                            <b>{paginatedCarriersData?.meta?.pagination?.total}</b> Carriers
                            available
                          </p>
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
                                  <p className="mb-0">Region</p>
                                  <select
                                    className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                    aria-label="Default select example"
                                    value={filter?.region || 'select'}
                                    onChange={(e) => {
                                      setFilter({ ...filter, region: e.target.value });
                                    }}
                                  >
                                    <option value="select" disabled>
                                      select
                                    </option>
                                    {countries?.map((country, index) => (
                                      <option
                                        key={index}
                                        value={country.attributes.name.toLowerCase()}
                                      >
                                        {country.attributes.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="d-flex flex-column">
                                  <p className="mb-0">carrier group</p>
                                  <select
                                    className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                    aria-label="Default select example"
                                    value={filter?.carrierGroup || 'select'}
                                    onChange={(e) => {
                                      setFilter({ ...filter, carrierGroup: e.target.value });
                                    }}
                                  >
                                    <option value="select" disabled>
                                      select
                                    </option>
                                    {allCarrierGroups?.map((group, index) => (
                                      <option key={index} value={group.id}>
                                        {group.attributes.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="d-flex flex-column mt-2">
                                  <p className="mb-0">Enabled/disabled</p>
                                  <select
                                    className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                    aria-label="Default select example"
                                    value={filter?.enable || 'select'}
                                    onChange={(e) => {
                                      setFilter({ ...filter, enable: e.target.value });
                                    }}
                                  >
                                    <option defaultValue value="all">
                                      All
                                    </option>
                                    <option value="enabled">Active</option>
                                    <option value="disabled">Inactive</option>
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
                                  setActiveFilter({ region: '', enable: '' });
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
                          <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end  gap-2">
                            <a
                              href="/#"
                              className="btn bg-black fw-medium fs-14px text-white px-4 py-12px newCarrier"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              Add Carrier
                            </a>
                            <div className="dropdown">
                              <ul className="dropdown-menu dropdown-menu-group p-3">
                                <li>
                                  <a
                                    href="/#"
                                    // data-bs-toggle="offcanvas"
                                    // data-bs-target="#addExistingCarriers"
                                    // aria-controls="offcanvasExistingCarriers"
                                    className="dropdown-item py-3 px-3"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShow({
                                        isVisible: true,
                                        type: 'add-existing-carriers-modal',
                                      });
                                    }}
                                  >
                                    Add existing carriers
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/#"
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#newCarrierModal"
                                    className="dropdown-item py-3 px-3"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShow({ isVisible: true, type: 'new-carrier-modal' });
                                    }}
                                  >
                                    Add a new carrier
                                  </a>
                                </li>
                              </ul>
                            </div>

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
                                      handleBulkExport(selectedItemsForBulkExport, 'csv');
                                    }}
                                  >
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
                                <th scope="col">
                                  <div className="check-box">
                                    <input
                                      type="checkbox"
                                      // id="carrierName"
                                    />
                                    <label className="text-primary mb-0" htmlFor="carrierName">
                                      Carrier name
                                    </label>
                                  </div>
                                </th>
                                <th scope="col">Region</th>
                                <th scope="col">Carrier IP</th>
                                <th scope="col">Port</th>
                                <th scope="col">Local switch</th>

                                <th scope="col">Batch</th>
                                <th scope="col">Usage</th>
                                <th scope="col">Enable</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Data Table Loader start  */}
                              {paginatedCarriersData?.isLoading && (
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
                                </tr>
                              )}
                              {/* Data Table Loader end  */}
                              {paginatedCarriersData?.data?.length > 0 &&
                                paginatedCarriersData?.data?.map((carrier, index) => (
                                  <CarrierGroupList
                                    key={index}
                                    carrierId={carrier?.id}
                                    carrierGroup={{
                                      name: carrier?.attributes?.name,
                                      id: carrier?.attributes?.carrier_group_id,
                                    }}
                                    region={carrier?.attributes?.region}
                                    carriersIp={carrier?.attributes?.ip}
                                    carriersPort={carrier?.attributes?.port}
                                    localSwitch={carrier?.relationships?.switches?.data[0]}
                                    localSwitchCount={carrier?.relationships?.switches?.length || 0}
                                    usage={carrier?.attributes?.usage_amount?.amount}
                                    enabled={carrier?.attributes?.is_enabled}
                                    handleBulkSelection={handleBulkSelection}
                                    selectedItemsForBulkExport={selectedItemsForBulkExport}
                                    setShow={setShow}
                                    formik={formik}
                                    batchCount={carrier?.attributes?.batches_count}
                                    isAuthRequired={carrier?.attributes?.is_authentication_required}
                                    CarrierCredentials={{
                                      username: carrier?.attributes?.username,
                                      password: carrier?.attributes?.password,
                                      enable: carrier?.attributes?.is_enabled,
                                    }}
                                  />
                                ))}
                            </tbody>
                          </table>
                          {paginatedCarriersData?.data?.length === 0 && <NoMatchingRecords />}
                        </div>

                        {paginatedCarriersData?.meta?.pagination && (
                          <Pagination
                            handlePagination={handlePaginationFunction}
                            currentPage={paginatedCarriersData?.meta?.pagination?.current_page}
                            totalPages={paginatedCarriersData?.meta?.pagination?.total_pages}
                            count={paginatedCarriersData?.meta?.pagination?.per_page}
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
      </Layout>

      <VendorViewAddNewCarrierModal
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        show={show?.isVisible && show?.type === 'new-carrier-modal'}
        groupName={carrierGroupName}
        allCarrierGroups={allCarrierGroups}
        formik={formik}
        dataSubmitting={dataSubmitting}
        countries={countries}
      />

      <AddExistingCarrierGroup
        show={show?.isVisible && show?.type === 'add-existing-carriers-modal'}
        carriersselected={carriersselected}
        setCarriersselected={setCarriersselected}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        handleAddCarriersToGroup={() => {
          AddExistingCarriers();
        }}
        dataSubmitting={dataSubmitting}
        groupName={carrierGroupName}
        unPaginatedCarriersList={unPaginatedCarriersList}
      />

      <EditGroupCarrierView />

      <VendorViewCarrierBatch />

      <VendorViewCarrierUsage />

      <VendorViewAddCarrier />

      <EditCarrier
        show={show?.isVisible && show?.type === 'edit-carrier'}
        setShow={setShow}
        formik={formik}
        allCarrierGroups={allCarrierGroups}
        dataSubmitting={dataSubmitting}
      />

      <Delete
        heading="Delete Carrier"
        part1="This action will Delete the carrier"
        part2={show?.carrier?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-carrier'}
        id={show?.carrier?.id}
        dataSubmitting={false}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteCarrier}
      />

      <ManageLocalSwitches show={show?.isVisible && show?.type === 'manage-local-switches'} />

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
          {toastAction?.statusCode === 500 ? 'something went wrong!' : toastAction?.message}
        </ToastError>
      )}
    </>
  );
}

export default VendorViewCarriers;
