import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import Input from '../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';

function AddCarrierPlan({ show, allCarrierGroups = [], setShow, formik, loading = false }) {
  const handleClose = () => {
    setShow({
      isVisible: false,
      type: '',
    });
    formik.resetForm();
  };

  return (
    <>
      <Modal width="435px" id="carrierPlanModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-15px text-primary fw-medium mb-0">Add Carrier Plan</p>
          <ModalClose onClose={handleClose} />
        </div>

        <Input
          label="Carrier Plan Name"
          id="planName"
          type="text"
          disabled=""
          name="carrierPlanName"
          onChange={formik.handleChange}
          value={formik?.values?.carrierPlanName}
          style={isFormFieldValid(formik, 'carrierPlanName') ? { border: '1px solid red' } : {}}
          maxLength="50"
        />
        {getFormErrorMessage(formik, 'carrierPlanName')}

        <div className="form-group mt-3">
          <label className="text-primary mb-1">Carrier Group </label>
          <select
            className="form-control form-select bg-white"
            style={isFormFieldValid(formik, 'carrierGroupId') ? { border: '1px solid red' } : {}}
            onChange={(e) => {
              formik.setFieldValue('carrierGroupId', e?.target?.value);
            }}
            value={formik?.values?.carrierGroupId || 'select'}
          >
            <option value="select" disabled>
              Select
            </option>

            {allCarrierGroups?.length > 0 &&
              allCarrierGroups?.map((option, index) => (
                <option key={index} value={option?.id}>
                  {option?.attributes?.name}
                </option>
              ))}
          </select>
          {getFormErrorMessage(formik, 'carrierGroupId')}
        </div>
        <div className="d-flex gap-2 align-items-center mt-3">
          <p className="mb-0">Active</p>
          <label className="switch">
            <input
              type="checkbox"
              onClick={() => {
                formik.setFieldValue('isEnabled', !formik?.values?.isEnabled);
              }}
              onChange={() => {}}
              checked={formik?.values?.isEnabled}
            />
            <span className="slider num-check round" />
          </label>
        </div>
        <div className="modal-footer border-top-0 justify-content-start mt-4 p-0">
          <button
            href="/#"
            id="addPlan"
            type="button"
            className="btn bg-black d-flex align-items-center text-white px-4 py-12px"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Plan'}
          </button>
          <ButtonWhiteModalCancel text="cancel" onCancel={handleClose} />
        </div>
      </Modal>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default AddCarrierPlan;
