import React from 'react';
import { Tooltip } from 'react-tooltip';

import useStore from '../../Test/store';

function NodeHeader({
  name,
  icon,
  type = '',
  actionType = '',
  nodeId = '',
  children,
  tooltipContent = '',
  headerbg,
  iconbg,
  feedbackRequired,
}) {
  const { setShow, setNodeSelectedForDelete } = useStore();
  return (
    <div
      className={`flow__header d-flex align-items-center justify-content-between p-3 bg-white ${
        type === 'hang-up' || type === 'go-to-flow' ? '' : 'bg-white'
      }`}
      style={{ borderRadius: type === 'go-to-flow' || feedbackRequired === false ? '10px' : '' }}
    >
      {children}
      <div
        className={`header__left d-flex justify-content-between align-items-center gap-3 pe-3 cursor-pointer bg-${headerbg} ${
          type === 'hang-up' ? 'hangup' : ''
        }`}
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title=""
        data-tooltip-id={nodeId}
      >
        <Tooltip
          id={nodeId}
          content={tooltipContent}
          message="clicked"
          place="right"
          style={{
            color: 'white',
            width: '250px',
            borderRadius: '6px',
            backgroundColor: 'black',
            zIndex: '999',
          }}
        />
        <span
          className={`header__icon__wrapper d-flex align-items-center justify-content-center rounded-circle bg-${iconbg}`}
        >
          <img src={icon} alt="" />
        </span>
        <span className="fs-13px fw-500">{name}</span>
      </div>
      <div className="header__right">
        <div className="d-flex align-items-center gap-3">
          <a
            href="/#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            // title="Configuration"
            data-tooltip-id="tooltip-configuration"
            onClick={(e) => {
              e.preventDefault();
              setShow({ isVisible: true, type, actionType, nodeId });
            }}
          >
            <img src="/assets/call-flows-hours/settings.svg" alt="" />
            <Tooltip
              id="tooltip-configuration"
              content="Configuration"
              place="bottom"
              style={{
                color: 'white',
                borderRadius: '6px',
                backgroundColor: 'black',
                zIndex: '999',
              }}
            />
          </a>
          <div className="dropdown">
            <img
              src="/assets/call-flows-hours/three-dots.svg"
              alt=""
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: 'pointer' }}
              onClick={() => {}}
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a
                  className="dropdown-item"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    setNodeSelectedForDelete({
                      nodeId,
                      type: 'remove-connection',
                      isVisible: true,
                    });
                  }}
                >
                  Remove Connection
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    setNodeSelectedForDelete({ nodeId, type: 'delete-node', isVisible: true });
                  }}
                >
                  Delete Component
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
