import React from 'react';
import ChekedBoxEnable from './ChekedBoxEnable';

function ManageCallsNewCustomRole() {
  return (
    <div className="accordion accordion-custom-right" id="accordionCompany">
      <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
        <div className="accordion-header bg-white" id="headingUpdate">
          <a
            href="/"
            className="accordion-button collapsed head d-flex align-items-center bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCompany"
            aria-expanded="false"
            aria-controls="collapseCompany"
          >
            <div className="d-flex align-items-center">
              <span className="text-primary d-block fs-13px fw-500">Manage Calls</span>
            </div>
          </a>
        </div>
        <div
          id="collapseCompany"
          className="accordion-collapse collapse show"
          aria-labelledby="headingUpdate"
          data-bs-parent="#accordionCompany"
        >
          <div className="accordion-body acc-card-content pt-0">
            <div className="d-flex mb-3 mt-3 gap-4">
              <a href="/#">Select all</a>
              <a href="/#">Clear all</a>
            </div>
            <ChekedBoxEnable
              title="Make & Receive phone Calls"
              ReadId="phoneCallr"
              writeID="phoneCallw"
            />
            <ChekedBoxEnable
              title="Access caller information"
              ReadId="AccessCaller"
              writeID="AccessCaller2"
            />
            <ChekedBoxEnable
              title="Access to call inbox"
              ReadId="AccessCaller"
              writeID="AccessCaller2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCallsNewCustomRole;
