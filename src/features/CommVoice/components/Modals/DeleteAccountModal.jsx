import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function DeleteAccountModal() {
  return (
    <Modal width="429px" id="deleteAccountModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-24px">Delete contacts</p>
        <ModalClose />
      </div>
      <p className="fs-12px text-primary mb-0">
        This action will <span className="text-primary fw-medium">Delete</span>the{' '}
        <span className="fw-medium">Account details</span> permanently.
      </p>
      <Input
        label="To confirm this action please type Delete"
        id="delete"
        placeholder="Type “Delete”"
        type="textbox"
        disabled={false}
      />

      <div className="d-flex justify-content-center gap-3 mt-5">
        <button
          type="button"
          id="deleteAccountBtn"
          className="btn bg-faded-red text-white px-4 py-12px"
          data-bs-dismiss="modal"
        >
          Delete Contact
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default DeleteAccountModal;
