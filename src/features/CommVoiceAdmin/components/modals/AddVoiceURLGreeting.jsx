import React, { useEffect, useMemo, useRef, useState } from 'react';

import Input from '../../../../common/components/forms/Input';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';
import SpinningLoaderSM from '../../../../common/components/Loader/SpinningLoaderSM';

function AddVoiceURLGreeting({
  formik,
  setVoicePlaying,
  downloadAudio,
  categories,
  voicePlaying,
  onClose,
  voiceType,
  isLoading,
  copyVoiceUrl,
}) {
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
  const [urlLoading, setUrlLoading] = useState(false);
  const audioRef = useRef(null);

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

  useEffect(() => {
    setUrlLoading(false);
    if (audioRef?.current?.duration) {
      setUrlLoading(true);
    }
  }, [audioRef?.current?.duration, formik.values.urlFile]);

  const togglePlay = async () => {
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
    try {
      audioRef.current.src = formik?.values?.urlFile;
      await audioRef.current.load();
    } catch (error) {
      setUrlLoading(false);
    }
  };

  useEffect(() => {
    loadAudio();
  }, [formik?.values?.urlFile]);

  useEffect(() => {
    if (formik?.values?.urlFile === '') {
      audioRef.current.pause();
      audioRef.current.src = '';
      setVoicePlaying(false);
    } else if (formik?.values?.urlFile === null) {
      audioRef.current = null;
      setVoicePlaying(false);
    } else {
      audioRef.current.src = formik?.values?.urlFile;
    }
  }, [formik?.values?.urlFile]);

  useEffect(() => {
    if (formik?.values?.urlFile) {
      setUrlLoading(true);
      loadAudio().then(() => setUrlLoading(false));
    }
  }, [formik?.values?.urlFile]);

  useEffect(() => {
    if (voiceType.type !== 'url-voice') {
      resetAudio();
      if (audioRef.current) audioRef.current.src = '';
      setVoicePlaying(false);
    }
  }, [voiceType.type]);

  const handleSubmitUrl = () => {
    const duration = formatTime(audioRef?.current?.duration);
    formik.handleSubmit();
    if (!duration) {
      setUrlLoading(false);
    }
  };

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

  return (
    <div id="voiceURLWrap" style={{ display: 'block' }}>
      <div>
        <p className="text-secondary text-secondary fw-medium">
          Get audio file from any cloud storage with a URL
        </p>
      </div>
      <div>
        <Input
          label="Voice file URL"
          placeholder="File URL"
          name="urlFile"
          value={formik?.values?.urlFile}
          onChange={(e) => {
            formik?.handleChange(e);
          }}
          style={isFormFieldValid(formik, 'urlFile') ? { border: '1px solid red' } : {}}
          maxLength="500"
        />
      </div>
      {getFormErrorMessage(formik, 'urlFile')}
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
                    id=""
                    href="/#"
                    className="copyVoiceBtn dropdown-item py-3 px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      copyVoiceUrl(formik?.values?.urlFile);
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
                      downloadAudio(formik.values.urlFile);
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

      {!urlLoading && formik.values.urlFile && !formik?.errors?.urlFile && (
        <div className="loading-spinner-container m-3 text-center d-flex align-items-center justify-content-center">
          <div>
            <SpinningLoaderSM />
          </div>
        </div>
      )}

      <audio ref={audioRef} controls style={{ display: 'none' }} onEnded={handleAudioEnd}>
        <track kind="captions" />
        <source src={formik?.values?.urlFile} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      {urlLoading && (
        <>
          <div>
            <Input
              label="Voice file name"
              placeholder="Voice_ivr_0001"
              name="voiceFileName"
              maxLength="50"
              onChange={formik?.handleChange}
              value={formik?.values?.voiceFileName}
              style={isFormFieldValid(formik, 'voiceFileName') ? { border: '1px solid red' } : {}}
            />
            {getFormErrorMessage(formik, 'voiceFileName')}
          </div>
          <div className="position-relative">
            <div className="form-group mt-4">
              <label className="text-primary mb-1">Voice description</label>
              <textarea
                className="form-control  bg-white rounded "
                rows="4"
                name="voiceDescription"
                placeholder="This voice is use for greetings"
                maxLength="500"
                onChange={formik?.handleChange}
                value={formik?.values?.voiceDescription}
                style={
                  isFormFieldValid(formik, 'voiceDescription') ? { border: '1px solid red' } : {}
                }
              />
              {getFormErrorMessage(formik, 'voiceDescription')}
            </div>
          </div>

          <div className="mt-4">
            <div className="form-group mt-3">
              <label className="text-primary mb-1">Category(optional)</label>
              <select
                name="selectCategoryId"
                className="form-control form-select bg-white"
                value={formik.values.selectCategoryId}
                onChange={formik.handleChange}
                style={
                  isFormFieldValid(formik, 'selectCategoryId') ? { border: '1px solid red' } : {}
                }
              >
                <option value="">Select</option>
                {categories?.length > 0 &&
                  categories?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.attributes.name}
                    </option>
                  ))}
              </select>
            </div>
            {getFormErrorMessage(formik, 'selectCategoryId')}
          </div>
        </>
      )}
      <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
        <button
          id="addURLButton"
          type="button"
          className="add-voice-final btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
          onClick={handleSubmitUrl}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Add Voice'}
        </button>
        <ButtonWhiteModalCancel
          text="Cancel"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default AddVoiceURLGreeting;
