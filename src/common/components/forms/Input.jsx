/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';

function Input({
  id,
  label,
  type,
  placeholder,
  value,
  disabled,
  name,
  style,
  onChange,
  onKeyPress,
  readOnly,
  autoFocus = false,
  maxLength = '50',
  warningMessage = '',
}) {
  return (
    <div className="form-group w-100 mt-3">
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${disabled === true ? 'bg-white-azure' : 'bg-white'}`}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        // defaultValue={value}
        onChange={onChange}
        onInput={onChange}
        name={name}
        value={value}
        style={style}
        autoComplete="off"
        onKeyPress={onKeyPress}
        readOnly={readOnly}
        autoFocus={autoFocus}
        maxLength={maxLength}
      />
      {warningMessage || null}
    </div>
  );
}

export default Input;
