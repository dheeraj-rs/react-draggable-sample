import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';

import AddVoiceRecordGreeting from '../AddVoiceRecordGreeting';
import AddVoiceUploadGreeting from './AddVoiceUploadGreeting';
import AddVoiceURLGreeting from './AddVoiceURLGreeting';
import AddVoiceTextSpeechGreeting from '../AddVoiceTextSpeechGreeting';

function AddVoice({
  show,
  formik,
  categories,
  setVoicePlaying,
  voicePlaying,
  setVoiceType,
  voiceType,
  onClose,
  isLoading,
  downloadAudio,
  copyVoiceUrl,
}) {
  return (
    <>
      <Modal width="568px" id="addVoiceGreetingModal modal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-500 mb-3">Add Voice</p>
          <ModalClose onClose={onClose} />
        </div>
        <p className="text-primary mb-2 fs-13px">Add voice via</p>

        {/* <!-- tab starts --> */}
        <div className="tab-ticket resolve-modal mt-1">
          <ul
            className="nav nav-pills bg-titan-water mb-3 d-flex align-items-center w-100 rounded"
            id="pills-tab-feedback"
            role="tablist"
          >
            <li className="nav-item  border-end" role="presentation" style={{ width: '30%' }}>
              <button
                className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start  ${
                  voiceType.type === 'text-voice' || voiceType.type === 'text-voice-convert'
                    ? 'active'
                    : ''
                }`}
                id="pills-speech-tab"
                type="button"
                role="tab"
                aria-controls="pills-speech"
                aria-selected="true"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'text-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/text.svg" alt="" />{' '}
                  <span className="d-none d-md-block">Text to Speech</span>
                </span>
              </button>
            </li>
            <li className="nav-item  border-end" role="presentation" style={{ width: '20%' }}>
              <button
                className={`w-100 px-2 py-12px rounded-0 nav-link nav-voice-tab btn-ext text-primary border-start-0 border-end-0 fw-medium  ${
                  voiceType.type === 'url-voice' ? 'active' : ''
                }`}
                id="pills-url-tab"
                type="button"
                role="tab"
                aria-controls="pills-url-sec"
                aria-selected="false"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'url-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/voice-globe.svg" alt="" />
                  <span className="d-none d-md-block">URL</span>
                </span>
              </button>
            </li>
            <li className="nav-item  border-end" role="presentation" style={{ width: '25%' }}>
              <button
                className={`w-100 px-2 py-12px rounded-0 nav-link nav-voice-tab btn-ext text-primary border-start-0 border-end-0 fw-medium ${
                  voiceType.type === 'upload-voice' ? 'active' : ''
                }`}
                id="pills-upload-tab"
                type="button"
                role="tab"
                aria-controls="pills-upload"
                aria-selected="false"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'upload-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/voice-upload.svg" alt="" />{' '}
                  <span className="d-none d-md-block">Upload</span>
                </span>
              </button>
            </li>
            <li className="nav-item " role="presentation" style={{ width: '25%' }}>
              <button
                className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-ext text-primary border-start-0 fw-medium rounded-end ${
                  voiceType.type === 'record-voice' || voiceType.type === 'ivr-record-voice'
                    ? 'active'
                    : ''
                }`}
                id="pills-record-tab"
                type="button"
                role="tab"
                aria-controls="pills-record"
                aria-selected="false"
                onClick={(e) => {
                  e.preventDefault();
                  setVoiceType({ isVisible: true, type: 'record-voice' });
                }}
              >
                <span className="d-flex align-items-center justify-content-center">
                  <img className="pe-1" src="/assets/voice-record.svg" alt="" />{' '}
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
              <AddVoiceTextSpeechGreeting
                formik={formik}
                voicePlaying={voicePlaying}
                setVoicePlaying={setVoicePlaying}
                isLoading={isLoading}
                voiceType={voiceType}
                setVoiceType={setVoiceType}
                onClose={onClose}
                categories={categories}
                downloadAudio={downloadAudio}
                copyVoiceUrl={copyVoiceUrl}
              />
            </div>

            <div
              className={`tab-pane fade ${
                voiceType.isVisible && voiceType.type === 'url-voice' ? 'show active' : ''
              }`}
              id="pills-url-sec"
              role="tabpanel"
              aria-labelledby="pills-url-tab"
            >
              <div>
                <AddVoiceURLGreeting
                  formik={formik}
                  isLoading={isLoading}
                  voicePlaying={voicePlaying}
                  setVoicePlaying={setVoicePlaying}
                  voiceType={voiceType}
                  categories={categories}
                  onClose={onClose}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                voiceType.isVisible && voiceType.type === 'upload-voice' ? 'show active' : ''
              }`}
              id="pills-upload"
              role="tabpanel"
              aria-labelledby="pills-upload"
            >
              <div>
                <AddVoiceUploadGreeting
                  formik={formik}
                  isLoading={isLoading}
                  voiceType={voiceType}
                  onClose={onClose}
                  categories={categories}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                (voiceType.isVisible && voiceType.type === 'record-voice') ||
                voiceType.type === 'ivr-record-voice'
                  ? 'show active'
                  : ''
              }`}
              id="pills-record"
              role="tabpanel"
              aria-labelledby="pills-record"
            >
              <div>
                <AddVoiceRecordGreeting
                  formik={formik}
                  isLoading={isLoading}
                  voiceType={voiceType}
                  setVoiceType={setVoiceType}
                  onClose={onClose}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- tab ends --> */}
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default AddVoice;
