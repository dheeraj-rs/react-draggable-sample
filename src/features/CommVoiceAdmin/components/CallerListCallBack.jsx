import React from 'react';

function CallerListCallBack({ title, count }) {
  return (
    <div className="hover-voice d-flex align-items-center rounded p-2 gap-13px round callback-sidebar-list">
      <div className="d-flex flex-column">
        <a
          href="/#"
          className="fs-13px mb-0  group-name line-clamp-1"
          onClick={(e) => e.preventDefault()}
        >
          {title}
        </a>
      </div>
      <div className="ms-auto d-flex align-items-center">
        <div className="bg-thin-gray-blue text-white d-flex me-3  align-items-center justify-content-center text-secondary fs-11px p-2 rounded w-4 h-4 ">
          {count}
        </div>
      </div>
    </div>
  );
}

export default CallerListCallBack;
