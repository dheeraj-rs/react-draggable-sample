import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function ContactUserProfileDeleteModal({ show, onClose, onDelete }) {
  if (show) {
    return (
      <>
        <Modal width="450px" id="deleteModal" show={show}>
          <div className="d-flex justify-content-between">
            <p className="fs-14px text-primary fw-medium mb-24px">Delete Company</p>
            <ModalClose
              onClose={() => {
                onClose();
              }}
            />
          </div>
          <p className="fs-13px text-primary mb-0">
            This action will <span className="text-primary fw-medium">Delete</span> the selected
            contact from the group Comm Users.
          </p>

          <div className="modal-footer d-flex justify-content-center align-items-center gap-4 border-0 p-0 mt-3">
            <button
              type="button"
              id="deleteToast"
              className="btn bg-faded-red text-white px-4 py-12px"
              data-bs-dismiss="modal"
              onClick={() => {
                onDelete(true);
              }}
            >
              Delete
            </button>
            <ButtonWhiteModalCancel
              text="cancel"
              onCancel={() => {
                onClose(false);
              }}
            />
          </div>
        </Modal>
        <div
          className="modal-backdrop show"
          onClick={() => {
            onClose();
          }}
        />
      </>
    );
  }
  return '';
}

export default ContactUserProfileDeleteModal;
