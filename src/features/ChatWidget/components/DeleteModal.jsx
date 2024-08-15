import React, { useState } from 'react';

import Input from '../../../common/components/forms/Input';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';

function DeleteModal({ handleDelete, selected, onClose }) {
  const [key, setKey] = useState('');

  return (
    <Modal width="435px" id="deleteModalTopics">
      <div className="d-flex justify-content-between">
        <p className="fs-17px text-primary fw-medium mb-24px">Delete {selected?.type}</p>
        <ModalClose
          onClose={() => {
            setKey('');
            onClose();
          }}
        />
      </div>
      <p className="text-primary">
        This action will <span className="text-primary fw-medium">Delete</span> {selected?.type}{' '}
        <span className="fw-medium">{selected?.title}</span> from the list .
      </p>
      <Input
        label="To confirm this action please type Delete"
        id="delete"
        placeholder="Type “Delete”"
        type="textbox"
        disabled={false}
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
          data-bs-dismiss="modal"
          id="deleteTopic"
          disabled={key.toLowerCase() !== 'delete'}
          onClick={() => {
            handleDelete();
            // setToastAction({ isVisible: true, message: 'deleted the topic', type: 'delete' });
            setKey('');
          }}
          // onClose={() => {
          //   setKey('');
          // }}
        >
          Delete
        </button>
        <ButtonWhiteModalCancel
          text="cancel"
          onCancel={() => {
            setKey('');
            onClose();
          }}
        />
      </div>
    </Modal>
  );
}

export default DeleteModal;
