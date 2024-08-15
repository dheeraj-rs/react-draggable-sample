import React, { useEffect, useState } from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import Input from '../../../common/components/forms/Input';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';

function UnpublishSingleTemplateModal({
  show,
  actionKey,
  onClose,
  handleAction,
  isProcessing,
  templateName,
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
      <Modal show={show} width="450px" id="publishFlow">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-24px">
            UnPublish Template - {templateName}
          </p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <div className="mb-3">
          {' '}
          <img src="/assets/publish.svg" alt="" />
        </div>

        <p className="fs-13px text-primary mb-2">
          This action will unpublish the
          <span className="fw-medium">&nbsp;Call Flow</span> template - {templateName} to the system
        </p>

        <Input
          label="To confirm this action please type “UnPublish”"
          id="publish"
          placeholder="Type “Publish”"
          type="text"
          disabled={false}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />

        <div className="d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            id="addPublishButton"
            data-bs-dismiss="modal"
            type="button"
            className="addPublishButton btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
            onClick={() => {
              setKey('');
              handleAction();
            }}
            disabled={isDisabled || isProcessing}
          >
            {isProcessing ? 'Loading...' : 'Unpublish Template'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onCancel={handleOnClose} />
        </div>
      </Modal>
    );
  }
}
export default UnpublishSingleTemplateModal;
