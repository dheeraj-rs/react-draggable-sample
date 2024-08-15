import React from 'react';
import FileAttachmentListing from './FileAttachmentListing';

function AccordionFileAttachment({
  id,
  collapse,
  collapseTarget,
  expand,
  collapseId,
  visibility,
  parent,
  attachedFilesDetails,
  setAttachedFilesDetails,
  parentId,
  image,
  color,
  title,
}) {
  return (
    <div className="sidebar mb-3">
      <div className="accordion accordion-custom-right accordion-custom-file " id={id}>
        <div className="accordion-item acc-card shadow-1 bg-white border-0 rounded p-2 fs-13px position-relative">
          <div className="accordion-header bg-white" id="headingUpdate">
            <a
              className={`accordion-button  head d-flex align-items-center bg-white ${collapse}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={collapseTarget}
              aria-expanded={expand}
              aria-controls={collapseId}
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center me-3 ">
                  <img src={image} alt="" />
                </div>
                <span className={`text-${color} d-block fs-13px fw-medium`}>{title}</span>
              </div>
            </a>
          </div>
          <div
            id={collapseId}
            className={`accordion-collapse collapse ${visibility}`}
            aria-labelledby="headingUpdate"
            data-bs-parent={parent}
          >
            <div className="accordion-body acc-card-content">
              <div className="mt-3">
                <FileAttachmentListing
                  color="ghost-white-light"
                  img="/assets/pdf.svg"
                  name="Document_sample.pdf"
                  id="first"
                  targetid="#modalPreview"
                  attachedFilesDetails={attachedFilesDetails}
                  setAttachedFilesDetails={setAttachedFilesDetails}
                  parentId={parentId}
                />
              </div>
              <div className="mt-3">
                <FileAttachmentListing
                  color="sea-shell"
                  img="/assets/image-src.svg"
                  name="User_kycino.png"
                  id="second"
                  targetid="#modalAgreement"
                  attachedFilesDetails={attachedFilesDetails}
                  setAttachedFilesDetails={setAttachedFilesDetails}
                  parentId={parentId}
                />
              </div>

              <div className="mt-3">
                <FileAttachmentListing
                  color="sea-shell"
                  img="/assets/word-src.svg"
                  name="Agreement_draft.docx"
                  id="third"
                  targetid="#modalPreview"
                  attachedFilesDetails={attachedFilesDetails}
                  setAttachedFilesDetails={setAttachedFilesDetails}
                  parentId={parentId}
                />
              </div>

              <div className="mt-3">
                <FileAttachmentListing
                  color="ghost-white-light"
                  img="/assets/excel-src.svg"
                  name="Sample_price_list.xlsx"
                  id="forth"
                  targetid="#modalPreview"
                  attachedFilesDetails={attachedFilesDetails}
                  setAttachedFilesDetails={setAttachedFilesDetails}
                  parentId={parentId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionFileAttachment;
