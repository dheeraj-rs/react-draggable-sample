import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function SetValueConformationBox({ show, onClose, formik, handleSetValue }) {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <>
      <Modal width="429px" id="setValue" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-24px">Set Value</p>
          <ModalClose
            onClose={() => {
              handleClose();
            }}
          />
        </div>
        <p className="fs-12px text-primary">
          This action will update the list with new applied data
        </p>
        <div className="d-flex rounded p-23px bg-aqua-squeeze">
          <div>
            <img src="/assets/info-blue.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner ps-3">
              Once make these change this can be revert to previous value.
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-5">
          <a
            href="/#"
            data-bs-dismiss="modal"
            id="previewToast"
            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
            onClick={(e) => {
              e.preventDefault();
              handleSetValue();
            }}
          >
            Save
          </a>
          <ButtonWhiteModalCancel
            text="cancel"
            onCancel={() => {
              handleClose();
            }}
          />
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default SetValueConformationBox;
