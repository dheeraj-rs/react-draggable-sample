import React from 'react';
import { Link } from 'react-router-dom';

function Department({
  active,
  iconCountColor,
  title,
  subTitle,
  count,
  onActionSelect,
  id,
  onClick,
}) {
  return (
    <div
      className={`hover-effect d-flex align-items-center p-16px gap-13px rounded false ${
        active === true && 'bg-chat-blue'
      }`}
      role={active !== true && 'button'}
    >
      <div className="d-flex flex-column" onClick={() => onClick(id)}>
        <p className="fs-13px fw-semibold mb-0 text-primary group-name">{title}</p>
        <p className="fs-12px  mb-0 text-secondary">{subTitle}</p>
      </div>
      <div className="ms-auto d-flex align-items-center">
        <div
          className={`bg-${iconCountColor} d-flex me-3  align-items-center justify-content-center fs-11px p-2 rounded-pill fw-semibold`}
        >
          <img src="/assets/user-three.svg" className="me-2" alt="" /> {count}
        </div>
        <div className="dropdown">
          <Link to="/" className="" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/assets/vertical-dot.svg" alt="" />
          </Link>

          <ul className="dropdown-menu dropdown-menu-group  p-3">
            <li>
              <Link
                to="/"
                className="dropdown-item py-3 px-4"
                // data-bs-toggle="offcanvas"
                // data-bs-target="#offcanvasEditDepartment"
                onClick={(e) => {
                  e.preventDefault();
                  onActionSelect(id, 'editDepartment');
                }}
              >
                <img className="me-2" src="/assets/download-icon.svg" alt="" />
                Edit
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="dropdown-item py-3 px-4"
                // data-bs-toggle="modal"
                // data-bs-target="#deleteGroupModal"
                onClick={(e) => {
                  e.preventDefault();
                  onActionSelect(id, 'clearDepartment');
                }}
              >
                <img className="me-2" src="/assets/clear.svg" alt="" />
                Clear
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="dropdown-item py-3 px-4"
                // data-bs-toggle="modal"
                // data-bs-target="#deleteGroupModal"
                onClick={(e) => {
                  e.preventDefault();
                  onActionSelect(id, 'deleteDepartment');
                }}
              >
                <img className="me-2" src="/assets/delete.svg" alt="" />
                Delete
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Department;
