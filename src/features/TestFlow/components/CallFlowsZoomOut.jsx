import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsZoomOut({ setToDefaultLayout }) {
  return (
    <div
      style={{ padding: '4px' }}
      onClick={setToDefaultLayout}
      data-tooltip-id="tooltip-ZoomOut"
    >
      <span className="reload" data-bs-toggle="tooltip" data-bs-placement="top">
        <img src="/assets/call-flows-icons/zoomout.svg" alt="" />
      </span>

      <Tooltip id="tooltip-ZoomOut" content="Zoom Out" place="left" />
    </div>
  );
}

export default CallFlowsZoomOut;
