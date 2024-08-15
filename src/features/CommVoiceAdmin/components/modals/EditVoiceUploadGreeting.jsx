import React, { useEffect, useMemo, useRef, useState } from 'react';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import MomentaryFileUpload from '../../../../common/api-collection/Common/MomentaryFileUpload';
import { getFormErrorMessage } from '../../../../common/helpers/utils';
import SpinningLoaderSM from '../../../../common/components/Loader/SpinningLoaderSM';

const MAX_FILE_SIZE = 6 * 1024 * 1024;

function EditVoiceUploadGreeting({
  formik,
  editVoiceType,
  isLoading,
  onClose,
  copyVoiceUrl,
  downloadAudio,
}) {
  const [addLoading, setAddLoading] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState();
  const audioRef = useRef(null);

  const handleFileChange = async (e) => {
    setUrlLoading(true);

    const files = e.target.files || e.dataTransfer.files;

    if (files.length === 0) {
      setUrlLoading(false);
      return;
    }

    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the allowed limit of 6 MB');
      e.target.value = null;
      return;
    }

    setAddLoading(true);

    try {
      const formData = new FormData();
      formData.append('upload_file', file);
      const response = await MomentaryFileUpload(formData, (progress) => {
        setPercentage(progress);
      });
      formik.setFieldValue('momentaryStorageName', response?.data?.data?.attributes?.storage_name);
      setAudioBlob(file);
      setAddLoading(false);
      setPercentage(0);
    } catch (error) {
      setAddLoading(false);
    } finally {
      setUrlLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e);
  };

  const togglePlay = () => {
    if (voicePlaying) {
      audioRef.current.pause();
    } else {
      const { current } = audioRef;
      if (current?.currentTime && current?.duration) {
        if (current.currentTime === current.duration) {
          current.currentTime = 0;
        }
      }
      current?.play();
      setVoicePlaying(!voicePlaying);
    }
  };

  const formatTime = useMemo(
    () => (timeInSeconds) => {
      if (timeInSeconds === Infinity) {
        return 0;
      }
      if (timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
      return 0;
    },
    []
  );

  const calculatePercentage = () => {
    if (audioRef?.current?.currentTime && audioRef?.current?.duration) {
      const calcPercentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      return calcPercentage;
    }
    return 0;
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
  };

  const handleAudioEnd = () => {
    audioRef.current.currentTime = 0;
    setVoicePlaying(false);
  };

  const handleUploadAnother = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioBlob(null);
    setVoicePlaying(false);
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;

    const { duration } = audioRef.current;
    if (Number.isFinite(duration)) {
      const skipToTime = (clickPosition / progressBarWidth) * duration;
      if (!Number.isNaN(skipToTime)) {
        audioRef.current.currentTime = skipToTime;
      }
    }
  };

  useEffect(() => {
    if (formik.values.momentaryStorageName === '') {
      setAudioBlob(null);
    }
  }, [formik.values.momentaryStorageName]);

  useEffect(() => {
    if (audioBlob) {
      setUrlLoading(true);
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.addEventListener('canplaythrough', () => {
        const duration = formatTime(audioRef.current.duration);
        if (!Number.isNaN(duration)) {
          formik.setFieldValue('editLibrary.editMediaUrl', audioRef?.current?.src);
        } else {
          formik.setFieldValue('validUrl', false);
        }
        setUrlLoading(false);
      });
      audioRef.current.onended = handleAudioEnd;
    }
  }, [audioBlob]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        setVoicePlaying(!voicePlaying);
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        setVoicePlaying(!voicePlaying);
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('stop', () => {});
    }
  }, [togglePlay]);

  useEffect(() => {
    handleUploadAnother();
    setAudioBlob(null);
  }, [editVoiceType.type !== 'change-upload-voice']);

  const handleSubmit = () => {
    formik.setFieldValue('editLibrary.editMediaUrl', audioRef?.current?.src);
    formik.setFieldValue('editSource', 'upload');
    onClose();
  };

  return (
    <div className="voice-upload-Wrap">
      <div className="mt-3">
        <p className="text-primary fw-medium fs-14px">Upload Voice</p>
        {!audioBlob && !addLoading && (
          <div className="upload-logo uplod-draft p-4 rounded mt-2 border-dotted uploading-sec">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img src="/assets/document-upload.svg" alt="" />
              </div>
              <div className="text-secondary" onDragOver={handleDragOver} onDrop={handleDrop}>
                <a role="button" className="image-upload" href="/#">
                  <label htmlFor="input-voice">
                    <p className="mb-0">
                      Click here
                      <b className="text-primary ps-2">to Upload</b>
                      <span className="text-primary"> or</span>
                      <b className="text-primary">Drag and Drop</b>
                    </p>
                  </label>

                  <input
                    className="d-none"
                    id="input-voice"
                    name="input-voice"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mp3, .wav"
                  />
                </a>
                <p className="mb-0 ps-0">Max. file size less than 6 MB. Format mp3, wav</p>
              </div>
            </div>
          </div>
        )}
        <div
          className={`doc-details mt-lg-0 mt-3 mb-lg-0 mb-3 p-4 shadow-deep rounded uploadingProgress ${
            addLoading === true ? '' : 'd-none'
          }`}
        >
          <div className="d-flex justify-content-between">
            <div className="fw-medium mb-2">Uploading file...</div>
          </div>
          <div className="d-flex gap-2 align-items-center flex-row card border-0 rounded position-relative">
            <div className="card-progress mb-15">
              <div
                className="card-progress-bar kyc-progress"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={Math.round(percentage)}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div>
                <span className="fw-medium fw-bolder">{`${percentage}%`}</span>
              </div>
              <div>
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUploadAnother();
                  }}
                >
                  <img src="/assets/voice-close.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {audioBlob && (
          <div id="voiceUploadComplete">
            <div className="d-flex gap-2 w-100 align-items-center flex-row card p-3 bg-chat-blue border-0 rounded position-relative mt-4">
              {urlLoading ? (
                <div className="loading-spinner-container">
                  <SpinningLoaderSM />
                </div>
              ) : (
                <div
                  role="button"
                  className="play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                  onClick={() => {
                    togglePlay();
                    setVoicePlaying(!voicePlaying);
                  }}
                >
                  <img
                    height="15px"
                    src="/assets/play-btn-black.svg"
                    alt="play"
                    style={voicePlaying === true ? { display: 'none' } : {}}
                  />
                  <img
                    height="15px"
                    src="/assets/stop-btn.svg"
                    alt="stop"
                    style={voicePlaying === false ? { display: 'none' } : {}}
                  />
                </div>
              )}
              <div className="d-flex">
                <span>{formatTime(audioRef?.current?.currentTime)}</span> /
                <span>
                  {formatTime(audioRef?.current?.duration) === 'Infinity:NaN'
                    ? 0
                    : formatTime(audioRef?.current?.duration)}
                </span>
              </div>
              <div
                className="card-progress d-flex rounded-2 overflow-hidden"
                style={{ width: '100%' }}
                onClick={handleProgressBarClick}
              >
                <div
                  className="card-progress-bar bg-blue-active rounded-2 "
                  role="progressbar"
                  style={{ width: `${parseInt(calculatePercentage(), 10)}%` }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              <div className="ms-auto d-flex gap-3">
                <a
                  className="voice-speaker-btn"
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSpeakerEnabled(!isSpeakerEnabled);
                    toggleMute();
                  }}
                >
                  <img
                    src="/assets/voice-speaker.svg"
                    alt=""
                    style={isSpeakerEnabled ? { display: 'none' } : {}}
                  />
                  <img
                    height="15px"
                    src="/assets/voice-speaker-mute.svg"
                    alt="stop"
                    style={isSpeakerEnabled ? {} : { display: 'none' }}
                  />
                </a>
                <div className="dropstart">
                  <a href="/#" data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
                    <img src="/assets/vertical-dot.svg" alt="" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-group p-2">
                    <li>
                      <a
                        id="copyVoiceBtn"
                        href="/#"
                        className="copyVoiceBtn dropdown-item py-2 px-4"
                        onClick={(e) => {
                          e.preventDefault();
                          copyVoiceUrl(audioRef.current.src);
                        }}
                      >
                        Copy voice URL
                      </a>
                    </li>
                    <li>
                      <a
                        id="downloadVoiceBtn"
                        href="/#"
                        className="downloadVoiceFile dropdown-item py-3 px-4"
                        onClick={(e) => {
                          e.preventDefault();
                          downloadAudio(audioRef.current.src);
                        }}
                      >
                        Download
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {getFormErrorMessage(formik, 'changeUrlFile')}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <a
                  href="/#"
                  id="uploadAnother"
                  className="text-blue-active"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUploadAnother();
                  }}
                >
                  <img className="pe-2" src="/assets/upload-blue.svg" alt="" />
                  Upload Another
                </a>
              </div>
            </div>

            <audio ref={audioRef} controls style={{ display: 'none' }} onEnded={handleAudioEnd}>
              <track kind="captions" />
              <source src={audioBlob} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>

            <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
              <button
                id="addURLButton"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || urlLoading}
                className="add-voice-final btn addURLButton bg-black d-flex align-items-center text-white px-4 py-12px ms-0"
              >
                Edit Voice
              </button>
              <ButtonWhiteModalCancel
                text="Cancel"
                onClick={(e) => {
                  e.preventDefault();
                  formik.setFieldValue(
                    'editLibrary.editSource',
                    formik.values.editLibrary.existSource
                  );
                  formik.setFieldValue(
                    'editLibrary.editMediaUrl',
                    formik.values.editLibrary.existMediaUrl
                  );
                  onClose();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditVoiceUploadGreeting;
