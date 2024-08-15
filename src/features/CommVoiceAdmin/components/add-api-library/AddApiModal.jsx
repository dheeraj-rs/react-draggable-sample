import React, { useState } from 'react';
import StatusBadge from '../../../../common/components/badges/StatusBadge';
import Input from '../../../../common/components/forms/Input';
import CheckboxSlider from '../../../../common/components/forms/CheckboxSlider';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function AddApiModal({ show, formik, onClose, loading }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const apitype = [
    {
      id: 1,
      type: 'Select API type',
      label: 'Select API type',
    },
    {
      id: 2,
      type: 'connect',
      label: 'Connect',
    },
    {
      id: 3,
      type: 'get-value',
      label: 'Get value',
    },
    {
      id: 4,
      type: 'check-number',
      label: 'Check Number',
    },
    {
      id: 5,
      type: 'push',
      label: 'Push',
    },
    {
      id: 6,
      type: 'pass-through',
      label: 'Passthrough',
    },
  ];

  // connect, get-value, check-number, push, pass-through

  const handleOptionClick = (optionType) => {
    formik.setFieldValue('onSelected', optionType);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleClosebtn = () => {
    onClose();
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasRightAddAction"
        aria-labelledby="offcanvasRightAddActionLabel"
      >
        <div className="offcanvas-header offcanvas-header-title p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Add API</p>
          </div>
          <div>
            <button type="button" className="btn-close" onClick={handleClosebtn} />
          </div>
        </div>

        <div className="offcanvas-body p-23px pt-0px">
          <div className="d-flex gap-3 align-items-center">
            <h6 className="fw-normal mb-0">API Method</h6>
            <StatusBadge title="POST" />
          </div>

          <div>
            <Input
              label="API Name"
              id="apiName"
              placeholder="Gsoft API"
              type="text"
              name="apiName"
              onChange={formik.handleChange}
              value={formik.values.apiName}
              style={isFormFieldValid(formik, 'apiName') ? { border: '1px solid red' } : {}}
            />
            <p style={{ color: 'red', marginTop: '2px' }}>
              {getFormErrorMessage(formik, 'apiName')}
            </p>
          </div>

          <div className="mt-3">
            <label className="text-primary mb-2">API Type</label>
            <div
              className="select"
              style={isFormFieldValid(formik, 'onSelected') ? { border: '1px solid red' } : {}}
            >
              <div className="selectBtn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {formik.values.onSelected}
              </div>
              <div className={`selectDropdown ${isDropdownOpen ? 'toggle' : ''}`}>
                {apitype?.map((item) => (
                  <div
                    key={item.id}
                    className="option "
                    onClick={() => handleOptionClick(item.type)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <p style={{ color: 'red', marginTop: '-12px' }}>
              {getFormErrorMessage(formik, 'onSelected')}
            </p>
          </div>

          <div className="connect-api">
            <div className="mt-3">
              <label>Primary API URL/JS Function</label>
              <div className="input-group py-1 api-url-input">
                <textarea
                  className="form-control bg-white"
                  id="exampleFormControlTextarea1"
                  placeholder={`${
                    formik.values.onSelected !== 'connect'
                      ? 'Enter API URL'
                      : 'https://cat-fact.herokuapp.com/facts/'
                  }`}
                  rows="3"
                  name="primaryApi"
                  onChange={formik.handleChange}
                  value={formik.values.primaryApi}
                  style={isFormFieldValid(formik, 'primaryApi') ? { border: '1px solid red' } : {}}
                />
              </div>
              <p style={{ color: 'red' }}>{getFormErrorMessage(formik, 'primaryApi')}</p>
            </div>

            <div className="mt-3">
              <label>Fallback API URL/JS Function</label>
              <div className="input-group py-1 api-url-input">
                <textarea
                  className="form-control bg-white"
                  id="exampleFormControlTextarea1"
                  placeholder={`${
                    formik.values.onSelected !== 'connect'
                      ? 'Enter API URL'
                      : 'https://world.openpetfoodfacts.org/api/v0/product/20106836.json'
                  }`}
                  rows="3"
                  name="fallbackApi"
                  onChange={formik.handleChange}
                  value={formik.values.fallbackApi}
                  style={isFormFieldValid(formik, 'fallbackApi') ? { border: '1px solid red' } : {}}
                />
              </div>
              <p style={{ color: 'red' }}>{getFormErrorMessage(formik, 'fallbackApi')}</p>
            </div>
          </div>

          <div className="d-flex gap-3 align-items-center mt-3">
            <p className="mb-0">Is Enabled</p>
            <CheckboxSlider
              checked={formik.values.isEnabled}
              onClick={() => {
                formik.setFieldValue('isEnabled', !formik.values.isEnabled);
              }}
            />
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
            <button
              type="button"
              id="addPropertyButton"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
              onClick={(e) => {
                e.preventDefault();
                handleClosebtn();
              }}
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

export default AddApiModal;
