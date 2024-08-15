import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import Select2 from '../../../../common/components/forms/Select2';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function CreateGroupModal() {
  return (
    <Modal width="429px" id="createGroupModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-3">Create a new group</p>
        <ModalClose />
      </div>
      <p className="text-primary mb-3 fs-13px">
        Create a new contact group and organise your contacts more efficiently.
      </p>
      <div className="inputs d-flex flex-row justify-content-center mb-3">
        <Input
          id="groupName"
          label="Group Name"
          placeholder="Enter group name"
          type="text"
          disabled={false}
        />
      </div>

      <div>
        <div className="form-group mt-3">
          <label className="mb-1">Assign contacts to the new group (optional)</label>
          <Select2 />
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
        <button
          id="createGroupToast"
          data-bs-dismiss="modal"
          type="button"
          className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
        >
          Create group
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default CreateGroupModal;
