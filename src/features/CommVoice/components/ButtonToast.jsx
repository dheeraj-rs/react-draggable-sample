import React from 'react';

function ButtonToast({ text, btnID }) {
  return (
    <button
      id={btnID}
      type="button"
      className="custom-backdrop-close btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
    >
      {text}
    </button>
  );
}

export default ButtonToast;
