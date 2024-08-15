import React, { useEffect, useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DeleteAgentModal({ show, actionKey, onClose, handleAction, agentName, isProcessing }) {
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
      <Modal show={show} width="450px">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium mb-24px">Delete Agent</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-primary mb-3">
          This action will <span className="text-primary fw-medium">Delete</span> the Agent
          <span className="fw-medium">&nbsp;{agentName}&nbsp;</span>from the system .
        </p>

        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="textbox"
          onChange={(e) => {
            setKey(e.target.value);
          }}
          disabled={false}
        />

        <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteToast"
            className="btn bg-faded-red  text-white px-4 py-12px"
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

export default DeleteAgentModal;
