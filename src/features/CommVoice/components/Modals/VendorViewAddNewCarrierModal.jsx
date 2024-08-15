/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';

import Input from '../../../../common/components/forms/Input';
import ButtonToast from '../../../ChatWidget/components/ButtonToast';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';
import '../../../../styles/formvalidation.css';
import CheckboxTickChat from '../../../../common/components/forms/CheckboxTIckChat';

function VendorViewAddNewCarrierModal({
  onClose,
  show,
  groupName = '',
  allCarrierGroups,
  formik,
  dataSubmitting,
  countries,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClose = () => {
    formik?.resetForm();
    onClose();
  };

  return (
    <>
      <div
        className="modal mt-65 "
        style={{ display: show ? 'block' : '' }}
        tabIndex="-1"
        id="addCarrierdropModal"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content p-lg-4 p-2 border-0">
            {/* <!-- Modal Header --> */}
            <div className="modal-header border-0 pb-0">
              <h4 className="modal-title text-dark fw-medium fs-15px">
                Add New Carrier - <span className="text-secondary fw-normal">{groupName}</span>
              </h4>

              <a
                href="/#"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  formik?.resetForm();
                  handleClose();
                }}
              />
            </div>

            <div className="modal-body pt-1 border-0">
              <div className="row d-flex">
                <div className="col-lg-6">
                  <div className="flex flex-column gap-2">
                    <Input
                      label="Carrier Name"
                      id="carrierName"
                      type="text"
                      placeholder="Enter carrier name"
                      disabled={false}
                      name="carrierName"
                      onChange={formik?.handleChange}
                      value={formik?.values?.carrierName}
                      style={
                        isFormFieldValid(formik, 'carrierName') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'carrierName')}
                  </div>
                  <div className="flex flex-column form-group mt-3">
                    {/* <Input
                      label="Carrier Region"
                      id="carrierRegion"
                      type="text"
                      placeholder="Enter carrier region"
                      disabled={false}
                      name="carrierRegion"
                      onChange={formik?.handleChange}
                      value={formik?.values?.carrierRegion}
                      style={
                        isFormFieldValid(formik, 'carrierRegion') ? { border: '1px solid red' } : {}
                      }
                    /> */}
                    <label className="mb-1">Carrier Region</label>
                    <select
                      className="form-select bg-white"
                      aria-label="Default select example"
                      name="carrierRegion"
                      style={
                        isFormFieldValid(formik, 'carrierRegion') ? { border: '1px solid red' } : {}
                      }
                      onChange={(e) => {
                        formik.setFieldValue('carrierRegion', e?.target?.value);
                      }}
                      value={formik.values.carrierRegion || 'select'}
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
                    {getFormErrorMessage(formik, 'carrierRegion')}
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <label className="mb-1">Carrier Group</label>
                  <select
                    className="form-select bg-white"
                    aria-label="Default select example"
                    placeholder="Enter carrier group"
                    disabled
                    name="carrierGroup"
                    onChange={formik?.handleChange}
                    value={formik?.values?.carrierGroup}
                    style={
                      isFormFieldValid(formik, 'carrierGroup') ? { border: '1px solid red' } : {}
                    }
                  >
                    <option defaultValue disabled value="">
                      Choose an option
                    </option>
                    {allCarrierGroups?.length > 0 &&
                      allCarrierGroups?.map((group) => (
                        <option key={group?.id} value={group?.id}>
                          {group?.attributes?.name}
                        </option>
                      ))}
                  </select>
                  {getFormErrorMessage(formik, 'carrierGroup')}
                </div>
              </div>
              <div className="pb-4 rounded bg-light-blue2 px-4 mt-3">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <Input
                      label="Carrier IP"
                      id="carrierIp"
                      type="text"
                      placeholder="00.00.00.00"
                      disabled={false}
                      name="carrierIp"
                      onChange={formik?.handleChange}
                      value={formik?.values?.carrierIp}
                      style={
                        isFormFieldValid(formik, 'carrierIp') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'carrierIp')}
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <Input
                      label="Carrier Port"
                      id="carrierPort"
                      type="text"
                      disabled={false}
                      name="carrierPort"
                      placeholder="Enter carrier port"
                      onChange={formik?.handleChange}
                      value={formik?.values?.carrierPort}
                      style={
                        isFormFieldValid(formik, 'carrierPort') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'carrierPort')}
                  </div>
                </div>
              </div>
              <div className="pb-4 rounded bg-light-blue2 px-4 mt-3 pt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0">Carrier Credentials</h6>
                  <CheckboxTickChat
                    checkid="credToggle"
                    title=""
                    onChange={() => {}}
                    onClick={() => {
                      formik?.setFieldValue(
                        'isCarrierCredentialsActive',
                        !formik?.values?.isCarrierCredentialsActive
                      );
                    }}
                    checked={formik?.values?.isCarrierCredentialsActive}
                  />
                </div>
                <div
                  className={`row creditials-fileds  ${
                    formik?.values?.isCarrierCredentialsActive ? '' : 'd-none'
                  }`}
                >
                  <div className="col-lg-6 col-sm-6">
                    <Input
                      label="Username"
                      // id="userName"
                      type="text"
                      placeholder="Enter username"
                      disabled={false}
                      name="userName"
                      onChange={formik?.handleChange}
                      value={formik?.values?.userName}
                      style={
                        isFormFieldValid(formik, 'userName') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'userName')}
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="form-group form-custom-group mt-2">
                      <label className="mt-2 mb-1" htmlFor="group">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          className="form-control bg-white border-end-0"
                          id="password"
                          type={isPasswordVisible ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter password"
                          disabled={false}
                          onChange={formik?.handleChange}
                          value={formik?.values?.password}
                          style={
                            isFormFieldValid(formik, 'password') ? { border: '1px solid red' } : {}
                          }
                        />
                        <span
                          className="input-group-text bg-transparent confirm-password-showhide"
                          onClick={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                          }}
                          style={
                            isFormFieldValid(formik, 'password') ? { border: '1px solid red' } : {}
                          }
                        >
                          <i
                            className={
                              isPasswordVisible
                                ? 'fa fa-eye-slash trigger-password pwd-toggle '
                                : 'fa trigger-password pwd-toggle fa-eye'
                            }
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      {getFormErrorMessage(formik, 'password')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-6 d-flex gap-2">
                  <p className="mb-0 d-flex">Enable</p>
                  <CheckboxTickChat
                    name="enable"
                    checkid="enable"
                    title=""
                    onChange={() => {}}
                    onClick={() => {
                      formik?.setFieldValue('enable', !formik?.values?.enable);
                    }}
                    active={formik?.values?.enable}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0 justify-content-start">
              <ButtonToast
                text={dataSubmitting ? 'Adding...' : 'Add Carrier'}
                btnID="addCarrier"
                onClick={(e) => {
                  e.preventDefault();
                  formik?.handleSubmit();
                }}
                disabled={dataSubmitting}
              />
              <ButtonWhiteModalCancel
                text="cancel"
                onCancel={() => {
                  handleClose();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default VendorViewAddNewCarrierModal;
