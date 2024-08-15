import React from 'react';
import { Link } from 'react-router-dom';
import SelectBox from '../../../../common/components/forms/SelectBox';

function ImportContactOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasContact"
      aria-labelledby="offcanvasContactLabel"
    >
      <div className="offcanvas-header px-4 pt-4 pb-2">
        <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasContactLabel">
          Import Contacts
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body px-4">
        <p className="mb-0 fs-13px text-primary">
          Import contacts from CSV file. You can download the CSV template.
        </p>
        {/* <!-- file upload --> */}

        <div className="form-group mt-3">
          <label className="pb-1">Upload CSV file</label>
          <div
            role="button"
            id="uploadContactsCSV"
            className="drop-zone rounded file-upload p-5 d-flex flex-column justify-content-center align-items-center rounded gap-2"
          >
            <div>
              <img className="mx-3" src="/assets/file-upload.svg" alt="" />
            </div>
            <p className="text-primary mb-0 mt-3">
              <Link to="/" className="text-blue-active fw-bolder">
                Click
              </Link>
              <span className="fw-medium">to upload</span> or{' '}
              <span className="fw-medium"> drag and drop</span>
            </p>
            <p className="text-secondary mb-0">Maximum file size less than 4 MB</p>
            <input
              id="contactUpload"
              type="file"
              name="myFile"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="drop-zone-input"
            />
          </div>
        </div>
        {/* <!-- importing contact --> */}
        <div
          id="importContactsCSV"
          className="rounded file-upload p-5 mt-3 bg-ash-white rounded gap-2 w-100 d-none"
        >
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <div>Importing contacts..</div>
              <div className="text-primary fw-medium">20%</div>
            </div>
            <div className="card-progress d-flex rounded-2 overflow-hidden w-100 h-1 mt-2 bg-white">
              <div
                className="card-progress-bar bg-blue-active rounded-2"
                role="progressbar"
                style={{ width: '25%' }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
        {/* <!-- imported successfully started --> */}
        <div
          id="contactsImportCSVSuccess"
          className="p-4 card-upload bg-ash-white flex-row file-upload w-100 mt-3 d-none"
        >
          <div className="d-flex gap-3 bg-white py-3 px-4 rounded">
            <div className="h-7 w-7 d-inline-flex align-items-center justify-content-center text-center text-uppercase bg-ash-white rounded-circle position-relative fs-3">
              <img src="/assets/blue-tick.svg" alt="" />
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="fw-medium text-eucalyptus">Contacts imported successfuly!</div>
              <div className="dark-secondary">Total contacts imported: 30</div>

              <div className="rounded w-20 border-blue-active p-2 text-center mt-2" role="button">
                <Link to="/">
                  <img className="pe-2" src="/assets/csv-preview.svg" alt="" /> Preview CSV
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- imported successfully ends --> */}
        {/* <!-- imported fsiled started --> */}
        <div
          id="contactsImportCSVFailed"
          className="p-4 card-upload bg-ash-white flex-row file-upload w-100 mt-3 d-none"
        >
          <div className="d-flex gap-3 bg-white py-3 px-4 rounded">
            <div>
              <div className="h-7 w-7 d-inline-flex align-items-center justify-content-center text-center text-uppercase bg-naples-yellow rounded-circle position-relative fs-3">
                <img src="/assets/warning.svg" alt="" />
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="fw-medium text-eucalyptus">Contacts imported failed!</div>
              <div className="dark-secondary">
                Importing process had failed due to headers mismatch.{' '}
                <Link to="/" className="text-blue-active fw-bolder">
                  Please try again
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- imported failed ends --> */}
        <div className="mb-3 mt-3">
          <Link className="fw-medium" to="/">
            <img className="pe-1" src="/assets/import-icon.svg" alt="" />
            Download CSV template
          </Link>
        </div>
        <p className="text-primary">
          Please make sure your CSV file has unique headers. Other wise it may fail to import
        </p>

        <div className="form-group form-custom-group">
          <SelectBox label="Company (optional)" id="company" value="High-tech pvt ltd " />
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
          <button
            id="importCSVButton"
            data-bs-dismiss="offcanvas"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
          >
            import Contacts
          </button>
          <button
            type="button"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            data-bs-dismiss="offcanvas"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportContactOffCanvas;
