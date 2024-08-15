import React, { useState } from 'react';
import Select from '../../../../common/components/forms/SelectBox';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';

function AddVoiceTextSpeech() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="tab-speech">
      <div id="textSpeechMsg" className={showAdd ? 'd-none' : ''}>
        <div>
          <p className="text-primary fw-medium mb-2">Text to Speech</p>
          <p className="text-secondary ">
            When the caller reaches this component, can hear selected gender voice
          </p>
        </div>
        <div className="position-relative">
          <div className="form-group mt-3">
            <label className="text-primary mb-1">Type Message</label>
            <div className="custom-border-shadow form-control p-2 bg-white rounded-2 mb-2">
              <div
                id="typeSms"
                contentEditable="true"
                data-placeholder="Hi, Welcome to Gsoft technology solutions.  We are happy to help you."
                className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
              />

              <div className="px-3  bg-white border-0 rounded-bottom sms-emoji-area d-flex justify-content-end align-items-end">
                <span className="fw-medium text-secondary">60/500</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-5">
            <Select label="Language (Accent)" id="language" value="English" onChange={() => {}} />
          </div>

          <div className="form-group col-md-5">
            <label className="text-primary mb-1 mt-3 " htmlFor="language">
              Voice gender
            </label>
            <div className="d-flex gap-3 mt-2">
              <div>
                <input
                  id="female"
                  className="gs-radio clear-radio"
                  name="Gender"
                  type="radio"
                  defaultChecked
                />
                <label htmlFor="female" className="radio-tick-label text-primary">
                  Female
                </label>
              </div>
              <div>
                <input id="male" className="gs-radio clear-radio" name="Gender" type="radio" />
                <label htmlFor="male" className="radio-tick-label text-primary">
                  Male
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          <button
            id="createConvertToast"
            type="button"
            className="btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
            onClick={() => {
              setShowAdd(true);
            }}
          >
            Convert
          </button>
          <ButtonWhiteModalCancel text="Cancel" />
        </div>
      </div>

      <div id="voiceConvertWrap" className={showAdd ? '' : 'd-none'}>
        <div>
          <p className="text-primary fw-medium mb-2">Text to Speech</p>
        </div>

        <div className="d-flex gap-2 w-100 align-items-center flex-row card  p-3 bg-chat-blue border-0 rounded position-relative mt-4">
          <div
            role="button"
            className="play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
          >
            <img height="15px" src="/assets/play-btn-black.svg" alt="play" />
            <img height="15px" src="/assets/stop-btn.svg" alt="stop" style={{ display: 'none' }} />
          </div>
          <div className="d-flex">
            <span>0:00</span> / <span>0:00</span>
          </div>
          <div className="card-progress d-flex rounded-2 overflow-hidden" style={{ width: '50%' }}>
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
                  <a id="copyVoiceBtn" href="/#" className="copyVoiceBtn dropdown-item py-3 px-4">
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
            <a
              id="convertAnother"
              href="/#"
              className="text-blue-active"
              onClick={(e) => {
                e.preventDefault();
                setShowAdd(false);
              }}
            >
              <img className="pe-2" src="/assets/converter.svg" alt="" />
              Convert Another
            </a>
          </div>
          <div>
            <a id="downloadVoiceFile" href="/#" className="downloadVoiceFile text-blue-active">
              <img className="pe-2" src="/assets/voice-download.svg" alt="" />
              Download
            </a>
          </div>
        </div>
        <div className="position-relative">
          <div className="form-group mt-4">
            <label className="text-primary mb-1">Voice description</label>
            <div className="custom-border-shadow form-control p-2 bg-white rounded-2 mb-2">
              <div
                id="typeSms"
                contentEditable="true"
                data-placeholder="This voice is use for greetings"
                className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
              />

              <div className="px-3  bg-white border-0 rounded-bottom sms-emoji-area d-flex justify-content-end align-items-end">
                <span className="fw-medium text-secondary">60/500</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          <button
            id="addVoiceButton"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#greetifyModal"
            className="add-voice-final btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
          >
            Add Voice
          </button>
          <ButtonWhiteModalCancel text="Cancel" />
        </div>
      </div>
    </div>
  );
}

export default AddVoiceTextSpeech;
