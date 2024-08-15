import React, { useState } from 'react';
import ModalClose from '../../../common/components/modals/ModalClose';
import Modal from '../../../common/components/modals/Modal';
import Input from '../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function Delete({
  heading = '',
  part1 = '',
  part2 = '',
  tail = '',
  show,
  onClose,
  deleteSwitch,
  loading = false,
}) {
  const [key, setKey] = useState('');

  const handleClose = () => {
    setKey('');
    onClose();
  };

  return (
    <>
      <Modal width="450px" id="deleteModal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-15px text-primary fw-medium mb-24px">{heading}</p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-primary mb-0">
          {part1}
          <span className="fw-medium">&nbsp;{part2}&nbsp;</span>
          {tail}
        </p>

        <Input
          label="To confirm this action please type “Delete”"
          id="delete"
          placeholder="Type “Delete”"
          type="textbox"
          disabled={false}
          onChange={(e) => {
            setKey(e.target.value);
          }}
          value={key || ''}
        />
        <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
          <button
            type="button"
            id="deleteToast"
            className="btn bg-faded-red text-white px-4 py-12px"
            // data-bs-dismiss="modal"
            disabled={loading || key.toLocaleLowerCase() !== 'delete'}
            onClick={() => {
              setKey('');
              deleteSwitch();
            }}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <ButtonWhiteModalCancel text="cancel" onCancel={handleClose} />
        </div>
      </Modal>
      <div
        className={`offcanvas-backdrop fade ${show ? 'show' : ''}`}
        style={show ? {} : { display: 'none' }}
      />
    </>
  );
}

export default Delete;
// DeleteSwitch
