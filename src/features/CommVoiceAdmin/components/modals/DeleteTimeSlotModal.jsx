import React, { useEffect, useState } from 'react';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function DeleteTimeSlotModal({
  show,
  actionKey,
  action,

  handleOnClose,
  isProcessing,
}) {
  const [key, setKey] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (key && key.toLocaleLowerCase() === actionKey?.toLocaleLowerCase()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [key]);

  if (show) {
    return (
      <Modal show={show} width="450px" id="deleteTimeModal">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Time Slot</p>
          <ModalClose
            onClose={() => {
              setKey('');
              handleOnClose();
            }}
          />
        </div>
        <p className="fs-13px text-primary mb-2">This action will delete the time slot</p>
        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="text"
          disabled={false}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteHourBtn"
            className="btn bg-faded-red text-white px-4 py-12px"
            disabled={isDisabled || isProcessing}
            onClick={() => {
              setKey('');
              action();
            }}
          >
            {isProcessing ? 'Loading...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel
            text="Cancel"
            onClick={() => {
              setKey('');
              handleOnClose();
            }}
          />
        </div>
      </Modal>
    );
  }
}

export default DeleteTimeSlotModal;
