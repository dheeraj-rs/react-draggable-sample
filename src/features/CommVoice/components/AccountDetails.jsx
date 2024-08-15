import React from 'react';
import { Link } from 'react-router-dom';

function AccountDetails() {
  return (
    <div className="col-lg-6">
      <div className="panel-center bg-white rounded">
        <div className="p-23px pt-0 user-list-profile scroll-custom">
          <div className="d-flex flex-column">
            <p className="mb-0 fw-medium text-primary fs-14px">Account details</p>
            <p className="mb-0 text-secondary">
              Details of the accounts in which this agent associated
            </p>
          </div>
          <div
            role="button"
            className="mt-3 product-box d-flex align-items-center  bg-white shadow-6 rounded p-3"
          >
            <div className="d-flex gap-3">
              <div>
                <img src="/assets/comm-voice.svg" alt="comm voice" />
              </div>
              <div className="d-flex align-items-start justify-content-start flex-column gap-1">
                <div className="text-primary fw-500">Comm Voice</div>
                <div className="fw-500 text-blue-badge">
                  abcinternational.comm.com
                  <Link
                    to="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="info"
                    aria-label="info"
                  >
                    <img className="ms-2" src="/assets/info.svg" alt="" />
                  </Link>
                  <a className="copy-button" to="/">
                    <img className="ms-2 mt-4" src="/assets/copy-code.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
