/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TextArea from '../forms/TextArea';
import SearchWithBorder from './SearchWithBorder';
import Input from '../forms/Input';
import { getFormErrorMessage, isFormFieldValid } from '../../helpers/utils';
import '../../../styles/formvalidation.css';

function EditBatchModal({
  show,
  onClose,
  formik,
  unPaginatedCarriersList,
  unPaginatedCarrierPackages,
  unPaginatedLots,
  isLoading,
  allLotsSelected,
  setAllLotsSelected,
}) {
  const [searchResult, setSearchResult] = useState({ in: [], out: [] });

  const [searchTerm, setSearchTerm] = useState({
    carrierPlanInPackage: '',
    carrierPlanOutPackage: '',
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleLotSelection = (lot) => {
    const index = formik?.values?.lots?.findIndex(
      (obj) => parseInt(obj.id, 10) === parseInt(lot.id, 10)
    );

    if (index === -1) {
      // lot is not in the array, so add it.
      formik.setFieldValue('lots', [...formik.values.lots, lot]);
    } else {
      // lot is already in the array, so remove it.

      const updatedLots = formik.values.lots.filter((e) => e?.id !== lot.id);

      formik.setFieldValue('lots', updatedLots);
    }
  };

  useEffect(() => {
    if (searchTerm?.carrierPlanInPackage && searchTerm?.type === 'in') {
      const filteredNamesIn = unPaginatedCarrierPackages.filter((carrier) =>
        carrier?.attributes?.name
          ?.toLowerCase()
          .includes(searchTerm?.carrierPlanInPackage?.toLowerCase())
      );

      setSearchResult({ ...searchResult, in: filteredNamesIn });
    } else {
      setSearchResult([]);
    }
  }, [searchTerm?.carrierPlanInPackage]);

  useEffect(() => {
    if (searchTerm?.carrierPlanOutPackage && searchTerm?.type === 'out') {
      const filteredNamesOut = unPaginatedCarrierPackages.filter((carrier) =>
        carrier?.attributes?.name
          ?.toLowerCase()
          .includes(searchTerm?.carrierPlanOutPackage?.toLowerCase())
      );

      setSearchResult({ ...searchResult, out: filteredNamesOut });
    } else {
      setSearchResult([]);
    }
  }, [searchTerm?.carrierPlanOutPackage]);

  return (
    <>
      <div
        className="modal mt-65"
        tabIndex="-1"
        id="editBatchModal"
        style={{ display: show ? 'block' : '' }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content border-0">
            <div className="modal-content p-4">
              {/* <!-- Modal Header --> */}
              <div className="modal-header border-0">
                <div className="d-flex flex-column">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Edit Batch</h4>
                </div>

                <a
                  href="/#"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                />
              </div>

              <div className="modal-body pt-0">
                <div className="row gx-5">
                  <div className="col-lg-6 col-sm-6">
                    <Input
                      label="Batch name"
                      id="batchName"
                      placeholder="Enter batch Name"
                      type="text"
                      name="batchName"
                      onChange={formik.handleChange}
                      value={formik?.values?.batchName}
                      style={
                        isFormFieldValid(formik, 'batchName') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'batchName')}
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group mt-3">
                      <label className="text-primary mb-1" htmlFor="attachBatch">
                        Carrier
                      </label>
                      <select
                        className="form-control  form-select bg-white"
                        id="attachBatch"
                        name="carrier"
                        onChange={(e) => {
                          formik.setFieldValue('carrier', parseInt(e?.target?.value, 10));
                        }}
                        style={
                          isFormFieldValid(formik, 'carrier') ? { border: '1px solid red' } : {}
                        }
                        value={formik?.values?.carrier || 'select'}
                      >
                        <option value="select" disabled>
                          -No carrer selected-
                        </option>
                        {unPaginatedCarriersList?.map((carrier, index) => (
                          <option key={index} value={carrier?.id}>
                            {carrier?.attributes?.name}
                          </option>
                        ))}
                      </select>
                      {getFormErrorMessage(formik, 'carrier')}
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="mt-3">
                      <div className="d-flex flex-column w-100">
                        <p className="mb-0 text-secondary fs-13px mb-1 mt-lg-0 mt-3">Lot(s)</p>
                        <div className="dropdown-center">
                          <button
                            className="form-control w-100 form-select text-start bg-white"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <div className="d-flex gap-2">
                              <span className="p-1">Select</span>
                            </div>
                          </button>

                          <ul className="dropdown-menu w-100 shadow-6 pb-2 p-3">
                            <div className="d-flex justify-content-between gap-3">
                              <div className="w-100">
                                <div className="input-group search-input-group border-0 custom-search-sidebar-border rounded overflow-hidden">
                                  <span
                                    className="input-group-text border-0 bg-white  h-6"
                                    id="basic-addon1"
                                  >
                                    <img src="/assets/search-form.svg" alt="" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control border-0 px-0 bg-white search-input pe-5 h-6 custom_search"
                                    style={{ height: '3rem' }}
                                    placeholder="Search lot"
                                    aria-label="search"
                                    aria-describedby="basic-addon1"
                                    id=""
                                  />
                                  <img
                                    src="/bot-admin/search-close.svg"
                                    alt=""
                                    className="search-close search-clear"
                                    style={{
                                      width: '10px',
                                      height: '10px',
                                      position: 'absolute',
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      right: '10px',
                                      zIndex: 99,
                                      cursor: 'pointer',
                                    }}
                                    id=""
                                  />
                                </div>
                              </div>
                              <div className="d-flex align-items-end">
                                <Link
                                  to="/comm-telephony/vendor-lot-new-lot/"
                                  role="button"
                                  className="bg-black d-flex align-items-center justify-content-center h-6 w-6 rounded"
                                >
                                  <img src="/assets/plus-icon.svg" alt="" />
                                </Link>
                              </div>
                            </div>

                            <div className="scroll-custom scroll-custom-dropdown">
                              <li className="mt-2">
                                <a
                                  href="/#"
                                  className="dropdown-item-outside py-3 px-2 d-flex"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <div className="check-box ">
                                    <input type="checkbox" id="batch-1" checked={allLotsSelected} />
                                    <label
                                      className="text-primary mb-0"
                                      htmlFor="batch-1"
                                      onClick={() => {
                                        setAllLotsSelected(!allLotsSelected);
                                      }}
                                    >
                                      Select All
                                    </label>
                                  </div>
                                </a>
                              </li>
                              {unPaginatedLots?.map((lot) => (
                                <li>
                                  <a
                                    href="/#"
                                    className="dropdown-item-outside py-3 px-2 d-flex"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <div className="check-box ">
                                      <input
                                        type="checkbox"
                                        id="batch-2"
                                        onChange={() => {}}
                                        checked={formik.values.lots?.some((e) => e?.id === lot?.id)}
                                      />
                                      <label
                                        className="text-primary mb-0"
                                        htmlFor="batch-2"
                                        onClick={() => {
                                          handleLotSelection({
                                            type: 'lots',
                                            id: lot?.id,
                                          });
                                        }}
                                      >
                                        {lot?.attributes?.name}
                                      </label>
                                    </div>
                                  </a>
                                </li>
                              ))}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-aqua-squeeze rounded mt-4 p-3">
                  <div className="row gx-5">
                    <div className="col-lg-6 ">
                      <div className="d-flex flex-column w-100">
                        <p className="mb-0 text-secondary  fs-13px mb-1">
                          Carrier Plan Out Package
                        </p>
                        <div className="dropdown-center">
                          <button
                            className="form-control w-100 form-select text-start bg-white"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={
                              isFormFieldValid(formik, 'carrierPlanOutPackage')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          >
                            <div className="d-flex gap-2">
                              <span className="p-1">
                                {formik?.values?.carrierPlanOutPackage?.name || '-Select Package-'}
                              </span>
                            </div>
                          </button>

                          <ul className="dropdown-menu w-100 shadow-6 p-3">
                            <div className="d-flex justify-content-between gap-3">
                              <div className="w-100">
                                <SearchWithBorder
                                  placeholderText="Search plan"
                                  onChange={(e) => {
                                    setSearchTerm({
                                      ...searchTerm,
                                      carrierPlanOutPackage: e?.target?.value,
                                      type: 'out',
                                    });
                                  }}
                                  searchTerm={searchTerm?.carrierPlanOutPackage}
                                  clearBtn={() => {
                                    setSearchTerm({
                                      ...searchTerm,
                                      carrierPlanOutPackage: '',
                                      type: 'out',
                                    });
                                  }}
                                />
                              </div>
                              <div className="d-flex align-items-end">
                                <div
                                  role="button"
                                  className="bg-black d-flex align-items-center justify-content-center h-5 w-5 rounded"
                                >
                                  <img src="/assets/plus-icon.svg" alt="" />
                                </div>
                              </div>
                            </div>

                            <div className="scroll-custom scroll-custom-flow">
                              {(searchResult?.out?.length > 0
                                ? searchResult?.out
                                : unPaginatedCarrierPackages
                              )?.map((carrierPackage, index) => (
                                <li className="mt-2" key={index}>
                                  <a
                                    href="/#"
                                    className="dropdown-item py-3 px-4"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      formik.setFieldValue('carrierPlanOutPackage', {
                                        id: parseInt(carrierPackage?.id, 10),
                                        name: carrierPackage?.attributes?.name,
                                      });
                                    }}
                                  >
                                    {carrierPackage?.attributes?.name}
                                  </a>
                                </li>
                              ))}
                            </div>
                          </ul>
                          {getFormErrorMessage(formik, 'carrierPlanOutPackage')}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 ">
                      <div className="d-flex flex-column w-100">
                        <p className="mb-0 text-secondary  fs-13px mb-1">Carrier Plan In Package</p>
                        <div className="dropdown-center">
                          <button
                            className="form-control w-100 form-select text-start bg-white"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={
                              isFormFieldValid(formik, 'carrierPlanInPackage')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          >
                            <div className="d-flex gap-2">
                              <span className="p-1">
                                {formik?.values?.carrierPlanInPackage?.name || '-Select Package-'}
                              </span>
                            </div>
                          </button>

                          <ul className="dropdown-menu w-100 shadow-6 p-3">
                            <div className="d-flex justify-content-between gap-3">
                              <div className="w-100">
                                <SearchWithBorder
                                  placeholderText="Search plan"
                                  onChange={(e) => {
                                    setSearchTerm({
                                      ...searchTerm,
                                      carrierPlanInPackage: e?.target?.value,
                                      type: 'in',
                                    });
                                  }}
                                  searchTerm={searchTerm?.carrierPlanInPackage}
                                  clearBtn={() => {
                                    setSearchTerm({
                                      ...searchTerm,
                                      carrierPlanInPackage: '',
                                      type: 'in',
                                    });
                                  }}
                                />
                              </div>
                              <div className="d-flex align-items-end">
                                <div
                                  role="button"
                                  className="bg-black d-flex align-items-center justify-content-center h-5 w-5 rounded"
                                >
                                  <img src="/assets/plus-icon.svg" alt="" />
                                </div>
                              </div>
                            </div>

                            <div className="scroll-custom scroll-custom-flow">
                              {(searchResult?.in?.length > 0
                                ? searchResult?.in
                                : unPaginatedCarrierPackages
                              )?.map((carrierPackage, index) => (
                                <li className="mt-2" key={index}>
                                  <a
                                    href="/#"
                                    className="dropdown-item py-3 px-4"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      formik.setFieldValue('carrierPlanInPackage', {
                                        id: parseInt(carrierPackage?.id, 10),
                                        name: carrierPackage?.attributes?.name,
                                      });
                                    }}
                                  >
                                    {carrierPackage?.attributes?.name}
                                  </a>
                                </li>
                              ))}
                            </div>
                          </ul>

                          {getFormErrorMessage(formik, 'carrierPlanInPackage')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 mt-3">
                    <div className="w-100">
                      <TextArea
                        label="Batch Description"
                        placeholder="Enter description"
                        rowCount="4"
                        name="batchDescription"
                        onChange={formik.handleChange}
                        value={formik?.values?.batchDescription}
                        style={
                          isFormFieldValid(formik, 'batchDescription')
                            ? { border: '1px solid red' }
                            : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'batchDescription')}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
                  <button
                    id="addBatch"
                    // data-bs-dismiss="modal"
                    type="button"
                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default EditBatchModal;
