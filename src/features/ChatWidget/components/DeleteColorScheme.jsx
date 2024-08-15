import React from 'react';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import Input from '../../../common/components/forms/Input';
import ButtonWhiteModalCancel from './ButtonWhiteModalCancel';

function DeleteColorScheme() {
  return (
    <Modal width="435px" id="deleteModal">
      <div className="d-flex justify-content-between">
        <p className="fs-17px text-primary fw-medium mb-24px">Delete Color Scheme</p>
        <ModalClose />
      </div>
      <p className="text-primary">
        This action will
        {' '}
        <span className="text-primary fw-medium">Delete</span>
        {' '}
        selcted
        color scheme
        <span className="fw-medium"> Sea blue</span>
        {' '}
        from the collection .
      </p>
      <Input
        label="To confirm this action please type Delete"
        id="delete"
        placeholder="Type “Delete”"
        type="textbox"
        disabled={false}
        value=""
        onChange={() => { }}
      />
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
          data-bs-dismiss="modal"
          id="deleteAppearance"
        >
          Delete
        </button
                    >
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default DeleteColorScheme;
