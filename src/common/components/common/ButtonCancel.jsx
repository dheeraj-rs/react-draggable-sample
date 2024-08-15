import React from 'react';

function ButtonCancel({ text, textId, onClose, disabled }) {
  return (
    <button
      onClick={onClose}
      disabled={disabled}
      type="button"
      id={textId}
      className="btn border border-gray-blue text-dark fw-500 px-3 fs-14px ms-0 ms-lg-2 mt-3 mt-sm-0 mt-md-0 ms-md-2 mt-lg-0 py-12px"
    >
      {text}
    </button>
  );
}

export default ButtonCancel;
