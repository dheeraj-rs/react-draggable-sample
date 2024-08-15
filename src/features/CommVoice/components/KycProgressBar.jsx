import React from 'react';

function KYCProgressComponent({ percentage }) {
  if (percentage) {
    return (
      <div className="doc-details">
        <div className="d-flex justify-content-between">
          <div className="mb-2">Uploading...</div>
          <div>{percentage}%</div>
        </div>
        <div className="card-progress mb-15">
          <div
            className="progress-bar card-progress-bar kyc-progress"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    );
  }
  return '';
}

export default KYCProgressComponent;
