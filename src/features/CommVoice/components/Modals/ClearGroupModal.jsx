import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function ClearGroupModal() {
  return (
    <Modal width="429px" id="clearGroupModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-24px">Clear group</p>
        <ModalClose />
      </div>
      <p className="text-primary">
        This action will <span className="text-primary fw-medium">Clear</span> all the contacts from
        the group
        <span className="fw-medium">Custom people list.</span>
      </p>
      <Input
        label="To confirm this action please type Clear"
        id="delete"
        placeholder="Type “Clear”"
        type="textbox"
        disabled={false}
      />

      <div className="d-flex justify-content-start gap-3 mt-5">
        <button
          id="clearGroupToast"
          data-bs-dismiss="modal"
          type="button"
          className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px"
        >
          Clear group
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default ClearGroupModal;
