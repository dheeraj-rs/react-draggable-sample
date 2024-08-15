import React from 'react';

function InputWithoutLabel({ type, disabled, id, placeholder, disable, value, onInput }) {
  return (
    <div className="form-group w-100">
      <input
        type={type}
        className={`form-control clear-input ${disabled === true ? 'bg-white-azure' : 'bg-white'}`}
        id={id}
        placeholder={placeholder}
        disabled={disable}
        defaultValue={value}
        onInput={onInput}
      />
    </div>
  );
}

export default InputWithoutLabel;
