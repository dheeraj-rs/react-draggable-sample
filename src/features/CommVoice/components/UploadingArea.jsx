import React from 'react';
import NotSubmitted from '../../../common/components/badges/NotSubmitted';

function UploadingArea() {
  return (
    <div className="col-lg-6 col-sm-12">
      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
        <div className="d-flex flex-row justify-content-between">
          <div className="fw-medium fs-13px text-primary">Your company PAN card</div>
          <NotSubmitted title="not submitted" />
        </div>

        <div className="doc-details">
          <div className="mt-4 d-flex justify-content-between">
            <div>Uploading...</div>
            <div>30%</div>
          </div>
          <div className="card-progress mb-15">
            <div
              className="progress-bar card-progress-bar"
              role="progressbar"
              style={{ width: '25%' }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadingArea;
