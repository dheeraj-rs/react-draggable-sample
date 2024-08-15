/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import { Math } from 'core-js';
import ButtonCancel from '../../../common/components/common/ButtonCancel';
import KYCProgressComponent from './KycProgressBar';

function KYCFile({
  title,
  handleFileInputChange,
  upload,
  onSubmitClick,
  file,
  apiAction,
  uploadedFile,
  fileDescription,
  fileTypes,
  maxSize,
  type,
  uploadPercentage,
  cancelled,
}) {
  const fileInputRef = useRef(null);

  function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    // eslint-disable-next-line no-restricted-properties
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex justify-content-between shadow-6 align-items-center p-4 rounded mt-4">
      <div className="d-flex gap-3 align-items-center">
        <div>
          <img src="/assets/pdf-icon.svg" alt="" />
          <input
            className="d-none"
            id="file-input"
            type="file"
            accept={fileTypes}
            size={maxSize}
            onChange={(e) => {
              handleFileInputChange(e, type);
            }}
            ref={fileInputRef}
          />
        </div>
        <div>
          <h5 className="fs-13px fw-500">{title}</h5>
          {uploadedFile ? (
            <a
              href="/#"
              data-bs-toggle="modal"
              data-bs-target="#abcCerficate"
              className="fs-13px text-blue-badge text-break"
            >
              {uploadedFile?.file_name}
            </a>
          ) : (
            <p className="fs-13px mb-0">{fileDescription}</p>
          )}
        </div>
      </div>
      {uploadPercentage?.type === type ? (
        <KYCProgressComponent percentage={uploadPercentage?.percentage} />
      ) : (
        ''
      )}

      {!upload && !uploadedFile ? (
        <span>
          <p className="bg-sandal-color rounded text-yellow-600 text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
            SUBMITTED
          </p>
        </span>
      ) : uploadedFile ? null : (
        <span>
          <p className="bg-sandal-color rounded text-yellow-600 text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
            NOT SUBMITTED
          </p>
        </span>
      )}

      {uploadedFile ? (
        <div className="col-lg-3 col-sm-4 col-md-4">
          <p className="mb-0">Size: {formatFileSize(uploadedFile.size)}</p>
          {/* <p className="mb-0">Verified on: 12/07/2022</p> */}
        </div>
      ) : (
        ''
      )}

      {upload && !file ? (
        <div>
          <div>
            <button
              type="button"
              disabled={apiAction}
              id="#"
              className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
              onClick={() => {
                handleFileInputClick();
                // onSubmitClick();
              }}
            >
              Upload
            </button>
          </div>
        </div>
      ) : (
        ''
      )}

      {file && !uploadedFile ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            disabled={apiAction}
            id="#"
            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
            onClick={() => {
              // handleFileInputClick();
              onSubmitClick();
            }}
          >
            Submit
          </button>

          <div>
            <ButtonCancel
              text="Cancel"
              textId="Cancel"
              disabled={apiAction}
              onClose={() => cancelled()}
            />
          </div>
        </div>
      ) : uploadedFile ? (
        <span>
          <p className="bg-sandal-color rounded text-yellow-600 text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
            SUBMITTED
          </p>
        </span>
      ) : (
        ''
      )}

      {/* <div>
          <div>
            <ButtonCancel text="Cancel" textId="Cancel" />
          </div>
        </div> */}
    </div>
  );
}

export default KYCFile;
