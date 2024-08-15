import React from 'react';
import { Link } from 'react-router-dom';

function CalendarTab({ link, img, title, desc }) {
  return (
    <Link
      to={link}
      role="button"
      className="chat-settings-box d-flex bg-titan-white rounded p-4 gap-3"
    >
      <div>
        <img src={img} alt="" />
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between">
          <p className="mb-0 text-dark fw-500 title">{title}</p>
        </div>

        <div className="fw-normal text-secondary font-poppins">{desc}</div>
      </div>
    </Link>
  );
}

export default CalendarTab;
