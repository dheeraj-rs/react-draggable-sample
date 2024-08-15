import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import normalize from 'json-api-normalizer';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import VendorCarriersList from '../components/VendorCarriersList';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SideMenu from '../components/common/SideMenu';

import NewCarrierModal from '../components/NewCarrierModal';
import CarrierCredentials from '../components/CarrierCredentials';
import AddCarrier from '../components/AddCarrier';
import NewCarrierGroup from '../components/NewCarrierGroup';
import Pagination from '../components/pagination/Pagination';
import '../../../styles/formvalidation.css';
import { isValidIPAddress } from '../../../common/helpers/utils';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import EditCarrier from '../components/EditCarrier';
import {
  BulkDeleteCarriers,
  CreateCarrier,
  DeleteCarrier,
  GetCarrier,
  ListPaginatedCarriers,
  UpdateCarrier,
} from '../../../common/api-collection/Telephony/VendorCarriers';
import {
  ExportCarriers,
  ListAllCarrierGroups,
} from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import Delete from '../components/Delete';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import CommonModal from '../../../common/components/modals/CommonModal';
import { ListAllBatches } from '../../../common/api-collection/Telephony/Batches';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import GetCountries from '../../../common/api-collection/Common/Countries';

function VendorCarriers() {
  const temp = [];
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [paginatedCarrierssData, setPaginatedCarriersData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [page, setPage] = useState();

  const [show, setShow] = useState({ isVisible: false, type: '' });

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [isEnabled, setIsEnabled] = useState('');

  const [region, setRegion] = useState('');

  const [carrierId, setCarrierId] = useState('');

  const [countries, setCountries] = useState();

  const [allCarrierGroups, setAllCarrierGroups] = useState([]);

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [carrierDetails, setCarrierDetails] = useState({});

  const [normalizedCarriersListData, setNormalizedCarriersListData] = useState({});

  const [selectedItemsForBulkDelete, setSelectedItemsForBulkDelete] = useState([]);

  const [allAvilableCarriers, setAllAvilableCarriers] = useState([]);

  const [isAllCarriersSelected, setIsAllCarriersSelected] = useState(false);

  const [unpaginatedBatchList, setUnpaginatedBatchList] = useState([]);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handleBulkExport = (data, type) => {
    ExportCarriers(data, type).then((res) => {
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Carriers.csv'; // Set the desired file name
      // Trigger the click event to start the download
      a.click();
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
      setIsAllCarriersSelected(false);
      setSelectedItemsForBulkDelete([]);
    });
  };

  const validate = (data) => {
    const errors = {};

    if (!data.carrierName.trim()) {
      errors.carrierName = 'carrier name is required';
    }
    if (!data.carrierGroup) {
      errors.carrierGroup = 'carrier group is required';
    }
    if (!data.carrierRegion.trim()) {
      errors.carrierRegion = 'carrier region is required';
    }
    // if (!data.batch.trim()) {
    //   errors.batch = 'batch is required';
    // }
    if (!data.carrierIp) {
      errors.carrierIp = 'carrier ip is required';
    } else if (isValidIPAddress(data.carrierIp) === false) {
      errors.carrierIp = 'not a valid ip';
    }
    if (!data.carrierPort) {
      errors.carrierPort = 'carrier port is required';
    }
    if (data.isCarrierCredentialsActive) {
      if (!data.username.trim()) {
        errors.username = 'username is required';
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
      carrierGroup: '',
      carrierRegion: '',
      batch: [],
      carrierIp: '',
      carrierPort: '',
      isCarrierCredentialsActive: false,
      username: '',
      password: '',
      enable: true,
    },
    validate,
    onSubmit: () => {
      setDataSubmitting(true);

      if (show?.type === 'add-carrier') {
        const data = {
          type: 'telephony_vendor_carriers',
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
          relationships: {
            ...(formik.values.batch.length > 0 && { batch_ids: { data: formik.values.batch } }),
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
          relationships: {
            batch_ids: {
              data: formik.values.batch,
            },
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

  const getCarrierDetails = (id) => {
    GetCarrier(id)?.then((response) => {
      setCarrierDetails(response?.data);
    });
  };

  const deleteCarrier = () => {
    setDataSubmitting(true);

    DeleteCarrier(show?.carrierId)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Carrier Deleted : You have successfully Deleted the carrier',
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
        setDataSubmitting(false);
        setShow({ isVisible: false, type: '' });
      });
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
        message: 'Select at least one Carrier',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setDataSubmitting(true);
      BulkDeleteCarriers(selectedItemsForBulkDelete)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: "Carrier's deleted You have successfully deleted carrier's",
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
          setSelectedItemsForBulkDelete([]);
        });
    }
  };

  useEffect(() => {
    if (show?.isVisible && show?.type === 'edit-carrier') {
      getCarrierDetails(show?.carrierId);
    }
  }, [show]);

  useEffect(() => {
    if (carrierDetails?.id) {
      formik.setFieldValue('carrierName', carrierDetails?.attributes?.name);
      formik.setFieldValue('carrierGroup', carrierDetails?.attributes?.carrier_group_id);
      formik.setFieldValue('carrierRegion', carrierDetails?.attributes?.region);
      formik.setFieldValue('carrierIp', carrierDetails?.attributes?.ip);
      formik.setFieldValue('carrierPort', carrierDetails?.attributes?.port);
      formik.setFieldValue(
        'isCarrierCredentialsActive',
        carrierDetails?.attributes?.is_authentication_required
      );
      formik.setFieldValue('username', carrierDetails?.attributes?.username);
      formik.setFieldValue('enable', carrierDetails?.attributes?.is_enabled);
    }
  }, [carrierDetails]);

  useEffect(() => {
    setPaginatedCarriersData({
      isLoading: true,
    });

    ListPaginatedCarriers(searchTerm, page, isEnabled, region, carrierId)?.then((response) => {
      setPaginatedCarriersData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
      response?.data?.map((carrier) => {
        temp.push({ id: parseInt(carrier?.id, 10), type: 'telephony_vendor_carriers' });
        return null;
      });
      setAllAvilableCarriers(temp);

      const normalizedData = normalize(response);
      setNormalizedCarriersListData(normalizedData);
    });
  }, [refresh, page, searchTerm, isFilterApplied]);

  useEffect(() => {
    ListAllCarrierGroups()?.then((response) => {
      setAllCarrierGroups(response?.data);
    });

    GetCountries().then((response) => {
      setCountries(response?.data);
    });

    ListAllBatches()?.then((response) => {
      setUnpaginatedBatchList(response?.data);
    });
  }, []);

  useEffect(() => {
    if (isAllCarriersSelected) {
      setSelectedItemsForBulkDelete(allAvilableCarriers);
    } else {
      setSelectedItemsForBulkDelete([]);
    }
  }, [isAllCarriersSelected]);

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
                        <SideMenu active={1} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h6 className="mb-0">Carriers</h6>
                        <p className="mb-0">
                          <span>{paginatedCarrierssData?.meta?.pagination?.total}</span> carriers
                          available
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search carrier"
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
                                  onChange={(e) => {
                                    setRegion(e.target.value.toLowerCase());
                                  }}
                                  value={region || 'select'}
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
                                  onChange={(e) => {
                                    setCarrierId(e.target.value);
                                  }}
                                  value={carrierId || 'select'}
                                >
                                  <option value="select" disabled>
                                    select
                                  </option>
                                  {allCarrierGroups?.map((carrierGroup, index) => (
                                    <option key={index} value={carrierGroup?.id}>
                                      {carrierGroup?.attributes?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-2">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  value="select"
                                  onChange={(e) => {
                                    setIsEnabled(e.target.value);
                                  }}
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
                                      setRegion('');
                                      setIsFilterApplied(false);
                                      setCarrierId('');
                                      setIsEnabled('');
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
                                setRegion('');
                                setCarrierId('');
                                setIsEnabled('');
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
                            id="newCarrier"
                            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px newCarrier"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-carrier' });
                            }}
                          >
                            Add Carrier
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
                                    setShow({ isVisible: true, type: 'bulk-delete-carrier' });
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
                                    //  id="carrierName"
                                    checked={isAllCarriersSelected}
                                    onChange={() => {}}
                                  />
                                  <label
                                    className="text-primary mb-0"
                                    htmlFor="carrierName"
                                    onClick={() => {
                                      setIsAllCarriersSelected(!isAllCarriersSelected);
                                    }}
                                  >
                                    Carrier name
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Region</th>
                              <th scope="col">Carrier IP</th>
                              <th scope="col">Port</th>
                              <th scope="col">Local switch</th>
                              <th scope="col">Carrier group</th>
                              <th scope="col">Batch</th>
                              <th scope="col">Usage</th>
                              <th scope="col">Enable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Data Table Loader start  */}
                            {paginatedCarrierssData?.isLoading && (
                              <tr>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box" />
                                </td>
                                <td>
                                  <div className="check-box"> </div>
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
                            {paginatedCarrierssData?.data?.length > 0 &&
                              paginatedCarrierssData?.data?.map((data) => (
                                <VendorCarriersList
                                  key={data?.id}
                                  carrierId={data?.id}
                                  carrierName={data?.attributes?.name}
                                  carrierGroupId={data?.attributes?.carrier_group_id}
                                  GroupIdName={data?.attributes?.name}
                                  region={data?.attributes?.region}
                                  carriersIp={data?.attributes?.ip}
                                  carriersPort={data?.attributes?.port}
                                  localSwitch={`${data?.relationships?.switches?.data?.length} Switch`}
                                  batch={data?.attributes?.batches_count}
                                  usage={data?.attributes?.usage_amount?.amount}
                                  display="d-none"
                                  setShow={setShow}
                                  enable={data?.attributes?.is_enabled}
                                  normalizedCarriersListData={normalizedCarriersListData}
                                  userName={data?.attributes?.username}
                                  password={data?.attributes?.password}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkDelete={selectedItemsForBulkDelete}
                                />
                              ))}
                          </tbody>
                        </table>
                        {paginatedCarrierssData?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {paginatedCarrierssData?.meta?.pagination?.total > 0 && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedCarrierssData?.meta?.pagination?.current_page}
                          totalPages={paginatedCarrierssData?.meta?.pagination?.total_pages}
                          count={paginatedCarrierssData?.meta?.pagination?.per_page}
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

      <NewCarrierModal />

      <CarrierCredentials
        show={show?.isVisible && show?.type === 'view-credentials-carrier'}
        setShow={setShow}
        carrierName={show?.carrierName}
        userName={show?.userName}
        password={show?.password}
      />

      <AddCarrier
        show={show?.isVisible && show?.type === 'add-carrier'}
        setShow={setShow}
        formik={formik}
        allCarrierGroups={allCarrierGroups}
        dataSubmitting={dataSubmitting}
        unpaginatedBatchList={unpaginatedBatchList}
        countries={countries}
      />
      <EditCarrier
        show={show?.isVisible && show?.type === 'edit-carrier'}
        setShow={setShow}
        formik={formik}
        allCarrierGroups={allCarrierGroups}
        dataSubmitting={dataSubmitting}
        unpaginatedBatchList={unpaginatedBatchList}
        countries={countries}
      />

      <Delete
        heading="Delete Carrier"
        part1="This action will Delete the carrier"
        part2={show?.carrierPlan?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-carrier'}
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteCarrier}
      />

      <CommonModal
        isVisible={show?.isVisible && show?.type === 'bulk-delete-carrier'}
        title="Delete Carriers"
        actionType="Delete "
        text="the selected carrier's."
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

      <NewCarrierGroup />

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

export default VendorCarriers;
