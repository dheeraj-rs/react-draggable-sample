import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import countryCodes from 'country-codes-list';
import { useFormik } from 'formik';
import normalize from 'json-api-normalizer';

import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import Input from '../../../common/components/forms/Input';
import ModalClose from '../../../common/components/modals/ModalClose';
import Modal from '../../../common/components/modals/Modal';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import BuyedNumberList from '../components/BuyedNumberList';
import Layout from '../../../common/layout';
import GetCountries from '../../../common/api-collection/Common/Countries';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';
import { CustomersideListPaginatedTelephonyVendorNumberPlanRecords } from '../../../common/api-collection/Telephony/NumberPlanRecords';
import Pagination from '../components/pagination/Pagination';

function BuyVirtualNumber() {
  const navigate = useNavigate();
  const countryCodeList = [];
  const countryCodeListData = countryCodes.customList(
    'countryCode',
    '{countryNameEn} (+{countryCallingCode})'
  );

  Object.keys(countryCodeListData).forEach((key) => {
    countryCodeList.push({ country: key, code: countryCodeListData[key] });
  });

  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [page, setPage] = useState(1);
  const [countries, setCountries] = useState();
  const [paginatedNumbers, setPaginatedNumbers] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [normalizedData, setNormalizedData] = useState();
  const [key, setKey] = useState('');

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const validate = () => {
    const errors = {};

    // if (!data.countryId) {
    //   errors.countryId = ' required';
    // }
    // if (!data.countryCode) {
    //   errors.countryCode = ' required';
    // }
    // if (!data.numberType) {
    //   errors.numberType = ' required';
    // }
    // if (!data.number) {
    //   errors.number = ' required';
    // }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      countryId: '',
      countryCode: '',
      numberType: 'did',
      number: '',
    },
    validate,
    onSubmit: () => {
      setPaginatedNumbers({ isLoading: true });
      CustomersideListPaginatedTelephonyVendorNumberPlanRecords(
        '',
        page,
        formik?.values?.countryId,
        '',
        '',
        '',
        '',
        formik?.values?.numberType,
        formik?.values?.number
      )?.then((response) => {
        setPaginatedNumbers({
          data: response?.data,
          links: response?.links,
          meta: response?.meta,
          isLoading: false,
        });
        setNormalizedData(normalize(response));
      });
    },
  });

  const handleNumberSelection = (selectedNumber) => {
    const existingItem = selectedNumbers.find(
      (number) => parseInt(number?.id, 10) === parseInt(selectedNumber?.id, 10)
    );

    if (existingItem) {
      // If the value is already present, remove it
      const newArray = selectedNumbers.filter(
        (number) => parseInt(number?.id, 10) !== parseInt(selectedNumber?.id, 10)
      );
      setSelectedNumbers(newArray);
    } else {
      // If the value is not present, add it
      setSelectedNumbers([...selectedNumbers, selectedNumber]);
    }
  };

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    GetCountries()
      .then((response) => {
        if (response?.data) {
          setCountries(response?.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link
                    to="/comm-telephony/virtual-number/"
                    className="d-flex justify-content-center"
                  >
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link to="/comm-telephony/virtual-number/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Buy number
                  </h5>
                  <p className="mb-0 text-secondary">Details goes here</p>
                </div>
              </div>
              <div className="equal-pad scroll-custom pb-3 scroll-roles-virtual">
                <div className="accordion accordion-custom-right mt-1" id="accordionCompany">
                  <div className="mx-0 mx-sm-1 accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-0 p-sm-2 p-md-2 fs-13px position-relative">
                    <div className="accordion-header bg-white" id="headingUpdate">
                      <a
                        href="/#"
                        className="accordion-button collapsed head d-flex align-items-center bg-white py-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseCompany"
                        aria-expanded="false"
                        aria-controls="collapseCompany"
                      >
                        <div className="d-flex align-items-center gap-5">
                          <div className="d-flex align-items-center">
                            <img src="/assets/search-number.svg" className="me-3" alt="" />
                            <span className="text-primary d-block fs-14px fw-500">
                              Search Numbers{' '}
                              <img src="/assets/orange-dot.svg" className="orage-dot" alt="" />
                            </span>
                          </div>
                          <p id="resultText" className="mb-0 text-primary d-none">
                            Search result for number end with{' '}
                            <span className="fw-medium">849 , India, Mumbai</span>
                          </p>
                        </div>
                      </a>
                    </div>
                    <div
                      id="collapseCompany"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingUpdate"
                      data-bs-parent="#accordionCompany"
                    >
                      {/* <!-- Form start --> */}
                      <div className="accordion-body acc-card-content pt-0">
                        <div className="row align-items-center mt-2">
                          <div className="col-lg-4 col-sm-6 virtual-list-top">
                            <div className="dropdown more">
                              <label className="mb-1">Country</label>
                              <a
                                className={`select-box-num ${
                                  isFormFieldValid(formik, 'countryCode')
                                    ? ''
                                    : 'select-country-box border'
                                } d-flex align-items-center pe-4 text-primary fs-13px  rounded justify-content-between`}
                                href="/#"
                                role="button"
                                id="dropdownMenu"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                name="countryCode"
                                style={
                                  isFormFieldValid(formik, 'countryCode')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              >
                                <div
                                  id="selectedVal"
                                  className="status-truncate d-inline-block text-white d-flex align-items-center"
                                >
                                  <img
                                    className="pe-2 selected-flag d-none"
                                    src="/assets/country-icon-united.svg"
                                    alt=""
                                  />
                                  <span className="selected-country text-secondary">select</span>
                                </div>
                                <div>
                                  <img className="ps-2" src="/assets/down-black-arrow.svg" alt="" />
                                </div>
                              </a>
                              <ul
                                id="dropdown-left-status"
                                className="dropdown-menu m-auto dropdown-status rounded shadow-6"
                                aria-labelledby="dropdownMenuLink"
                              >
                                <li className="py-3 px-4">
                                  <SearchWithBorder
                                    placeholderText="Search Country"
                                    onChange={(e) => {
                                      setKey(e.target.value);
                                    }}
                                    clearBtn={() => {
                                      setKey('');
                                    }}
                                    searchTerm={key || ''}
                                  />
                                </li>
                                <div className="scroll-custom country-scroll">
                                  {countryCodeList?.map((item, index) => (
                                    <li>
                                      <a
                                        className="py-3 px-4 country-item"
                                        href="/#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          formik.setFieldValue('countryCode', index);
                                        }}
                                      >
                                        <img className="pe-2 d-none" src="/assets/ind.svg" alt="" />
                                        {item?.code}
                                      </a>
                                    </li>
                                  ))}
                                </div>
                              </ul>
                              {getFormErrorMessage(formik, 'countryCode')}
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-6 mt-3 mt-lg-0 mt-sm-0">
                            <label className="mb-1">Region</label>
                            <select
                              className="form-select bg-white"
                              aria-label="Default select example"
                              name="countryId"
                              onChange={(e) => {
                                formik.setFieldValue('countryId', parseInt(e?.target?.value, 10));
                              }}
                              style={
                                isFormFieldValid(formik, 'countryId')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              value={formik?.values?.countryId || 'select'}
                            >
                              <option value="select" disabled>
                                select
                              </option>
                              {countries?.map((country, index) => (
                                <option key={index} value={country?.id}>
                                  {country?.attributes?.name}
                                </option>
                              ))}
                            </select>
                            {getFormErrorMessage(formik, 'countryId')}
                          </div>

                          <div className="col-lg-4 col-sm-6">
                            <label className="mb-3"> Number type</label>
                            <div className="d-flex gap-3">
                              <div>
                                <input
                                  id="virtual"
                                  checked={formik?.values?.numberType === 'did'}
                                  className="radio-tick"
                                  name="agent-group"
                                  type="radio"
                                />
                                <label
                                  htmlFor="virtual"
                                  className="radio-tick-label text-primary fw-normal"
                                  onClick={() => {
                                    formik.setFieldValue('numberType', 'did');
                                  }}
                                >
                                  DID
                                </label>
                              </div>
                              <div>
                                <input
                                  id="toll"
                                  className="radio-tick"
                                  name="agent-group"
                                  type="radio"
                                  checked={formik?.values?.numberType === 'tf'}
                                />
                                <label
                                  htmlFor="toll"
                                  className="radio-tick-label text-primary fw-normal"
                                  onClick={() => {
                                    formik.setFieldValue('numberType', 'tf');
                                  }}
                                >
                                  Toll-Free
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2">
                          <div className="col-lg-4 col-sm-6">
                            <Input
                              label="Number end with (Enter last 3 digits)"
                              id="numberEnd"
                              placeholder=""
                              type="textbox"
                              disabled={false}
                              name="number"
                              value={formik?.values?.number}
                              onChange={(e) => {
                                formik.setFieldValue('number', e.target.value);
                              }}
                              maxLength="3"
                              style={
                                isFormFieldValid(formik, 'number')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                            />
                            {getFormErrorMessage(formik, 'number')}
                          </div>
                          <div className="col-lg-4 col-sm-4 mt-3">
                            <label className="mb-1">Voice/SMS</label>
                            <div className="d-flex gap-1 mt-2">
                              <div className="bg-tropical-blue text-blueberry fw-bolder btn-voice fs-10px">
                                Voice
                              </div>
                              <div className="bg-tropical-blue text-blueberry fw-bolder btn-voice fs-10px">
                                SMS
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-sm-4 mt-3">
                            <div className="setting-buttons d-flex align-items-end mt-3 mt-lg-4">
                              <button
                                type="button"
                                className="btn bg-black fw-medium fs-13px text-white px-4 py-12px"
                                id="searchVirtualNum"
                                onClick={() => {
                                  setIsFilterApplied(true);
                                  formik.handleSubmit();
                                }}
                              >
                                Search
                              </button>
                              <a
                                href="/#"
                                className="d-flex align-items-center fs-13px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                              >
                                Clear
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Form end --> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="noSearchResult"
                  className={
                    isFilterApplied
                      ? 'd-none'
                      : 'd-flex justify-content-center mt-5 mb-5 flex-column align-items-center'
                  }
                >
                  <h6 className="fs-14px fw-500">No filter has been applied</h6>

                  <div>
                    <img src="/assets/no-filter.svg" alt="" />
                  </div>
                </div>

                {/* <!-- Virtual Numbers --> */}
                <div
                  id="virtualSearchResult"
                  className={paginatedNumbers?.data?.length > 0 ? '' : 'd-none'}
                >
                  <div className="d-flex mb-4 mb-lg-4 mb-sm-4 mb-md-4 mt-4 flex-column flex-sm-row justify-content-between align-items-sm-center">
                    <h5 className="fs-13px mb-0 fw-normal">
                      (
                      <span className="fw-500 fs-15px">
                        {paginatedNumbers?.meta?.pagination?.total}
                      </span>{' '}
                      numbers available)
                    </h5>
                    <div className="d-flex gap-3 align-items-center mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-between">
                      <p className="mb-0 text-blue-active">
                        {selectedNumbers?.length} Numbers selected
                      </p>
                      <a
                        href="/#"
                        // to="/comm-telephony/purchase-summary/"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                        id="proceedBuy"
                        onClick={(e) => {
                          e.preventDefault();

                          const setData = new Promise((resolve, reject) => {
                            try {
                              localStorage.setItem(
                                'selectedNumbers',
                                JSON.stringify(selectedNumbers)
                              );
                              resolve();
                            } catch (error) {
                              reject(error);
                            }
                          });

                          setData?.then(() => navigate('/comm-telephony/purchase-summary/'));
                        }}
                      >
                        Proceed to Buy
                      </a>
                    </div>
                  </div>
                  <div className="number-table-top">
                    <div className="row">
                      <div className="col-lg-4 col-sm-3">
                        <h6 className="fs-13px">Virtual number</h6>
                      </div>
                      <div className="col-lg-2 col-sm-2">
                        <h6 className="fs-13px">Type</h6>
                      </div>
                      <div className="col-lg-2 col-sm-2">
                        <h6 className="fs-13px">Voice/SMS</h6>
                      </div>
                      <div className="col-lg-2 col-sm-3">
                        <h6 className="fs-13px">Monthly cost</h6>
                      </div>
                      <div className="col-lg-2" />
                    </div>
                  </div>

                  {paginatedNumbers?.data?.length > 0 &&
                    paginatedNumbers?.data?.map((plan, index) => (
                      <BuyedNumberList
                        planId={plan?.id}
                        key={index}
                        rolesIcon="/assets/dots-icon.svg"
                        telNumber={plan?.attributes?.number}
                        countryName={
                          normalizedData?.country[plan?.attributes?.country_id]?.attributes?.name
                        }
                        virtualType="Virtual number"
                        voiceType="Voice"
                        permissionsLink="#"
                        monthlyCost={parseFloat(
                          plan?.attributes?.monthly_recurring_cost,
                          10
                        )?.toFixed(2)}
                        handleNumberSelection={handleNumberSelection}
                        selectedNumbers={selectedNumbers}
                      />
                    ))}

                  {paginatedNumbers?.meta?.pagination?.total > 0 && (
                    <Pagination
                      handlePagination={handlePaginationFunction}
                      currentPage={paginatedNumbers?.meta?.pagination?.current_page}
                      totalPages={paginatedNumbers?.meta?.pagination?.total_pages}
                      count={paginatedNumbers?.meta?.pagination?.per_page}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- delete modal starts--> */}

          <Modal width="450px" id="deleteRoleModal">
            <div className="d-flex justify-content-between">
              <p className="fs-16px text-primary fw-medium mb-24px">Delete Role</p>
              <ModalClose />
            </div>
            <p className="fs-13px text-primary mb-3">
              This action will <span className="text-primary fw-medium">Delete</span> the role
              <span className="fw-medium"> Custom role 1.</span>from the system .
            </p>

            <Input
              label="To confirm this action please type “Delete”"
              id="delete"
              placeholder="Type “Delete”"
              type="textbox"
              disabled={false}
            />

            <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
              <button
                type="button"
                id="deleteToast"
                className="btn bg-faded-red text-white px-4 py-12px"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
              <ButtonWhiteModalCancel text="Cancel" />
            </div>
          </Modal>
          {/* <!-- delete modal ends --> */}
          {/* <!-- Delete group toast --> */}
          <ToastSuccess id="deleteToastMsg">
            <span>
              <span className="fw-bolder">Role deleted :</span> you have successfully deleted role
              Custom role 1
            </span>
          </ToastSuccess>
          {/* <!-- clear group toast --> */}
        </div>
      </div>
    </Layout>
  );
}

export default BuyVirtualNumber;
