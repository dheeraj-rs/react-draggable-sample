import React from 'react';
import { Link } from 'react-router-dom';

function CallFlowsList({ id, flowsIcon, flowsName, flowsId, updatedDate, children }) {
  return (
    <div className="row justify-content-between align-items-center px-1 py-3 rounded mt-3 shadow-1 roles-box  cursor-pointer mx-1 flex-wrap border">
      <div className="d-flex gap-3 align-items-center roles-list col-12 col-sm-4 col-md-4 col-lg-3   mb-lg-0 mb-3 mb-sm-0">
        <div className="bg-thin-blue-gray p-2 rounded">
          <img src={flowsIcon} alt="" />
        </div>
        <div className="d-flex gap-4 align-items-center">
          <Link
            to={`/comm-voice-admin/call-flow/${id}`}
            className="fs-13px fw-500 mb-0 text-primary phone-number-virtual"
          >
            {flowsName}
          </Link>
        </div>
      </div>

      <div className="col-12 col-sm-3 col-md-3 col-lg-1">
        <p className="mb-0 text-secondary">
          ID: <span className="text-primary fw-medium">{flowsId}</span>
        </p>
      </div>
      <div className="col-12 col-sm-3  col-md-3 col-lg-3 ">
        <p className="mb-0 text-secondary">
          Updated on: <span className="text-primary fw-medium">{updatedDate}</span>
        </p>
      </div>

      <div className="col-5 col-sm-3 col-md-3  col-lg-2  mt-lg-0 mt-3 d-none">
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

export default CallFlowsList;
