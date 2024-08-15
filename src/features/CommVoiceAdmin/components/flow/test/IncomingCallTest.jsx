import React from 'react';

function IncomingCallTest() {
  return (
    <div className="mt-3 shadow-11 rounded call-playing" id="callIncoming">
      <div className="d-flex justify-content-between bg-chat-blue p-3">
        <div className="">
          <h6 className="text-secondary">Component Playing</h6>
          <p className="mb-0 text-secondary">--</p>
        </div>

        <div className="">
          <h6 className="text-secondary">Time</h6>
          <p className="mb-0 text-secondary">--</p>
        </div>
      </div>

      <div className="text-center click-play p-3 mt-4">
        <img src="/assets/info-icon-blue.svg" alt="" />
        <p className="mb-0 mt-2">
          Click on <strong>Start</strong> button to start your call flow
        </p>
      </div>
    </div>
  );
}

export default IncomingCallTest;
