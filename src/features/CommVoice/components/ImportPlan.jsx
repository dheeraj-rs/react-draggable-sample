import React from 'react';

function ImportPlan({ show, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const downloadSampleCsv = () => {
    const link = document.createElement('a');
    link.href = '/csv/carrier_plans_example.csv';
    link.download = 'carrier_plans_example.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        className={`offcanvas offcanvas-end ${show ? 'showing' : 'hiding'}`}
        tabIndex="-1"
        id="offcanvasImport"
        aria-labelledby="offcanvasImportLabel"
      >
        <div className="offcanvas-header offcanvas-header-title p-23px pb-10px justify-content-between align-items-center">
          <div>
            <p className="fs-16px text-primary fw-medium mb-0">Import Plan</p>
          </div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="offcanvas-body p-23px pt-0px">
          <div className="mt-3">
            <p className="mb-0">Import from CSV or Excel file format</p>
            <div className="upload-logo uplod-draft gap-3 rounded mt-2 border-dotted text-center uploading-sec">
              <a href="/#" className="image-upload" onClick={(e) => e.preventDefault()}>
                <label htmlFor="file-input-vendor">
                  <img src="/assets/document-upload.svg" alt="" />
                </label>

                <input className="d-none" id="file-input-vendor" type="file" />
              </a>
              <div className="d-flex flex-column gap-2">
                <div className="text-secondary">
                  <p className="mb-0 mt-3">
                    Click
                    <b>to Upload</b> or <b>Drag and Drop</b>
                  </p>
                  <p className="mb-0">Maximum file size less than 6 MB</p>
                </div>
              </div>
            </div>

            <div className="upload-logo uplod-draft gap-3 rounded mt-2 border-dotted text-center uploaded-sec d-none">
              <a href="/#" className="image-upload" onClick={(e) => e.preventDefault()}>
                <label htmlFor="file-input">
                  <img src="/assets/upload-shield.svg" alt="" />
                </label>

                <input className="d-none" id="file-input" type="file" />
              </a>
              <div className="d-flex flex-column gap-2">
                <div className="text-secondary">
                  <p className="mb-0 mt-3">
                    <b>Plan file uploaded successfully!</b>
                  </p>
                  <p className="mb-2 mt-2">Records: 30, File size: 5 mb</p>
                  <div className="d-flex justify-content-center">
                    <a href="/#" className="d-flex align-items-center gap-2">
                      <img src="/assets/preview-icon.svg" alt="" />
                      Preview list
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <a
                href="/#"
                className="d-flex align-items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  downloadSampleCsv();
                }}
              >
                <img src="/assets/download-icon-btn.svg" alt="" /> Download Template
              </a>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
            <button
              id="importPlan"
              data-bs-dismiss="offcanvas"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
            >
              Import
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
              data-bs-dismiss="offcanvas"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default ImportPlan;
