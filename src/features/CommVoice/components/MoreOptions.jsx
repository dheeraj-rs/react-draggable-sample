import React from 'react';

function MoreOptions({ onDelete, exportData, setShow }) {
  return (
    <>
      <ul className="dropdown-menu dropdown-menu-group p-3">
        {/* <li>
          <a href="/comm-telephony/contact-company-profile" className="dropdown-item py-3 px-4">
            <img className="me-2" src="/assets/pdf-black.svg" alt="" />
            PDF
          </a>
        </li>
        <li>
          <a
            href="/comm-telephony/contact-company-profile"
            className="dropdown-item py-3 px-4"
            onClick={(e) => {
              e.preventDefault();
              exportData('doc');
            }}
          >
            <img className="me-2" src="/assets/word-black.svg" alt="" />
            Word (docx)
          </a>
        </li> */}
        <li>
          <a
            href="/comm-telephony/contact-company-profile"
            onClick={(e) => {
              e.preventDefault();
              exportData('excel');
            }}
            className="dropdown-item py-3 px-4"
          >
            <img className="me-2" src="/assets/excel-black.svg" alt="" />
            Excel (xlsx)
          </a>
        </li>
      </ul>
      {/* <!-- more button --> */}
      <div className="dropdown">
        <a
          href="/#"
          data-bs-toggle="dropdown"
          className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
        >
          <span
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-title="Options"
            className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
          >
            <img src="/assets/dot-menu-white.svg" alt="# " />
          </span>
        </a>
        <ul className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
          {/* <li>
            <a href="/comm-telephony/contact-company-profile" className="dropdown-item py-3 px-4">
              <img className="me-2" src="/assets/user-pic.svg" alt="" />
              profile
            </a>
          </li> */}
          {/* <li>
            <a
              href="/#"
              className="dropdown-item py-3 px-4"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasEditCompany"
            >
              <img className="me-2" src="/assets/download-icon.svg" alt="" />
              Edit company
            </a>
          </li> */}
          <li>
            <a
              className="dropdown-item py-3 px-4"
              href="/#"
              onClick={(e) => {
                e.preventDefault();

                exportData('csvSelected');
              }}
            >
              <img className="me-2" src="/assets/csv-file.svg" alt="" />
              Export to CSV
            </a>
          </li>
          {/* <li className="opacity-50">
            <a
              href="/#"
              className="dropdown-item py-3 px-4"
              data-bs-toggle="modal"
              data-bs-target="#deleteGroupModal"
            >
              <img className="me-2" src="/assets/delete.svg" alt="" />
              Delete company
            </a>
          </li> */}
          <li>
            <a
              href="/#"
              className="dropdown-item py-3 px-4"
              // data-bs-toggle="modal"
              // data-bs-target="#deleteGroupModal"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <img className="me-2" src="/assets/delete.svg" alt="" />
              Delete Contacts
            </a>
          </li>
          <li>
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setShow({ isVisible: true, type: 'sms-offcanvas' });
              }}
              className="dropdown-item py-3 px-4"
            >
              <img className="me-2" src="/assets/sms-send.svg" alt="" />
              Send SMS <br />
              <span className="ps-4 text-secondary fs-10px">(Max: 10 contacts)</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MoreOptions;
