import React from 'react';

function NeedHelpOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header px-4 pt-4">
        <h5 id="offcanvasRightLabel" className="text-primary fw-medium fs-16px mb-0">
          <img src="/assets/need-help-black.svg" alt="" /> Need help
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body px-4">
        <h6 className="fs-14px fw-500">Permanant Agent</h6>
        <p>
          Phasellus vitae orci placerat, volutpat lorem non, consectetur sem. Cras tempus odio id
          viverra eleifend. Proin malesuada pretium lectus, vitae scelerisque tortor maximus
          tristique. Sed auctor eget metus nec consequat.{' '}
        </p>
        <h6 className="fs-14px fw-500">Temporary Agent</h6>
        <p>
          Phasellus vitae orci placerat, volutpat lorem non, consectetur sem. Cras tempus odio id
          viverra eleifend. Proin malesuada pretium lectus, vitae scelerisque tortor maximus
          tristique. Sed auctor eget metus nec consequat.{' '}
        </p>
      </div>
    </div>
  );
}

export default NeedHelpOffCanvas;
