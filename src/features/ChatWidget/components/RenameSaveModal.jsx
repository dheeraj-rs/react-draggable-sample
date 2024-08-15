import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import InputModal from '../../../common/components/common/InputModal';
import ButtonToast from './ButtonToast';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';

function RenameSaveModal() {
  return (
    <Modal width="435px" id="renameModal">
      <div className="d-flex justify-content-between">
        <p className="fs-17px text-primary fw-medium mb-24px">Rename Color Scheme</p>
        <ModalClose />
      </div>

      <div className="modal-body">
        <InputModal
          label="Scheme name"
          id="Grad-blue"
          placeholder="Sea Blue"
          type="textbox"
          disabled=""
          onChange={() => { }}
        />
      </div>
      <div className="modal-footer border-top-0 justify-content-center">
        <ButtonToast text="Save" btnID="renameColor" />
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default RenameSaveModal;
