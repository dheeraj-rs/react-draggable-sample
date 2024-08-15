import React, { useEffect, useState } from 'react';

function UserListRow({
  name,
  org,
  isAllSelected,
  // setIsConnectingDIDCall,
  setIsConnecting,
  updateAction,
  id,
  phones,
  onSelect,
  changePrimary,
  mob2,
  email2,
  setSelectedNames,
  setShow,
  firstName,
  lastName,
  middleName,
  emailsArray,
  setEditData,
  companyId,
  onCall,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(isAllSelected);
  }, [isAllSelected]);

  return (
    <div
      className="contact-table-row border-transparent shadow-deep rounded mb-3 d-flex justify-content-lg-between justify-content-between align-items-center align-items-md-center"
      key={id}
    >
      <div className="d-flex flex-column flex-md-row flex-grow-1 align-items-center">
        <div className="d-flex flex-row align-items-center gap-3 p-3 col-sm-4">
          <div
            role="button"
            onClick={() => {
              onSelect(id, !isAllSelected);
              setSelectedNames(name, !isAllSelected, id);
            }}
            className=" user-profile-icon bg-gray-blue d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded-circle fw-semibold"
          >
            {isSelected ? (
              <img src="/assets/selected-img.svg" alt="" />
            ) : (
              <img src="/assets/avathar-header.svg" alt="" />
            )}
          </div>

          <div className="d-flex flex-column justify-content-start flex-grow-1">
            <div className="text-primary fw-medium">{name}</div>
            <div>{org}</div>
          </div>
        </div>

        <div className="d-flex flex-column p-3 flex-grow-1 col-sm-1">
          <div>
            <a
              className="text-blue-active fw-normal"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {email2}
            </a>
          </div>
        </div>
        <div className="d-flex flex-column p-3 flex-grow-1 col-sm-2">
          <div>
            <span className="text-secondary">{mob2}</span>
            <div className=" popover-wrapper position-relative  d-inline-block">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="contact-table-count text-white bg-gray-blue px-1  py-1 fs-10px rounded ms-2 bg-blue-active-hover"
              >
                {phones?.length}+
              </a>
              <div className="popover-content position-absolute bg-white  rounded p-3 shadow">
                <div className="d-flex justify-content-between">
                  <div className="fw-medium text-primary fs-12px">Numbers</div>
                  <div className="fw-medium text-primary fs-12px">Primary</div>
                </div>
                {phones?.map((item, index) => (
                  <div className="d-flex justify-content-between mt-3" key={index}>
                    <div className="fw-medium text-secondary fs-12px">{item?.phone}</div>
                    <div className="fw-medium text-white fs-12px">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item?.is_primary}
                          onChange={(e) => {
                            changePrimary(id, item?.contactid, e.target.checked);
                          }}
                        />
                        <span className="slider num-check round" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row align-items-center gap-3">
        <div
          className="btn-group btn-center-group bg-bold-gray d-flex align-items-center rounded border shadow-1"
          role="group"
          aria-label="Basic example"
        >
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Call"
            aria-label="Call "
            onClick={() => {
              onCall();
              // console.log('UserListRow');
              // setIsConnectingDIDCall({ show: true, mobile: mob2 });
            }}
          >
            <button type="button" className="btn border-right contact-grp-btn contact-add-btn" />
          </span>

          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Web Call"
            aria-label="Web Call"
            onClick={() => {
              setIsConnecting({ show: true, mobile: mob2 });
            }}
          >
            <button type="button" className="btn contact-grp-btn border-right contact-share-btn" />
          </span>

          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="SMS"
            aria-label="SMS"
          >
            <button
              onClick={() => {
                setShow({ isVisible: true, type: 'sms-offcanvas' });
              }}
              className="btn contact-grp-btn contact-opt-btn"
              type="button"
            />
          </span>
        </div>

        <div className="ms-3 me-2  ms-auto">
          <div className="dropdown dropdown-dot">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
              data-bs-toggle="dropdown"
            >
              <img src="/assets/vertical-dot.svg" alt="" />
            </a>
            <ul className="dropdown-menu dropdown-menu-group  p-3">
              <li>
                <a
                  href={`/app/comm-telephony/contact-user-profile?id=${id}`}
                  className="dropdown-item py-3 px-4"
                >
                  <img className="me-2 " src="/assets/user-pic.svg" alt="" />
                  profile
                </a>
              </li>
              <li>
                <a
                  href="#/"
                  className="dropdown-item py-3 px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    updateAction(id, 'deleteContact');
                  }}
                >
                  <img className="me-2 " src="/assets/user-pic.svg" alt="" />
                  delete
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    updateAction(id, 'editContact');
                    setEditData({
                      fName: firstName,
                      mName: middleName,
                      lName: lastName,
                      company: companyId,
                      emailArray: emailsArray,
                      phoneArray: phones,
                    });
                  }}
                  className="dropdown-item py-3 px-4"
                >
                  <img className="me-2" src="/assets/download-icon.svg" alt="" />
                  Edit contact
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="dropdown-item py-3 px-4"
                >
                  <img className="me-2" src="/assets/csv-file.svg" alt="" />
                  Set remainder
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListRow;
