import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsAutoArrange({ setToDefaultLayout }) {
  return (
    <div onClick={setToDefaultLayout} data-tooltip-id="tooltip-Arrange">
      <span className="reload" data-bs-toggle="tooltip" data-bs-placement="top">
        <img src="/assets/call-flows-icons/autoarrange.svg" alt="" />
      </span>

      <Tooltip id="tooltip-Arrange" content="Auto Arrange" place="left" />
    </div>
  );
}

export default CallFlowsAutoArrange;
