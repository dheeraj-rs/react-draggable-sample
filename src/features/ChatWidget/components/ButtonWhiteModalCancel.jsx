import React from 'react';

function ButtonWhiteModalCancel({ text, onCancel }) {
  return (
    <button
      id="modal-close"
      type="button"
      className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
      data-bs-dismiss="modal"
      aria-label="Close"
      onClick={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      {text}
    </button>
  );
}

export default ButtonWhiteModalCancel;
