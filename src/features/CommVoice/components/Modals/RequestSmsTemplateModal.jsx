import React from 'react';
import ModalRight from '../../../../common/components/modals/ModalRight';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../../common/components/forms/Input';
import TextArea from '../../../../common/components/forms/TextArea';
import ButtonToast from '../../../../common/components/toast/ButtonToast';

function RequestSmsTemplateModal() {
  return (
    <ModalRight width="450px" id="requestSmsTemplateModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-3">Request an SMS Template</p>
        <ModalClose />
      </div>
      <div>
        <p className="mb-0 text-primary">You can use request SMS templates for fast composing.</p>
      </div>
      <Input
        id="template"
        disabled={false}
        label="SMS Template Title"
        placeholder="Purchase"
        type="text"
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
      <div className="p-4 bg-ecru-white rounded mt-4">
        <div className="d-flex flex-column">
          <div className="fw-medium text-buttered-rum">Template guidelines</div>
          <div className="guideline mt-2 p-3">
            <ul className="text-buttered-rum-400">
              <li>Photograph should be in passport size format.</li>
              <li>Photo, wearing mask, cap and dark glasse will be rejected.</li>
              <li>Image file should be in jpg or png format.</li>
              <li>
                Dimensions of the photograph should be 150 X 200 Image file should be between 15 kb
                and 100 kb file size.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
        <ButtonToast text="Request Template" btnID="TempalteRequst" />
        <button
          type="button"
          className="btn bg-white fw-medium text-dark border px-4 py-12px"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
      </div>
    </ModalRight>
  );
}

export default RequestSmsTemplateModal;
