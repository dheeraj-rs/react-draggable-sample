import React from 'react';

function HangUpTest() {
  return (
    <div className="mt-3 shadow-11 rounded call-playing" id="hangUp">
      <div className="choose-agent px-3 mt-4">
        <div className="bg-cyan-blue p-4 d-flex justify-content-center rounded py-5">
          <p className="mb-0 text-blue-active">Call Ended</p>
        </div>
      </div>
    </div>
  );
}

export default HangUpTest;
