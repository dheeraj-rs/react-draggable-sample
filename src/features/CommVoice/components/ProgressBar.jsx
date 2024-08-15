import React from 'react';

function ProgressBar({ value, dataPercentage, content }) {
  return (
    <div className="gap-2  progress-card  progress-card d-flex flex-column flex-md-row align-self-start align-items-center">
      <div className="progress-agent" data-percentage={dataPercentage}>
        <span className="progress-left-agent">
          <span className="progress-bar-agent" />
        </span>
        <span className="progress-right-agent">
          <span className="progress-bar-agent" />
        </span>
        <div className="progress-value-agent">
          <div className="fw-500">{value}</div>
        </div>
      </div>
      <span>{content}</span>
    </div>
  );
}

export default ProgressBar;
