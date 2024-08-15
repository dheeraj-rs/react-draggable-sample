import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function DeleteCompanyModal() {
  return (
    <Modal width="450px" id="deleteModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-24px">Delete Company</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-0">
        This action will <span className="text-primary fw-medium">Delete</span> the selected contact
        from the group Comm Users.
      </p>

      <div className="modal-footer d-flex justify-content-center align-items-center gap-4 border-0 p-0 mt-3">
        <button
          type="button"
          id="deleteToast"
          className="btn bg-faded-red text-white px-4 py-12px"
          data-bs-dismiss="modal"
        >
          Delete
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default DeleteCompanyModal;
