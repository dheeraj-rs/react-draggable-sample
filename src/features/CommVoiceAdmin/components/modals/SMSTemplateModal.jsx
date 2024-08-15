import React from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../../common/components/forms/Input';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';

function SMSTemplateModal() {
  return (
    <Modal width="705px" id="SMSTemplate">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium fs-16px mb-24px">New SMS Template</p>
        <ModalClose />
      </div>
      <p className="fs-13px text-secondary mb-0">
        Add SMS template based on the DLT approved format.
      </p>

      <Input type="text" label="Template Name" placeholder="Enter template name" />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="d-flex flex-column w-100">
          <p className="mb-0 text-secondary  fs-13px mb-1 mt-3">DLT Template Type</p>
          <div className="dropdown-center">
            <button
              className="form-control w-100 form-select text-start bg-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex gap-2">
                <span className="p-1">-Select template type-</span>
              </div>
            </button>

            <ul className="dropdown-menu w-100 shadow-6 p-3">
              <div className="scroll-custom scroll-custom-flow">
                <li className="mt-2 text-wrap dropdown-item p-2">
                  <div className="d-flex flex-column  gap-1 ">
                    <div>
                      <p className="text-primary mb-0 fw-medium">
                        Service Implicit -{' '}
                        <span className="text-primary fw-normal">Transactional</span>{' '}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0 text-secondary">
                        {' '}
                        Use for send OTP, information message booking and order alerts. Not for
                        marketing
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-2 text-wrap dropdown-item p-2">
                  <div className="d-flex flex-column  gap-1 ">
                    <div>
                      <p className="text-primary mb-0 fw-medium">
                        Service Explicit -{' '}
                        <span className="text-primary fw-normal">Transactional Opt-In</span>{' '}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0 text-secondary">
                        {' '}
                        Use for send offers and updates on the services which customer using
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-2 text-wrap dropdown-item p-2">
                  <div className="d-flex flex-column  gap-1 ">
                    <div>
                      <p className="text-primary mb-0 fw-medium">
                        Service (For banking OTP) -{' '}
                        <span className="text-primary fw-normal">Transactional</span>{' '}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0 text-secondary">
                        {' '}
                        Use for send OTPs from the banks for any transactions
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-2 text-wrap dropdown-item p-2">
                  <div className="d-flex flex-column  gap-1 ">
                    <div>
                      <p className="text-primary mb-0 fw-medium">
                        Promotional - <span className="text-primary fw-normal">Promotional</span>{' '}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0 text-secondary">
                        {' '}
                        Use for send offers, discounts and promotions. May or may not validate any
                        response.
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="w-100 newCarrier">
          <Input type="text" label="DLT Template ID" disabled placeholder="Enter ID" />
        </div>
      </div>
      <div className="position-relative">
        <div className="form-group mt-4">
          <label className="text-primary mb-1">
            Enter SMS content or Paste Pre-approved SMS template as per DLT format
          </label>
          <div className="custom-border-shadow form-control p-2 bg-white rounded-2 mb-3">
            <div
              id="typeSms"
              contentEditable="true"
              data-placeholder="Use {num} placeholder is use for numbers and {alph} placeholder is use for alphanumeric"
              className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
            />
            <div className="px-3  bg-white border-0 rounded-bottom sms-emoji-area d-flex justify-content-end align-items-end">
              <span className="fw-medium text-secondary">60/500, 0 SMS</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 p-3 bg-light-pink rounded">
        <p className="mb-0 text-chilli-pepper">
          SMS content your typed is very short. Please type SMS that can convey the transactional
          message.
        </p>
      </div>
      <div className="mt-3 p-3 pt-0 pb-0 bg-aqua-squeeze rounded">
        <ul className="p-3">
          <li className="text-mariner mt-1 user-instruction">
            <span className="num-bracket" /> placeholder is use for numbers. eg. 1234556. But
            decimal points are not allowed
          </li>
          <li className="text-mariner mt-1 user-instruction">
            <span className="alph-bracket" /> placeholder is use for alpha numeric characters. eg.
            Hello12345, name@mail.com
          </li>
          <li className="text-mariner user-instruction">
            <span className="fw-medium">Sample:</span> Thank you for submitting your request request
            ID:
            <span className="num-bracket" />. We will send the updates to your email address{' '}
            <span className="alph-bracket" />.
          </li>
        </ul>
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
        <button
          data-bs-toggle="modal"
          data-bs-target="#templateModalSuccess"
          type="button"
          className="btn bg-black d-flex align-items-center text-white  px-4 py-12px"
        >
          Add Template
        </button>
        <ButtonWhiteModalCancel text="Cancel" />
      </div>
    </Modal>
  );
}

export default SMSTemplateModal;
