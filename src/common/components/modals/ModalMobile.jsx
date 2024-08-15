import React from 'react';

function ModalMobile({ id, children, width }) {
  return (
    <>
      {/* <!-- Modal --> */}

      <div
        className="modal modal-lg fade mt-65"
        id={`${id}`}
        tabIndex="-1"
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" style={{ maxWidth: width }}>
          <div className="modal-content  border-0 p-0 bg-transparent">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ModalMobile;
