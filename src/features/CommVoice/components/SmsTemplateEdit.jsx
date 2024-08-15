import React from 'react';
import { Link } from 'react-router-dom';

function SmsTemplateEdit({ children, desc }) {
  return (
    <div className="template-sms-box">
      <div className="template-content p-4">
        <div className="d-flex ">{children}</div>
        <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row">
          <div className="text-secondary ms-28">{desc}</div>
          <div className="d-flex ms-auto gap-2">
            <div>
              <Link
                to="/"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                className="h-4 w-4 d-inline-flex align-items-center justify-content-center text-center  text-uppercase bg-lavender rounded-1 "
              >
                <img src="/assets/pencil-black.svg" alt="" />
              </Link>
            </div>
            <div>
              <Link
                to="/"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete"
                className="h-4 w-4 d-inline-flex align-items-center justify-content-center text-center  text-uppercase bg-lavender rounded-1 "
              >
                <img src="/assets/trash-black.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmsTemplateEdit;
