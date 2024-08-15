import React, { useState } from 'react';
import moment from 'moment';

import Calendars from '../../../common/components/forms/Calendars';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';

function CarrierPlanRateSetValue({ show, onClose, formik, cities, states }) {
  const [toggle, setToggle] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setToggle(false);
    onClose({ isVisible: false, type: '' });
  };
  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasSetRole"
        aria-labelledby="offcanvasSetRoleLabel"
      >
        <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Set Value</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="offcanvas"
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
              style={isFormFieldValid(formik, 'selectField') ? { border: '1px solid red' } : {}}
            >
              <div
                className="selectBtn"
                data-type="firstOption"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                {formik.values.selectField || 'select'}
              </div>

              <div
                className={`selectDropdown ${toggle ? 'toggle' : ''}`}
                style={toggle ? { zIndex: '10' } : {}}
              >
                <div
                  className="option"
                  data-type="firstOption"
                  onClick={() => {
                    setToggle(false);
                    formik.setFieldValue('selectField', 'Buying Rate');
                  }}
                >
                  Buying Rate
                </div>
                <div
                  className="option"
                  data-type="secondOption"
                  onClick={() => {
                    setToggle(false);
                    formik.setFieldValue('selectField', 'Selling Rate');
                  }}
                >
                  Selling Rate
                </div>
              </div>
            </div>
            {getFormErrorMessage(formik, 'selectField')}
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-1 fs-13px">Set Value To</p>
            </div>
            <input
              type="text"
              className="form-control bg-white"
              id="setRate"
              placeholder="Enter value"
              name="setValueTo"
              style={isFormFieldValid(formik, 'setValueTo') ? { border: '1px solid red' } : {}}
              onChange={(e) => {
                formik.setFieldValue('setValueTo', e?.target?.value);
              }}
              value={formik.values.setValueTo || ''}
            />
            {getFormErrorMessage(formik, 'setValueTo')}
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <p className="mb-1 fs-13px">Start Pulse(S)</p>
            </div>
            <input
              type="text"
              className="form-control bg-white"
              id="pulse"
              placeholder="Enter start pulse sec"
              name="startPulse"
              style={isFormFieldValid(formik, 'startPulse') ? { border: '1px solid red' } : {}}
              onChange={(e) => {
                formik.setFieldValue('startPulse', e?.target?.value);
              }}
              value={formik.values.startPulse || ''}
            />
            {getFormErrorMessage(formik, 'startPulse')}
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <p className="mb-1 fs-13px">Next Pulse(S)</p>
            </div>
            <input
              type="text"
              className="form-control bg-white"
              id="pulse"
              placeholder="Enter next pulse sec"
              name="nextPulse"
              style={isFormFieldValid(formik, 'nextPulse') ? { border: '1px solid red' } : {}}
              onChange={(e) => {
                formik.setFieldValue('nextPulse', e?.target?.value);
              }}
              value={formik.values.nextPulse || ''}
            />
            {getFormErrorMessage(formik, 'nextPulse')}
          </div>
          <div className="mt-3">
            <label htmlFor="effectiveDate" className="form-label">
              Effective Date
            </label>
            <div className="dropdown">
              <div
                className="input-group calendar-drop mb-3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <input
                  type="text"
                  className="form-control bg-white border-end-0"
                  placeholder="Enter date"
                  aria-label="date"
                  aria-describedby="date"
                  style={
                    isFormFieldValid(formik, 'effectiveDate') ? { border: '1px solid red' } : {}
                  }
                />
                <a
                  href="/#"
                  role="button"
                  className="input-group-text bg-white"
                  id="basic-addon2"
                  style={
                    isFormFieldValid(formik, 'effectiveDate') ? { border: '1px solid red' } : {}
                  }
                >
                  <img src="/assets/date-icon.svg" alt="" />
                </a>
              </div>
              <ul className="dropdown-menu drop-calendar ms-3 p-0">
                <div className="bg-blue-active rounded-top p-3 text-white">
                  <p className="fw-bolder fs-12px mb-0">SELECT DATE</p>
                  <p className="fw-medium fs-14px mb-0">Mon, Aug 18</p>
                </div>
                <div className="p-2">
                  <Calendars
                    defaultYear={moment().year()}
                    defaultMonth={moment().month()}
                    defaultDay={moment().date()}
                    onChange={(date) => {
                      formik.setFieldValue('effectiveDate', date);
                    }}
                  />
                </div>
                <div className="bg-pattens-blue rounded-bottom p-3 text-white">
                  <div className="modal-footer d-flex justify-content-start border-0">
                    <button
                      type="button"
                      id="emailSend"
                      className="assign-ticket btn bg-black fw-medium fs-12px text-white px-2 py-2"
                    >
                      Done
                    </button>

                    <button
                      type="button"
                      className="calendar-close d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-2 py-2 ms-3"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </ul>
              {getFormErrorMessage(formik, 'effectiveDate')}
            </div>
          </div>
          <div>
            <div className="d-flex flex-column mt-3">
              <p className="mb-0 text-secondary fs-13px mb-2">Apply value to records filter by</p>
              <div className="dropdown-center">
                <button
                  className="form-control w-100 form-select text-start bg-white py-12px mb-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  -No filter applied-
                </button>

                <ul className="dropdown-menu dropdown-plan-filter shadow-6 p-3 w-100">
                  <div className="d-flex flex-column">
                    <p className="mb-1">Select field</p>
                    <select
                      className="select-field-plan form-plan form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                      aria-label="Default select example"
                      name="applyValueFilterByType"
                      value={formik.values.applyValueFilterByType || 'select'}
                      onChange={(e) => {
                        formik.setFieldValue('applyValueFilterByType', e.target.value);
                      }}
                      style={
                        isFormFieldValid(formik, 'applyValueFilterByType')
                          ? { border: '1px solid red' }
                          : {}
                      }
                    >
                      <option value="select" disabled>
                        Select
                      </option>
                      <option value="city">City</option>
                      <option value="state">State</option>
                      <option value="area">Area code</option>
                    </select>
                    {getFormErrorMessage(formik, 'applyValueFilterByType')}
                  </div>

                  <div className="d-flex flex-column">
                    <div className="city-state">
                      <p className="mb-1">Select value</p>
                      {/* filter type states or city start */}
                      {formik.values.applyValueFilterByType === 'city' && (
                        <select
                          className="form-select form-plan select w-100 form-select-custom fw-medium role bg-transparent text-black"
                          aria-label="Default select example"
                          name="applyValueFilterBySelectType"
                          value={formik.values.city || 'select'}
                          onChange={(e) => {
                            formik.setFieldValue('applyValueFilterBySelectType', e.target.value);
                          }}
                          style={
                            isFormFieldValid(formik, 'applyValueFilterBySelectType')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        >
                          <option value="select" disabled>
                            select city
                          </option>
                          {cities?.map((city) => (
                            <option value={city?.id} key={city?.id}>
                              {city?.attributes?.name}
                            </option>
                          ))}
                        </select>
                      )}

                      {formik.values.applyValueFilterByType === 'state' && (
                        <select
                          className="form-select form-plan select w-100 form-select-custom fw-medium role bg-transparent text-black"
                          aria-label="Default select example"
                          name="state"
                          value={formik.values.state || 'select'}
                          onChange={(e) => {
                            formik.setFieldValue('state', e.target.value);
                          }}
                          style={
                            isFormFieldValid(formik, 'state') ? { border: '1px solid red' } : {}
                          }
                        >
                          <option value="select" disabled>
                            select State
                          </option>
                          {states?.map((state) => (
                            <option value={state?.id} key={state?.id}>
                              {state?.attributes?.name}
                            </option>
                          ))}
                        </select>
                      )}
                      {/* filter type states or city end */}

                      {getFormErrorMessage(formik, 'applyValueFilterBySelectType')}
                    </div>
                    {formik.values.applyValueFilterByType === 'area' && (
                      <div className="area-code-sec ">
                        <div className="form-group w-100 mb-2">
                          <label className="text-primary mb-1" htmlFor="code">
                            Area code
                          </label>
                          <input
                            type="text"
                            className="form-control bg-white"
                            id="code"
                            placeholder="Enter code"
                            name="areaCode"
                            onChange={(e) => {
                              formik.setFieldValue('areaCode', e?.target?.value);
                            }}
                            value={formik.values.areaCode || ''}
                            onKeyPress={handleKeyPressForNumber}
                          />
                        </div>
                      </div>
                    )}
                    <div className="setting-buttons d-flex align-items-end mt-2">
                      <button
                        id="filterApplyBtn"
                        type="button"
                        className="filterApplyBtn btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                      >
                        Apply
                      </button>
                      <a
                        href="/#"
                        type="button"
                        id=""
                        className="clear-filter d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
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
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-3">
            <div className="text-white" data-bs-dismiss="offcanvas">
              <a
                href="#previewModal"
                // data-bs-toggle="modal"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                onClick={(e) => {
                  e.preventDefault();
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
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default CarrierPlanRateSetValue;
