import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function DeleteGroupModal({ name, onDelete, show, onClose }) {
  const [text, setText] = useState();
  if (show) {
    return (
      <>
        <Modal width="450px" id="deleteGroupModal" show={show}>
          <div className="d-flex justify-content-between">
            <p className="fs-14px text-primary fw-medium mb-24px">Delete</p>
            <ModalClose
              onClose={() => {
                onClose();
              }}
            />
          </div>
          <p className="fs-13px text-primary mb-0">
            This action will <span className="text-primary fw-medium">Delete</span> the department{' '}
            <span className="fw-medium"> {name} </span> .
          </p>

          <Input
            label="To confirm this action please type “Delete”"
            onChange={(e) => {
              setText(e.target.value);
            }}
            id="delete"
            placeholder="Type “Delete”"
            type="textbox"
            disabled={false}
          />

          <div className="modal-footer d-flex justify-content-center align-items-center gap-4 border-0 p-0 mt-3">
            <button
              type="button"
              id="deleteToast"
              // eslint-disable-next-line eqeqeq
              disabled={text?.toLocaleLowerCase() !== 'delete'}
              onClick={() => onDelete()}
              className="btn bg-faded-red text-white px-4 py-12px"
              data-bs-dismiss="modal"
            >
              Delete
            </button>
            <ButtonWhiteModalCancel text="cancel" onCancel={() => onClose()} />
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

export default DeleteGroupModal;
