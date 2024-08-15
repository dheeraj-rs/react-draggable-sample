import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function DeleteContactModal({ show, onClose, onDelete }) {
  const [key, setKey] = useState();
  if (show) {
    return (
      <>
        <Modal width="429px" id="deleteContactModal" show>
          <div className="d-flex justify-content-between">
            <p className="fs-14px text-primary fw-medium mb-24px">Delete Agent</p>
            <ModalClose />
          </div>
          <p className="fs-12px text-primary mb-0">
            This action will <span className="text-primary fw-medium">Delete</span> the Agent{' '}
          </p>
          <Input label="To confirm this action please type Delete" onChange={(e) => setKey(e.target.value)} id="delete" placeholder="Type “Delete”" type="textbox" disabled={false} />

          <div className="d-flex justify-content-center gap-3 mt-5">
            <button
              type="button"
              disabled={key?.toLocaleLowerCase() !== 'delete'}
              id="deleteContactToast"
              onClick={() => onDelete()}
              className="btn bg-faded-red text-white px-4 py-12px"
              data-bs-dismiss="modal"
            >
              Delete Contact
            </button>
            <ButtonWhiteModalCancel onCancel={() => onClose()} text="cancel" />
          </div>
        </Modal>
        <div
          className="modal-backdrop show"
          onClick={() => {
            onClose();
          }}
        />
      </>
    );
  }
  return '';
}

export default DeleteContactModal;
