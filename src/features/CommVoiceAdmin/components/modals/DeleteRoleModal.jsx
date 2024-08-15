import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteRole() {
  return (
    <Modal width="450px" id="deleteRoleModal">
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium mb-24px">Delete Role</p>
        <ModalClose />
      </div>
      <p className="fs-13px mb-3">
        This action will <span className="text-primary fw-medium">Delete</span> the role
        <span className="fw-medium"> Custom role 1.</span>from the system .
      </p>

      <Input
        label="To confirm this action please type “Delete”"
        id="delete"
        placeholder="Type “Delete”"
        type="textbox"
        disabled={false}
      />

      <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
        <button
          type="button"
          id="deleteToast"
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

export default DeleteRole;
