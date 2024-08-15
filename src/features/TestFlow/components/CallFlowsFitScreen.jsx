import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsFitScreen({ setToDefaultLayout }) {
  return (
    <div onClick={setToDefaultLayout} data-tooltip-id="tooltip-FitScreen">
      <span className="reload" data-bs-toggle="tooltip" data-bs-placement="top">
        <img src="/assets/call-flows-icons/fitscreen.svg" alt="" />
      </span>

      <Tooltip id="tooltip-FitScreen" content="Fit Screen" place="left" />
    </div>
  );
}

export default CallFlowsFitScreen;
