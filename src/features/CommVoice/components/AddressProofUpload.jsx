import React from 'react';
import { Link } from 'react-router-dom';
import NotSubmitted from '../../../common/components/badges/NotSubmitted';

function AddressProofUpload() {
  return (
    <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
      <div className="d-flex flex-row justify-content-between">
        <div className="text-primary fs-13px fw-medium">Company Address Proof</div>
        <NotSubmitted title="not submitted" />
      </div>

      <div className="doc-details">
        <div className="d-flex flex column align-items-center gap-3">
          <div>
            <Link to="/">
              <img src="/assets/address-proof.svg" alt="" />
            </Link>
          </div>
          <div>
            <div
              role="button"
              className="doc-upload w-100 d-flex flex-column align-items-center justify-content-center rounded p-3"
            >
              <div className="position-relative">
                <input type="file" multiple="" />
                <span>
                  <Link to="/" className="text-blue-active fw-bolder">
                    Click
                  </Link>
                  <span className="fw-medium text-primary">to upload</span> or{' '}
                  <span className="fw-medium text-primary">drag and drop</span>
                  <br />
                  Maximum file size less than 4 MB{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressProofUpload;
