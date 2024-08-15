import React from 'react';

function CheckBoxCheck({ title, id }) {
  return (
    <div className="check-box">
      <input className="clear-checkbox" type="checkbox" id={id} />
      <label className="text-primary mb-0" htmlFor={id}>
        {title}
      </label>
    </div>
  );
}

export default CheckBoxCheck;
