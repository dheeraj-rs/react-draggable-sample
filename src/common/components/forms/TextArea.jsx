import React from 'react';

function TextArea({ label, placeholder, rowCount, name, onChange, style, value }) {
  return (
    <div className="form-group mt-3">
      <label className="text-primary mb-1">{label}</label>
      <textarea
        className="form-control bg-white"
        rows={rowCount}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        style={style}
        value={value || ''}
      />
    </div>
  );
}

export default TextArea;
