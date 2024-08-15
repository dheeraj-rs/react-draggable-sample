import React from 'react';

function ImportingContact() {
  return (
    <div
      id="importContactsCSV"
      className="rounded file-upload p-5 mt-3 d-flex flex-column justify-content-center align-items-center rounded gap-2 d-none"
    >
      <div>
        <div
          className="gap-2 progress-card progress-card d-flex flex-column flex-md-row align-self-start"
        >
          <div className="progress-agent" data-percentage="30">
            <span className="progress-left-agent">
              <span className="progress-bar-agent" />
            </span>
            <span className="progress-right-agent">
              <span className="progress-bar-agent" />
            </span>
            <div className="progress-value-agent">
              <div className="fw-medium">12</div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded bg-zircon p-2 mt-3">
        <div className="bg-lavender-mist-light rounded-3 text-contrast-blue p-2">
          Uploading file.csv
        </div>
      </div>
      <a
        href="/#"
        id="importContactsCancel"
        className="text-blue-active fw-medium"
        onClick={(e) => { e.preventDefault(); }}
      >
        Cancel
      </a>
    </div>
  );
}

export default ImportingContact;
