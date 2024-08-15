import React from 'react';

function ButtonWhiteModalCancel({ text, onClick }) {
  return (
    <button
      type="button"
      className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonWhiteModalCancel;
