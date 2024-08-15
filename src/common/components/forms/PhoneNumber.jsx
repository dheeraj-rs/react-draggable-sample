import React from 'react';

function PhoneNumber({ label, id, placeholder, type }) {
  return (
    <div className="form-group mt-30">
      <label className="text-primary mb-1" htmlFor={id}>
        {label}
      </label>
      <div className="d-flex gap-10px">
        <select className="form-control  form-select bg-white w-max-content" id={`${id}country`}>
          <option>🇺🇸 +1</option>
        </select>
        <input
          type={type}
          className="form-control bg-white"
          id={id}
          placeholder={placeholder}
          defaultValue=""
        />
      </div>
    </div>
  );
}

export default PhoneNumber;
