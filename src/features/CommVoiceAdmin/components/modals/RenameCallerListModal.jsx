import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function RenameCallerListModal({ show, onClose, formik, dataSubmitting }) {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="renameCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Rename Caller list</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-secondary mb-0">Provide a unique Caller list name</p>

        <Input
          type="text"
          label="Category name"
          placeholder="Gsoft_demo_voices"
          onChange={formik.handleChange}
          name="callerListName"
          value={formik?.values?.callerListName}
          style={isFormFieldValid(formik, 'callerListName') ? { border: '1px solid red' } : {}}
        />
        {getFormErrorMessage(formik, 'callerListName')}

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            data-bs-dismiss="modal"
            id="addCategotyEditButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            disabled={dataSubmitting}
          >
            {dataSubmitting ? 'Saving...' : 'Save'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default RenameCallerListModal;
