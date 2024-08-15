import React from 'react';

function ModalRight({ id, children, width }) {
  return (
    <>
      {/* <!-- Modal --> */}

      <div
        className="modal modal-lg fade  modal-dialog-right fadeInRight animated ml-auto modal-custom-dialog mt-65"
        id={`${id}`}
        tabIndex="-1"
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-right" style={{ maxWidth: width }}>
          <div className="modal-content border-0 p-35px">{children}</div>
        </div>
      </div>

    </>
  );
}

export default ModalRight;
