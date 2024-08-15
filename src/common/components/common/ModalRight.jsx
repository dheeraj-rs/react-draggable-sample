import React from 'react';

function ModalRight({ title, subhead }) {
  return (
    <div className="modal resolve-modal" id="rightModal">
      <div className="modal-dialog modal-dialog-right fadeInRight animated ml-auto modal-custom-dialog">
        <div className="modal-content modal-custom-content">
          {/* <!-- Modal Header --> */}
          <div className="modal-header">
            <h4 className="modal-title text-dark fw-500 fs-18px">{title}</h4>

            <a href="/#" type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>

          {/* <!-- Modal body --> */}
          <div className="modal-body">
            <div className="d-flex flex-wrap">
              <p className="fs-12px text-secondary">{subhead}</p>
            </div>
          </div>

          {/* <!-- Modal footer --> */}
          <div className="modal-footer modal-custom-footer">
            <button type="button" className="btn bg-black me-3">
              Save
            </button>
            <button type="button" className="btn light-btn" data-bs-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRight;
