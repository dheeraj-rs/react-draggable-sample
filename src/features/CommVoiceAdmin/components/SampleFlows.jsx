import React from 'react';
import { Link } from 'react-router-dom';

function SampleFlows({ id, flowsIcon, flowsId, updatedDate, flowsName, children }) {
  return (
    <div className="row justify-content-between align-items-center p-2 p-lg-3 p-sm-2 py-4 rounded mt-3 shadow-6 roles-box cursor-pointer mx-1 flex-wrap border">
      <div className="d-flex gap-3 align-items-center roles-list col-lg-3 col-sm-3 col-12 mb-lg-0 mb-3 mb-sm-0">
        <div className="bg-thin-blue-gray p-2 rounded">
          <img src={flowsIcon} alt="" />
        </div>
        <div className="d-flex gap-4 align-items-center">
          <h6 className="fs-13px fw-500 mb-0 text-primary phone-number-virtual">
            <Link
              to={`/comm-voice-admin/call-flow/${id}`}
              className="fs-13px fw-500 mb-0 text-primary phone-number-virtual"
            >
              {flowsName}
            </Link>
          </h6>
        </div>
      </div>

      <div className="col-lg-1 col-sm-2 col-5">
        <p className="mb-0">{flowsId}</p>
      </div>
      <div className="col-lg-3 col-sm-2 col-7">
        <p className="mb-0">{updatedDate}</p>
      </div>

      <div className="col-lg-2 col-sm-3 col-5 mt-sm-0 mt-3 d-none">
        <a
          className="btn bg-thin-blue-gray rounded fs-13px test-flow-btn"
          href="/#"
          role="button"
          data-bs-toggle="modal"
          data-bs-target="#testFlowModal"
        >
          Test flow <img src="/assets/playbtn.svg" className="ms-2" alt="" />
        </a>
      </div>

      {children}
    </div>
  );
}

export default SampleFlows;
