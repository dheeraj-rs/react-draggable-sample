import React from 'react';

function ProfileDocuments({ name, updatedTime }) {
  return (
    <div className="row justify-content-between border-transparent bg-white align-items-center p-2 p-lg-2 p-sm-2 py-4 py-lg-2 rounded mt-2 shadow-6 roles-box cursor-pointer mx-0 ">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-12 col-xl-6 col-xxl-6 col-sm-5 mb-lg-0 mb-3 mb-sm-0">
        <a href="#/" className="d-flex flex-column align-items-center justify-content-center ">
          <img src="/assets/FileTextdoc.svg" alt="agent icon" className="file-icon" />
        </a>

        <div className="d-flex flex-grow-1">
          <a href="#/" className="text-primary text-break">
            {name}
          </a>
        </div>
      </div>
      <div className="col-12 col-xl-3 col-xxl-4  col-sm-3 mb-3 mb-sm-0 operation-sec custom-margin">
        <p className="mb-0 text-break">{updatedTime}</p>
      </div>

      <div className="col-12 col-xl-3 col-xxl-2 col-sm-3 justify-content-sm-end d-sm-flex custom-margin">
        <div className="d-flex gap-4 align-items-center">
          <div
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="view"
            className="d-flex"
          >
            <a
              className="row-action bg-input-gray p-2 eye-hover"
              href="#/"
              data-bs-toggle="modal"
              data-bs-target="#documentSample"
            >
              <img width="19" src="/assets/Eyeicon.svg" alt="" />
            </a>
          </div>
          <a
            href="#/"
            id="downloadDocument"
            className="btn blue-btn px-sm-2 px-md-3 px-10px px-lg-3 py-2 rounded border border-blue-active"
            role="button"
          >
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileDocuments;
