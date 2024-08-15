import React from 'react';

function ButtonToast({ text, btnID, onClick, disabled }) {
  return (
    <button
      id={btnID}
      type="button"
      className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
      onClick={(e) => {
        onClick(e);
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default ButtonToast;
