import React from 'react';

function ModalButton({ className, id, btnText, children }) {
  return (
    <button
      type="button"
      className={`btn ${className} `}
      data-bs-toggle="modal"
      data-bs-target={`#${id}`}
    >
      {btnText}
      {children}
    </button>
  );
}

export default ModalButton;
