import React, { useState } from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../../common/components/forms/Input';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function ClearCallerListModal({ show, onClose, dataSubmitting, clearCallerList }) {
  const [key, setKey] = useState('');

  const handleOnClose = () => {
    setKey('');
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="clearCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Clear Caller list</p>
          <ModalClose onClose={handleOnClose} />
        </div>
        <p className="fs-13px text-secondary mb-0">
          This action will clear the Caller list Connecting voice
        </p>
        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once clear all the caller list will be move to uncategorized.
            </p>
          </div>
        </div>

        <div className="mt-1">
          <Input
            type="text"
            label="To confirm this action please type “Clear”"
            placeholder="Type “Clear”"
            name="clearListName"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
        </div>
        <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            id="clearCategotyEditButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            onClick={() => {
              clearCallerList();
              setKey('');
            }}
            disabled={key.toLowerCase() !== 'clear' || dataSubmitting}
          >
            {dataSubmitting ? 'Clearing...' : 'Clear'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleOnClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default ClearCallerListModal;
