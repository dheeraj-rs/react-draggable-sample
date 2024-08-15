import React from 'react';

function MeetingConfigMobile({
  labelDay, labelTime, startTime, endTime
}) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <label className="mb-1">{labelDay}</label>
        <div className="form-group">
          <input
            type="text"
            className="form-control bg-white"
            id="monday"
            placeholder="Monday"
          />
        </div>
      </div>
      <div className="d-flex">
        <div
          className="col-sm-12 d-flex align-items-center gap-4"
        >

          <div className="form-group mt-3">
            <label className="mb-1">{labelTime}</label>
            <select
              className="form-control form-select bg-white"
              id="time"
            >
              <option>{startTime}</option>
            </select>
          </div>
          <div className="form-group d-flex mt-5">
            <span className="time-to text-primary">
              To
            </span
                                      >
          </div>
          <div className="form-group mt-5">
            <select
              className="form-control form-select bg-white"
              id="end"
            >
              <option>{endTime}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  );
}

export default MeetingConfigMobile;
