import React from 'react';

function ImportedSuccessfully() {
  return (
    <div
      id="contactsImportCSVSuccess"
      className="p-4 card-upload bg-off-green flex-row file-upload w-100 mt-3 d-none"
    >
      <div className="d-flex gap-3">
        <div
          className="h-7 w-7 d-inline-flex align-items-center justify-content-center text-center text-uppercase bg-s-green rounded-circle position-relative fs-3"
        >
          <img src="/assets/white-tick.svg" alt="" />
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="fw-medium text-eucalyptus">
            Contacts imported successfuly!
          </div>
          <div className="dark-secondary">Total contacts imported: 30</div>

          <div
            className="bg-chat-blue border rounded w-20 border-blue-active p-2 text-center mt-3"
            role="button"
          >
            <a
              href="/#"
              onClick={(e) => { e.preventDefault(); }}
            >
              <img className="pe-2" src="/assets/csv-preview.svg" alt="" />
              Preview CSV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportedSuccessfully;
