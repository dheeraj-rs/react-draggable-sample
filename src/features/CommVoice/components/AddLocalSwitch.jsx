import React from 'react';

import Input from '../../../common/components/forms/Input';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function AddLocalSwitch({
  show,
  dataSubmitting,
  onClose,
  unpaginatedCarriers,
  unpaginatedCarrierGroups,
  countries,
  formik,
}) {
  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasLocalSwitch"
        aria-labelledby="offcanvasLocalSwitchLabel"
      >
        <div className="add-local-switch">
          <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
            <div>
              <p className="fs-16px text-primary fw-medium mb-0">Add Local Switch</p>
            </div>
            <div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  formik.resetForm();
                  onClose();
                }}
              />
            </div>
          </div>
          <div className="offcanvas-body p-23px pt-0px">
            <Input
              label="Switch name"
              id="delete"
              placeholder="Enter switch name"
              type="textbox"
              disabled={false}
              name="switchName"
              onChange={formik.handleChange}
              value={formik?.values?.switchName}
              style={isFormFieldValid(formik, 'switchName') ? { border: '1px solid red' } : {}}
              maxLength="50"
            />
            {getFormErrorMessage(formik, 'switchName')}

            <div className="mt-3">
              <label className="mb-1">Carrier Group</label>
              <select
                className="form-select bg-white"
                aria-label="Default select example"
                name="carrierGroup"
                style={isFormFieldValid(formik, 'carrierGroup') ? { border: '1px solid red' } : {}}
                onChange={(e) => {
                  formik.setFieldValue('carrierGroup', parseInt(e?.target?.value, 10));
                }}
                value={formik.values.carrierGroup || 'select'}
              >
                <option value="select" disabled>
                  -Select group-
                </option>
                {unpaginatedCarrierGroups?.map((group) => (
                  <option value={group?.id} key={group?.id}>
                    {group?.attributes?.name}
                  </option>
                ))}
              </select>
              {getFormErrorMessage(formik, 'carrierGroup')}
            </div>
            <div className="mt-3">
              <label className="mb-1">Carrier Mapping</label>
              <select
                className="form-select bg-white"
                aria-label="Default select example"
                name="carrierMapping"
                style={
                  isFormFieldValid(formik, 'carrierMapping') ? { border: '1px solid red' } : {}
                }
                onChange={(e) => {
                  formik.setFieldValue('carrierMapping', parseInt(e?.target?.value, 10));
                }}
                value={formik.values.carrierMapping || 'select'}
              >
                <option value="select" disabled>
                  -Select carrier-
                </option>
                {unpaginatedCarriers?.map((group) => (
                  <option value={group?.id} key={group?.id}>
                    {group?.attributes?.name}
                  </option>
                ))}
              </select>
              {getFormErrorMessage(formik, 'carrierMapping')}
            </div>
            <Input
              label="Switch IP"
              id="delete"
              placeholder="Enter port number"
              type="textbox"
              disabled={false}
              name="switchIP"
              onChange={formik.handleChange}
              value={formik?.values?.switchIP}
              style={isFormFieldValid(formik, 'switchIP') ? { border: '1px solid red' } : {}}
            />
            {getFormErrorMessage(formik, 'switchIP')}

            <Input
              label="Switch Port"
              id="delete"
              placeholder="Enter port number"
              type="textbox"
              disabled={false}
              name="switchPort"
              onChange={formik.handleChange}
              value={formik?.values?.switchPort}
              style={isFormFieldValid(formik, 'switchPort') ? { border: '1px solid red' } : {}}
              onKeyPress={handleKeyPressForNumber}
            />
            {getFormErrorMessage(formik, 'switchPort')}

            <div className="mt-3">
              <label className="mb-1">Switch region</label>
              <select
                className="form-select bg-white"
                aria-label="Default select example"
                name="switchRegion"
                style={isFormFieldValid(formik, 'switchRegion') ? { border: '1px solid red' } : {}}
                onChange={(e) => {
                  formik.setFieldValue('switchRegion', e?.target?.value);
                }}
                value={formik.values.switchRegion || 'select'}
              >
                <option value="select" disabled>
                  -Select region-
                </option>
                {countries?.map((country) => (
                  <option value={country?.attributes?.name} key={country?.id}>
                    {country?.attributes?.name}
                  </option>
                ))}
              </select>
              {getFormErrorMessage(formik, 'switchRegion')}
            </div>

            <div className="d-flex gap-2 mt-3">
              <p className="mb-0 d-flex">Enable</p>
              <CheckboxTickChat
                checkid="activeId"
                title=""
                onChange={() => {}}
                onClick={() => {
                  formik.setFieldValue('enable', !formik?.values?.enable);
                }}
                active={formik?.values?.enable}
              />
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
              <button
                id="addSwitch"
                // data-bs-dismiss="offcanvas"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                disabled={dataSubmitting}
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                {dataSubmitting ? 'Adding...' : 'Add Switch'}
              </button>

              <a
                href="/#"
                // data-bs-dismiss="offcanvas"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                onClick={(e) => {
                  e.preventDefault();
                  formik.resetForm();
                  onClose();
                }}
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default AddLocalSwitch;
