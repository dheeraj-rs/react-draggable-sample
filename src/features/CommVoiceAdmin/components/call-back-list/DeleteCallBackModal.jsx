import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteCallBackModal({ show, onClose, action, isProcessing }) {
  const handleOnClose = () => {
    onClose();
  };
  if (show) {
    return (
      <Modal Modal show={show} width="450px" id="deleteVoiceCategory">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Remove from queue</p>
          <div className="mt-n4 me-n4">
            <ModalClose onClose={handleOnClose} />
          </div>
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will Delete the selected callback request from the callback queue.
        </p>

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteQueueBtn"
            className="btn bg-faded-red text-white px-4 py-12px"
            onClick={action}
            disabled={isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Remove'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
    );
  }
}

export default DeleteCallBackModal;
