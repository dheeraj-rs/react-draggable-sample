import React from 'react';

function CheckBoxRoundTick({ title, id }) {
  return (
    <div className="check-box check-box-round">
      <input type="checkbox" id={id} defaultChecked />
      <label className="text-primary mb-0" htmlFor={id}>
        {title}
      </label>
    </div>
  );
}

export default CheckBoxRoundTick;
