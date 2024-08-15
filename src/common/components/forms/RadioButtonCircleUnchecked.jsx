import React from 'react';

function RadioButtonCircleUnchecked({ id = '', name = '', title = '', checked = false, onClick }) {
  return (
    <div className="">
      <input
        id={id}
        className="gs-radio"
        name={name}
        type="radio"
        onChange={() => {}}
        checked={checked}
      />
      <label className="radio-tick-label text-primary" onClick={onClick}>
        {title}
      </label>
    </div>
  );
}

export default RadioButtonCircleUnchecked;
