import React from 'react';
import useStore from '../store';

function Timer({ time }) {
  const { activeNodeType } = useStore();
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="d-flex justify-content-between bg-chat-blue p-3">
      <div className="">
        <h6 className="text-secondary">Component Playing</h6>
        <p className="mb-0 text-secondary">{activeNodeType}</p>
      </div>

      <div className="">
        <h6 className="text-secondary">Time</h6>
        <p className="mb-0 text-secondary">{formatTime(time)}</p>
      </div>
    </div>
  );
}

export default Timer;
