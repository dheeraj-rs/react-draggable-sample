import React from 'react';
import { Link } from 'react-router-dom';

function LandingPageListing({ link, img, title, desc, isVisible }) {
  return (
    <Link
      to={link}
      role="button"
      className={`chat-settings-box d-flex bg-white rounded p-4 gap-4 shadow-6 ${
        isVisible ? '' : 'd-none'
      } `}
    >
      <div>
        <img src={img} alt="" />
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between">
          <p className="mb-0 text-dark fw-500 title fs-14px">{title}</p>
        </div>

        <div className="fw-normal text-secondary">{desc}</div>
      </div>
    </Link>
  );
}

export default LandingPageListing;
