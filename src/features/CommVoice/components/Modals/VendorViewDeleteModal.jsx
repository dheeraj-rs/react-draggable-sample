import React, { useState } from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';
import { DeleteCarrier } from '../../../../common/api-collection/Telephony/VendorCarriers';

function VendorViewDeleteModal({ carrierId }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <Modal width="450px" id="deleteModal">
      <div className="d-flex justify-content-between">
        <p className="fs-15px text-primary fw-medium mb-24px">Delete Carrier</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-0">
        This action will Delete the switch
        <span className="fw-medium">Bharati Banglore</span> from the list .
      </p>

      <Input
        label="To confirm this action please type “Delete”"
        id="delete"
        placeholder="Type “Delete”"
        type="textbox"
        disabled={false}
        onChange={(e) => {
          if (e.target.value === 'Delete') {
            setConfirmed(true);
          } else {
            setConfirmed(false);
          }
        }}
      />
      <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
        <button
          type="button"
          id="deleteToast"
          className="btn bg-faded-red text-white px-4 py-12px"
          data-bs-dismiss="modal"
          disabled={!confirmed}
          onClick={() => {
            if (confirmed) DeleteCarrier(carrierId);
          }}
        >
          Delete
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default VendorViewDeleteModal;
