import React, { useEffect, useState } from 'react';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';
import Input from '../../../common/components/forms/Input';
import ModalClose from '../../../common/components/modals/ModalClose';
import Modal from '../../../common/components/modals/Modal';

function DeleteTemplateModal({
  show,
  actionKey,
  onClose,
  handleAction,
  templateName,
  isProcessing,
}) {
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
      <Modal show={show} width="450px" id="deleteTemplate">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Delete Template</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-primary mb-2">
          This action will delete the selected call flow template{' '}
          <span className="text-primary fw-medium">{templateName}</span> from the system.
        </p>

        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/Info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once remove the template Already assigned call flow will be release and show in flow
              list.
            </p>
          </div>
        </div>
        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="text"
          onChange={(e) => {
            setKey(e.target.value);
          }}
          disabled={false}
        />

        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            id="deleteCategoryToastBtn"
            className="template-delete btn bg-faded-red text-white px-4 py-12px"
            type="button"
            onClick={() => {
              setKey('');
              handleAction();
            }}
            disabled={isDisabled || isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
        </div>
      </Modal>
    );
  }
}

export default DeleteTemplateModal;
