import React from 'react';

function CheckBoxCheck({ title, id, checked, onClick }) {
  return (
    <div className="check-box">
      <input
        className="clear-checkbox"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {}}
      />
      <label className="text-primary mb-0" htmlFor={id} onClick={onClick}>
        {title}
      </label>
    </div>
  );
}

export default CheckBoxCheck;
