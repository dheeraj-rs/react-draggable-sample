import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CarrierMRCList from '../components/CarrierMRCList';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import {
  BulkDeleteCarriers,
  CreateCarrier,
  DeleteCarrier,
  ListPaginatedCarriers,
  UpdateCarrier,
} from '../../../common/api-collection/Telephony/VendorCarriers';
import {
  ExportCarriers,
  GetCarrierGroup,
  ListAllCarrierGroups,
} from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import Pagination from '../components/pagination/Pagination';
import { ListCountries } from '../../../common/api-collection/AgentManagemant';
import { isValidIPAddress } from '../../../common/helpers/utils';
import ToastError from '../../../common/components/toast/ToastError';
import EditCarrier from '../components/EditCarrier';
import Delete from '../components/Delete';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';
import CommonModal from '../../../common/components/modals/CommonModal';

function VendorCarrierMRC() {
  const temp = [];

  const params = useParams();

  const [page, setPage] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [show, setShow] = useState({ isVisible: false, type: ' ' });
  const [carrierGroupDetails, setCarrierGroupDetails] = useState();
  const [selectedItemsForBulkAction, setSelectedItemsForBulkAction] = useState([]);
  const [isAllCarriersSelected, setIsAllCarriersSelected] = useState(false);

  const [allCarrierGroups, setAllCarrierGroups] = useState([]);

  const [paginatedCarrierssData, setPaginatedCarriersData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [dataSubmitting, setDataSubmitting] = useState(false);
  const [countries, setCountries] = useState();
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [refresh, setRefresh] = useState(false);

  const [filter, setFilter] = useState({ region: '', enable: '' });
  const [activeFilter, setActiveFilter] = useState({ region: '', enable: '' });
  const [allAvilableCarriers, setAllAvilableCarriers] = useState([]);

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

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

  const handleBulkSelection = (selectedCarrier) => {
    const existingItem = selectedItemsForBulkAction.find(
      (carrier) => carrier?.id === selectedCarrier?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkAction.filter(
        (carrier) => carrier?.id !== selectedCarrier?.id
      );
      setSelectedItemsForBulkAction(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkAction([...selectedItemsForBulkAction, selectedCarrier]);
    }
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

  const bulkDeleteCarriers = () => {
    if (selectedItemsForBulkAction?.length === 0) {
      setToastAction({
        isVisible: true,
        type: 'failed',
        message: 'Select at least one Carrier',
      });
      setShow({ isVisible: false, type: '' });
    } else {
      setDataSubmitting(true);
      BulkDeleteCarriers(selectedItemsForBulkAction)
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
          setSelectedItemsForBulkAction([]);
          setIsAllCarriersSelected(false);
        });
    }
  };

  const handleBulkExport = (type = 'csv') => {
    ExportCarriers(selectedItemsForBulkAction, type)
      .then((res) => {
        const blob = new Blob([res], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'carriers.csv'; // Set the desired file name
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
        setSelectedItemsForBulkAction([]);
        setIsAllCarriersSelected(false);
      });
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

  useEffect(() => {
    setPaginatedCarriersData({
      isLoading: true,
    });

    ListPaginatedCarriers(
      searchTerm,
      page,
      activeFilter?.enable,
      activeFilter?.region,
      params?.groupId
    )?.then((response) => {
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
    });
  }, [page, searchTerm, refresh, activeFilter?.region, activeFilter?.enable]);

  useEffect(() => {
    GetCarrierGroup(params?.groupId)?.then((response) => {
      setCarrierGroupDetails(response?.data);
    });
    ListAllCarrierGroups()?.then((response) => {
      setAllCarrierGroups(response?.data);
    });

    ListCountries().then((response) => {
      if (response?.data) {
        setCountries(response?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isAllCarriersSelected) {
      setSelectedItemsForBulkAction(allAvilableCarriers);
    } else {
      setSelectedItemsForBulkAction([]);
    }
  }, [isAllCarriersSelected]);

  return (
    <Layout
      title="Gsoft admin"
      headerTitle="Gsoft admin"
      favIcon="/assets/admin-logos.svg"
      active="/app/comm-telephony/vendor-carrier-mrc"
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
                    <a href="/comm-telephony/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </a>
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
                        <p className="mb-0 fs-14px">
                          <span className="fw-500">Total MRC</span> -{' '}
                          {carrierGroupDetails?.attributes?.name}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row px-1">
                        <div className="col-lg-4 col-sm-4 col-md-4 col-10">
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
                        <div className="col-lg-2 col-sm-3 col-2 col-md-2 filter-col">
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
                              <div className="d-flex flex-column mt-3">
                                <p className="mb-0">Enabled/disabled</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                  value={filter?.enable || ''}
                                  onChange={(e) => {
                                    setFilter({ enable: e.target.value });
                                  }}
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
                                    href="/"
                                    type="button"
                                    id="roleCancel"
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setActiveFilter({ enable: '', region: '' });
                                      setFilter({ enable: '', region: '' });
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
                                setActiveFilter({ enable: '', region: '' });
                                setFilter({ enable: '', region: '' });
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

                        <div className="col-lg-4 col-10 col-md-5 col-sm-4 d-none">
                          <h5 className="fs-13px bg-chat-blue p-3 rounded px-2 justify-content-center d-flex mt-sm-0 mt-4">
                            Total MRC/MRC(Inc) - 7500/7000
                          </h5>
                        </div>
                        <div className="col-lg-2 col-sm-1 col-md-1 col-2 mt-3 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-end justify-content-lg-end">
                          <div className="dropdown">
                            <a
                              href="/#"
                              className="hor-dots ms-0"
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
                                    handleBulkExport();
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

                      <div className="table-responsive vendor-plans-table">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="check-box">
                                  <input
                                    type="checkbox"
                                    id="groupId"
                                    checked={isAllCarriersSelected}
                                    onChange={() => {}}
                                  />
                                  <label
                                    className="text-primary mb-0"
                                    htmlFor="groupId"
                                    onClick={() => {
                                      setIsAllCarriersSelected(!isAllCarriersSelected);
                                    }}
                                  >
                                    Carrier
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Batch MRC</th>
                              <th scope="col">Batch MRC(Inc)</th>
                              <th scope="col">Last Updated</th>
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
                                  <SpinningLoader />
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
                                <CarrierMRCList
                                  groupId="---"
                                  carrier={data?.attributes?.name}
                                  batch="---"
                                  mrc="---"
                                  createdDate={moment(data?.attributes?.updated_at)?.format(
                                    'DD/MM/YYYY hh:mm A'
                                  )}
                                  formik={formik}
                                  setShow={setShow}
                                  carrierData={data}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkAction={selectedItemsForBulkAction}
                                />
                              ))}
                          </tbody>
                        </table>
                        {paginatedCarrierssData?.data?.length === 0 && <NoMatchingRecords />}
                      </div>

                      {/* <!-- pagination --> */}
                      {paginatedCarrierssData?.meta?.pagination?.total > 0 && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedCarrierssData?.meta?.pagination?.current_page}
                          totalPages={paginatedCarrierssData?.meta?.pagination?.total_pages}
                          count={paginatedCarrierssData?.meta?.pagination?.per_page}
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
        dataSubmitting={dataSubmitting}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteCarrier}
        loading={dataSubmitting}
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
          bulkDeleteCarriers();
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
          {toastAction?.statusCode === 500 ? 'something went wrong!' : toastAction?.message}
        </ToastError>
      )}
    </Layout>
  );
}

export default VendorCarrierMRC;
