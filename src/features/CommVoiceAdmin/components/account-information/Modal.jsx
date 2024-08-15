import React from 'react';

function Modal({ id, children, width }) {
  return (
    <div
      className="modal modal-lg fade"
      id={`${id}`}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog " style={{ maxWidth: width }}>
        <div className="modal-content modal-dialog-scrollable border-0 p-16px p-md-35px p-sm-16px">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
