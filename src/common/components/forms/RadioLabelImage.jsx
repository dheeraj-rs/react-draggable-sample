import React from 'react';

function RadioLabelImage({
  id, title, name, icon
}) {
  return (
    <div>
      <input
        id={id}
        className="radio-tick "
        name={name}
        type="radio"
      />
      <label
        htmlFor={id}
        className="radio-tick-label text-primary"
      >
        <img className="px-3" src={icon} alt="" />
        {title}
      </label>
    </div>
  );
}

export default RadioLabelImage;
