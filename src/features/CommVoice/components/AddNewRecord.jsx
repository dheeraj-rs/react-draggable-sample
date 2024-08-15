import React from 'react';

import Input from '../../../common/components/forms/Input';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function AddNewRecord({ show, onClose, formik, countries, states, cities, dataSubmitting }) {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  if (show) {
    return (
      <>
        <div
          className="modal mt-65 show"
          tabIndex="-1"
          id="addNewRecord"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" style={{ maxWidth: '933px' }}>
            <div className="modal-content border-0">
              <div className="modal-content p-lg-4 p-2">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <div className="d-flex gap-3 align-items-center">
                    <h4 className="modal-title text-dark fw-medium fs-15px">Add New Record</h4>
                  </div>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close"
                    // data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  />
                </div>

                <div className="modal-body pt-0">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <label className="mb-1">Country</label>
                      <select
                        className="form-select select bg-transparent text-black"
                        aria-label="Default select example"
                        value={formik?.values?.country || 'select'}
                        name="country"
                        onChange={(e) => {
                          formik.setFieldValue('country', e.target.value);
                        }}
                        style={
                          isFormFieldValid(formik, 'country') ? { border: '1px solid red' } : {}
                        }
                      >
                        <option value="select" disabled>
                          select
                        </option>
                        {countries?.map((country, index) => (
                          <option key={index} value={country.id}>
                            {country.attributes.name}
                          </option>
                        ))}
                      </select>
                      {getFormErrorMessage(formik, 'country')}
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <label className="mb-1">State</label>
                      <select
                        className="form-select select bg-transparent text-black"
                        aria-label="Default select example"
                        value={formik?.values?.state || 'select'}
                        name="state"
                        onChange={(e) => {
                          formik.setFieldValue('state', e.target.value);
                        }}
                        style={isFormFieldValid(formik, 'state') ? { border: '1px solid red' } : {}}
                      >
                        <option value="select" disabled>
                          select
                        </option>

                        {states?.map((state, index) => (
                          <option key={index} value={state.id}>
                            {state.attributes.name}
                          </option>
                        ))}
                      </select>
                      {getFormErrorMessage(formik, 'state')}
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <label className="mb-1">City</label>
                      <select
                        className="form-select select bg-transparent text-black"
                        aria-label="Default select example"
                        value={formik?.values?.city || 'select'}
                        name="city"
                        onChange={(e) => {
                          formik.setFieldValue('city', e.target.value);
                        }}
                        style={isFormFieldValid(formik, 'city') ? { border: '1px solid red' } : {}}
                      >
                        <option value="select" disabled>
                          select
                        </option>

                        {cities?.map((city, index) => (
                          <option key={index} value={city.id}>
                            {city.attributes.name}
                          </option>
                        ))}
                      </select>
                      {getFormErrorMessage(formik, 'city')}
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <label className="mb-1">Number</label>
                      <input
                        type="text"
                        className="form-control bg-white"
                        id="end"
                        value={formik?.values?.number}
                        name="number"
                        onChange={formik.handleChange}
                        style={
                          isFormFieldValid(formik, 'number') ? { border: '1px solid red' } : {}
                        }
                        onKeyPress={handleKeyPressForNumber}
                      />
                      {getFormErrorMessage(formik, 'number')}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <Input
                        label="Country Code"
                        id="property"
                        type="text"
                        disabled={false}
                        name="countryCode"
                        onChange={formik.handleChange}
                        value={formik?.values?.countryCode}
                        style={
                          isFormFieldValid(formik, 'countryCode') ? { border: '1px solid red' } : {}
                        }
                        onKeyPress={handleKeyPressForNumber}
                      />
                      {getFormErrorMessage(formik, 'countryCode')}
                    </div>

                    <div className="col-lg-3 col-sm-6">
                      <Input
                        label="Channels"
                        id="property"
                        type="text"
                        disabled={false}
                        name="channels"
                        onChange={formik.handleChange}
                        value={formik?.values?.channels}
                        style={
                          isFormFieldValid(formik, 'channels') ? { border: '1px solid red' } : {}
                        }
                        onKeyPress={handleKeyPressForNumber}
                      />
                      {getFormErrorMessage(formik, 'channels')}
                    </div>

                    <div className="col-lg-3 col-sm-6">
                      <Input
                        label="Prefix"
                        id="property"
                        type="text"
                        disabled={false}
                        name="prefix"
                        onChange={formik.handleChange}
                        value={formik?.values?.prefix}
                        style={
                          isFormFieldValid(formik, 'prefix') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'prefix')}
                    </div>

                    <div className="col-lg-3 col-sm-6">
                      <Input
                        label="MRC"
                        id="property"
                        type="text"
                        disabled={false}
                        name="mrc"
                        onKeyPress={handleKeyPressForNumber}
                        onChange={formik.handleChange}
                        value={formik?.values?.mrc}
                        style={isFormFieldValid(formik, 'mrc') ? { border: '1px solid red' } : {}}
                      />
                      {getFormErrorMessage(formik, 'mrc')}
                    </div>
                  </div>

                  <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
                    <button
                      // data-bs-dismiss="modal"
                      id="addRecordBtn"
                      type="button"
                      className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                      disabled={dataSubmitting}
                    >
                      {dataSubmitting ? 'Adding...' : 'Add'}
                    </button>
                    <button
                      type="button"
                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                      // data-bs-dismiss="modal"
                      onClick={(e) => {
                        e.preventDefault();
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
        <div />

        <div className="offcanvas-backdrop fade show" />
      </>
    );
  }
  return null;
}

export default AddNewRecord;
