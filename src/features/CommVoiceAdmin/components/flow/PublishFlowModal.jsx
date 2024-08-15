import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function PublishFlowModal({ isVisible, name = '', onPublish, loading = false, onClose }) {
  const [key, setKey] = useState('');

  const handlClose = () => {
    setKey('');
    onClose();
  };

  if (isVisible) {
    return (
      <>
        <Modal width="450px" id="publishFlow" show>
          <div className="d-flex justify-content-between">
            <p className="fs-16px text-primary fw-medium fs-16px mb-24px">Publish Call Flow</p>
            <ModalClose onClose={handlClose} />
          </div>
          <div className="mb-3">
            <img src="/assets/upload-up.svg" alt="" />
          </div>

          <p className="fs-13px text-primary mb-2">
            This action will publish the call flow <span className="fw-medium">{name}</span>
          </p>

          <Input
            label="To confirm this action please type “Publish”"
            id="publish"
            placeholder="Type “Publish”"
            type="text"
            onChange={(e) => {
              setKey(e.target.value);
            }}
            value={key}
          />

          <div className=" d-flex justify-content-start align-items-center border-0 p-0 mt-4">
            <button
              id="addPublishButton"
              // data-bs-dismiss="modal"
              type="button"
              className="addPublishButton btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
              disabled={!(key?.toLowerCase() === 'publish') || loading}
              onClick={() => {
                setKey('');
                onPublish();
              }}
            >
              {loading ? 'Publishing...' : 'Publish Flow'}
            </button>
            <ButtonWhiteModalCancel text="Cancel" onClick={handlClose} />
          </div>
        </Modal>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
  return null;
}

export default PublishFlowModal;
