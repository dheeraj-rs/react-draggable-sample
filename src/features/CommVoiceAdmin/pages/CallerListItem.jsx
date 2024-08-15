import React from 'react';

function CallerListItem({ id = '', title = '', count = '', setShow, formik, onClick, active }) {
  return (
    <div
      className="hover-voice d-flex align-items-center rounded p-2 gap-13px round"
      style={{ backgroundColor: active === id ? '#ebefff' : '' }}
      onClick={onClick}
    >
      <div className="d-flex flex-column ">
        <a
          href="#/"
          className={`fs-13px mb-0  group-name ${active === id ? 'color-blue-active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {title}
        </a>
      </div>
      <div className="ms-auto d-flex align-items-center">
        <div className="bg-white d-flex me-3  align-items-center justify-content-center text-secondary fs-12px p-2 rounded-pill">
          {count} <span className="ps-1">Files</span>
        </div>
        <div className="dropdown">
          <a
            href="#/"
            className=""
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img src="/assets/vertical-dot.svg" alt="" />
          </a>

          <ul className="dropdown-menu dropdown-menu-group drop-voice  p-3">
            <li>
              <p
                // data-bs-toggle="modal"
                // data-bs-target="#renameCategory"
                className="mb-0 dropdown-item py-3 px-4"
                onClick={() => {
                  formik.setFieldValue('callerListName', title);
                  setShow({ isVisible: true, type: 'rename-caller-list', data: { id } });
                }}
              >
                Rename Caller list
              </p>
            </li>
            <li>
              <p
                // data-bs-toggle="modal"
                // data-bs-target="#clearCategory"
                className="mb-0 dropdown-item py-3 px-4"
                onClick={() => {
                  setShow({
                    isVisible: true,
                    type: 'clear-caller-list',
                    data: { id, title },
                  });
                }}
              >
                Clear Caller list
              </p>
            </li>
            <li>
              <p
                // data-bs-toggle="modal"
                // data-bs-target="#deleteVoiceCategory"
                className="mb-0 dropdown-item py-3 px-4"
                onClick={() => {
                  setShow({ isVisible: true, type: 'delete-caller-list', data: { id, title } });
                }}
              >
                Delete Caller list
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CallerListItem;
