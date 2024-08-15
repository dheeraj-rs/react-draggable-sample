import React from 'react';

function UserListRowMobile({
  name,
  org,
  email,
  mob,
  numberList,
  updateAction,
  id,
  email2,
  mob2,
  setShow,
  firstName,
  lastName,
  middleName,
  emailsArray,
  editData,
  setEditData,
  companyId,
  phones,
  key,
}) {
  return (
    <div className="contact-table-row bg-light rounded mb-3 p-3" key={id}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <div
            role="button"
            className="flex-grow-1 user-profile-icon bg-gray-blue d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded-circle fw-semibold"
          >
            <img src="/assets/tuner.svg" alt="" />
            <img src="/assets/selected-img.svg" alt="" style={{ display: 'none' }} />
          </div>
          <div className="d-flex flex-column ">
            <div className="fw-medium">{name}</div>
            <div>{org}</div>
          </div>
        </div>
        <div className="ms-auto">
          <div className="dropdown dropdown-dot">
            <a href="/#" data-bs-toggle="dropdown">
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
                  href="/#"
                  className="dropdown-item py-3 px-4"
                  // data-bs-toggle="offcanvas"
                  // data-bs-target="#offcanvasEditContact"
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
                >
                  <img className="me-2" src="/assets/download-icon.svg" alt="" />
                  Edit contact
                </a>
              </li>
              <li>
                <a href="/#" className="dropdown-item py-3 px-4">
                  <img className="me-2" src="/assets/csv-file.svg" alt="" />
                  Set remainder
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap flex-grow-1 justify-content-between align-items-center mt-2">
        <div>
          <a className="text-blue-active fw-normal" href="/#">
            {/* {email} */}
            {email2}
          </a>
        </div>
        <div>
          <span className="text-secondary">
            {/* {mob} */}
            {mob2}
          </span>
          <div className=" popover-wrapper position-relative  d-inline-block">
            <a
              href="/#"
              className="contact-table-count text-white bg-gray-blue px-1  py-1 fs-10px rounded ms-2 bg-blue-active-hover"
            >
              {numberList?.length}+
            </a>
            <div className="popover-content position-absolute bg-white  rounded p-3 shadow">
              <div className="d-flex justify-content-between">
                <div className="fw-medium text-primary fs-12px">Numbers</div>
                <div className="fw-medium text-primary fs-12px">Primary</div>
              </div>
              {numberList?.map((item) => (
                <div className="d-flex justify-content-between mt-3">
                  <div className="fw-medium text-secondary fs-12px">{item.id}</div>
                  <div className="fw-medium text-white fs-12px">
                    <label className="switch">
                      <input type="checkbox" checked />
                      <span className="slider num-check round" />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
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
          >
            <button
              type="button"
              className="btn border-right contact-grp-btn-mob contact-add-btn"
            />
          </span>

          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Web Call"
            aria-label="Web Call"
          >
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#startCalling"
              className="btn contact-grp-btn-mob border-right contact-share-btn"
            />
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
              className=" btn contact-grp-btn-mob contact-opt-btn"
              type="button"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserListRowMobile;
