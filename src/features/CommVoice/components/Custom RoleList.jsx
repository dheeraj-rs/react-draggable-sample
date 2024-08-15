import React from 'react';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function CustomRoleList({ readCount, rolesIcon, writeCount, permissionsLink, title }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-4 rounded mt-4 bg-gray-blue-b roles-box cursor-pointer">
      <div className="d-flex gap-3 align-items-center roles-list">
        <div>
          <img src={rolesIcon} alt="" />
        </div>
        <div>
          <h5 className="fs-13px fw-500 mb-0">{title}</h5>
        </div>
      </div>

      <div>
        <p className="mb-0">
          Read: {readCount} | Write: {writeCount}
        </p>
      </div>

      <div>
        <a href={permissionsLink}>View permissions</a>
      </div>

      <div className="d-flex gap-3 align-items-center">
        <p className="mb-0">
          Active{' '}
          <span>
            <img src="/assets/Infogray.svg" alt="" />
          </span>
        </p>
        <CheckboxTickChat checkid="activeId" title="" />
      </div>
    </div>
  );
}

export default CustomRoleList;
