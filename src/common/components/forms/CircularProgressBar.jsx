import React from 'react';

function CircularProgressBar({ value, dataPercentage }) {
  return (
    <div className="gap-2  progress-card progress-head">
      <div className="progress-green" data-percentage={dataPercentage}>
        <span className="progress-left-green">
          <span className="progress-bar-green" />
        </span>
        <span className="progress-right-green">
          <span className="progress-bar-green" />
        </span>
        <div className="progress-value-green">
          <div className="fw-bolder text-green-haze">{value}</div>
        </div>
      </div>
      <span>
        <span className="fw-medium"> Days trial left</span>
        <a className="me-3" href="/#">
          {' '}
          Upgrade Plan
        </a>
      </span>
    </div>
  );
}

export default CircularProgressBar;
