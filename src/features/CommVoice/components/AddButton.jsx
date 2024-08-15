import React from 'react';

function AddButton({ updateAction }) {
  return (
    <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add a contact">
      <a
        href="/#"
        // data-bs-toggle="offcanvas"
        // data-bs-target="#offcanvasAddContact"
        onClick={(e) => {
          e.preventDefault();
          updateAction(-1, 'addContact');
        }}
        className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
      >
        <img src="/assets/add-white-icon.svg" alt="# " />
      </a>
    </div>
  );
}

export default AddButton;
