import React, { useEffect } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';
import '../../../../styles/formvalidation.css';

function AddCategoryModal({ formik, show, onClose, loading }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return (
    <>
      <Modal width="450px" id="addNewCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">New Category</p>
          <ModalClose onClose={onClose} />
        </div>
        <p className="fs-13px text-secondary mb-0">Provide a unique category name</p>
        <div className="mt-1">
          <Input
            type="text"
            label="Category name"
            placeholder="Gsoft_demo_voices"
            name="categoryName"
            value={formik?.values?.categoryName}
            onChange={formik.handleChange}
            maxLength="20"
            style={isFormFieldValid(formik, 'categoryName') ? { border: '1px solid red' } : {}}
          />
          {getFormErrorMessage(formik, 'categoryName')}
        </div>

        <div className="modal-footer  d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            id="addCategotyButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            onClick={() => {
              formik.handleSubmit();
            }}
            disabled={formik.values.categoryName.trim() === '' || loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>

          <ButtonWhiteModalCancel text="Cancel" onClick={onClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default AddCategoryModal;
