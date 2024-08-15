import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../../common/components/forms/Input';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function DeleteHolidayModal({ show, actionKey, onClose, handleAction, isProcessing }) {
  const [key, setKey] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleOnClose = () => {
    setKey('');
    onClose();
  };
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
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Holiday</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will delete the selected holiday from the calendar
        </p>
        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/Info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once delete the holiday you have to set working hours for this date.
            </p>
          </div>
        </div>
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
            id="deleteHolidayBtn"
            className="btn bg-faded-red text-white px-4 py-12px"
            data-bs-dismiss="modal"
            onClick={() => {
              setKey('');
              handleAction();
            }}
            disabled={isDisabled || isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
    );
  }
}

export default DeleteHolidayModal;
