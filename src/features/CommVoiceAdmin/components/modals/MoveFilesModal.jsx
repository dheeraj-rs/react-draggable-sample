import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function MoveFilesModal({ formik, show, onClose, loading, categories, selectId }) {
  return (
    <>
      <Modal width="450px" id="moveModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Move file(s)</p>
          <ModalClose onClose={onClose} />
        </div>
        <p className="fs-13px text-secondary mb-3">
          This action will Move the selected files to category
        </p>

        <div className="mt-4">
          <div className="form-group mt-3">
            <label className="text-primary mb-1">Move to category</label>
            <select
              id="category"
              name="selectCategoryId"
              className="form-control form-select bg-white"
              value={formik.values.selectCategoryId}
              onChange={formik.handleChange}
            >
              <option value="">Select</option>

              {categories?.length > 0 &&
                categories?.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.attributes.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="modal-footer  d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            data-bs-dismiss="modal"
            id="moveButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            disabled={
              parseInt(formik?.values?.selectCategoryId, 10) === selectId ||
              formik?.values?.selectCategoryId === null ||
              loading
            }
            onClick={formik.handleSubmit}
          >
            {loading ? 'Moving...' : 'Move'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={onClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default MoveFilesModal;
