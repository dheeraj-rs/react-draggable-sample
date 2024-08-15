import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function DisableApiModal({ type, title, show, onClose, formik, disableLoading, enableLoading }) {
  const [key, setKey] = useState('');
  const handleClose = () => {
    setKey('');
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="disableModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium mb-3">
            {type === 'enable-api' ? 'Enable API' : 'Disable API'}
          </p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="text-primary mb-3 fs-13px">
          This action will disable the the selected API <span className="fw-bolder">{title}</span>{' '}
          from the library.
        </p>
        <div className="d-flex gap-3 p-3 rounded bg-off-green">
          <div>
            <img src="/assets/info-blue.svg" alt="info" />
          </div>
          <div>
            <p className="mb-0 text-secondary-blue">
              Once disable the API, It wont be available for the selection from components.
            </p>
          </div>
        </div>
        <div className="inputs d-flex flex-row justify-content-center mb-3 mt-4">
          <Input
            id="private"
            label={`To confirm this action please type “${
              type === 'enable-api' ? 'Enable' : 'Disable'
            }”`}
            placeholder={`Type “${type === 'enable-api' ? 'Enable' : 'Disable'}”`}
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          {type === 'enable-api' ? (
            <button
              href="#/"
              id="disableComponent"
              type="button"
              className="btn bg-black d-flex align-items-center text-white px-4 py-12px ms-0"
              disabled={key.toLowerCase() !== 'enable' || enableLoading}
              onClick={() => {
                setKey('');
                formik.handleSubmit();
              }}
            >
              {enableLoading ? 'Enabling....' : 'Enable'}
            </button>
          ) : (
            <button
              href="#/"
              id="disableComponent"
              type="button"
              className="btn bg-black d-flex align-items-center text-white px-4 py-12px ms-0"
              disabled={key.toLowerCase() !== 'disable' || disableLoading}
              onClick={() => {
                setKey('');
                formik.handleSubmit();
              }}
            >
              {disableLoading ? 'Disable....' : 'Disable'}
            </button>
          )}
          <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default DisableApiModal;
