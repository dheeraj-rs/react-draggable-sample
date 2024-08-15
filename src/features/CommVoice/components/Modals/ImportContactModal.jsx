import React from 'react';
import { Link } from 'react-router-dom';
import ModalRight from '../../../../common/components/modals/ModalRight';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Select2 from '../../../../common/components/forms/Select2';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';

function ImportContactModal() {
  return (
    <ModalRight width="450px" id="importContactModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-3">Import contacts</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary">
        You can import contacs from CSV file. You can download the CSV template.
      </p>

      {/* <!-- file upload --> */}

      <div className="form-group">
        <label className="pb-2">Upload CSV file</label>
        <div
          role="button"
          id="uploadContactsCSV"
          className="drop-zone rounded file-upload p-5 mt-3 d-flex flex-column justify-content-center align-items-center rounded gap-2"
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
        className="rounded file-upload p-5 mt-3 d-flex flex-column justify-content-center align-items-center rounded gap-2 d-none"
      >
        <div>
          <div className="gap-2 progress-card progress-card d-flex flex-column flex-md-row align-self-start">
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
        <Link to="/" id="importContactsCancel" className="text-blue-active fw-medium">
          Cancel
        </Link>
      </div>
      {/* <!-- imported successfully started --> */}
      <div
        id="contactsImportCSVSuccess"
        className="p-4 card-upload bg-off-green flex-row file-upload w-100 mt-3 d-none"
      >
        <div className="d-flex gap-3">
          <div className="h-7 w-7 d-inline-flex align-items-center justify-content-center text-center text-uppercase bg-s-green rounded-circle position-relative fs-3">
            <img src="/assets/white-tick.svg" alt="" />
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="fw-medium text-eucalyptus">Contacts imported successfuly!</div>
            <div className="dark-secondary">Total contacts imported: 30</div>

            <div
              className="bg-chat-blue border rounded w-20 border-blue-active p-2 text-center mt-3"
              role="button"
            >
              <Link to="/">
                <img className="pe-2" src="/assets/csv-preview.svg" alt="" /> Preview CSV
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- imported successfully ends --> */}
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
        <label htmlFor="assign">
          <span className="fw-medium">Groups</span>(You can import to multiple groups)
        </label>
        <Select2 />
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
        <button
          id="importCSVButton"
          data-bs-dismiss="modal"
          type="button"
          className="btn bg-black d-flex align-items-center justify-content-center text-white me-3 px-4 py-12px"
        >
          Import Contacts
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </ModalRight>
  );
}

export default ImportContactModal;
