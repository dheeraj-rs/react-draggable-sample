import React from 'react';
import Input from '../../../../common/components/forms/Input';

function SenderOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRightSender"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header pb-2 px-4 pt-4">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Add SMS Sender ID
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
          label="Short name"
          id="shortName"
          placeholder=""
          type="textbox"
          disabled=""
          value="NEWSN"
        />

        <Input
          label="Sender ID*"
          id="senderID"
          placeholder=""
          type="textbox"
          disabled=""
          value="123456"
        />
        <p className="mt-2">*Accept only alpha numeric characters.</p>
        <div className="bg-darkboxgray p-4 rounded mb-4 mt-2">
          <h6>Information</h6>
          <p className="mb-0">Sender ID will be visible once the ID approved by the admin.</p>
        </div>
        <div className="setting-buttons d-flex align-items-start align-items-lg-end flex--row gap-3">
          <button
            type="button"
            id="requestApproval"
            data-bs-toggle="modal"
            data-bs-target="#smsSender"
            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
          >
            Request Approval
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

export default SenderOffCanvas;
