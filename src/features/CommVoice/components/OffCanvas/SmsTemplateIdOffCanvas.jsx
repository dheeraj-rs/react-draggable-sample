import React from 'react';
import Input from '../../../../common/components/forms/Input';
import TextArea from '../../../../common/components/forms/TextArea';
import ReadMoreLess from '../../../../common/components/common/ReadMoreLess';

function SmsTemplateIdOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRightSmsTemplate"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header pb-2 px-4 pt-4">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Request an SMS Template
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body pt-0 px-4">
        <p className="pb-3">You can Add new SMS sender ID as your own</p>

        <Input
          label="SMS Template Title"
          id="Purchase"
          placeholder=""
          type="textbox"
          disabled=""
          value="Purchase"
        />
        <div className="position-relative">
          <TextArea label="SMS Template Body" placeholder="Purchase" rowCount="5" />
          <span
            className="position-absolute translate-middle-y"
            style={{ right: '5px', bottom: '0px' }}
          >
            0/500
          </span>
        </div>
        <div className="bg-darkboxgray p-4 rounded mb-4 mt-4 d-flex gap-2">
          <div>
            <img src="/assets/mark_sign_icon.svg" alt="" />
          </div>
          <ReadMoreLess
            id="read-2"
            text="A single SMS message technically supports up to 160 characters, or up to 70 if the message contains one or more Unicode characters (such as emoji or Chinese characters)."
            moreText="officia quis ab? Excepturi vero tempore minus beatae voluptatem!"
          />
        </div>

        <div className="setting-buttons d-flex align-items-start align-items-lg-end flex--row gap-3">
          <button
            type="button"
            id="requestApproval"
            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
          >
            Add SMS Template
          </button>
          <button
            type="button"
            id="cancelRequest"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmsTemplateIdOffCanvas;
