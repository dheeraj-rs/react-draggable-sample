import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import Input from '../../../common/components/forms/Input';
import CheckboxSlider from '../../../common/components/forms/CheckboxSlider';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';

function AddNewTemplateModal({ show, onClose, formik, isProcessing, allCallFlow }) {
  const handleOnClose = () => {
    formik.resetForm();
    onClose();
  };

  if (show) {
    return (
      <Modal show={show} width="550px" id="addTemplate">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-0">Add Template</p>
          <ModalClose onClose={handleOnClose} />
        </div>

        <Input
          type="text"
          label="Template Name"
          placeholder="Get Value"
          name="templateName"
          onChange={formik.handleChange}
          value={formik.values.templateName}
          style={
            isFormFieldValid(formik, 'templateName')
              ? { border: '1px solid red', borderRadius: '8px' }
              : { border: '' }
          }
        />
        <span style={{ color: 'red' }}>{getFormErrorMessage(formik, 'templateName')}</span>

        <div className="position-relative">
          <div className="form-group mt-4">
            <label className="text-primary mb-1">Template Description</label>
            <textarea
              className="form-control chatTextBox bg-white"
              rows="4"
              placeholder="Get value from call component to process."
              name="templateDescription"
              onChange={formik.handleChange}
              value={formik.values.templateDescription}
              style={
                isFormFieldValid(formik, 'templateDescription')
                  ? { border: '1px solid red', borderRadius: '8px' }
                  : { border: '' }
              }
            />
            <span style={{ color: 'red' }}>
              {getFormErrorMessage(formik, 'templateDescription')}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 text-primary fs-13px">Link Call Flow (optional)</label>
          <select
            className="form-control form-select bg-white"
            id="linkCallFlow"
            name="linkCallFlow"
            value={formik.values.linkCallFlow || 'select'}
            onChange={formik.handleChange}
          >
            <option value="select" disabled>
              -Select call flow-
            </option>
            {allCallFlow.map((e, index) => (
              <option key={index} value={e.id}>
                {e.attributes.name}
              </option>
            ))}
          </select>
          {/* <Selectbox
            label="Link Call Flow (optional)"
            options={['-Select call flow-', 'Call_queue_2023', 'Call_queue_2024']}
            onSelect={(selectedOption) => {
              formik.setFieldValue('linkCallFlow', selectedOption);
            }}
          /> */}
        </div>

        <div className="mt-3 d-flex gap-2 align-items-center">
          <CheckboxSlider
            checked={formik.values.isEnabled}
            onClick={() => {
              formik.setFieldValue('isEnabled', !formik.values.isEnabled);
            }}
          />{' '}
          <span className="text-primary">Enable</span>
        </div>
        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            id="addBtn"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center text-white px-4 py-12px"
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Add'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
        </div>
      </Modal>
    );
  }
}
export default AddNewTemplateModal;
