import React from 'react';

function RadioButtonCircle({ id, title, name, checked, onChange, onClick }) {
  return (
    <div className="mb-4">
      <input
        id={id}
        className="gs-radio"
        name={name}
        type="radio"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={id} className="radio-tick-label text-primary">
        {title}
      </label>
    </div>
  );
}

export default RadioButtonCircle;
