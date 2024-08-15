import React from 'react';

function SmsButton({ setShow }) {
  return (
    <a
      href="#/"
      onClick={(e) => {
        e.preventDefault();
        setShow({ isVisible: true, type: 'sms-offcanvas' });
      }}
      aria-controls="offcanvasSms"
      className="bg-black d-flex align-items-center text-white px-sm-5 px-10px px-lg-4 py-12px rounded"
    >
      <i className="me-2">
        <span>
          <img src="/assets/sms-white.svg" alt="# " />
        </span>
      </i>
      <span>SMS</span>
    </a>
  );
}

export default SmsButton;
