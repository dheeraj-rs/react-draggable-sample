import React from 'react';

function ButtonToast({ text, btnID, onClick, disabled = false }) {
  return (
    <button
      id={btnID}
      // data-bs-dismiss="modal"
      type="button"
      className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default ButtonToast;
