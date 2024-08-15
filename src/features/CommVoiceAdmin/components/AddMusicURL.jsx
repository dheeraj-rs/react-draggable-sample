import React from 'react';
import ButtonWhiteModalCancel from '../../../common/components/buttons/ButtonWhiteModalCancel';

function AddMusicURL() {
  return (
    <div id="voiceURLWrap">
      <div>
        <p className="text-primary fw-medium">URL</p>
        <p className="text-secondary text-secondary">
          Get audio file from any cloud storage with rge URL
        </p>
      </div>
      <div className="position-relative">
        <div className="form-group mt-4">
          <label className="text-primary mb-1">Type voice file URL</label>
          <textarea
            className="form-control rounded bg-white"
            rows="4"
            placeholder="https://www.magellan-solutions.com/wp-content/uploads/2014/09/InboundSampleRecording.mp3?_=1"
          />
        </div>
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

      <div className="position-relative">
        <div className="form-group mt-4">
          <label className="text-primary mb-1">Voice description</label>
          <textarea
            className="form-control  bg-white rounded "
            rows="4"
            placeholder="This voice is use for greetings"
          />
        </div>
      </div>
      <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
        <button
          id="addURLButton"
          type="button"
          data-bs-dismiss="modal"
          className="add-voice-final btn bg-black d-flex align-items-center text-white px-4 py-12px"
        >
          Add Voice
        </button>
        <ButtonWhiteModalCancel text="Cancel" />
      </div>
    </div>
  );
}

export default AddMusicURL;
