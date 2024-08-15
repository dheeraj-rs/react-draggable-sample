import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';
import Input from '../../../common/components/forms/Input';
import ModalClose from '../../../common/components/modals/ModalClose';
import Modal from '../../../common/components/modals/Modal';

function DisableModal({ show, actionKey, onClose, handleAction, isProcessing, name }) {
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
      <Modal show={show} width="450px" id="disableModal">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Disable Template</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will disable the selected call flow template{' '}
          <span className="text-primary fw-medium">{name}.</span>
        </p>

        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/Info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once disable the template It wont be visible to the customers panel.
            </p>
          </div>
        </div>
        <Input
          label="To confirm this action please type “Disable”"
          id="disable"
          placeholder="Type “Disable”"
          type="text"
          disabled={false}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            data-bs-dismiss="modal"
            id="disableToastBtn"
            type="button"
            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
            onClick={() => {
              setKey('');
              handleAction();
            }}
            disabled={isDisabled || isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Disable'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
        </div>
      </Modal>
    );
  }
}

export default DisableModal;
