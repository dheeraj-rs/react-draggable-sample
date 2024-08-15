import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Input from '../../../common/components/forms/Input';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';
import { ListAllCarrierGroups } from '../../../common/api-collection/Telephony/VendorCarrierGroups';
import { ListAllCarriers } from '../../../common/api-collection/Telephony/VendorCarriers';

function AddCarrierLocalSwitch({ show, dataSubmitting, onClose, addNewSwitch }) {
  const [allCarrierGroups, setAllCarrierGroups] = useState([]);

  const [allCarriers, setAllCarriers] = useState([]);

  const validate = (data) => {
    const errors = {};

    if (!data.switchName) {
      errors.switchName = 'switch name is required';
    }
    if (!data.carrierGroup) {
      errors.carrierGroup = 'select a group';
    }
    if (!data.carrierMapping) {
      errors.carrierMapping = 'select a carrier';
    }
    if (!data.switchName) {
      errors.switchName = 'switch name is required';
    }
    if (!data.switchIP) {
      errors.switchIP = 'switch ip is required';
    }
    if (!data.switchPort) {
      errors.switchPort = 'switch port is required';
    }
    if (!data.switchRegion) {
      errors.switchRegion = 'switch region is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      switchName: '',
      carrierGroup: '',
      carrierMapping: '',
      switchIP: '',
      switchPort: '',
      switchRegion: '',
      enable: false,
    },
    validate,
    onSubmit: () => {
      addNewSwitch(formik);
    },
  });

  useEffect(() => {
    ListAllCarrierGroups()?.then((response) => {
      setAllCarrierGroups(response?.data);
    });
  }, []);

  useEffect(() => {
    ListAllCarriers()?.then((response) => {
      setAllCarriers(response?.data);
    });
  }, []);

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
                {allCarrierGroups?.map((carrierGroup, index) => (
                  <option key={index} value={carrierGroup?.id}>
                    {carrierGroup?.attributes?.name}
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
                {allCarriers?.map((carrierGroup, index) => (
                  <option key={index} value={carrierGroup?.id}>
                    {carrierGroup?.attributes?.name}
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
            />
            {getFormErrorMessage(formik, 'switchPort')}

            <Input
              label="Switch region"
              id="delete"
              placeholder="Enter switch region"
              type="textbox"
              disabled={false}
              name="switchRegion"
              onChange={formik.handleChange}
              value={formik?.values?.switchRegion}
              style={isFormFieldValid(formik, 'switchRegion') ? { border: '1px solid red' } : {}}
            />
            {getFormErrorMessage(formik, 'switchRegion')}

            <div className="d-flex gap-2 mt-3">
              <p className="mb-0 d-flex">Enable</p>
              <CheckboxTickChat checkid="activeId" title="" />
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

export default AddCarrierLocalSwitch;
