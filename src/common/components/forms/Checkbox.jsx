import React from 'react';

function Checkbox({ title, id, onClick, checked, onChange, value }) {
  return (
    <div className="check-box">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} value={value} />
      <label className="text-primary mb-0" htmlFor={id} onClick={onClick}>
        {title}
      </label>
    </div>
  );
}

export default Checkbox;
