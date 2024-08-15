import React from 'react';

function RadioCalendar({ id, title }) {
  return (
    <div>
      <input
        id={id}
        className="radio-custom"
        name="radio-group"
        type="radio"
      />
      <label htmlFor={id} className="radio-custom-label radio-calendar-label">{title}</label>
    </div>
  );
}

export default RadioCalendar;
