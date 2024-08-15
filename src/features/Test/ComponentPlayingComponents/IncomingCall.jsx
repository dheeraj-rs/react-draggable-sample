import React from 'react';

function IncomingCall({ isVisible }) {
  return (
    <div className={`text-center click-play p-3 mt-4 ${isVisible ? '' : 'd-none'} `}>
      <img src="/assets/info-icon-blue.svg" alt="" />
      <p className="mb-0 mt-2">
        Click on <strong>Start</strong> button to start your call flow
      </p>
    </div>
  );
}

export default IncomingCall;
