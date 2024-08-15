import React from 'react';
import { Link } from 'react-router-dom';
// import CheckboxRoundtick from '../../../common/components/forms/CheckboxRoundtick';
import ProgressBar from './ProgressBar';
// import CheckboxRoundtick from '../../../common/components/common/CheckboxRoundtick';

function AgentType({ title, description, selection, onClick }) {
  return (
    <div className="col-lg-6">
      <div
        className={
          selection === title
            ? 'custom-input-item form-check bg-white rounded cursor-pointer border border-blue-active d-flex flex-column gap-3 px-4 py-4'
            : 'custom-input-item form-check bg-white rounded cursor-pointer border d-flex flex-column gap-3 px-4 py-4'
        }
        onClick={() => {
          onClick(title);
        }}
      >
        <div className="d-flex">
          {/* <CheckboxRoundtick id={title} checked={selection} title="" /> */}
          <div>
            <div>
              <h6 className="fw-bold fs-14">{title}</h6>
              <p>{description}</p>
            </div>

            <div className="d-flex gap-5 align-items-center">
              <div>
                <ProgressBar value="6" dataPercentage="30" content="License left out of 15" />
              </div>
              <div>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Purchase
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentType;
