import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteVoiceModal({ show, name, handleDelete, onClose, loading }) {
  const [key, setKey] = useState('');

  const handleClose = () => {
    setKey('');
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="deleteVoiceModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Voice</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will <span className="text-primary fw-medium">Delete</span> the voice
          <span className="fw-medium"> {name}</span> from the system .
        </p>

        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="text"
          disabled={false}
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />

        <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteContactToastBtn"
            className="btn bg-faded-red text-white px-4 py-12px"
            data-bs-dismiss="modal"
            onClick={() => {
              setKey('');
              handleDelete();
            }}
            disabled={key.toLowerCase() !== 'delete' || loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default DeleteVoiceModal;
