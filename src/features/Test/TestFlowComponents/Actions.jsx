import React from 'react';
import './style.css';

function Actions({ handleStart, handleStop, handleReset }) {
  return (
    <div className="shadow-11 rounded p-3 d-flex gap-4 justify-content-between mt-5 mt-sm-3">
      <p className="mb-0 d-flex gap-2 align-items-center action-adjust" onClick={handleStart}>
        <img src="/assets/start-button.svg" alt="" /> Start
      </p>
      <p
        className="mb-0 d-flex gap-2 align-items-center opacity-75 action-adjust"
        onClick={handleStop}
      >
        <img src="/assets/stop-button.svg" alt="" /> Stop
      </p>
      <p
        className="mb-0 d-flex gap-2 align-items-center opacity-75 action-adjust"
        onClick={handleReset}
      >
        <img src="/assets/reastat-button.svg" alt="" /> Restart
      </p>
    </div>
  );
}

export default Actions;
