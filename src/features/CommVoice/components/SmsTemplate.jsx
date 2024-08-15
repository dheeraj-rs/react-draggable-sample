import React from 'react';
import { Link } from 'react-router-dom';

function SmsTemplate({ desc, title }) {
  return (
    <div className="template-box d-flex bg-white shadow-6 rounded p-4 gap-3 mt-3" role="button">
      <div className="d-flex flex-column">
        <div className="fw-medium text-primary">{title}</div>
        <div>
          <div className="text-secondary mt-2 ">
            {desc}
            <Link to="/" className="ps-3 text-blue-active">
              View full
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmsTemplate;
