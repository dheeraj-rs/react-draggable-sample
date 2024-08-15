import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsRedo({ setToDefaultLayout }) {
  return (
    <div onClick={setToDefaultLayout} data-tooltip-id="tooltip-Redo">
      <span className="reload" data-bs-toggle="tooltip" data-bs-placement="top">
        <img src="/assets/call-flows-icons/redo.svg" alt="" />
      </span>
      <Tooltip id="tooltip-Redo" content="Redo" place="left" />
    </div>
  );
}

export default CallFlowsRedo;
