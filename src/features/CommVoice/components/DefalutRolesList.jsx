import React from 'react';

function DefaultRolesList({ permissionsLink, rolesIcon, readCount, writeCount, title }) {
  return (
    <a href={permissionsLink}>
      <div className="d-flex align-items-center p-4 rounded mt-4 roles-box cursor-pointer shadow-6">
        <div className="col-lg-3 d-flex gap-3 align-items-center roles-list">
          <div>
            <img src={rolesIcon} alt="" />
          </div>
          <div>
            <h5 className="fs-13px fw-500 mb-0 text-dark">{title}</h5>
          </div>
        </div>

        <div className="col-lg-3">
          <p className="mb-0 text-dark">
            Read: <b>{readCount}</b> | Write: <b>{writeCount}</b>
          </p>
        </div>

        <div className="text-blue-badge col-lg-3">View permissions</div>
      </div>
    </a>
  );
}

export default DefaultRolesList;
