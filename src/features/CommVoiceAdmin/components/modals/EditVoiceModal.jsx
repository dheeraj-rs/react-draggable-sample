import React from 'react';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import EditVoiceTextSpeechGreeting from '../EditVoiceTextSpeechGreeting';
import EditVoiceURLGreeting from './EditVoiceURLGreeting';
import EditVoiceUploadGreeting from './EditVoiceUploadGreeting';
import EditVoiceRecordGreeting from '../EditVoiceRecordGreeting';

function EditVoice({
  show,
  formik,
  categories,
  setVoicePlaying,
  voicePlaying,
  editVoiceType,
  setEditVoiceType,
  onClose,
  isLoading,
  downloadAudio,
  copyVoiceUrl,
}) {
  return (
    <>
      <Modal width="568px" id="addVoiceGreetingModal modal" show={show}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-500 mb-3">Edit Voice</p>
          <ModalClose
            onClose={(e) => {
              e.preventDefault();
              formik.setFieldValue('editLibrary.editSource', formik.values.editLibrary.existSource);
              formik.setFieldValue(
                'editLibrary.editMediaUrl',
                formik.values.editLibrary.existMediaUrl
              );
              onClose();
            }}
          />
        </div>
        <p className="text-primary mb-2 fs-13px">Edit voice via</p>
        <div className="tab-ticket resolve-modal mt-1">
          <ul
            className="nav nav-pills bg-titan-water mb-3 d-flex align-items-center w-100 rounded"
            id="pills-tab-feedback"
            role="tablist"
          >
            <li className="nav-item  border-end" role="presentation" style={{ width: '30%' }}>
              <button
                className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start  ${
                  editVoiceType.type === 'change-text-voice' ||
                  editVoiceType.type === 'change-text-voice-convert'
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
                  setEditVoiceType({ isVisible: true, type: 'change-text-voice' });
                  formik.setFieldValue('editLibrary.editSource', 'text');
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
                  editVoiceType.type === 'change-url-voice' ? 'active' : ''
                }`}
                id="pills-url-tab"
                type="button"
                role="tab"
                aria-controls="pills-url-sec"
                aria-selected={editVoiceType.type === 'change-url-voice' ? 'true' : 'false'}
                onClick={(e) => {
                  e.preventDefault();
                  setEditVoiceType({ isVisible: true, type: 'change-url-voice' });
                  formik.setFieldValue('editLibrary.editSource', 'url');
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
                  editVoiceType.type === 'change-upload-voice' ? 'active' : ''
                }`}
                id="pills-upload-tab"
                type="button"
                role="tab"
                aria-controls="pills-upload"
                aria-selected={editVoiceType.type === 'change-upload-voice' ? 'true' : 'false'}
                onClick={(e) => {
                  e.preventDefault();
                  setEditVoiceType({ isVisible: true, type: 'change-upload-voice' });
                  formik.setFieldValue('editLibrary.editSource', 'upload');
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
                  editVoiceType.type === 'change-record-voice' ||
                  editVoiceType.type === 'change-ivr-record-voice'
                    ? 'active'
                    : ''
                }`}
                id="pills-record-tab"
                type="button"
                role="tab"
                aria-controls="pills-record"
                aria-selected={
                  editVoiceType.type === 'change-record-voice' ||
                  editVoiceType.type === 'change-ivr-record-voice'
                    ? 'true'
                    : 'false'
                }
                onClick={(e) => {
                  e.preventDefault();
                  setEditVoiceType({ isVisible: true, type: 'change-record-voice' });
                  formik.setFieldValue('editLibrary.editSource', 'record');
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
              className="tab-pane fade mt-4 show active"
              id="pills-speech"
              role="tabpanel"
              aria-labelledby="pills-speech-tab"
            >
              <EditVoiceTextSpeechGreeting
                formik={formik}
                voicePlaying={voicePlaying}
                setVoicePlaying={setVoicePlaying}
                editVoiceType={editVoiceType}
                setEditVoiceType={setEditVoiceType}
                onClose={onClose}
                categories={categories}
                downloadAudio={downloadAudio}
                copyVoiceUrl={copyVoiceUrl}
              />
            </div>

            <div
              className={`tab-pane fade ${
                editVoiceType.isVisible && editVoiceType.type === 'change-url-voice'
                  ? 'show active'
                  : ''
              }`}
              id="pills-url-sec"
              role="tabpanel"
              aria-labelledby="pills-url-tab"
            >
              <div>
                <EditVoiceURLGreeting
                  formik={formik}
                  voicePlaying={voicePlaying}
                  setVoicePlaying={setVoicePlaying}
                  editVoiceType={editVoiceType}
                  onClose={onClose}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>

            <div
              className={`tab-pane fade ${
                editVoiceType.isVisible && editVoiceType.type === 'change-upload-voice'
                  ? 'show active'
                  : ''
              }`}
              id="pills-upload"
              role="tabpanel"
              aria-labelledby="pills-upload"
            >
              <div>
                <EditVoiceUploadGreeting
                  formik={formik}
                  isLoading={isLoading}
                  editVoiceType={editVoiceType}
                  onClose={onClose}
                  categories={categories}
                  downloadAudio={downloadAudio}
                  copyVoiceUrl={copyVoiceUrl}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                (editVoiceType.isVisible && editVoiceType.type === 'change-record-voice') ||
                editVoiceType.type === 'change-ivr-record-voice'
                  ? 'show active'
                  : ''
              }`}
              id="pills-record"
              role="tabpanel"
              aria-labelledby="pills-record"
            >
              <div>
                <EditVoiceRecordGreeting
                  formik={formik}
                  isLoading={isLoading}
                  editVoiceType={editVoiceType}
                  setEditVoiceType={setEditVoiceType}
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

export default EditVoice;
