import React from 'react';

function CheckboxRoundtick({ title, id, checked }) {
  return (
    <div className="check-box check-box-round">
      <input type="checkbox" id={id} defaultChecked checked={id === checked ? true : ''} />
      <label className="text-primary mb-0" htmlFor={id}>
        {title}
      </label>
    </div>
  );
}
export default CheckboxRoundtick;
