import React from 'react';

function CompanyGroup({
  onClick,
  active,
  title,
  subTitle,
  count,
  iconCountColor,
  id,
  setCompanyId,
}) {
  return (
    <div
      className={`bg-ghost-white-alt-hover d-flex align-items-center p-16px gap-13px ${
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
          <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/assets/vertical-dot.svg" alt="" />
          </a>

          <ul className="dropdown-menu dropdown-menu-group  p-3">
            <li>
              <a
                href={`/app/comm-telephony/contact-company-profile?company=${id}`}
                className="dropdown-item py-3 px-4"
              >
                <img className="me-2 " src="/assets/user-pic.svg" alt="" />
                profile
              </a>
            </li>
            <li>
              <a
                href="/#"
                className="dropdown-item py-3 px-4"
                // data-bs-toggle="offcanvas"
                // data-bs-target="#offcanvasEditCompany"
                onClick={(e) => {
                  e.preventDefault();
                  setCompanyId(id, 'editCompany');
                }}
              >
                <img className="me-2" src="/assets/download-icon.svg" alt="" />
                Edit company
              </a>
            </li>
            {/* <li className="opacity-50">
              <a href="/#" className="dropdown-item py-3 px-4">
                <img className="me-2" src="/assets/csv-file.svg" alt="" />
                Export to CSV
              </a>
            </li> */}
            <li>
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  setCompanyId(id, 'showDelete');
                }}
                className="dropdown-item py-3 px-4"
                // data-bs-toggle="modal"
                // data-bs-target="#deleteGroupModal"
              >
                <img className="me-2" src="/assets/delete.svg" alt="" />
                Delete company
              </a>
            </li>
            {/* <li>
              <a
                href="/#"
                onClick={(e) => e.preventDefault()}
                className="dropdown-item py-3 px-4"
                data-bs-toggle="modal"
                data-bs-target="#clearGroupModal"
              >
                <img className="me-2" src="/assets/sms-send.svg" alt="" />
                Send SMS
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CompanyGroup;
