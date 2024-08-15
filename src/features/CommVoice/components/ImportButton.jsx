import React from 'react';

function ImportButton({ setShow }) {
  return (
    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Import contacts">
      <a
        href="/#"
        // data-bs-toggle="offcanvas"
        // data-bs-target="#offcanvasContact"
        onClick={(e) => {
          e.preventDefault();
          setShow({ isVisible: true, type: 'import-contacts-offcanvas' });
        }}
        className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
      >
        <img src="/assets/import-white.svg" alt="# " />
      </a>
    </div>
  );
}

export default ImportButton;
