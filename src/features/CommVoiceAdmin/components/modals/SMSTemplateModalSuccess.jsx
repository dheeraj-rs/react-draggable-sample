import React from 'react';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function SMSTemplateModalSuccess() {
  return (
    <Modal width="450px" id="templateModalSuccess">
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium fs-16px mb-24px">SMS Template added!.</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-primary mb-2">
        You have successfully added SMS template SMS template_001.
      </p>
      <div className="p-3 bg-aqua-squeeze rounded d-flex gap-2 mt-3">
        <div>
          <img src="/assets/info-blue.svg" alt="" />
        </div>
        <div>
          <p className="mb-0 text-mariner">
            Your template is ready. Please add your DLT Entity ID in CommVoice to connect with.
          </p>
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
        <a
          href="/"
          id="addTemplateButton"
          data-bs-toggle="modal"
          data-bs-target="#smsModal"
          className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
        >
          Ok
        </a>
      </div>
    </Modal>
  );
}

export default SMSTemplateModalSuccess;
