import React, { useState, useEffect } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteCallerModal({ show, onClose, details, callerList, handleDelete, dataSubmitting }) {
  const [key, setKey] = useState('');

  const [selectedCallerList, setSelectedCallerList] = useState();

  const handleOnClose = () => {
    setKey('');
    onClose();
  };

  useEffect(() => {
    if (details?.groupId && callerList?.length > 0) {
      callerList?.map((list) => {
        if (parseInt(list?.id, 10) === details?.groupId) {
          setSelectedCallerList(list?.attributes?.name);
        }
        return null;
      });
    }
  }, [callerList, details]);

  return (
    <>
      <Modal width="450px" id="deleteVoiceModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Caller</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will <span className="text-primary fw-medium">Delete</span> the caller
          <span className="fw-medium"> {details?.callerName}</span> from the list{' '}
          <span className="fw-medium"> {selectedCallerList}</span>.
        </p>

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
            id="deleteContactToastBtn"
            className="btn bg-faded-red text-white px-4 py-12px"
            // data-bs-dismiss="modal"
            disabled={key.toLowerCase() !== 'delete'}
            onClick={() => {
              handleDelete();
              setKey('');
            }}
          >
            {dataSubmitting ? 'Deleting...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
      <div className="modal-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default DeleteCallerModal;
