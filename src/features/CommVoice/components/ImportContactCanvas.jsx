import React, { useState } from 'react';
import Select from '../../../common/components/forms/SelectBox';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
function ImportContactCanvas({ show, setShow, formik }) {
  const [percentage, setPercentage] = useState(0);
  const [addLoading, setAddLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const [fileBlob, setFileBlob] = useState();
  const [errorUpload, setErrorUpload] = useState(false);
  const hanldeClose = () => {
    setShow({ isVisible: false, type: '' });
    formik.resetForm();
    setFileBlob();
    setErrorUpload(false);
  };
  const handleFileChange = async (e) => {
    setUrlLoading(true);

    const files = e.target.files || e.dataTransfer.files;

    if (files.length === 0) {
      setUrlLoading(false);
      return;
    }

    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the allowed limit of 6 MB');
      e.target.value = null;
      return;
    }

    setAddLoading(true);

    try {
      const formData = new FormData();
      formData.append('upload_file', file);
      const response = await MomentaryFileUpload(formData, (progress) => {
        setPercentage(progress);
      });
      formik.setFieldValue('momentaryStorageName', response?.data?.data?.attributes?.storage_name);
      setFileBlob(file);
      setAddLoading(false);
      setPercentage(0);
    } catch (error) {
      setAddLoading(false);
      setErrorUpload(true);
    } finally {
      setUrlLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e);
  };
  if (show) {
    return (
      <>
        <div
          className={`offcanvas offcanvas-end   ${show ? 'showing' : 'hiding'}`}
          tabIndex="-1"
          // id="offcanvasContact"
          aria-labelledby="offcanvasContactLabel"
        >
          <div className="offcanvas-header px-4 pt-4 pb-2">
            <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasContactLabel">
              Import Contacts
            </h5>
            <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="offcanvas"
              onClick={hanldeClose}
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body px-4">
            <p className="mb-0 fs-13px text-primary">
              Import contacts from CSV file. You can download the CSV template.
            </p>
            {/* <!-- file upload --> */}
            {!fileBlob && !addLoading && (
              <div className="form-group mt-3">
                <label className="pb-1">Upload CSV file</label>
                <div
                  role="button"
                  id="uploadContactsCSV"
                  className="drop-zone rounded file-upload p-5  d-flex flex-column justify-content-center align-items-center rounded gap-2"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div>
                    <img className="mx-3" src="/assets/file-upload.svg" alt="" />
                  </div>
                  <a role="button" className="text-blue-active fw-bolder" href="/#">
                    <label htmlFor="file-input-voice">
                      <p className="mb-0">
                        Click here
                        <b className="text-primary ps-2">to Upload</b>
                        <span className="text-primary"> or</span>
                        <b className="text-primary">Drag and Drop</b>
                      </p>
                    </label>

                    <input
                      className="d-none"
                      id="file-input-voice"
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                  </a>
                  {/* <p className="text-primary mb-0 mt-3">
                  <a role="button" href="/#" className="text-blue-active fw-bolder">
                    Click
                    <input
                      className="d-none"
                      id="file-input-voice"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </a>
                  <span className="fw-medium">to upload</span> or{' '}
                  <span className="fw-medium"> drag and drop</span>
                </p> */}
                  <p className="text-secondary mb-0">Maximum file size less than 4 MB</p>
                </div>
              </div>
            )}

            {/* <!-- importing contact --> */}
            <div
              id="importContactsCSV"
              className={`rounded file-upload p-5 mt-3 bg-ash-white rounded gap-2 w-100 ${
                addLoading === true ? '' : 'd-none'
              }`}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>Importing contacts.. </div>
                  <div className="text-primary fw-medium">{percentage}</div>
                </div>
                <div className="card-progress d-flex rounded-2 overflow-hidden w-100 h-1 mt-2 bg-white">
                  <div
                    className="card-progress-bar bg-blue-active rounded-2 "
                    role="progressbar"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={Math.round(percentage)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
            </div>
            {/* <!-- imported successfully started --> */}
            {fileBlob && (
              <div
                id="contactsImportCSVSuccess"
                className="p-4 card-upload bg-ash-white flex-row file-upload w-100 mt-3 "
              >
                <div className="d-flex gap-3 bg-white py-3 px-4 rounded">
                  <div className="h-7 w-7 d-inline-flex align-items-center justify-content-center text-center text-uppercase bg-ash-white rounded-circle position-relative fs-3">
                    <img src="/assets/blue-tick.svg" alt="" />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="fw-medium text-eucalyptus">Contacts imported successfuly!</div>
                    <div className="dark-secondary">Total contacts imported: 30</div>

                    <div
                      className=" rounded w-20 border-blue-active p-2 text-center mt-2"
                      role="button"
                    >
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <img className="pe-2" src="/assets/csv-preview.svg" alt="" /> Preview CSV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <!-- imported successfully ends --> */}
            {/* <!-- imported fsiled started --> */}
            <div
              id="contactsImportCSVFailed"
              className={`p-4 card-upload bg-ash-white flex-row file-upload w-100 mt-3  ${
                errorUpload === true ? '' : 'd-none'
              }`}
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
                    Importing process had failed due to headers mismatch.
                    <a href="/#" className="text-blue-active fw-bolder">
                      Please try again
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- imported failed ends --> */}
            <div className="mb-3 mt-3">
              <a
                className="fw-medium"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img className="pe-1" src="/assets/import-icon.svg" alt="" />
                Download CSV template
              </a>
            </div>
            <p className="text-primary">
              Please make sure your CSV file has unique headers. Other wise it may fail to import
            </p>

            <div className="form-group form-custom-group">
              <Select
                label="Company (optional)"
                id="company"
                value="High-tech pvt ltd "
                onchange={() => {}}
              />
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
                onClick={hanldeClose}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
        {show && <div className="offcanvas-backdrop fade show" />}
      </>
    );
  }
}

export default ImportContactCanvas;
