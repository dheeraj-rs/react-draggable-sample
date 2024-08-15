import React from 'react';

function UnchekedBox({ title, readId, writeId }) {
  return (
    <div className="rounded p-4 mb-3 bg-gray-blue-b">
      <div className="row">
        <div className="col-lg-5">
          <p className="mb-0 fw-500">{title}</p>
        </div>
        <div className="col-lg-7 opacity-50">
          <div className="d-flex gap-4">
            <div className="check-box">
              <input type="checkbox" id={readId} />
              <label className="text-primary mb-0">Read</label>
            </div>
            <div className="check-box">
              <input type="checkbox" id={writeId} />
              <label className="text-primary mb-0">Write</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnchekedBox;
