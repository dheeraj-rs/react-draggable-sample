import React from 'react';
import moment from 'moment';

import Calendars from '../../../common/components/forms/Calendars';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function EditCarrierPlanRateSheet({
  carrierPlanName,
  show,
  onClose,
  formik,
  countries,
  states,
  setStates,
  cities,
  setCities,
  dataSubmitting,
}) {
  const handleClose = () => {
    formik.resetForm();
    setStates([]);
    setCities([]);
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
              <div className="modal-content p-4">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0">
                  <div className="d-flex gap-3 align-items-center">
                    <h4 className="modal-title text-dark fw-medium fs-15px">
                      Edit Record - <span className="text-secondary">{carrierPlanName}</span>
                    </h4>
                  </div>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  />
                </div>

                <div className="modal-body pt-0">
                  <div className="table-responsive">
                    <table className="table billing-table">
                      <thead className="mb-5">
                        <tr>
                          <th scope="col">Country</th>
                          <th scope="col">State</th>
                          <th scope="col">City</th>
                          <th scope="col">Area Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <select
                              className="form-select select form-select-custom role bg-transparent text-black"
                              aria-label="Default select example"
                              name="country"
                              style={
                                isFormFieldValid(formik, 'country')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setStates([]);
                                setCities([]);
                                formik.setFieldValue('country', e?.target?.value);
                              }}
                              value={formik.values.country || 'select'}
                            >
                              <option value="select" disabled>
                                -Select region-
                              </option>
                              {countries?.map((country) => (
                                <option value={country?.id} key={country?.id}>
                                  {country?.attributes?.name}
                                </option>
                              ))}
                            </select>
                            {getFormErrorMessage(formik, 'country')}
                          </td>
                          <td>
                            <select
                              className="form-select select form-select-custom role bg-transparent text-black"
                              aria-label="Default select example"
                              name="state"
                              style={
                                isFormFieldValid(formik, 'state') ? { border: '1px solid red' } : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('state', e?.target?.value);
                              }}
                              value={formik.values.state || 'select'}
                            >
                              <option value="select" disabled>
                                State
                              </option>
                              {states?.map((state) => (
                                <option value={state?.id} key={state?.id}>
                                  {state?.attributes?.name}
                                </option>
                              ))}
                            </select>
                            {getFormErrorMessage(formik, 'state')}
                          </td>
                          <td>
                            <select
                              className="form-select select form-select-custom role bg-transparent text-black"
                              aria-label="Default select example"
                              name="city"
                              style={
                                isFormFieldValid(formik, 'city') ? { border: '1px solid red' } : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('city', e?.target?.value);
                              }}
                              value={formik.values.city || 'select'}
                            >
                              <option value="select" disabled>
                                City
                              </option>
                              {cities?.map((city) => (
                                <option value={city?.id} key={city?.id}>
                                  {city?.attributes?.name}
                                </option>
                              ))}
                            </select>
                            {getFormErrorMessage(formik, 'city')}
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="start"
                              placeholder=""
                              name="areaCode"
                              style={
                                isFormFieldValid(formik, 'areaCode')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('areaCode', e?.target?.value);
                              }}
                              value={formik.values.areaCode || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'areaCode')}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="d-flex flex-column bg-pattens-blue rounded p-3 gap-3">
                        <div className="d-flex gap-3">
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Buy Rate
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="carrierName"
                              placeholder="Buy rate"
                              name="buyRate"
                              style={
                                isFormFieldValid(formik, 'buyRate')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('buyRate', e?.target?.value);
                              }}
                              value={formik.values.buyRate || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'buyRate')}
                          </div>
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Effective on
                            </label>
                            <div className="w-100">
                              <div className="dropdown">
                                <div
                                  className="input-group mb-3 calendar-drop"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <input
                                    type="text"
                                    className="form-control bg-white border-end-0"
                                    placeholder="Enter date"
                                    aria-label="date"
                                    aria-describedby="date"
                                    name="buyEffectiveOn"
                                    style={
                                      isFormFieldValid(formik, 'buyEffectiveOn')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                    value={
                                      (formik.values.buyEffectiveOn &&
                                        moment(formik.values.buyEffectiveOn).format(
                                          'DD/MM/YYYY'
                                        )) ||
                                      ''
                                    }
                                    onKeyPress={handleKeyPressForNumber}
                                  />

                                  <a
                                    href="/#"
                                    role="button"
                                    className="input-group-text bg-white"
                                    id="basic-addon2"
                                    style={
                                      isFormFieldValid(formik, 'buyEffectiveOn')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  >
                                    <img src="/assets/date-icon.svg" alt="" />
                                  </a>
                                </div>
                                <ul
                                  className="dropdown-menu drop-calendar w-40 ms-3 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="bg-blue-active rounded-top p-3 text-white">
                                    <p className="fw-bolder fs-12px mb-0">SELECT DATE</p>
                                    <p className="fw-medium fs-14px mb-0">
                                      {moment().format('ddd, MMM D')}
                                    </p>
                                  </div>
                                  <div className="p-2">
                                    <Calendars
                                      defaultYear={moment().year()}
                                      defaultMonth={moment().month()}
                                      defaultDay={moment().date()}
                                      onChange={(date) => {
                                        formik.setFieldValue('buyEffectiveOn', date);
                                      }}
                                    />
                                  </div>
                                  <div className="bg-pattens-blue rounded-bottom p-1 text-white">
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
                                        className="calendar-close d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-2 py-2 ms-1"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </ul>
                                {getFormErrorMessage(formik, 'buyEffectiveOn')}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex gap-3">
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Start Pulse(Sec)
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="carrierName"
                              placeholder="Start pulse"
                              name="buyStarPulse"
                              style={
                                isFormFieldValid(formik, 'buyStarPulse')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('buyStarPulse', e?.target?.value);
                              }}
                              value={formik.values.buyStarPulse || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'buyStarPulse')}
                          </div>
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Next Pulse(Sec)
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="pulse"
                              placeholder="Next pulse"
                              name="buyNextPluse"
                              style={
                                isFormFieldValid(formik, 'buyNextPluse')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('buyNextPluse', e?.target?.value);
                              }}
                              value={formik.values.buyNextPluse || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'buyNextPluse')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <div className="d-flex flex-column bg-pattens-blue rounded p-3 gap-3">
                        <div className="d-flex gap-3">
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Sell Rate
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="carrierName"
                              placeholder="Sell rate"
                              name="sellRate"
                              style={
                                isFormFieldValid(formik, 'sellRate')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('sellRate', e?.target?.value);
                              }}
                              value={formik.values.sellRate || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'sellRate')}
                          </div>

                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Effective on
                            </label>
                            <div className="w-100">
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
                                    name="sellEffectiveOn"
                                    style={
                                      isFormFieldValid(formik, 'sellEffectiveOn')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                    value={
                                      formik.values.sellEffectiveOn &&
                                      moment(formik.values.sellEffectiveOn).format('DD/MM/YYYY')
                                    }
                                    onKeyPress={handleKeyPressForNumber}
                                  />
                                  <a
                                    href="/#"
                                    role="button"
                                    className="input-group-text bg-white"
                                    id="basic-addon2"
                                    style={
                                      isFormFieldValid(formik, 'sellEffectiveOn')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  >
                                    <img src="/assets/date-icon.svg" alt="" />
                                  </a>
                                </div>
                                <ul
                                  className="dropdown-menu drop-calendar w-40 ms-3 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="bg-blue-active rounded-top p-3 text-white">
                                    <p className="fw-bolder fs-12px mb-0">SELECT DATE</p>
                                    <p className="fw-medium fs-14px mb-0">
                                      {moment().format('ddd, MMM D')}
                                    </p>
                                  </div>
                                  <div className="p-2">
                                    <Calendars
                                      defaultYear={moment().year()}
                                      defaultMonth={moment().month()}
                                      defaultDay={moment().date()}
                                      onChange={(date) => {
                                        setCities([]);
                                        formik.setFieldValue('sellEffectiveOn', date);
                                      }}
                                    />
                                  </div>
                                  <div className="bg-pattens-blue rounded-bottom p-1 text-white">
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
                                        className="calendar-close d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-2 py-2 ms-1"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </ul>
                                {getFormErrorMessage(formik, 'sellEffectiveOn')}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex gap-3">
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Start Pulse(Sec)
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="carrierName"
                              placeholder="Start pulse"
                              name="sellStarPulse"
                              style={
                                isFormFieldValid(formik, 'sellStarPulse')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('sellStarPulse', e?.target?.value);
                              }}
                              value={formik.values.sellStarPulse || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'sellStarPulse')}
                          </div>
                          <div className="form-group w-100">
                            <label className="text-primary mb-1" htmlFor="carrierName">
                              Next Pulse(Sec)
                            </label>
                            <input
                              type="text"
                              className="form-control bg-white"
                              id="pulse"
                              placeholder="Next pulse"
                              name="sellNextPluse"
                              style={
                                isFormFieldValid(formik, 'sellNextPluse')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                              onChange={(e) => {
                                setCities([]);
                                formik.setFieldValue('sellNextPluse', e?.target?.value);
                              }}
                              value={formik.values.sellNextPluse || ''}
                              onKeyPress={handleKeyPressForNumber}
                            />
                            {getFormErrorMessage(formik, 'sellNextPluse')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fw-normal text-primary check-title pe-2">Enable</span>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={formik.values.enable}
                            id="activeId"
                            onClick={() => {
                              formik.setFieldValue('enable', !formik.values.enable);
                            }}
                          />
                          <span className="slider round" />
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start align-items-center gap-2 border-0 mt-4">
                      <button
                        type="button"
                        // data-bs-dismiss="modal"
                        id="saveRecord"
                        className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                        onClick={(e) => {
                          e.preventDefault();
                          formik.handleSubmit();
                        }}
                        disabled={dataSubmitting}
                      >
                        {dataSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                        //   data-bs-dismiss="modal"
                        onClick={() => handleClose()}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop show" />
      </>
    );
  }
  return null;
}

export default EditCarrierPlanRateSheet;
