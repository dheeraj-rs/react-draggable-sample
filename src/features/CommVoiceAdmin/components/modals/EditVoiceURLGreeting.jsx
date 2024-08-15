import React, { useEffect, useMemo, useRef, useState } from 'react';

import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import SpinningLoaderSM from '../../../../common/components/Loader/SpinningLoaderSM';

function EditVoiceURLGreeting({
  formik,
  voicePlaying,
  setVoicePlaying,
  editVoiceType,
  onClose,
  downloadAudio,
  copyVoiceUrl,
}) {
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const [flag, setFlag] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const audioRef = useRef(null);

  const renderUrlError = (errorMessage) => (
    <div
      className="alert alert-danger w-100 d-flex gap-2"
      style={{
        color: '#c60000',
        borderRadius: '5px',
      }}
    >
      <img src="/assets/red-close.svg" alt="" /> {errorMessage}
    </div>
  );

  const validateURL = (url) => {
    const urlPattern = /^(http(s)?:\/\/)?(www\.)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    const supportedFormats = ['.mp3', '.wav'];

    if (url === '') {
      return { isValid: false, error: 'Voice URL is required' };
    }

    if (!urlPattern.test(url)) {
      return { isValid: false, error: renderUrlError('Invalid URL format') };
    }

    const urlLower = url.toLowerCase();
    const endsWithSupportedFormat = supportedFormats.some((format) => urlLower.endsWith(format));

    if (!endsWithSupportedFormat) {
      return {
        isValid: false,
        error: renderUrlError('Unsupported file format. Supported formats: mp3, wav'),
      };
    }

    return { isValid: true, error: null };
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
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      return percentage;
    }
    return 0;
  };

  const resetAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleAudioEnd = () => {
    audioRef.current.currentTime = 0;
    setVoicePlaying(false);
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
  };

  const togglePlay = async () => {
    const duration = formatTime(audioRef?.current?.duration);
    if (!duration) {
      // formik.setFieldValue('validationError', false);
      return;
    }
    setVoicePlaying((prevPlaying) => !prevPlaying);
    const audio = audioRef.current;
    if (audio) {
      if (voicePlaying) {
        audio.pause();
      } else {
        const isAtEnd = audio.currentTime === audio.duration;

        if (audio.currentTime !== undefined && audio.duration !== undefined && isAtEnd) {
          audio.currentTime = 0;
        }
        await audio.play();
      }
    }
  };

  const loadAudio = async () => {
    const valid = validateURL(formik?.values?.changeUrlFile);
    setValidationError(valid);
    try {
      audioRef.current.src = formik?.values?.changeUrlFile;
      await audioRef.current.load();
    } catch (error) {
      setUrlLoading(false);
    }
  };

  useEffect(() => {
    const valid = validateURL(formik?.values?.changeUrlFile);
    setValidationError(valid);
    if (formik?.values?.changeUrlFile) {
      setUrlLoading(true);
      loadAudio().then(() => setUrlLoading(false));
    }
  }, [formik?.values?.changeUrlFile]);

  const handleSubmitUrl = () => {
    setFlag(true);
    const duration = formatTime(audioRef?.current?.duration);
    const valid = validateURL(formik?.values?.changeUrlFile);
    setValidationError(valid);
    if (valid.isValid && duration) {
      formik.setFieldValue('editLibrary.editMediaUrl', formik?.values?.changeUrlFile);
      formik.setFieldValue('editLibrary.editSource', 'url');
      setFlag(false);
    }

    if (!duration) {
      setUrlLoading(false);
    } else {
      onClose();
    }
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

  // changeUrlFile url true load song
  useEffect(() => {
    if (formik?.values?.changeUrlFile === '') {
      audioRef.current.pause();
      audioRef.current.src = '';
      setVoicePlaying(false);
    } else if (formik?.values?.changeUrlFile === null) {
      audioRef.current = null;
      setVoicePlaying(false);
    } else {
      loadAudio();
    }
  }, [formik?.values?.changeUrlFile]);

  //  duration used to check valid Url ;
  useEffect(() => {
    const valid = validateURL(formik?.values?.changeUrlFile);
    setValidationError(valid);
    setUrlLoading(false);
    if (audioRef?.current?.duration) {
      setUrlLoading(true);
    }
  }, [audioRef?.current?.duration, formik.values.changeUrlFile]);

  // play & pause other controlling
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('stop', () => {});
    }
  }, [togglePlay]);

  // page reset
  useEffect(() => {
    if (editVoiceType.type !== 'change-url-voice') {
      formik.setFieldValue('changeUrlFile', '');
      resetAudio();
      setFlag(false);
      if (audioRef.current) audioRef.current.src = '';
      setVoicePlaying(false);
    }
  }, [editVoiceType.type]);

  return (
    <div id="voiceURLWrap" style={{ display: 'block' }} className="tab-pane fade active show">
      <div>
        <p className="text-secondary text-secondary fw-medium">
          Get audio file from any cloud storage with a URL
        </p>
      </div>
      <div>
        <Input
          label="Voice file URL"
          placeholder="File URL"
          name="changeUrlFile"
          value={formik?.values?.changeUrlFile}
          maxLength="500"
          onChange={(e) => {
            formik?.handleChange(e);
            setFlag(true);
          }}
          style={!validationError?.isValid && flag ? { border: '1px solid red' } : {}}
        />
      </div>
      {!validationError?.isValid && flag && (
        <span className="invalid-message">
          <sup>*</sup>
          {validationError?.error}
        </span>
      )}

      {urlLoading && (
        <div className="d-flex gap-2 w-100 align-items-center flex-row card  p-2 bg-seaShell border-0 rounded position-relative mt-4">
          <div
            role="button"
            className="shadow-1 play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
            onClick={() => {
              togglePlay();
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
          <div className="d-flex">
            <span>{formatTime(audioRef?.current?.currentTime)}</span> /
            <span>{formatTime(audioRef?.current?.duration)}</span>
          </div>
          <div
            className="card-progress d-flex rounded-2 overflow-hidden"
            style={{ width: '100%' }}
            onClick={handleProgressBarClick}
          >
            <div
              className="card-progress-bar bg-blue-active rounded-2"
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
                style={isSpeakerEnabled ? {} : { display: 'none' }}
              />
              <img
                height="15px"
                src="/assets/voice-speaker-mute.svg"
                alt="stop"
                style={isSpeakerEnabled ? { display: 'none' } : {}}
              />
            </a>
            <div className="dropstart">
              <a
                href="/#"
                data-bs-toggle="dropdown"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
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
                      copyVoiceUrl(formik.values.changeUrlFile);
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
                      downloadAudio(formik.values.changeUrlFile);
                    }}
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {!urlLoading && formik.values.changeUrlFile && validationError?.isValid && (
        <div className="loading-spinner-container mt-3 text-center d-flex align-items-center justify-content-center">
          <div>
            <SpinningLoaderSM />
          </div>
        </div>
      )}
      <audio ref={audioRef} controls style={{ display: 'none' }} onEnded={handleAudioEnd}>
        <track kind="captions" />
        <source src={formik?.values?.voiceURL} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
        <button
          id="addURLButton"
          type="button"
          className="add-voice-final btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
          onClick={(e) => {
            e.preventDefault();
            handleSubmitUrl();
          }}
          // disabled={!urlLoading && formik.values.changeUrlFile && validationError?.isValid}
        >
          Edit Voice
        </button>
        <ButtonWhiteModalCancel
          text="Cancel"
          onClick={(e) => {
            e.preventDefault();
            formik.setFieldValue('editLibrary.editSource', formik.values.editLibrary.existSource);
            formik.setFieldValue(
              'editLibrary.editMediaUrl',
              formik.values.editLibrary.existMediaUrl
            );
            onClose();
            setFlag(false);
          }}
        />
      </div>
    </div>
  );
}

export default EditVoiceURLGreeting;
