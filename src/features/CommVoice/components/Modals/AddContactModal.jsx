import React from 'react';
import ModalRight from '../../../../common/components/modals/ModalRight';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function AddContactModal() {
  return (
    <ModalRight width="450px" id="addContactModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-24px">Add a contact</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-0">
        You can add a new contact with or without a contact group.
      </p>

      <Input
        label="First name"
        id="firstName"
        placeholder="Eileen "
        type="textbox"
        disabled={false}
      />
      <Input label="Last name" id="lastName" placeholder="Dover" type="textbox" disabled={false} />
      <Input
        label="Organization"
        id="organization"
        placeholder="Pixel dig inc"
        type="textbox"
        disabled={false}
      />
      <Input
        label="Email adddress"
        id="emailAdddress"
        placeholder="Eileend@example.com"
        type="textbox"
        disabled={false}
      />
      <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#addContactSecondPage"
          type="button"
          className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
        >
          Next
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </ModalRight>
  );
}

export default AddContactModal;
