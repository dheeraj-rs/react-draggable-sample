import React from 'react';
import Modal from '../modals/Modal';
import ModalClose from '../modals/ModalClose';

function FileAttachmentListing({
  setAttachedFilesDetails,
  attachedFilesDetails,
  name,
  parentId,
  color,
  img,
  targetid,
  id,
}) {
  const insertValue = (_id) => {
    setAttachedFilesDetails({
      ...attachedFilesDetails,
      files: [
        ...attachedFilesDetails.files,
        {
          _id,
          name,
          parentId,
          isSelected: false,
        },
      ],
    });
  };

  const deleteValue = async (itemToRemove) => {
    const updatedArray = await attachedFilesDetails?.files.filter(
      (value) => value.id !== itemToRemove
    );
    setAttachedFilesDetails({ ...attachedFilesDetails, files: updatedArray });
  };

  return (
    <>
      <div className={`file-listing rounded p-3 bg-${color}`}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex gap-3">
            <img src={img} alt="" />
            <span className="text-primary">{name}</span>
          </div>
          <div className="ms-auto d-flex align-items-center gap-3">
            <a
              className="modal-eye"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
              data-bs-toggle="modal"
              data-bs-target={targetid}
            >
              {' '}
            </a>

            <div className="check-box">
              <input
                type="checkbox"
                id={`${id}-${parentId}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    insertValue(`${id}-${parentId}`);
                  } else {
                    deleteValue(`${id}-${parentId}`);
                  }
                }}
              />
              <label htmlFor={`${id}-${parentId}`} className="text-primary mb-0" />
            </div>
          </div>
        </div>
      </div>
      <Modal width="535px" id="modalPreview">
        <div className="d-flex justify-content-between">
          <p className="fs-15px text-primary fw-medium">User_kycino.png</p>
          <ModalClose onClose={() => {}} />
        </div>
        <p className="text-secondary fs-13px mb-2">
          file-size: <span>120kb</span>
        </p>
        <div>
          <img className="w-100" src="/assets/kyc-img.svg" alt="" />
        </div>
        <div />
      </Modal>

      <Modal width="535px" id="modalAgreement">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between w-100">
            <p className="fs-15px text-primary fw-medium">Agreement_draft.docx</p>
            <div className="me-4">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-original-title="Download"
                download
              >
                <img src="/assets/upload-icon.svg" alt="" />
              </a>
            </div>
          </div>
          <ModalClose onClose={() => {}} />
        </div>
        <p className="text-secondary fs-13px mb-2">
          file-size: <span>120kb</span>
        </p>
        <div>
          <img className="w-100" src="/assets/agreement.svg" alt="" />
        </div>
        <div />
      </Modal>
    </>
  );
}

export default FileAttachmentListing;
