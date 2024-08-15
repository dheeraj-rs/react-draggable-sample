/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function PhoneNumberInput({ id, label, value, disabled, name, style, onChange }) {
  return (
    <div className="form-group w-100 mt-3">
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
      </label>
      <PhoneInput
        country="in"
        value={value}
        onChange={(num) => {
          onChange(`+${num}`);
        }}
        name={name}
        style={style}
        disabled={disabled}
      />

      {/* <input
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
      /> */}
    </div>
  );
}

export default PhoneNumberInput;
