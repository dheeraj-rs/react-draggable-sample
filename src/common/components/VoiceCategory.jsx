import React from 'react';

function VoiceCategory({ title, count, id, setShow, formik, active, onClick }) {
  return (
    <div
      className="hover-voice d-flex align-items-center rounded p-2 gap-13px round"
      style={{ backgroundColor: active === id ? '#ebefff' : '' }}
      onClick={onClick}
    >
      <div className="d-flex flex-column" style={{ overflow: 'hidden' }}>
        <a
          href="/#"
          className={`fs-13px mb-0  group-name ${active === id ? 'color-blue-active' : ''}`}
          onClick={(e) => e.preventDefault()}
        >
          {title}
        </a>
      </div>
      <div className="ms-auto d-flex align-items-center">
        <div className="bg-white d-flex me-3  align-items-center justify-content-center text-secondary fs-12px p-2 rounded-pill ">
          {count} <span className="ps-1">Files</span>
        </div>
        <div className="dropdown">
          <a href="/#" className="" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/assets/vertical-dot.svg" alt="" />
          </a>

          <ul className="dropdown-menu dropdown-menu-group drop-voice  p-3">
            <li>
              <p
                className="mb-0 dropdown-item py-3 px-4"
                onClick={() => {
                  setShow({ isVisible: true, type: 'rename-category', id });
                  formik.setFieldValue('categoryRename', title);
                  formik.setFieldValue('existCategory', title);
                }}
              >
                Rename
              </p>
            </li>
            <li>
              <p
                className="mb-0 dropdown-item py-3 px-4"
                onClick={() => {
                  formik.setFieldValue('categoryCount', count);
                  setShow({ isVisible: true, type: 'clear-category', id, name: title });
                }}
              >
                Clear category
              </p>
            </li>
            <li>
              <p
                className="mb-0 dropdown-item py-3 px-4"
                onClick={() => {
                  setShow({ isVisible: true, type: 'delete-category', id, name: title });
                }}
              >
                Delete category
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VoiceCategory;
