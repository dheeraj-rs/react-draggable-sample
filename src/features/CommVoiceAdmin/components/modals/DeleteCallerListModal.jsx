import React, { useState } from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../../common/components/forms/Input';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function DeleteCallerListModal({ show, onClose, details, handleDeleteCallerList, dataSubmitting }) {
  const [key, setKey] = useState('');

  const handleOnClose = () => {
    setKey('');
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="deleteVoiceCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Caller list</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will delete the Caller list {details?.title}
        </p>
        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once delete all the files in this Caller list will be deleted permanently, can’t undo
              this action.
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
            disabled={key.toLowerCase() !== 'delete'}
            onClick={() => {
              handleDeleteCallerList();
              setKey('');
            }}
          >
            {dataSubmitting ? 'Deleting...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default DeleteCallerListModal;
