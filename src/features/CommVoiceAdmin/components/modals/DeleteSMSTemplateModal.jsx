import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteSMSTemplateModal() {
  return (
    <Modal width="450px" id="deleteVoiceModal">
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete SMS Template</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-2">
        This action will <span className="text-primary fw-medium">Delete</span> the SMS Template
        <span className="fw-medium">SMS template_001</span> from the list.
      </p>

      <Input
        label="To confirm this action please type “Delete”"
        id="delete"
        placeholder="Type “Delete”"
        type="text"
        disabled={false}
      />

      <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
        <button
          type="button"
          id="deleteContactToastBtn"
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

export default DeleteSMSTemplateModal;
