import React, { useState } from 'react';
import countryCodes from 'country-codes-list';

import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';
import '../../../../styles/formvalidation.css';

function EditCallerOffcanvas({ formik, show, onClose, carriers, dataSubmitting, callerList = [] }) {
  const [isToggled, setIsToggled] = useState(false);

  const countryCodeListData = countryCodes.customList('countryCode', '+{countryCallingCode}');
  const handleOnClose = () => {
    setIsToggled(false);
    formik.resetForm();
    onClose();
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasEditCaller"
        aria-labelledby="offcanvasEditCallerLabel"
      >
        <div className="offcanvas-header offcanvas-header-title d-flex justify-content-between p-23px pb-10px">
          <div>
            <h5
              className="mb-0 offcanvas-title text-dark fs-16px fw-medium"
              id="offcanvasContactLabel"
            >
              Edit Caller
            </h5>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={handleOnClose}
            />
          </div>
        </div>

        <div className="offcanvas-body p-23px pt-0px">
          <div>
            <div className="form-group w-100 mt-3">
              <label className="text-primary mb-1 label-mandatory" htmlFor="callerName">
                Caller Name
              </label>
              <input
                type="text"
                className="form-control bg-white"
                id="callerName"
                placeholder="Caller Name"
                name="callerName"
                onChange={formik.handleChange}
                style={isFormFieldValid(formik, 'callerName') ? { border: '1px solid red' } : {}}
                value={formik?.values?.callerName || ''}
              />
              {getFormErrorMessage(formik, 'callerName')}
            </div>
            <div className="form-group w-100 mt-3">
              <label className="text-primary mb-1 label-mandatory" htmlFor="groupName">
                Group Name
              </label>
              <select
                className="form-control bg-white"
                id="carriers"
                name="groupId"
                onChange={formik.handleChange}
                style={isFormFieldValid(formik, 'groupId') ? { border: '1px solid red' } : {}}
                value={formik?.values?.groupId || 'select'}
              >
                <option value="select" disabled>
                  select
                </option>
                {callerList?.length > 0 &&
                  callerList.map((caller) => (
                    <option key={caller?.id} value={caller?.id}>
                      {caller?.attributes?.name}
                    </option>
                  ))}
              </select>
              {getFormErrorMessage(formik, 'groupId')}
            </div>
            <div className="mt-3">
              <label className="text-primary mb-1 label-mandatory" htmlFor="groupName">
                Number
              </label>
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <select
                    className="form-control  form-select bg-white w-15"
                    id="carriers"
                    name="countryCode"
                    onChange={formik.handleChange}
                    style={
                      isFormFieldValid(formik, 'countryCode') ? { border: '1px solid red' } : {}
                    }
                    value={formik?.values?.countryCode || 'select'}
                  >
                    <option value="select" disabled>
                      select
                    </option>
                    {Object.keys(countryCodeListData).length > 0 &&
                      Object.keys(countryCodeListData).map((key, index) => (
                        <option key={index}>{countryCodeListData[key]}</option>
                      ))}
                  </select>
                  {getFormErrorMessage(formik, 'countryCode')}
                </div>

                <div className="form-group w-100">
                  <input
                    type="text"
                    className="form-control bg-white w-100"
                    id="number"
                    placeholder="Enter number"
                    name="phone"
                    onChange={formik.handleChange}
                    style={isFormFieldValid(formik, 'phone') ? { border: '1px solid red' } : {}}
                    value={formik?.values?.phone || ''}
                    onKeyPress={handleKeyPressForNumber}
                  />
                  {getFormErrorMessage(formik, 'phone')}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="">
                <label className="mb-1 text-primary fs-13px">Carriers (optional)</label>
                <div
                  className="select"
                  style={isFormFieldValid(formik, 'carrierId') ? { border: '1px solid red' } : {}}
                >
                  <div
                    className="selectBtn"
                    data-type="firstOption"
                    onClick={() => {
                      setIsToggled(!isToggled);
                    }}
                  >
                    {formik.values.carrierId !== '' &&
                      carriers?.map((carrier) => {
                        if (parseInt(carrier?.id, 10) === formik.values.carrierId) {
                          return carrier?.attributes?.name;
                        }
                        return null;
                      })}
                    {formik.values.carrierId === '' ? 'select' : ''}
                  </div>
                  <div className={`selectDropdown ${isToggled ? 'custom-toggle' : ''}`}>
                    {carriers?.length > 0 &&
                      carriers?.map((carrier, index) => (
                        <div
                          className="option"
                          data-type="firstOption"
                          key={index}
                          onClick={() => {
                            formik.setFieldValue('carrierId', parseInt(carrier?.id, 10));
                            setIsToggled(false);
                          }}
                        >
                          {carrier?.attributes?.name}
                        </div>
                      ))}
                  </div>
                </div>
                {getFormErrorMessage(formik, 'carrierId')}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
            <button
              id="editCallerToast"
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
              onClick={() => {
                formik.handleSubmit();
              }}
              disabled={dataSubmitting}
            >
              {dataSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
              data-bs-dismiss="offcanvas"
              onClick={handleOnClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default EditCallerOffcanvas;
