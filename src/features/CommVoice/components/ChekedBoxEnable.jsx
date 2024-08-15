import React from 'react';
import Checkbox from '../../../common/components/forms/Checkbox';

function ChekedBoxEnable({ title, ReadId, writeId }) {
  return (
    <div className="rounded p-4 mb-3 bg-gray-blue-b">
      <div className="row align-items-center">
        <div className="col-lg-5 mb-3 mb-lg-0 mb-sm-0 mb-xl-0 mb-md-0 col-sm-5 col-md-5">
          <p className="mb-0 fw-500">{title}</p>
        </div>
        <div className="col-lg-7 col-sm-7 col-md-7">
          <div className="d-flex gap-4">
            {/* <div className="check-box">
            <input type="checkbox" id={Props.ReadId} defaultChecked />
            <label className="text-primary mb-0">
                Read
            </label>
        </div>
        <div className="check-box">
            <input type="checkbox" id={Props.writeId} defaultChecked />
            <label className="text-primary mb-0">
                Write
            </label>
        </div> */}
            <Checkbox id={ReadId} title="Read" />
            <Checkbox id={writeId} title="Write" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChekedBoxEnable;
