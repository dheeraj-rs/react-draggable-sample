import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function AgentListRow({ name, time, setShow, id, isEnabled, isDefault }) {
  const navigate = useNavigate();

  return (
    <div className="row justify-content-between border-transparent bg-white align-items-center p-2 p-lg-2 p-sm-2 py-4 py-lg-2 rounded mt-3 shadow-1 roles-box cursor-pointer mx-0 flex-wrap border">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-12 col-md-3 col-lg-3 col-sm-3 mb-lg-0 mb-3 mb-sm-0">
        <a
          href="/#"
          className="d-flex flex-column align-items-center justify-content-center "
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src="/assets/agent-icon.svg" alt="agent icon" />
        </a>

        <div className="d-flex flex-grow-1">
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-primary fw-medium"
          >
            {name}
          </a>
        </div>
      </div>
      <div className="col-6 col-md-3 col-lg-3 col-sm-3">
        <p className="mb-0 text-break">
          <span className="text-secondary pe-1 fs-12px">Time Zone:</span>
          <span className="text-primary fs-13px">{time}</span>
        </p>
      </div>
      <div className="col-6 col-md-3 col-lg-3 col-sm-3">
        {isDefault ? (
          <a
            href="/#"
            className="btn bg-lavender default-agent  text-primary px-sm-2 px-10px px-lg-3 py-12px rounded    btn-default"
            role="button"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Default
          </a>
        ) : (
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: 'default-agent-modal',
                agentId: id,
                agentName: name,
              });
            }}
            className="blue-btn default-agent-btn px-sm-2 px-md-3 px-10px px-lg-3 py-12px rounded border border-blue-active "
          >
            <span>Set as Default</span>
          </a>
        )}
      </div>
      <div className="col-6 col-md-3 col-lg-3  col-sm-3 mt-3 mt-lg-0 mt-sm-0 operation-sec">
        <div className="d-flex align-items-center px-lg-2 px-sm-3 justify-content-start justify-content-lg-end gap-3 gap-lg-3 gap-sm-1 py-lg-2 py-sm-2">
          <div className="d-flex gap-4 gap-md-3 gap-sm-2 ms-lg-2 ps-lg-3 opacity-rate ">
            {/* <Link to={`/comm-voice-admin/agent-availability/edit-agent-time-slot/${id}`}> */}
            <button
              disabled={isDefault}
              type="button"
              data-bs-original-title="Edit SMS Template"
              data-tooltip-id="tooltip-agent-edit"
              className={`row-action  border-0 ${isDefault ? 'opacity-50' : ''}`}
              onClick={() => {
                navigate(`/comm-voice-admin/agent-availability/edit-agent-time-slot/${id}`);
              }}
            >
              <Tooltip id="tooltip-agent-edit" content="Edit Agent Availability" place="top" />
              <img width="19" src="/assets/edit-voice.svg" alt="" />
            </button>
            {/* </Link> */}
            <button
              disabled={isDefault}
              type="button"
              className={`row-action   border-0 ${isDefault ? 'opacity-50' : ''}`}
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'delete-agent-modal',
                  agentId: id,
                  agentName: name,
                });
              }}
            >
              <div data-tooltip-id="tooltip-agent-delete">
                <Tooltip id="tooltip-agent-delete" content="Delete" place="top" />
                <img width="19" src="/assets/delete-voice.svg" alt="" />
              </div>
            </button>
            <div className="p-2" data-tooltip-id="tooltip-agent-enable-disable">
              <Tooltip id="tooltip-agent-enable-disable" content="Enable/Disable" place="top" />
              <label
                className={`switch ${isDefault ? 'opacity-50' : ''}`}
                onClick={() => {
                  if (isDefault === false) {
                    setShow({
                      isVisible: true,
                      type: isEnabled ? 'disable-agent' : 'enable-agent',
                      key: `${isEnabled ? 'Disable' : 'Enable'}`,
                      agentId: id,
                      agentName: name,
                    });
                  }
                }}
              >
                <input
                  disabled={isDefault}
                  className="check-powered"
                  type="checkbox"
                  onChange={() => {}}
                  checked={isEnabled}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentListRow;
