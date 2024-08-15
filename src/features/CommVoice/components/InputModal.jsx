import React from 'react';

function InputModal({ label, id, placeholder, type, disabled, onChange }) {
  return (
    <div className="form-group w-100">
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${disabled === true ? 'bg-white-azure' : 'bg-white'}`}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

export default InputModal;
