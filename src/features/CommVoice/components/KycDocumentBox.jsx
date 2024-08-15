import React from 'react';
import { Link } from 'react-router-dom';

function KycDocumentBox({
  title,
  pdfIcon,
  pdfLink,
  pdfName,
  fileSize,
  verifiedDate,
  bgColor,
  textColor,
  badgeTitle,
  badgeImage,
}) {
  return (
    <div className="d-flex justify-content-between shadow-6 align-items-center p-4 rounded mt-4">
      <div className="d-flex gap-3 align-items-center">
        <Link to="/">
          <img src={pdfIcon} alt="" />
        </Link>
        <div>
          <h5 className="fs-13px fw-500">{title}</h5>
          <Link
            to="/"
            data-bs-toggle="modal"
            data-bs-target={pdfLink}
            className="fs-13px text-blue-badge"
          >
            {pdfName}
          </Link>
        </div>
      </div>

      <div>
        <p className="mb-0">{fileSize}</p>
        <p className="mb-0">{verifiedDate}</p>
      </div>

      <div>
        <span>
          <p
            className={`bg-${bgColor} rounded text-${textColor} text-uppercase fs-10px fw-bolder my-0 px-2 py-1 gap-1 d-inline-flex`}
          >
            <img src={badgeImage} alt="" />
            {badgeTitle}
          </p>
        </span>
      </div>
    </div>
  );
}

export default KycDocumentBox;
