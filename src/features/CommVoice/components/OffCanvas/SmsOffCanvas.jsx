import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../../../CommAdminCentre/components/common/Select';
import Select2 from '../../../../common/components/forms/Select2';
import TextArea from '../../../../common/components/forms/TextArea';
import ReadMoreLess from '../../../../common/components/common/ReadMoreLess';

function SmsOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasSms"
      aria-labelledby="offcanvasSmsLabel"
    >
      <div className="offcanvas-header px-4 pt-4 pb-2">
        <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasSmsLabel">
          Send SMS
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body px-4">
        <p className="mb-0 fs-13px text-primary">
          Send SMS upto 10 contacts at a time with an sms template or as a new sms
        </p>
        <Select label="SMS Sender ID" id="sms" value="600231 (LMSNF)" onchange={() => {}} />
        <div className="form-group form-custom-group mt-3">
          <label className="text-black" htmlFor="assign">
            Response title
          </label>
          <div className="w-100">
            <Select2 />
          </div>
        </div>

        <div className="position-relative">
          <TextArea label="Message" placeholder="Type your message" rowCount="6" />

          <Link
            to="/"
            className="position-absolute translate-middle-y trigger"
            style={{ left: '7px', bottom: '0px' }}
          >
            <img src="/assets/happy-emoji.svg" alt="" />
          </Link>

          <span
            className="position-absolute translate-middle-y"
            style={{ right: '5px', bottom: '0px' }}
          >
            0/1000
          </span>
        </div>
        <div className="mt-2">
          <p>
            Total sms will be send: <span className="fw-medium text-primary">0</span>
          </p>
        </div>

        <div className="mt-2 bg-ash-white d-flex gap-2 p-3 rounded">
          <div>
            <Link to="/" data-bs-toggle="tooltip" data-bs-title="info">
              <img src="/assets/icon-info.svg" alt="" />
            </Link>
          </div>
          <ReadMoreLess
            id="read-2"
            text="A single SMS message technically supports up to 160 characters, or up to 70 if the message contains one or more Unicode characters (such as emoji or Chinese characters)."
            moreText="However, modern phones and mobile networks support message concatenation, which enables longer messages to be sent. Messages longer than 160 characters are automatically split into parts (called ) and then re-assembled when they are received. Message concatenation allows you to send long SMS messages, but this increases your per-message cost, because SMS are billed per segment.The 160-character limit is for messages encoded using the GSM-7 character set. Messages not encoded with GSM-7 are limited to 70 characters. For detail on how these character limits change on concatenated (multi-segment) messages, see below."
          />
        </div>
        <Link
          to="/"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSmsTemplate"
          aria-controls="offcanvasSmsTemplate"
          className="bg-white d-flex align-items-center mt-3 text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active fw-medium"
        >
          <i className="me-0 me-md-2">
            <span>
              <img src="/assets/msg-template.svg" alt="# " />
            </span>
          </i>
          <span>Choose from message templates</span>
        </Link>
        <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
          <button
            id="smsSendButton"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
          >
            <span className="pe-2">
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1489 8.45318L1.95359 1.06255C1.84245 1.00115 1.71523 0.975056 1.58888 0.987751C1.46254 1.00045 1.34306 1.05132 1.24634 1.13361C1.14963 1.2159 1.08028 1.3257 1.04752 1.44838C1.01476 1.57107 1.02015 1.70082 1.06297 1.82036L3.54734 8.78911C3.60208 8.92441 3.60208 9.07569 3.54734 9.21099L1.06297 16.1797C1.02015 16.2993 1.01476 16.429 1.04752 16.5517C1.08028 16.6744 1.14963 16.7842 1.24634 16.8665C1.34306 16.9488 1.46254 16.9997 1.58888 17.0124C1.71523 17.025 1.84245 16.999 1.95359 16.9376L15.1489 9.54693C15.2466 9.49288 15.328 9.41365 15.3847 9.31747C15.4414 9.2213 15.4713 9.1117 15.4713 9.00005C15.4713 8.88841 15.4414 8.7788 15.3847 8.68263C15.328 8.58646 15.2466 8.50723 15.1489 8.45318V8.45318Z"
                  stroke="#E1E3EE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Send SMS
          </button>
          <button
            type="button"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            data-bs-dismiss="offcanvas"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmsOffCanvas;
