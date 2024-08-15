import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function ClearCategoryModal({ show, onClose, loading, name, formik }) {
  const [key, setKey] = useState('');

  const handleClose = () => {
    setKey('');
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="clearCategory" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium fs-16px mb-24px">Clear Category</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-secondary mb-0">This action will clear the category {name}</p>
        <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
          <div>
            <img src="/assets/info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once clear all the music files will be move to uncategorized.
            </p>
          </div>
        </div>
        <div className="mt-1">
          <Input
            type="text"
            label="To confirm this action please type “Clear”"
            placeholder="Type “Clear”"
            value={key}
            // style={isFormFieldValid(formik, 'categoryCount') ? { border: '1px solid red' } : {}}
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
          {/* {getFormErrorMessage(formik, 'categoryCount')} */}
        </div>

        <div className="modal-footer  d-flex justify-content-start align-items-center border-0 p-0 mt-4">
          <button
            data-bs-dismiss="modal"
            id="clearCategotyEditButton"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-3 py-12px"
            disabled={key.toLowerCase() !== 'clear' || loading}
            onClick={() => {
              setKey('');
              formik.handleSubmit();
            }}
          >
            {loading ? 'Clearing...' : 'Clear'}
          </button>
          <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default ClearCategoryModal;
