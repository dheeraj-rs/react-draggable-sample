import React from 'react';
import Input from '../../../common/components/forms/Input';
import Select from '../../../common/components/forms/SelectBox';
import ButtonWhiteModalCancel from '../../../common/components/buttons/ButtonWhiteModalCancel';

function AddMusicRecord() {
  return (
    <div id="addVoiceRecordWrap">
      <div>
        <p className="text-primary fw-medium">Record Voiceeee</p>
      </div>
      <div className="d-flex flex-column flex-sm-row flex-wrap gap-2 justify-content-between">
        <div className="record-voice-radio rounded record-voice-active">
          <input
            id="system"
            className="gs-radio gs-file-upload clear-radio"
            value="system"
            name="record"
            type="radio"
            checked
          />
          <label htmlFor="system" className="radio-tick-label">
            From System
          </label>
        </div>
        <div className="record-voice-radio rounded">
          <input
            id="mobile"
            className="gs-radio gs-file-upload clear-radio"
            name="record"
            type="radio"
            value="mobile"
          />
          <label htmlFor="mobile" className="radio-tick-label">
            From Mobile
          </label>
        </div>
        <div className="record-voice-radio rounded">
          <input
            id="ivr"
            className="gs-radio gs-file-upload clear-radio"
            name="record"
            type="radio"
            value="ivr"
          />
          <label htmlFor="ivr" className="radio-tick-label">
            Custom IVR
          </label>
        </div>
      </div>

      <div id="fromSystem" className="mt-4">
        <p className="mb-0 text-secondary">
          Use your system microphone to record. Duration 30 sec.
        </p>
        <div id="recordWrap" className="d-flex flex-column justify-content-center text-center mt-3">
          <div>
            {' '}
            <a className="record-btn" href="/#">
              <img src="/assets/record-button.svg" alt="" />
            </a>
          </div>
          <div>
            <p className="mb-0 text-secondary mt-2">Click mic button to record</p>
          </div>
        </div>
        <div
          id="recordingWrap"
          className="d-flex flex-column justify-content-center text-center d-none mt-4"
        >
          <div>
            {' '}
            <button type="button" className="rec">
              Recording
            </button>
          </div>

          <div>
            <p className="mb-0 text-primary mt-2">
              Recording - <span className="text-primary fw-medium">00.00.10</span>
            </p>
          </div>
        </div>
      </div>

      <div id="fromMobile" className="mt-4 d-none">
        <p id="mainText" className="mb-0 text-secondary">
          Use your system microphone to record. Duration 30 sec.
        </p>
        <div id="mobileRecord">
          <Input label="Enter your phone number" value="1234567890" />
          <button
            id="callRecordBtn"
            type="button"
            className="btn bg-black d-flex align-items-center text-white me-3 px-4 py-12px mt-4"
          >
            Call & Record
          </button>
        </div>
        <div id="mobileRecordDial" className=" mt-4 d-none">
          <div className="d-flex flex-column justify-content-center  text-center">
            <div>
              <img src="/assets/dailing.svg" alt="" />
            </div>
            <div className="d-flex gap-1 mt-3 m-auto">
              <div className="fw-medium">Dialing </div>
              <div id="wave">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          </div>
        </div>
        <div
          id="recordingWrapMob"
          className="d-flex flex-column justify-content-center text-center d-none mt-4"
        >
          <div>
            {' '}
            <button type="button" className="rec">
              Recording
            </button>
          </div>

          <div>
            <p className="mb-0 text-primary mt-2">
              Recording - <span className="text-primary fw-medium">00.00.10</span>
            </p>
          </div>
        </div>
        {/* record voice completed starts */}
        <div>
          <div id="voiceRecordComplete" className="d-none">
            <p className="text-primary fw-medium fs-14px">Record Voice</p>
            <Input label="Save file with name" value="Recording_2344_075.mp3" />
            <div className="d-flex gap-2 w-100 align-items-center flex-row card  p-3 bg-chat-blue border-0 rounded position-relative mt-4">
              <div
                role="button"
                className="play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
              >
                <img height="15px" src="/assets/play-btn-black.svg" alt="play" />
                <img
                  height="15px"
                  src="/assets/stop-btn.svg"
                  alt="stop"
                  style={{ display: 'none' }}
                />
              </div>
              <div className="d-flex">
                <span>0:00</span> / <span>0:00</span>
              </div>
              <div
                className="card-progress d-flex rounded-2 overflow-hidden"
                style={{ width: '50%' }}
              >
                <div
                  className="card-progress-bar bg-blue-active rounded-2 h-1"
                  role="progressbar"
                  style={{ width: '50%' }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>

              <div className="ms-auto d-flex gap-3">
                <a className="voice-speaker-btn" href="/#">
                  <img src="/assets/voice-speaker.svg" alt="" />
                  <img
                    height="15px"
                    src="/assets/voice-speaker-mute.svg"
                    alt="stop"
                    style={{ display: 'none' }}
                  />
                </a>
                <div className="dropstart">
                  <a href="/#" data-bs-toggle="dropdown">
                    <img src="/assets/vertical-dot.svg" alt="" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-group p-2">
                    <li>
                      <a
                        id="copyVoiceBtn"
                        href="/#"
                        className="copyVoiceBtn dropdown-item py-3 px-4"
                      >
                        Copy voice URL
                      </a>
                    </li>
                    <li>
                      <a
                        id="downloadVoiceBtn"
                        href="/#"
                        className="downloadVoiceFile dropdown-item py-3 px-4"
                      >
                        Download
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center  mt-3">
              <div>
                <a href="/#" id="recordAnother" className="text-blue-active">
                  <img className="pe-2" src="/assets/record-music.svg" alt="" />
                  Record Again
                </a>
              </div>
            </div>
            <div className="position-relative">
              <div className="form-group mt-4">
                <label className="text-primary mb-1">Voice description</label>
                <textarea
                  className="form-control chatTextBox bg-white  rounded "
                  rows="4"
                  placeholder="This voice is use for greetings"
                />
              </div>
            </div>

            <Select label="Category(optional)" id="sms" value="category 1" onchange={() => {}} />

            <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
              <button
                id="addVoiceRecordButton"
                type="button"
                data-bs-dismiss="modal"
                className="add-voice-final btn bg-black d-flex align-items-center text-white px-4 py-12px"
              >
                Add Voice
              </button>
              <ButtonWhiteModalCancel text="Cancel" />
            </div>
          </div>
        </div>
      </div>

      <div id="fromIVR" className="mt-4 d-none">
        <div id="customIVRWrap">
          <div className="p-3 rounded bg-aqua-squeeze">
            <p className="mb-0 fs-13px text-mariner">
              <span className="pe-2">
                <img src="/assets/warning-blue.svg" alt="" />
              </span>
              This service is chargeable. Your account will be deducted with ₹200{' '}
            </p>
          </div>
          <div className="position-relative">
            <div className="form-group mt-3">
              <label className="text-primary mb-1">Type Message</label>
              <div className="custom-border-shadow form-control p-2 bg-white rounded-2 mb-2">
                <div
                  id="typeSms"
                  // contentEditable="true"
                  data-placeholder="Hi, Welcome to Gsoft technology solutions.  We are happy to help you."
                  className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                />

                <div className="px-3  bg-white border-0 rounded-bottom sms-emoji-area d-flex justify-content-end align-items-end">
                  <span className="fw-medium text-secondary">60/500</span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-md-center align-items-start gap-30 mt-2">
            <div className="language-accent">
              <Select label="Language (Accent)" id="language" value="English" onchange={() => {}} />
            </div>

            <div className="form-group">
              <label className="text-primary mb-1 mt-3" htmlFor="language">
                Voice gender
              </label>
              <div className="d-flex gap-3 mt-2">
                <div>
                  <input
                    id="female2"
                    className="gs-radio clear-radio"
                    name="Gender2"
                    type="radio"
                    checked
                  />
                  <label htmlFor="female2" className="radio-tick-label text-primary">
                    Female
                  </label>
                </div>
                <div>
                  <input id="male2" className="gs-radio clear-radio" name="Gender2" type="radio" />
                  <label htmlFor="male2" className="radio-tick-label text-primary">
                    Male
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
            <button
              id="createSubmit"
              type="button"
              className="btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
            >
              Submit
            </button>
            <ButtonWhiteModalCancel text="Cancel" />
          </div>
        </div>
        <div id="customIVRSuccess" className="d-none">
          <div className="px-5 py-4 rounded bg-green-mercury-light d-flex flex-column text-center justify-content-center">
            <img height="50" src="/assets/tick-circle-green.svg" alt="" />

            <p className="mb-0 text-deep-sea fw-medium mt-3 fs-15px">
              Your request has been submitted successfully.
            </p>
            <p className="mb-0 text-primary fw-medium mt-3">
              For more support, Please contact our support team by posting email to{' '}
              <a href="mailto:support@gsoftcomm.net" className="text-mariner pe-1">
                support@gsoftcomm.net
              </a>
              Our support team will contact you soon.
            </p>
            <p className="mb-0 text-secondary fw-medium mt-3">
              This service is chargeable. Your account will be deducted with ₹200{' '}
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
            <button
              data-bs-dismiss="modal"
              id="ivrSubmit"
              type="button"
              className="btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
            >
              OK
            </button>
            <ButtonWhiteModalCancel text="Cancel" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMusicRecord;
