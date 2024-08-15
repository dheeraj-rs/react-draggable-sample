import React from 'react';
import { Tooltip } from 'react-tooltip';

function CallFlowsResetZoom({ setToDefaultLayout, isEnabled }) {
  return (
    <button
      type="button"
      onClick={isEnabled ? setToDefaultLayout : undefined}
      style={{
        cursor: isEnabled ? 'pointer' : 'not-allowed',
        opacity: isEnabled ? 1 : 0.5,
      }}
      data-tooltip-id="tooltip-ResetZoom"
      disabled={!isEnabled}
    >
      <span
        className="reload"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        style={{ pointerEvents: 'not-allowed' }}
      >
        <img
          src="/assets/call-flows-icons/resetzoom.svg"
          alt="Reset Zoom"
          style={{ pointerEvents: 'not-allowed', userSelect: 'none' }}
        />
      </span>
      {isEnabled && (
        <Tooltip id="tooltip-ResetZoom" content="Reset Zoom" place="left" />
      )}
    </button>
  );
}

export default CallFlowsResetZoom;
