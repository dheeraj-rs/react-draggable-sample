import React from 'react';
import { useFormik } from 'formik';
import InputModal from '../common/InputModal';
import ButtonCancel from '../common/ButtonCancel';
import '../../../styles/formvalidation.css';
import { getFormErrorMessage, isFormFieldValid } from '../../helpers/utils';

function NewWidgetCreationModal({ onClose, handleCreateNewWidget, isLoading }) {
  const validate = (data) => {
    const errors = {};

    if (!data.widgetName) {
      errors.widgetName = 'widget name is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      widgetName: '',
    },
    validate,
    onSubmit: () => {
      handleCreateNewWidget(formik?.values);
    },
  });

  return (
    <div
      id="createNewWidget"
      className="gap-4 p-4 mb-5 mt-5 rounded shadow-6 align-items-center chat-settings-box"
    >
      <h6 className="fs-14 fw-500 mb-4">Create New widget</h6>
      <div className="row align-items-end">
        <div className="col-lg-7 col-sm-6 mb-lg-0px mb-sm-0px mb-4 mb-md-0px">
          <InputModal
            label="Widget name"
            id="widgetName"
            placeholder="Enter widget name"
            type="textbox"
            disabled=""
            name="widgetName"
            onChange={formik.handleChange}
            value={formik?.values?.widgetName}
            style={isFormFieldValid(formik, 'widgetName') ? { border: '1px solid red' } : {}}
          />
        </div>
        <div className="col-lg-5 col-sm-6 create-btns">
          <button
            type="button"
            id="createwidget"
            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create widget'}
          </button>
          <ButtonCancel text="Cancel" textId="widgetCreationCancel" onClose={onClose} />
        </div>
      </div>
      {getFormErrorMessage(formik, 'widgetName')}
    </div>
  );
}

export default NewWidgetCreationModal;
