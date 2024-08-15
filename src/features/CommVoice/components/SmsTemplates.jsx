import React from 'react';

function SmsTemplate({ title, desc }) {
  return (
    // <!-- template box starts -->
    <div className="template-box d-flex bg-white shadow-6 rounded p-4 gap-3 mt-3" role="button">
      <div className="d-flex flex-column">
        <div className="fw-medium text-primary">{title}</div>
        <div>
          <div className="text-secondary mt-2 ">
            {desc}
            <a
              to="/"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="ps-3 text-blue-active"
            >
              View full
            </a>
          </div>
        </div>
      </div>
    </div>
    // <!-- template box ends -->
  );
}

export default SmsTemplate;
