import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsUndo({ setToDefaultLayout }) {
  return (
    <div onClick={setToDefaultLayout} data-tooltip-id="tooltip-Undo">
      <span className="reload" data-bs-toggle="tooltip" data-bs-placement="top">
        <img src="/assets/call-flows-icons/undo.svg" alt="" />
      </span>

      <Tooltip id="tooltip-Undo" content="Undo" place="left" />
    </div>
  );
}

export default CallFlowsUndo;
