import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function RenameCategoryModal({ formik, show, onClose, loading }) {
  return (
    <>
      <Modal width="450px" id="renameCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Rename Category</p>
          <ModalClose onClose={onClose} />
        </div>
        <p className="fs-13px text-secondary mb-0">Provide a unique category name</p>

        <Input
          type="text"
          label="Category name"
          placeholder="Gsoft_demo_voices"
          name="categoryRename"
          maxLength="20"
          value={formik?.values?.categoryRename}
          onChange={formik.handleChange}
          style={isFormFieldValid(formik, 'categoryRename') ? { border: '1px solid red' } : {}}
        />
        {getFormErrorMessage(formik, 'categoryRename')}
        <div className="modal-footer  d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            id="addCategotyEditButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            disabled={formik.values.categoryRename === '' || loading}
            onClick={formik.handleSubmit}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={onClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default RenameCategoryModal;
