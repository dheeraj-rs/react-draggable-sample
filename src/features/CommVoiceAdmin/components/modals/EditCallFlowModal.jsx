import React from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import ButtonToast from '../../../../common/components/toast/ButtonToast';
import InputModal from '../../../../common/components/common/InputModal';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function EditCallFlowModal({ formik, show, onClose, isLoading }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        tabIndex="-1"
        id="adminCallFlow"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content border-0">
            <div className="modal-content p-4">
              {/* <!-- Modal Header --> */}
              <div className="modal-header border-0">
                <h4 className="modal-title text-dark fw-medium fs-15px">Edit Call Flow</h4>

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

              <div className="modal-body">
                <InputModal
                  name="name"
                  label="Call flow name"
                  id="botName"
                  placeholder="Provide a call flow name"
                  type="textbox"
                  value={formik?.values?.name}
                  onChange={formik.handleChange}
                  style={isFormFieldValid(formik, 'name') ? { border: '1px solid red' } : {}}
                />
                {getFormErrorMessage(formik, 'name')}
              </div>
              <div className="modal-footer border-top-0 justify-content-center">
                <ButtonToast
                  // text="Continue"
                  text={isLoading ? 'loading...' : 'Continue'}
                  btnID="adminFlowContinue"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  disabled={isLoading}
                />
                <ButtonWhiteModalCancel
                  text="Cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${show ? 'show' : 'd-none'}`} />
    </>
  );
}

export default EditCallFlowModal;
