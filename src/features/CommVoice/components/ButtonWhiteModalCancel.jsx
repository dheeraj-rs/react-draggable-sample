import React from 'react';

function ButtonWhiteModalCancel({ text, onCancel }) {
  return (
    <button
      className="custom-backdrop-close d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-2"
      // data-bs-dismiss="modal"
      type="button"
      onClick={() => {
        onCancel();
      }}
    >
      {text}
    </button>
  );
}

export default ButtonWhiteModalCancel;
