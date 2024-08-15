import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../../common/components/forms/Input';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function DefaultTimeSlotModal({ show, actionKey, onClose, handleAction, isProcessing }) {
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
      <Modal show={show} width="450px" id="defaultTimeSlot">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Default Time Slot</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-secondary mb-0">
          This action will make the selected time slot as default agent time.
        </p>
        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/Info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once Change the default time slot will not be edit or delete.
            </p>
          </div>
        </div>

        <div className="mt-1">
          <Input
            type="text"
            label="To confirm this action please type “Default”"
            placeholder="Type “Default”"
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-5">
          <button
            data-bs-dismiss="modal"
            id="defaultTimeSlotBtn"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-4 py-12px"
            onClick={() => {
              setKey('');
              handleAction();
            }}
            disabled={isDisabled || isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Apply'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
    );
  }
}

export default DefaultTimeSlotModal;
