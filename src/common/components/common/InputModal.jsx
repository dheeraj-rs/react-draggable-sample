import React from 'react';

function InputModal({
  label, id, placeholder, type, disabled, name = '', style, onChange, value
}) {
  return (
    <div className="form-group w-100">
      <label className="text-primary mb-1" htmlFor={id} style={{ display: 'flex' }}>
        {label}
      </label>
      <input
        style={style}
        type={type}
        className={`form-control ${disabled === true ? 'bg-white-azure' : 'bg-white'}`}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={(value) || ('')}
        autoComplete="off"
      />
    </div>
  );
}

export default InputModal;
