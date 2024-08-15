import React from 'react';

function CheckboxTick({
  title,
  onChange,
  classAttributeChild,
  classAttributeParent,
  checked,
  onClick,
}) {
  return (
    <div className={classAttributeParent || ''}>
      <label className="switch">
        <input type="checkbox" onChange={onChange} checked={checked} onClick={onClick} />
        <span className="slider round" />
      </label>
      <span className={classAttributeChild || 'fw-normal text-primary fs-12px ms-3'}>{title}</span>
    </div>
  );
}

export default CheckboxTick;
