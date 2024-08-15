import React from 'react';

function ExportButton() {
  return (
    <a
      href="/#"
      data-bs-toggle="dropdown"
      className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
    >
      <img src="/assets/export-white.svg" alt="# " />
    </a>
  );
}

export default ExportButton;
