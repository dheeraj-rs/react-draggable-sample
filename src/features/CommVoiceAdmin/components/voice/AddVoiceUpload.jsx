import React from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../../common/components/forms/Input';

function AddVoiceUpload() {
  return (
    <div className="voice-upload-Wrap">
      <div className="mt-3">
        <p className="text-primary fw-medium fs-14px">Upload Voice</p>
        {/* voice upload starts */}
        <div className="upload-logo uplod-draft p-4  rounded mt-2 border-dotted  uploading-sec">
          <div className="d-flex align-items-center gap-3 ">
            <div>
              <img src="/assets/document-upload.svg" alt="" />
            </div>
            <div className="text-secondary">
              <a href="/" role="button" className="image-upload">
                <label htmlFor="file-input-voice">
                  <p className="mb-0">
                    Click here
                    <b className="text-primary ps-2">to Upload</b>
                    <span className="text-primary"> or</span>{' '}
                    <b className="text-primary">Drag and Drop</b>
                  </p>
                </label>

                <input className="d-none" id="file-input-voice" type="file" />
              </a>
              <p className="mb-0 ps-0">Maximum file size less than 6 MB</p>
            </div>
          </div>
        </div>
        {/* voice upload ends */}
        {/* upload inprogress starts */}
        <div className="doc-details mt-lg-0 mt-3 mb-lg-0 mb-3  p-4 shadow-deep rounded d-none  uploadingProgress">
          <div className="d-flex justify-content-between">
            <div className="fw-medium mb-2">Uploading file...</div>
          </div>
          <div className="d-flex gap-2 align-items-center flex-row card border-0 rounded position-relative">
            <div className="card-progress  mb-15 ">
              <div
                className="progress-bar card-progress-bar kyc-progress"
                role="progressbar"
                style={{ width: '75%' }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div>
                {' '}
                <span className="fw-medium fw-bolder">80%</span>
              </div>
              <div>
                <a href="/#">
                  <img src="/assets/voice-close.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* upload inprogress ends */}
        {/* upload completed starts */}
        <div id="voiceUploadComplete" className="d-none">
          <Input label="Save file with name" value="Recording_2344_075.mp3" onChange={() => {}} />
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
              <a href="/#" id="uploadAnother" className="text-blue-active">
                <img className="pe-2" src="/assets/upload-blue.svg" alt="" />
                Upload Another
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
        </div>
        {/* upload completed ends */}
        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          <button
            id="addURLButton"
            type="button"
            data-bs-dismiss="modal"
            className="add-voice-final btn addURLButton bg-black disabled d-flex align-items-center text-white  px-4 py-12px ms-0"
          >
            Add Voice
          </button>
          <ButtonWhiteModalCancel text="Cancel" />
        </div>
      </div>
    </div>
  );
}

export default AddVoiceUpload;
