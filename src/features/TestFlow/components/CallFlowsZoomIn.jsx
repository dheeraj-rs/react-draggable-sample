import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsZoomIn({ setToDefaultLayout }) {
  return (
    <div
      style={{ borderBottom: '0.5px solid #ccc', padding: '4px' }}
      onClick={setToDefaultLayout}
      data-tooltip-id="tooltip-ZoomIn"
    >
      <span className="reload" data-bs-toggle="tooltip" data-bs-placement="top">
        <img src="/assets/call-flows-icons/zoomin.svg" alt="" />
      </span>

      <Tooltip id="tooltip-ZoomIn" content="Zoom In" place="left" />
    </div>
  );
}

export default CallFlowsZoomIn;
