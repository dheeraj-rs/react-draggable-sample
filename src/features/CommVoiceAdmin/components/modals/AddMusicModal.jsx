import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import AddMusicURL from '../AddMusicURL';
import AddMusicUpload from '../AddMusicUpload';
import AddMusicRecord from '../AddMusicRecord';

function AddMusicModal() {
  return (
    <Modal width="568px" id="addVoiceModal">
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium mb-3">Add Music</p>
        <ModalClose />
      </div>
      <p className="text-secondary mb-2 fs-13px">Add music via</p>

      {/* <!-- tab starts --> */}
      <div className="tab-ticket resolve-modal mt-1">
        <ul
          className="nav nav-pills bg-titan-water mb-3 d-flex align-items-center w-100 rounded"
          id="pills-tab-feedback"
          role="tablist"
        >
          <li className="nav-item  border-end" role="presentation" style={{ width: '33.3%' }}>
            <button
              className="w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start active"
              id="pills-speech-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-speech"
              type="button"
              role="tab"
              aria-controls="pills-speech"
              aria-selected="true"
            >
              <span className="d-flex align-items-center justify-content-center">
                <img className="pe-1" src="/assets/voice-globe.svg" alt="" />
                <span className="d-none d-md-block">URL</span>
              </span>
            </button>
          </li>

          <li className="nav-item border-end" role="presentation" style={{ width: '33.3%' }}>
            <button
              className="w-100 px-2 py-12px rounded-0 nav-link nav-voice-tab btn-ext text-primary border-start-0 border-end-0 fw-medium"
              id="pills-upload-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-upload"
              type="button"
              role="tab"
              aria-controls="pills-upload"
              aria-selected="false"
            >
              <span className="d-flex align-items-center justify-content-center">
                <img className="pe-1" src="/assets/voice-upload.svg" alt="" />
                <span className="d-none d-md-block">Upload</span>
              </span>
            </button>
          </li>
          <li className="nav-item " role="presentation" style={{ width: '33.3%' }}>
            <button
              className="w-100 px-2 py-12px nav-link nav-voice-tab btn-ext text-primary border-start-0 fw-medium rounded-end"
              id="pills-record-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-record"
              type="button"
              role="tab"
              aria-controls="pills-record"
              aria-selected="false"
            >
              <span className="d-flex align-items-center justify-content-center">
                <img className="pe-1" src="/assets/voice-record.svg" alt="" />
                <span className="d-none d-md-block">Record</span>
              </span>
            </button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active mt-4"
            id="pills-speech"
            role="tabpanel"
            aria-labelledby="pills-speech-tab"
          >
            <AddMusicURL />
          </div>

          <div
            className="tab-pane fade"
            id="pills-upload"
            role="tabpanel"
            aria-labelledby="pills-upload"
          >
            <div>
              <AddMusicUpload />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-record"
            role="tabpanel"
            aria-labelledby="pills-record"
          >
            {' '}
            <div>
              <AddMusicRecord />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- tab ends --> */}
    </Modal>
  );
}

export default AddMusicModal;
