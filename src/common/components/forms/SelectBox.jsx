import React from 'react';

function Select({ label, onChange, id, options = [], selectedValue, name, style, disabled }) {
  return (
    <div className="form-group mt-3">
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
      </label>
      <select
        name={name}
        className="form-control form-select bg-white"
        id={id}
        disabled={disabled}
        value={selectedValue !== undefined ? selectedValue : 'select'}
        onChange={onChange}
        // onChange={(event) => event.target.value}
        style={style}
      >
        <option value="select">Select</option>

        {options?.length > 0 &&
          options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Select;
