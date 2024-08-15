import React from 'react';

function CallButton() {
  return (
    <a
      data-bs-toggle="collapse"
      href="#startCalling"
      className="bg-black d-flex align-items-center text-white px-sm-5 px-10px px-lg-4 py-12px rounded call-button call-waiting-widget-button"
    >
      <i className="me-2">
        <span>
          <img src="/assets/call-white-icon.svg" alt="# " />
        </span>
      </i>
      <span>Call</span>
    </a>
  );
}

export default CallButton;
