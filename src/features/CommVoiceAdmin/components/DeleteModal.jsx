import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function DeleteModal() {
  return (
    <Modal width="450px" id="deleteVoiceCategory">
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Callback Request</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-2">
        This action will Delete the selected callback request from the callback queue.
      </p>

      <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
        <button
          type="button"
          id="deleteQueueBtn"
          className="btn bg-faded-red text-white px-4 py-12px"
          data-bs-dismiss="modal"
        >
          Delete
        </button>
        <ButtonWhiteModalCancel text="Cancel" />
      </div>
    </Modal>
  );
}

export default DeleteModal;
