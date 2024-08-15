import React from 'react';
import { Tooltip } from 'react-tooltip';

function CheckboxTickChat({
  title,
  checkid,
  active,
  onChange,
  onClick,
  isDisabled = false,
  toolTipId = '',
  toolTipContent = '',
}) {
  return (
    <div className="flex-row-reverse justify-content-between" data-tooltip-id={toolTipId}>
      <label className="switch">
        <input
          type="checkbox"
          id={checkid}
          checked={active}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
          onClick={onClick}
          disabled={isDisabled}
        />
        <span className="slider round" />
      </label>
      <span className="fw-normal text-primary check-title">{title}</span>
      <Tooltip
        id={toolTipId}
        content={toolTipContent}
        place="top"
        style={{ borderRadius: '5px', height: '25px', display: 'flex', alignItems: 'center' }}
      />
    </div>
  );
}

export default CheckboxTickChat;
