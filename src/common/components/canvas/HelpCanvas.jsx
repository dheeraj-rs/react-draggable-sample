import React from 'react';
import ReadMoreLess from '../common/ReadMoreLess';

function HelpCanvas() {
  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-scroll="true">
      <div className="offcanvas-header d-flex align-items-center px-4">
        <h5 className="offcanvas-title text-primary fw-medium fs-16px" id="offcanvasRightLabel">
          <img src="/assets/need-help-black.svg" alt="need-help-black" />
          {' '}
          Need help
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body px-4">
        <hr className="m-0 border-black o-16" />
        <p className="text-primary fw-medium mt-4">What is widget?</p>

        <ReadMoreLess
          id="read-2"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.Libero fuga facilis vel consectetur quos sapiente deleniti eveniet dolores tempore eos deserunt facilis vel consectetur quos sapiente deleniti eveniet dolores tempore eos deserunt"
          moreText="officia quis ab? Excepturi vero tempore minus beatae voluptatem!"
        />
      </div>
    </div>
  );
}

export default HelpCanvas;
