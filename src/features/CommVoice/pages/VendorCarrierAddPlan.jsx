import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import normalize from 'json-api-normalizer';

import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import AddPlanList from '../components/AddPlanList';
import {
  CreateCarrierPlanRateSheet,
  DeleteCarrierPlanRateSheet,
  DisableCarrierPlanRateSheet,
  EnableCarrierPlanRateSheet,
  ExportCarrierPlanRateSheet,
  ListPaginatedCarrierPlanRateSheets,
  ListUpdatedDatesForRateSheets,
  UpdateCarrierPlanRateSheet,
} from '../../../common/api-collection/Telephony/CarrierPlanRateSheets';
import AddNewCarrierPlanRecord from '../components/AddNewCarrierPlanRecord';
import GetCountries from '../../../common/api-collection/Common/Countries';
import GetStates from '../../../common/api-collection/Common/States';
import GetCities from '../../../common/api-collection/Common/Cities';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import { GetCarrierPlan } from '../../../common/api-collection/Telephony/CarrierPlans';
import Pagination from '../components/pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import CarrierPlanRateSetValue from '../components/CarrierPlanRateSetValue';
import { handleKeyPressForNumber } from '../../../common/helpers/utils';
import CommonModal from '../../../common/components/modals/CommonModal';
import Delete from '../components/Delete';
import EditCarrierPlanRateSheet from '../components/EditCarrierPlanRateSheet';
import UpdateHistory from '../components/UpdateHistory';
import ImportPlan from '../components/ImportPlan';
import ColumnSelector from '../components/ColumnSelector';

function VendorCarrierAddPlan() {
  const params = useParams();
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [paginatedCarriersPlanRates, setPaginatedCarriersPlanRates] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [show, setShow] = useState({ isVisible: false, type: '' });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [dataSubmitting, setDataSubmitting] = useState(false);

  const [carrierPlanDetails, setCarrierPlanDetails] = useState();

  const [searchTerm, setSearchTerm] = useState('');

  const [normalizedData, setNormalizedData] = useState();

  const [page, setPage] = useState();

  const [isToggled, setIsToggled] = useState({ type: 'country', isVisible: false });

  const [filter, setFilter] = useState({
    valueSetOn: '',
    valueOf: '',
    areaCode: '',
    change: '',
    country: { name: '', id: '' },
    state: { name: '', id: '' },
    city: { name: '', id: '' },
  });

  const [activeFilter, setActiveFilter] = useState({
    valueSetOn: '',
    valueOf: '',
    areaCode: '',
    change: '',
    country: { name: '', id: '' },
    state: { name: '', id: '' },
    city: { name: '', id: '' },
  });

  const [selectedItemsForBulkSelection, setSelectedItemsForBulkSelection] = useState([]);

  const [updateHistoryFilter, setUpdateHistoryFilter] = useState({
    year: moment().year(),
    month: moment().format('M'),
  });
  const [updateHistory, setUpdateHistory] = useState([]);

  const handleActiveFilter = () => {
    setActiveFilter({
      ...activeFilter,
      country: { id: filter.country.id },
      state: { id: filter.state.id },
      city: { id: filter.city.id },
      areaCode: filter.areaCode,
    });
  };

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  const validate = (data) => {
    const errors = {};

    if (show?.type === 'add-new-record') {
      if (!data.country) {
        errors.country = 'country is required';
      }
      if (!data.state) {
        errors.state = 'state is required';
      }
      if (!data.city) {
        errors.city = 'city is required';
      }
      if (!data.areaCode) {
        errors.areaCode = 'area code is required';
      }

      if (!data.buyRate) {
        errors.buyRate = 'buy rate is required';
      }
      if (!data.buyEffectiveOn) {
        errors.buyEffectiveOn = 'effective on is required';
      }
      if (!data.buyStarPulse) {
        errors.buyStarPulse = 'start pulse is required';
      }
      if (!data.buyNextPluse) {
        errors.buyNextPluse = 'next pulse is required';
      }

      if (!data.sellRate) {
        errors.sellRate = 'sell rate is required';
      }
      if (!data.sellEffectiveOn) {
        errors.sellEffectiveOn = 'effective on is required';
      }
      if (!data.sellStarPulse) {
        errors.sellStarPulse = 'start pulse is required';
      }
      if (!data.sellNextPluse) {
        errors.sellNextPluse = 'next pulse is required';
      }
    } else if (show?.type === 'set-value') {
      if (!data.selectField) {
        errors.selectField = 'required';
      }
      if (!data.setValueTo) {
        errors.setValueTo = 'required';
      }
      if (!data.startPulse) {
        errors.startPulse = 'required';
      }
      if (!data.nextPulse) {
        errors.nextPulse = 'required';
      }
      if (!data.effectiveDate) {
        errors.effectiveDate = 'required';
      }

      if (!data.applyValueFilterByType) {
        errors.applyValueFilterByType = 'required';
      }
      if (!data.applyValueFilterBySelectType) {
        errors.applyValueFilterBySelectType = 'required';
      }
    }

    return errors;
  };

  const changePlanStatus = () => {
    if (show?.type === 'enable-carrier-plan-rate-sheet') {
      setDataSubmitting(true);
      EnableCarrierPlanRateSheet(show?.id)
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
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
        });
    } else if (show?.type === 'disable-carrier-plan-rate-sheet') {
      setDataSubmitting(true);
      DisableCarrierPlanRateSheet(show?.id)
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
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const deleteCarrierPlanRateSheet = () => {
    setDataSubmitting(true);
    if (show?.id) {
      DeleteCarrierPlanRateSheet(show?.id)
        ?.then(() => {
          setToastAction({
            isVisible: true,
            message: 'Deleted : You have successfully deleted',
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
        ?.finally(() => {
          setDataSubmitting(false);
          setShow({ isVisible: false, type: '' });
        });
    }
  };

  const handleBulkExport = (type) => {
    ExportCarrierPlanRateSheet(selectedItemsForBulkSelection, type).then((res) => {
      const blob = new Blob([res], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CarrierPlanRateSheet.csv'; // Set the desired file name
      // Trigger the click event to start the download
      a.click();
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    });
  };

  const formik = useFormik({
    initialValues: {
      country: '',
      state: '',
      city: '',
      areaCode: '',

      buyRate: '',
      buyEffectiveOn: '',
      buyStarPulse: '',
      buyNextPluse: '',

      sellRate: '',
      sellEffectiveOn: '',
      sellStarPulse: '',
      sellNextPluse: '',

      enable: false,

      selectField: '',
      setValueTo: '',
      startPulse: '',
      nextPulse: '',
      effectiveDate: '',
      applyValueFilterByType: '',
      applyValueFilterBySelectType: '',
    },
    validate,
    onSubmit: () => {
      if (show?.type === 'add-new-record') {
        setDataSubmitting(true);

        const data = {
          type: 'telephony_vendor_carrier_plan_rate_sheets',
          attributes: {
            carrier_plan_id: params.id,
            country_id: formik.values.country,
            state_id: formik.values.state,
            city_id: formik.values.city,
            area_code: formik.values.areaCode,
            is_enabled: formik.values.enable,
            buy_rate: {
              rate: formik.values.buyRate,
              effective_on: moment(formik.values.buyEffectiveOn).format('YYYY-MM-DD'),
              start_pulse: formik.values.buyStarPulse,
              next_pulse: formik.values.buyNextPluse,
            },
            sell_rate: {
              rate: formik.values.sellRate,
              effective_on: moment(formik.values.sellEffectiveOn).format('YYYY-MM-DD'),
              start_pulse: formik.values.sellStarPulse,
              next_pulse: formik.values.sellNextPluse,
            },
          },
        };

        CreateCarrierPlanRateSheet(data)
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
            setDataSubmitting(false);
          });
      } else if (show?.type === 'edit-carrier-rate-sheet') {
        setDataSubmitting(true);

        const data = {
          type: 'telephony_vendor_carrier_plan_rate_sheets',
          id: parseInt(show?.id, 10),
          attributes: {
            carrier_plan_id: params.id,
            country_id: formik.values.country,
            state_id: formik.values.state,
            city_id: formik.values.city,
            area_code: formik.values.areaCode,
            is_enabled: formik.values.enable,
            buy_rate: {
              rate: formik.values.buyRate,
              effective_on: moment(formik.values.buyEffectiveOn).format('YYYY-MM-DD'),
              start_pulse: formik.values.buyStarPulse,
              next_pulse: formik.values.buyNextPluse,
            },
            sell_rate: {
              rate: formik.values.sellRate,
              effective_on: moment(formik.values.sellEffectiveOn).format('YYYY-MM-DD'),
              start_pulse: formik.values.sellStarPulse,
              next_pulse: formik.values.sellNextPluse,
            },
          },
        };

        UpdateCarrierPlanRateSheet(data)
          ?.then(() => {
            setToastAction({
              isVisible: true,
              message: 'Saved : You have successfully saved the changes',
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
                message: error?.response?.data?.message
                  ? error?.response?.data?.message
                  : 'Something went wrong.',
                type: 'failed',
              });
            }
          })
          .finally(() => {
            setDataSubmitting(false);
          });
      }
    },
  });

  const handleBulkSelection = (selectedplans) => {
    const existingItem = selectedItemsForBulkSelection.find(
      (plan) => plan?.id === selectedplans?.id
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedItemsForBulkSelection.filter(
        (plan) => plan?.id !== selectedplans?.id
      );
      setSelectedItemsForBulkSelection(newArray);
    } else {
      // If the value is not present, add it
      setSelectedItemsForBulkSelection([...selectedItemsForBulkSelection, selectedplans]);
    }
  };

  useEffect(() => {
    GetCountries()?.then((response) => {
      setCountries(response?.data);
    });

    GetCarrierPlan(params.id)?.then((response) => {
      setCarrierPlanDetails(response);
    });
  }, []);

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

  useEffect(() => {
    setPaginatedCarriersPlanRates({
      isLoading: true,
    });

    ListPaginatedCarrierPlanRateSheets(
      searchTerm,
      page,
      '',
      activeFilter?.country?.id,
      activeFilter?.state?.id,
      activeFilter?.city?.id,
      activeFilter?.areaCode,
      ''
    )?.then((response) => {
      setPaginatedCarriersPlanRates({
        data: response?.data,
        links: response?.links,
        meta: response?.meta,
        isLoading: false,
      });

      const normalized = normalize(response);
      setNormalizedData(normalized);
    });
  }, [searchTerm, refresh, page, activeFilter]);

  useEffect(() => {
    if (formik.values.selectField === 'Buying Rate') {
      formik.setFieldValue('startPulse', show?.rateSheetDetails?.buy?.startPluse);
      formik.setFieldValue('nextPulse', show?.rateSheetDetails?.buy?.nextPulse);
      formik.setFieldValue('effectiveDate', show?.rateSheetDetails?.buy?.effectiveDate);
    } else if (formik.values.selectField === 'Selling Rate') {
      formik.setFieldValue('startPulse', show?.rateSheetDetails?.sell?.startPluse);
      formik.setFieldValue('nextPulse', show?.rateSheetDetails?.sell?.nextPulse);
      formik.setFieldValue('effectiveDate', show?.rateSheetDetails?.sell?.effectiveDate);
    }

    if (formik.values.applyValueFilterByType === 'city') {
      formik.setFieldValue('city', show?.rateSheetDetails?.city);
    } else if (formik.values.applyValueFilterByType === 'state') {
      formik.setFieldValue('state', show?.rateSheetDetails?.state);
    } else if (formik.values.applyValueFilterByType === 'area') {
      formik.setFieldValue('areaCode', show?.rateSheetDetails?.areaCode);
    }
  }, [formik.values.selectField]);

  useEffect(() => {
    if (updateHistoryFilter.year && updateHistoryFilter.month) {
      ListUpdatedDatesForRateSheets(updateHistoryFilter.year, updateHistoryFilter.month)?.then(
        (response) => {
          setUpdateHistory(response);
        }
      );
    }
  }, [updateHistoryFilter]);

  useEffect(() => {
    if (isAllSelected) {
      paginatedCarriersPlanRates?.data?.map((response) => {
        setSelectedItemsForBulkSelection((prevArray) => [
          ...prevArray,
          { id: parseInt(response?.id, 10), type: 'telephony_vendor_carrier_plan_rate_sheets' },
        ]);
        return null;
      });
    } else {
      setSelectedItemsForBulkSelection([]);
    }
  }, [isAllSelected]);
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
                      to="/comm-telephony/vendor-carrier-plan/"
                      className="d-flex justify-content-center"
                    >
                      <img src="/assets/leftback.svg" alt="" />
                    </Link>
                  </div>
                  <div>
                    <h5 className="fs-16px fw-500 d-flex gap-3 mb-0">
                      <a href="/comm-telephony/vendor-carrier-plan/" className="d-block d-sm-none">
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </a>{' '}
                      {carrierPlanDetails?.data?.attributes?.name}
                    </h5>
                  </div>
                </div>
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
                              setSearchTerm(e.target.value);
                            }}
                            clearBtn={() => {
                              setSearchTerm('');
                            }}
                            searchTerm={searchTerm}
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
                            id="setRoleCanwas"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow({ isVisible: true, type: 'add-new-record' });
                            }}
                          >
                            Add New
                          </a>
                          <div className="dropdown d-none">
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
                                  href="/comm-telephony/vendor-carrier-export-preview"
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
                            </ul>
                          </div>
                          <div className="dropdown">
                            <a
                              href="/#"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                              className="show"
                            >
                              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                <img src="/assets/dot-menu-black.svg" alt="# " />
                              </span>
                            </a>
                            <ul
                              className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3 show"
                              data-popper-placement="bottom-end"
                              style={{
                                position: 'absolute',
                                inset: '0px 0px auto auto',
                                margin: '0',
                                transform: 'translate(0px, 41px)',
                              }}
                            >
                              <a
                                href="/#"
                                data-bs-toggle="dropdown"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                {' '}
                              </a>
                              <li>
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'update-history' });
                                  }}
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
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'import' });
                                  }}
                                  className="dropdown-item py-3 px-3"
                                >
                                  <img className="me-2" src="/assets/import_icon.svg" alt="" />
                                  Import
                                </a>
                              </li>

                              <li>
                                <a
                                  href="/#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShow({ isVisible: true, type: 'column-selector' });
                                  }}
                                  className="dropdown-item py-3 px-3"
                                >
                                  <img className="me-2" src="/assets/coulmn-selcter.svg" alt="" />
                                  Column selector
                                </a>
                              </li>

                              <li>
                                <Link
                                  to={`/comm-telephony/vendor-carrier-export-preview/${params.id}`}
                                  className="dropdown-item py-3 px-3"
                                >
                                  <img className="me-2" src="/assets/Export.svg" alt="" />
                                  Export
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div />
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
                                      Value set on:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div
                                        className="selectBtn"
                                        data-type="firstOption"
                                        onClick={() => {
                                          setIsToggled({
                                            type: 'valueSetOn',
                                            isVisible: !isToggled.isVisible,
                                          });
                                        }}
                                      >
                                        {filter.valueSetOn || 'select'}
                                      </div>
                                      <div
                                        className={`selectDropdown ${
                                          isToggled?.type === 'valueSetOn' &&
                                          isToggled.isVisible === true
                                            ? 'toggle'
                                            : ''
                                        }`}
                                      >
                                        <div
                                          className="option"
                                          data-type="firstOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueSetOn: 'All' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          All
                                        </div>
                                        <div
                                          className="option"
                                          data-type="firstOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueSetOn: 'Current value' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          Current value
                                        </div>
                                        <div
                                          className="option"
                                          data-type="secondOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueSetOn: 'Future value' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          Future value
                                        </div>
                                        <div
                                          className="option"
                                          data-type="fourthOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueSetOn: 'Old value' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
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
                                      Value of:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div
                                        className="selectBtn"
                                        data-type="firstOption"
                                        onClick={() => {
                                          setIsToggled({
                                            type: 'valueOf',
                                            isVisible: !isToggled.isVisible,
                                          });
                                        }}
                                      >
                                        {filter.valueOf || 'select'}
                                      </div>
                                      <div
                                        className={`selectDropdown ${
                                          isToggled?.type === 'valueOf' &&
                                          isToggled.isVisible === true
                                            ? 'toggle'
                                            : ''
                                        }`}
                                      >
                                        <div
                                          className="option"
                                          data-type="firstOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueOf: 'All' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          All
                                        </div>
                                        <div
                                          className="option"
                                          data-type="firstOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueOf: 'Buy Rate' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          Buy Rate
                                        </div>
                                        <div
                                          className="option"
                                          data-type="firstOption"
                                          onClick={() => {
                                            setFilter({ ...filter, valueOf: 'Sell Rate' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
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
                                      Area code:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <input
                                      type="text"
                                      placeholder="Enter Code"
                                      className="form-control bg-white"
                                      onChange={(e) => {
                                        setFilter({ ...filter, areaCode: e.target.value });
                                      }}
                                      value={filter?.areaCode || ''}
                                      onKeyPress={handleKeyPressForNumber}
                                    />
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
                                      Change:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div
                                        className="selectBtn"
                                        data-type="firstOption"
                                        onClick={() => {
                                          setIsToggled({
                                            type: 'change',
                                            isVisible: !isToggled.isVisible,
                                          });
                                        }}
                                      >
                                        {filter.change || 'select'}
                                      </div>
                                      <div
                                        className={`selectDropdown ${
                                          isToggled?.type === 'change' &&
                                          isToggled.isVisible === true
                                            ? 'toggle'
                                            : ''
                                        }`}
                                      >
                                        <div
                                          className="option"
                                          data-type="secondOption"
                                          onClick={() => {
                                            setFilter({ ...filter, change: 'All' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          All
                                        </div>
                                        <div
                                          className="option"
                                          data-type="secondOption"
                                          onClick={() => {
                                            setFilter({ ...filter, change: 'Increased' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          Increased
                                        </div>
                                        <div
                                          className="option"
                                          data-type="secondOption"
                                          onClick={() => {
                                            setFilter({ ...filter, change: 'Decreased' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          Decreased
                                        </div>

                                        <div
                                          className="option"
                                          data-type="thirdOption"
                                          onClick={() => {
                                            setFilter({ ...filter, change: 'No Changes' });
                                            setIsToggled({ type: '', isVisible: false });
                                          }}
                                        >
                                          No Changes
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row align-items-center mb-3">
                              {/* <!-- country starts --> */}
                              <div className="col-lg-3 col-sm-6">
                                <div className="row align-items-center">
                                  <div className="col-lg-4">
                                    <label
                                      className="w-100 text-primary fw-500 text-start text-lg-end"
                                      htmlFor="value-set"
                                    >
                                      Country:
                                    </label>
                                  </div>

                                  <div className="col-lg-8">
                                    <div className="select mb-0">
                                      <div
                                        className="selectBtn"
                                        data-type="firstOption"
                                        onClick={() => {
                                          setIsToggled({
                                            type: 'country',
                                            isVisible: !isToggled.isVisible,
                                          });
                                        }}
                                      >
                                        {filter?.country?.name || 'select'}
                                      </div>
                                      <div
                                        className={`selectDropdown ${
                                          isToggled?.type === 'country' &&
                                          isToggled.isVisible === true
                                            ? 'toggle'
                                            : ''
                                        }`}
                                        style={{ maxHeight: '200px', overflowY: 'scroll' }}
                                      >
                                        {countries?.map((country) => (
                                          <div
                                            className="option"
                                            data-type="firstOption"
                                            onClick={() => {
                                              setFilter({
                                                ...filter,
                                                country: {
                                                  name: country.attributes.name,
                                                  id: country.id,
                                                },
                                              });
                                              formik.setFieldValue('country', country.id);
                                              setIsToggled({ type: '', isVisible: false });
                                            }}
                                          >
                                            {country?.attributes?.name}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

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
                                      <div
                                        className="selectBtn"
                                        data-type="firstOption"
                                        onClick={() => {
                                          setIsToggled({
                                            type: 'state',
                                            isVisible: !isToggled.isVisible,
                                          });
                                        }}
                                      >
                                        {filter?.state?.name || 'select'}
                                      </div>
                                      <div
                                        className={`selectDropdown ${
                                          isToggled?.type === 'state' &&
                                          isToggled.isVisible === true
                                            ? 'toggle'
                                            : ''
                                        }`}
                                        style={{ maxHeight: '200px', overflowY: 'scroll' }}
                                      >
                                        {states?.map((state) => (
                                          <div
                                            className="option"
                                            data-type="firstOption"
                                            onClick={() => {
                                              setFilter({
                                                ...filter,
                                                state: {
                                                  name: state.attributes.name,
                                                  id: state.id,
                                                },
                                              });
                                              formik.setFieldValue('state', state.id);
                                              setIsToggled({ type: '', isVisible: false });
                                            }}
                                          >
                                            {state?.attributes?.name}
                                          </div>
                                        ))}
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
                                      <div
                                        className="selectBtn"
                                        data-type="firstOption"
                                        onClick={() => {
                                          setIsToggled({
                                            type: 'city',
                                            isVisible: !isToggled.isVisible,
                                          });
                                        }}
                                      >
                                        {filter?.city?.name || 'select'}
                                      </div>
                                      <div
                                        className={`selectDropdown ${
                                          isToggled?.type === 'city' && isToggled.isVisible === true
                                            ? 'toggle'
                                            : ''
                                        }`}
                                        style={{ maxHeight: '200px', overflowY: 'scroll' }}
                                      >
                                        {cities?.map((city) => (
                                          <div
                                            className="option"
                                            data-type="firstOption"
                                            onClick={() => {
                                              setFilter({
                                                ...filter,
                                                city: {
                                                  name: city.attributes.name,
                                                  id: city.id,
                                                },
                                              });
                                              formik.setFieldValue('city', city.id);
                                              setIsToggled({ type: '', isVisible: false });
                                            }}
                                          >
                                            {city?.attributes?.name}
                                          </div>
                                        ))}
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
                                onClick={() => {
                                  handleActiveFilter();
                                }}
                              >
                                Apply
                              </button>
                              <div>
                                <a
                                  href="/#"
                                  className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setFilter({
                                      valueSetOn: '',
                                      valueOf: '',
                                      areaCode: '',
                                      change: '',
                                      country: { name: '', id: '' },
                                      state: { name: '', id: '' },
                                      city: { name: '', id: '' },
                                    });
                                  }}
                                >
                                  Reset
                                </a>
                              </div>
                              <a
                                href="/#"
                                type="button"
                                id="roleCancel"
                                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFilter({
                                    valueSetOn: '',
                                    valueOf: '',
                                    areaCode: '',
                                    change: '',
                                    country: { name: '', id: '' },
                                    state: { name: '', id: '' },
                                    city: { name: '', id: '' },
                                  });
                                }}
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
                                  <input
                                    type="checkbox"
                                    id="carrierName"
                                    checked={isAllSelected}
                                    onChange={() => {}}
                                  />
                                  <label
                                    className="text-primary mb-0"
                                    htmlFor="carrierName"
                                    onClick={() => {
                                      setIsAllSelected(!isAllSelected);
                                    }}
                                  >
                                    Area Code
                                  </label>
                                </div>
                              </th>
                              <th scope="col">Buy Rate</th>
                              <th scope="col">Start/Next Pulse(S)</th>
                              <th scope="col">Effective On</th>
                              <th scope="col">Sell Rate</th>
                              <th scope="col">Start/Next Pulse(S)</th>
                              <th scope="col">Effective On</th>
                              <th scope="col">Country</th>
                              <th scope="col">State</th>
                              <th scope="col">City</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedCarriersPlanRates?.isLoading && (
                              <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td>
                                  {' '}
                                  <SpinningLoader />
                                </td>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                              </tr>
                            )}
                            {paginatedCarriersPlanRates?.data?.length > 0 &&
                              paginatedCarriersPlanRates?.data?.map((plan) => (
                                <AddPlanList
                                  carrierId={plan?.id}
                                  areaCode={plan?.attributes?.area_code}
                                  buyRate="---"
                                  startPluse="---"
                                  sellRate={parseFloat(plan?.attributes?.rate, 10).toFixed(2)}
                                  startPulseSell={plan?.attributes?.start_pulse}
                                  nextPulseSell={plan?.attributes?.next_pulse}
                                  country={
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
                                  effectiveOnBuy="---"
                                  effectiveOnSell={plan?.attributes?.effective_on}
                                  isEnabled={plan?.attributes?.is_enabled}
                                  setShow={setShow}
                                  formik={formik}
                                  plan={plan}
                                  handleBulkSelection={handleBulkSelection}
                                  selectedItemsForBulkSelection={selectedItemsForBulkSelection}
                                />
                              ))}
                          </tbody>
                        </table>
                      </div>
                      {paginatedCarriersPlanRates?.meta?.pagination != null && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedCarriersPlanRates?.meta?.pagination?.current_page}
                          totalPages={paginatedCarriersPlanRates?.meta?.pagination?.total_pages}
                          count={paginatedCarriersPlanRates?.meta?.pagination?.per_page}
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

      <AddNewCarrierPlanRecord
        carrierPlanName={carrierPlanDetails?.data?.attributes?.name}
        show={show?.isVisible && show?.type === 'add-new-record'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        countries={countries}
        states={states}
        setStates={setStates}
        cities={cities}
        setCities={setCities}
        dataSubmitting={dataSubmitting}
      />

      <EditCarrierPlanRateSheet
        carrierPlanName={carrierPlanDetails?.data?.attributes?.name}
        show={show?.isVisible && show?.type === 'edit-carrier-rate-sheet'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        countries={countries}
        states={states}
        setStates={setStates}
        cities={cities}
        setCities={setCities}
        dataSubmitting={dataSubmitting}
      />

      <CarrierPlanRateSetValue
        show={show?.isVisible && show?.type === 'set-value'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        formik={formik}
        cities={cities}
        states={states}
        rateSheetDetails={show?.rateSheetDetails}
      />

      <CommonModal
        isVisible={
          show?.isVisible &&
          (show?.type === 'enable-carrier-plan-rate-sheet' ||
            show?.type === 'disable-carrier-plan-rate-sheet')
        }
        title={
          show?.type === 'enable-carrier-plan-rate-sheet'
            ? ' Enable Carrier Plan Rate Sheet'
            : ' Disable Carrier Plan Rate Sheet'
        }
        actionType={show?.key}
        text=" rate sheet."
        label={`To confirm this action please type “${show?.key}”`}
        btnLabel={show?.key}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        actionKey={show?.key}
        isProcessing={dataSubmitting}
        handleAction={changePlanStatus}
      />

      <Delete
        heading="Delete plan"
        part1="This action will Delete the carrier plan rate sheet"
        part2=""
        tail="from the list ."
        show={show?.isVisible && show?.type === 'delete-carrier-plan-rate-sheet'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        deleteSwitch={deleteCarrierPlanRateSheet}
        loading={dataSubmitting}
      />

      <UpdateHistory
        show={show?.isVisible && show?.type === 'update-history'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
        setUpdateHistoryFilter={setUpdateHistoryFilter}
        updateHistoryFilter={updateHistoryFilter}
        updateHistory={updateHistory}
      />
      <ImportPlan
        show={show?.isVisible && show?.type === 'import'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
        }}
      />

      <ColumnSelector
        show={show?.isVisible && show?.type === 'column-selector'}
        onClose={() => {
          setShow({ isVisible: false, type: '' });
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

export default VendorCarrierAddPlan;
