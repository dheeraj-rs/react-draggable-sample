import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function DeleteAccountDetailsModal({ show, onClose, handleDelete, loading }) {
  const [key, setKey] = useState('');
  const handleClose = () => {
    setKey('');
    onClose();
  };
  return (
    <>
      <Modal width="450px" id="deleteModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-15px text-primary fw-medium mb-24px">Delete Account details</p>
          <ModalClose
            onClose={() => {
              handleClose();
            }}
          />
        </div>
        <p className="fs-13px text-primary mb-0">This action will Delete the Account details</p>

        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="textbox"
          disabled={false}
          onChange={(e) => {
            setKey(e.target.value);
          }}
          value={key}
        />
        <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteToast"
            className="btn bg-faded-red text-white px-4 py-12px"
            // data-bs-dismiss="modal"
            disabled={key.toLowerCase() !== 'delete' || loading}
            onClick={() => {
              handleDelete();
            }}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel
            text="cancel"
            onCancel={() => {
              setKey('');
              handleClose();
            }}
          />
        </div>
      </Modal>
      {show && <div className="modal-backdrop fade show" />}
    </>
  );
}

export default DeleteAccountDetailsModal;
