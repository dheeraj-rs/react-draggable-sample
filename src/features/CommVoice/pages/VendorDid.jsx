import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import normalize from 'json-api-normalizer';
import moment from 'moment';

import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import NumberAddPlanList from '../components/NumberAddPlanList';

import Pagination from '../components/pagination/Pagination';
import EditRecord from '../components/EditRecord';
import AddNewRecord from '../components/AddNewRecord';
import SetValue from '../components/SetValue';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import PreviewSetValue from '../components/PreviewSetValue';
import SetValueConformationBox from '../components/SetValueConformationBox';
import Delete from '../components/Delete';
import {
  CreateTelephonyVendorNumberPlanRecord,
  ListPaginatedTelephonyVendorNumberPlanRecords,
  SetValuePreviewVendorNumberPlanRecordCopy,
} from '../../../common/api-collection/Telephony/NumberPlanRecords';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import { GetNumberPlans } from '../../../common/api-collection/Telephony/NumberPlans';
import GetCountries from '../../../common/api-collection/Common/Countries';
import GetStates from '../../../common/api-collection/Common/States';
import GetCities from '../../../common/api-collection/Common/Cities';

function VendorDid() {
  const params = useParams();

  const [page, setPage] = useState();

  const [key, setKey] = useState('');

  const [countries, setCountries] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [paginatedData, setPaginatedData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [paginatedDataForPreview, setPaginatedDataForPreview] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [normalizedData, setNormalizedData] = useState();

  const [refresh, setRefresh] = useState(false);

  const [planDetails, setPlanDetails] = useState();

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const validate = (errorData) => {
    const errors = {};

    if (show?.type === 'add-new-record' || show?.type === 'edit-record') {
      if (!errorData.country) {
        errors.country = 'country is required';
      }

      if (!errorData.state) {
        errors.state = 'state is required';
      }

      if (!errorData.city) {
        errors.city = 'city is required';
      }

      if (!errorData.number) {
        errors.number = 'number is required';
      }

      if (!errorData.countryCode) {
        errors.countryCode = 'country code is required';
      }

      if (!errorData.channels) {
        errors.channels = 'channels is required';
      }

      if (!errorData.prefix) {
        errors.prefix = 'prefix is required';
      }

      if (!errorData.mrc) {
        errors.mrc = 'mrc is required';
      }
    }

    // if (show?.type === 'set-value') {
    //   if (!errorData.field) {
    //     errors.field = 'select a field';
    //   }
    //   if (!errorData.rate) {
    //     errors.rate = 'rate is required';
    //   }
    //   if (!errorData.effectiveDate) {
    //     errors.effectiveDate = 'effective date is required';
    //   }
    //   if (!errorData.filterBy) {
    //     errors.filterBy = 'select a filter';
    //   }
    //   if (!errorData.all) {
    //     errors.all = 'required';
    //   }
    // }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      // for add-new-record modal
      country: '',
      state: '',
      city: '',
      number: '',
      countryCode: '',
      channels: '',
      prefix: '',
      mrc: '',

      // for set-value modal
      field: '',
      rate: '',
      effectiveDate: '',
      filterBy: '',
      all: '',
    },
    validate,
    onSubmit: () => {
      setDataSubmitting(true);
      if (show?.type === 'add-new-record') {
        const data = {
          type: 'telephony_vendor_number_plan_records',
          attributes: {
            number_plan_id: params?.planId,
            country_id: parseInt(formik?.values?.country, 10),
            state_id: parseInt(formik?.values?.state, 10),
            city_id: parseInt(formik?.values?.city, 10),
            number_international: '+919999999991',
            number: formik?.values?.number,
            country_code: formik?.values?.countryCode,
            channels: parseInt(formik?.values?.channels, 10),
            prefix: formik?.values?.prefix,
            monthly_recurring_cost: formik?.values?.mrc,
          },
        };

        CreateTelephonyVendorNumberPlanRecord(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Saved : You have successfully added the record',
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
      } else if (show?.type === 'set-value-preview') {
        setPaginatedDataForPreview({ isLoading: true });
        ListPaginatedTelephonyVendorNumberPlanRecords(
          key,
          page,
          formik?.values?.country,
          formik?.values?.state,
          formik?.values?.city,
          formik?.values?.mrc,
          formik?.values?.channels,
          params.planId
        )?.then((response) => {
          setPaginatedDataForPreview({
            data: response?.data,
            links: response?.links,
            meta: response?.meta,
            isLoading: false,
          });
        });
      }

      if (show?.type === 'edit-record') {
        setToastAction({
          isVisible: true,
          message: 'Saved : You have successfully saved the changes',
          type: 'success',
        });
        setShow({ isVisible: false, type: ' ' });
      }
    },
  });

  const handleSetValue = () => {
    setDataSubmitting(true);
    const data = {
      type: 'telephony_vendor_number_plan_records',
      attributes: {
        country_id: parseInt(formik?.values?.country, 10),
        state_id: parseInt(formik?.values?.state, 10),
        city_id: parseInt(formik?.values?.city, 10),
        key: formik?.values?.field,
        value: formik?.values?.rate,
      },
    };
    SetValuePreviewVendorNumberPlanRecordCopy(data)
      ?.then(() => {
        setToastAction({
          isVisible: true,
          message: 'Plan Updated : You have successfully updated the value',
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
  };

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const handlePaginationFunctionPreview = () => {};

  useEffect(() => {
    setPaginatedData({ isLoading: true });
    ListPaginatedTelephonyVendorNumberPlanRecords(key, page, params.planId)?.then((response) => {
      setPaginatedData({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });
      setNormalizedData(normalize(response));
    });
  }, [key, page, refresh]);

  useEffect(() => {
    if (params?.planId) {
      GetNumberPlans(params?.planId)?.then((response) => {
        setPlanDetails(response?.data);
      });

      GetCountries().then((response) => {
        setCountries(response?.data);
      });
    }
  }, [params?.planId]);

  useEffect(() => {
    if (formik.values.country) {
      GetStates(formik.values.country)?.then((response) => {
        setStates(response?.data);
      });
    }
  }, [formik.values.country]);

  useEffect(() => {
    if (formik.values.state) {
      GetCities(formik.values.country, formik.values.state)?.then((response) => {
        setCities(response?.data);
      });
    }
  }, [formik.values.state]);

  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="row carrier-pad mb-3 pt-3 pt-sm-0">
                <div className="col-12 col-sm-6 d-flex align-items-center">
                  <div className="bg-dark-gray-color left-widget d-none d-sm-block">
                    <Link
                      to="/comm-telephony/vendor-did-plan/"
                      className="d-flex justify-content-center"
                    >
                      <img src="/assets/leftback.svg" alt="" />
                    </Link>
                  </div>
                  <div>
                    <h5 className="fs-16px fw-500 d-flex gap-3 mb-0">
                      <Link to="/comm-telephony/vendor-did-plan/" className="d-block d-sm-none">
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </Link>
                      {planDetails?.attributes?.name}
                    </h5>
                  </div>
                </div>

                <div className="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-end mt-3 mt-sm-0" />
              </div>

              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex align-items-center mt-lg-2 mt-2 mt-sm-4 mb-3 row">
                        <div className="col-10 col-sm-4 col-lg-3">
                          <SearchWithBorder
                            placeholderText="Search"
                            onChange={(e) => {
                              setKey(e.target.value);
                            }}
                            clearBtn={() => {
                              setKey('');
                            }}
                            searchTerm={key}
                          />
                        </div>
                        <div className="col-2 col-sm-2 col-lg-2 filter-col d-flex">
                          <div id="roleSelection" className="filter-wrap">
                            <button
                              type="button"
                              id="vendorFilter"
                              data-bs-toggle="collapse"
                              data-bs-target="#vendorSearchResult"
                              aria-expanded="false"
                              aria-controls="vendorSearchResult"
                              className="filter-btn p-10px fw-medium rounded-3 border vendorFilter"
                            >
                              <span className="filter-text">Filter</span>
                              <img
                                className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                                src="/assets/black-filter.svg"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-7 col-sm-6 col-12 mt-3 mt-sm-0 text-end d-flex gap-3 align-items-center justify-content-between justify-content-start justify-content-sm-end">
                          <a
                            href="/#"
                            // data-bs-toggle="offcanvas"
                            // data-bs-target="#offcanvasSetRole"
                            // aria-controls="offcanvasSetRole"
                            id="newCarrier"
                            className="blue-btn d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-blue-active px-4 py-12px"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'set-value' });
                            }}
                          >
                            Set Value
                          </a>
                          <a
                            href="/#"
                            // data-bs-toggle="modal"
                            // data-bs-target="#addNewRecord"
                            id="setRoleCanwas"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-new-record' });
                            }}
                          >
                            Add New
                          </a>
                          <div className="dropdown">
                            <a href="/#" data-bs-toggle="dropdown">
                              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                <img src="/assets/dot-menu-black.svg" alt="# " />
                              </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                              <li>
                                <a
                                  href="/#"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#updateHistory"
                                  aria-controls="offcanvasversionHistoryLabel"
                                  className="dropdown-item py-3 px-2"
                                >
                                  <img
                                    className="me-2"
                                    src="/assets/ClockCounterClockwise.svg"
                                    alt=""
                                  />
                                  Update history
                                </a>
                              </li>

                              <li>
                                <a
                                  href="/#"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasImport"
                                  aria-controls="offcanvasImport"
                                  className="dropdown-item py-3 px-3"
                                >
                                  <img className="me-2" src="/assets/import_icon.svg" alt="" />
                                  Import
                                </a>
                              </li>

                              <li>
                                <a
                                  href="/#"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasMapBot"
                                  className="dropdown-item py-3 px-3"
                                >
                                  <img className="me-2" src="/assets/coulmn-selcter.svg" alt="" />
                                  Column selector
                                </a>
                              </li>

                              <li>
                                <Link
                                  to="/comm-telephony/vendor-did-export/"
                                  className="dropdown-item py-3 px-3"
                                >
                                  <img className="me-2" src="/assets/Export.svg" alt="" />
                                  Export
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* <!-- search list starts --> */}
                      <div className="vendor-search-wrap mb-4 ">
                        <div
                          className="collapse vendor-result bg-white rounded-3 p-4 collapse"
                          id="vendorSearchResult"
                        >
                          <div className="">
                            <div className="row align-items-center mb-3">
                              {/* <!-- value set on --> */}
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      MRC:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div className="selectBtn" data-type="firstOption">
                                        Enter MRC
                                      </div>
                                      <div className="selectDropdown">
                                        <div className="option" data-type="firstOption">
                                          Current value
                                        </div>
                                        <div className="option" data-type="secondOption">
                                          Future value
                                        </div>
                                        <div className="option" data-type="fourthOption">
                                          Old value
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      Channels:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div className="selectBtn" data-type="firstOption">
                                        Enter channels
                                      </div>
                                      <div className="selectDropdown">
                                        <div className="option" data-type="firstOption">
                                          Sell Rate
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <!-- area code --> */}
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      Status:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div className="selectBtn" data-type="firstOption">
                                        Select status
                                      </div>
                                      <div className="selectDropdown">
                                        <div className="option" data-type="firstOption">
                                          All
                                        </div>
                                        <div className="option" data-type="secondOption">
                                          Assigned
                                        </div>
                                        <div className="option" data-type="fourthOption">
                                          Unassigned
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <!-- change starts --> */}
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      Country :
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div className="selectBtn" data-type="firstOption">
                                        Select country
                                      </div>
                                      <div className="selectDropdown">
                                        <div className="option" data-type="secondOption">
                                          India
                                        </div>
                                        <div className="option" data-type="secondOption">
                                          Sweden
                                        </div>

                                        <div className="option" data-type="thirdOption">
                                          Australia
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row align-items-center mb-3">
                              {/* <!-- country starts --> */}

                              {/* <!-- state starts --> */}
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      State:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div className="selectBtn" data-type="firstOption">
                                        Select state
                                      </div>
                                      <div className="selectDropdown">
                                        <div className="option" data-type="firstOption">
                                          State 1
                                        </div>
                                        <div className="option" data-type="secondOption">
                                          State 2
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <!-- city starts --> */}
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      City:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div className="selectBtn" data-type="firstOption">
                                        Select City
                                      </div>
                                      <div className="selectDropdown">
                                        <div className="option" data-type="firstOption">
                                          City 1
                                        </div>
                                        <div className="option" data-type="secondOption">
                                          City 2
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className=" d-flex gap-3 align-items-center justify-content-end">
                              <button
                                type="button"
                                className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                              >
                                Apply
                              </button>
                              <div>
                                <a
                                  href="/#"
                                  className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                                >
                                  Reset
                                </a>
                              </div>
                              <a
                                href="/#"
                                type="button"
                                id="roleCancel"
                                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                              >
                                Clear
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- search ends --> */}

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="check-box">
                                  <input type="checkbox" id="carrierName" />
                                  <label className="text-primary mb-0" htmlFor="carrierName">
                                    Number
                                  </label>
                                </div>
                              </th>

                              <th scope="col">MRC</th>
                              <th scope="col">Channels</th>
                              <th scope="col">Country</th>
                              <th scope="col">State</th>
                              <th scope="col">City</th>

                              <th scope="col">Status</th>
                              <th scope="col">Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {/* Data Table Loader start  */}
                            {paginatedDataForPreview?.isLoading && (
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

                            {paginatedData?.data?.length > 0 &&
                              paginatedData?.data?.map((plan, index) => (
                                <NumberAddPlanList
                                  key={index}
                                  carrierDateId="date1"
                                  number={plan?.attributes?.number_international}
                                  mrc={parseFloat(
                                    plan?.attributes?.monthly_recurring_cost,
                                    10
                                  )?.toFixed(2)}
                                  channel={plan?.attributes?.channels}
                                  region={
                                    normalizedData?.country[plan?.attributes?.country_id]
                                      ?.attributes?.name
                                  }
                                  state={
                                    normalizedData?.state[plan?.attributes?.state_id]?.attributes
                                      ?.name
                                  }
                                  city={
                                    normalizedData?.city[plan?.attributes?.city_id]?.attributes
                                      ?.name
                                  }
                                  status="---"
                                  carrierDate={moment(plan?.attributes?.created_at)?.format(
                                    'DD-MM-YYYY'
                                  )}
                                  setShow={setShow}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {paginatedData?.meta?.pagination != null && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedData?.meta?.pagination?.current_page}
                          totalPages={paginatedData?.meta?.pagination?.total_pages}
                          count={paginatedData?.meta?.pagination?.per_page}
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

      <AddNewRecord
        show={show?.isVisible && show?.type === 'add-new-record'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        countries={countries}
        states={states}
        cities={cities}
        dataSubmitting={dataSubmitting}
      />

      <EditRecord
        show={show?.isVisible && show?.type === 'edit-record'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        data={show?.data}
      />

      <SetValue
        show={show?.isVisible && show?.type === 'set-value'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        countries={countries}
        states={states}
        cities={cities}
        dataSubmitting={dataSubmitting}
        setShow={setShow}
      />

      <PreviewSetValue
        show={show?.isVisible && show?.type === 'set-value-preview'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        setShow={setShow}
        formik={formik}
        planName={planDetails?.attributes?.name}
        paginatedDataForPreview={paginatedDataForPreview}
        normalizedData={normalizedData}
        handlePaginationFunctionPreview={handlePaginationFunctionPreview}
      />

      <SetValueConformationBox
        show={show?.isVisible && show?.type === 'set-value-confirm'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        handleSetValue={handleSetValue}
      />

      <Delete
        heading="Delete DID/TF Plan"
        part1="This action will Delete the switch "
        part2={show?.data?.name}
        tail=" from the list ."
        show={show?.isVisible && show?.type === 'delete-plan'}
        dataSubmitting={false}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={() => {
          setToastAction({
            isVisible: true,
            message: 'Deleted : You have successfully deleted the switch',
            type: 'success',
          });
          setShow({ isVisible: false, type: ' ' });
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

export default VendorDid;
