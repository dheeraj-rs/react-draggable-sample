import React from 'react';
import CheckboxSlider from '../../../common/components/forms/CheckboxSlider';

function SMSSender({ name, type, checked }) {
  return (
    <div className="row justify-content-between border-transparent bg-white align-items-center p-2 p-lg-2 p-sm-2 py-4 py-lg-2 rounded mb-3 shadow-1 roles-box cursor-pointer mx-0 flex-wrap border">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-12 col-sm-4 col-md-4 col-lg-4  mb-lg-0 mb-3 mb-sm-0">
        <a href="/#" className="d-flex flex-column align-items-center justify-content-center ">
          <img src="/assets/sms-template.svg" alt="sms template" />
        </a>

        <div className="d-flex flex-grow-1">
          <a href="/#" className="text-primary fw-medium">
            {name}
          </a>
        </div>
      </div>
      <div className="col-6 col-sm-4 col-md-4 col-lg-4  ">
        <p className="mb-0 ">
          <span className="text-secondary pe-1 fs-12px">Sender ID:</span>
          <span className="text-primary fs-13px">{type}</span>
        </p>
      </div>

      <div className="col-6 col-sm-4 col-md-4 col-lg-4  mt-3 mt-lg-0 mt-sm-0">
        <div className="d-flex align-items-center px-lg-2 px-sm-3 justify-content-start justify-content-lg-end gap-3 gap-lg-3 gap-sm-1  py-sm-2">
          <div className="d-flex gap-3 ms-2 ps-3">
            <div
              className="p-2"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title="Enable/Disable"
            >
              {/* <label className="switch">
                                    <input className="check-powered" type="checkbox" />
                                    <span className="slider round"></span>
                                </label> */}
              <CheckboxSlider checked={checked} onClick={() => {}} />
            </div>
            <a
              className="row-action"
              href="/#"
              data-bs-toggle="modal"
              data-bs-target="#editSMSTemplate"
            >
              <div
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-original-title="Edit SMS Template"
              >
                <img src="/assets/edit-voice.svg" alt="" />
              </div>
            </a>
            <a
              className="row-action"
              href="/#"
              data-bs-toggle="modal"
              data-bs-target="#deleteVoiceModal"
            >
              <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Delete">
                <img src="/assets/delete-voice.svg" alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SMSSender;
