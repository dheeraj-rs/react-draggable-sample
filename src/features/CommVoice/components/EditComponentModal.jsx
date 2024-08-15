import React from 'react';
import CheckboxSlider from '../../../common/components/forms/CheckboxSlider';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';

function EditComponentModal({ show, onClose, formik, title, icon, isProcessing }) {
  const handleOnClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <>
      <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" id="editTemplate">
        <div className="modal-dialog mt-65">
          <div className="modal-content border-0">
            <div className="modal-content p-4">
              <div className="modal-header border-0">
                <h4 className="modal-title text-dark  fs-15px">
                  <span className="fw-medium">Edit Component</span> - {title}
                </h4>

                <a
                  href="/#"
                  type="button"
                  className="btn-close"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOnClose();
                  }}
                />
              </div>

              <div className="modal-body edit-component">
                <label className="mb-2">Component</label>
                <div className="d-flex gap-2 align-items-center">
                  <div className="bg-white-azure p-2 rounded">
                    <img src={icon} alt="" />
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder={title}
                      className="form-control"
                      name="componentName"
                      onChange={formik.handleChange}
                      value={formik.values.componentName}
                      style={
                        isFormFieldValid(formik, 'componentName')
                          ? { border: '1px solid red', borderRadius: '8px' }
                          : { border: '' }
                      }
                    />
                    <span style={{ color: 'red' }}>
                      {getFormErrorMessage(formik, 'componentName')}
                    </span>
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Component Description
                  </label>
                  <textarea
                    className="form-control bg-white"
                    id="exampleFormControlTextarea1"
                    placeholder="This component is use to set up the first message that callers listen when they call to your company"
                    rows="4"
                    name="componentDescription"
                    onChange={formik.handleChange}
                    value={formik.values.componentDescription}
                    style={
                      isFormFieldValid(formik, 'componentDescription')
                        ? { border: '1px solid red', borderRadius: '8px' }
                        : { border: '' }
                    }
                  />
                  <span style={{ color: 'red' }}>
                    {getFormErrorMessage(formik, 'componentDescription')}
                  </span>
                  <div className="d-flex gap-3 align-items-center mt-3">
                    <CheckboxSlider
                      checked={formik.values.isEnabled}
                      onClick={() => {
                        formik.setFieldValue('isEnabled', !formik.values.isEnabled);
                      }}
                    />{' '}
                    <span className="text-primary">Enable</span>
                  </div>
                </div>

                <div className="modal-footer border-top-0 justify-content-start p-0">
                  <button
                    id="saveTemplatebtn"
                    type="button"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    className="custom-backdrop-close btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Loading...' : 'Save'}
                  </button>
                  <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default EditComponentModal;
