import React from 'react';

function Radio({ id, name, title }) {
  return (
    <div className="mt-3">
      <input id={id} className="radio-tick " name={name} type="radio" />
      <label htmlFor={id} className="radio-tick-label text-primary">
        {title}
      </label>
    </div>
  );
}

export default Radio;
