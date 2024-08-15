import React from 'react';

function Input({
  label,
  id,
  placeholder,
  type,
  disabled,
  value,
  onChange,
  action,
  warningMessage,
  style,
  name = '',
  maxLength = '',
}) {
  return (
    <div className="form-group w-100 mt-4">
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
        <span className="text-dark fw-500">{action}</span>
      </label>
      <input
        type={type}
        className={`form-control ${disabled === true ? 'bg-white-azure' : 'bg-white'}`}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        // defaultValue={value}
        autoComplete="off"
        style={style}
        name={name}
        value={value}
        maxLength={maxLength}
      />
      {warningMessage || null}
    </div>
  );
}

export default Input;
