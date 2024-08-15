import React from 'react';

function Modal({ id, children, width, show }) {
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className={`modal modal-lg fade  ${show ? 'show' : 'hiding'}`}
        style={show ? { display: 'block' } : {}}
        id={`${id}`}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: width }}>
          <div className="modal-content modal-dialog-scrollable border-0 p-16px p-md-35px p-sm-16px">
            {children}
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show" />}
    </>
  );
}

export default Modal;
