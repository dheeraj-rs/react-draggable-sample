import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteVoiceCategoryModal({ show, name, onClose, handleDelete, loading }) {
  const [key, setKey] = useState('');
  const handleClose = () => {
    setKey('');
    onClose();
  };

  const handleDeleteClick = () => {
    if (key.toLowerCase() === 'delete' && !loading) {
      setKey('');
      handleDelete();
    }
  };

  return (
    <>
      <Modal width="450px" id="deleteVoiceCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete category</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-primary mb-2">This action will delete the category {name}</p>
        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once delete all the music files in this category will be deleted permanently, can’t
              undo this action.
            </p>
          </div>
        </div>
        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="text"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteCategoryToastBtn"
            className="btn bg-faded-red text-white px-4 py-12px"
            disabled={key.toLowerCase() !== 'delete' || loading}
            onClick={handleDeleteClick}
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

export default DeleteVoiceCategoryModal;
