import React, { useState } from 'react';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function SetValue({ show, onClose, formik, countries, states, cities, setShow }) {
  const [isToggleActive, setIsToggleActive] = useState({
    isVisible: false,
    type: '',
  });

  const handleFieldSelection = (type, value) => {
    if (type === 'field') {
      formik.setFieldValue('field', value);
    }

    if (type === 'all') {
      formik.setFieldValue('all', value);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasSetRole"
        aria-labelledby="offcanvasSetRoleLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Set Value</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div className="mt-3">
            <label className="text-primary mb-2">Select field</label>
            <div
              className="select"
              style={isFormFieldValid(formik, 'field') ? { border: '1px solid red' } : {}}
            >
              <div
                className="selectBtn"
                data-type="firstOption"
                onClick={() => {
                  setIsToggleActive({
                    ...isToggleActive,
                    isVisible: !isToggleActive?.isVisible,
                    type: 'field',
                  });
                }}
              >
                {formik?.values?.field || 'select'}
              </div>
              <div
                className={`selectDropdown ${
                  isToggleActive?.isVisible && isToggleActive?.type === 'field' ? 'toggle' : ''
                }`}
                style={
                  isToggleActive?.isVisible && isToggleActive?.type === 'field'
                    ? { zIndex: '1' }
                    : {}
                }
              >
                <div
                  className="option"
                  data-type="fourthOption"
                  onClick={() => {
                    setIsToggleActive({
                      isVisible: false,
                      type: 'field',
                    });
                    handleFieldSelection('field', 'mrc');
                  }}
                >
                  MRC
                </div>

                <div
                  className="option"
                  data-type="fourthOption"
                  onClick={() => {
                    setIsToggleActive({
                      isVisible: false,
                      type: 'field',
                    });
                    handleFieldSelection('field', 'channels');
                  }}
                >
                  Channel No
                </div>
              </div>
            </div>
            {getFormErrorMessage(formik, 'field')}
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-1 fs-13px">Set Rate To</p>
              <p className="mb-1 fs-13px d-none">
                Existing Rate: <b>₹0.18</b>
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-white"
              id="setRate"
              aria-describedby=""
              placeholder="Enter value"
              name="rate"
              onChange={formik.handleChange}
              style={isFormFieldValid(formik, 'rate') ? { border: '1px solid red' } : {}}
              value={formik?.values?.rate}
            />
            {getFormErrorMessage(formik, 'rate')}
          </div>

          <div>
            <div className="mt-3">
              <label className="mb-1">Country</label>
              <select
                className="form-select bg-white"
                aria-label="Default select example"
                value={formik?.values?.country || 'select'}
                name="country"
                onChange={(e) => {
                  formik.setFieldValue('country', e.target.value);
                }}
                style={isFormFieldValid(formik, 'country') ? { border: '1px solid red' } : {}}
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
              {getFormErrorMessage(formik, 'state')}
            </div>
            <div className="mt-3">
              <label className="mb-1">State</label>
              <select
                className="form-select bg-white"
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
            <div className="mt-3">
              <label className="mb-1">City</label>
              <select
                className="form-select bg-white"
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
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
            <div className="text-white" data-bs-dismiss="offcanvas">
              <a
                href="/#"
                // data-bs-toggle="modal"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                onClick={(e) => {
                  e.preventDefault();
                  setShow({ isVisible: true, type: 'set-value-preview' });
                  formik.handleSubmit();
                }}
              >
                Preview
              </a>
            </div>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div />
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default SetValue;
