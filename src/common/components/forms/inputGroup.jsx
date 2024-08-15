import React from 'react';

function InputGroup({ label, id, img }) {
  return (
    <div className="form-group form-custom-group ">
      <label className="text-black">{label}</label>
      <div className="input-group ">
        <input
          type="text"
          className="form-control bg-white border-end-0"
          placeholder="https://meeting.google.in.calendar"
          aria-label="Meeting type"
          aria-describedby={id}
        />
        <span className="input-group-text bg-transparent" id={id}>
          <a href="/#">
            <img src={img} alt="" />
          </a>
        </span>
      </div>
    </div>
  );
}

export default InputGroup;
