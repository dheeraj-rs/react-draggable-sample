import React from 'react';

function ModalClose({ onClose }) {
  return (
    <button
      id="moda-close"
      type="button"
      className="btn-close"
      aria-label="Close"
      data-bs-dismiss="modal"
      onClick={onClose}
    />
  );
}

export default ModalClose;
