import React, { useEffect, useMemo, useRef, useState } from 'react';
import ButtonWhiteModalCancel from '../../../common/components/buttons/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';

function EditVoiceTextSpeechGreeting({
  formik,
  onClose,
  editVoiceType,
  setEditVoiceType,
  voicePlaying,
  setVoicePlaying,
  downloadAudio,
  copyVoiceUrl,
}) {
  const [selectedGender, setSelectedGender] = useState('female3');
  const [message, setMessage] = useState('');
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
  const [urlLoading, setUrlLoading] = useState(false);
  const audioRef = useRef();

  const maxCharacters = 500;

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.id);
  };

  useEffect(() => {
    const inputMessage = formik?.values?.textDescription;
    if (inputMessage.length <= maxCharacters) {
      setMessage(inputMessage);
    }
  }, [formik?.values?.textDescription]);

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
    if (audioRef?.current?.currentTime !== undefined && audioRef?.current?.duration !== undefined) {
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

  const togglePlay = () => {
    const duration = formatTime(audioRef?.current?.duration);
    if (!duration) {
      if (!formik?.errors && formik?.values?.textConvertfileName !== '') {
        setUrlLoading(true);
      }
      return;
    }

    setVoicePlaying((prevPlaying) => !prevPlaying);

    const audio = audioRef.current;

    if (audio) {
      if (voicePlaying) {
        audio.pause();
      } else {
        const isAtEnd = audio.currentTime === audio.duration;

        if (isAtEnd) {
          audio.currentTime = 0;
        }

        audio.play();
      }
    }
  };

  const handleClose = () => {
    formik.setFieldValue('editLibrary.editSource', formik.values.editLibrary.editSource);
    formik.setFieldValue('editLibrary.editMediaUrl', formik.values.editLibrary.existMediaUrl);
    onClose();
  };

  const handleConvert = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    if (audioRef?.current?.duration) {
      setUrlLoading(false);
    }
  }, [audioRef?.current?.duration, formik.values.textConvertfileName]);

  useEffect(() => {
    const loadAudio = async () => {
      if (formik?.values?.textConvertfileName) {
        setUrlLoading(true);
        try {
          audioRef.current.src = formik?.values?.textConvertfileName;
          await audioRef.current.load();
        } catch (error) {
          alert('Error loading audio:', error);
        } finally {
          setUrlLoading(false);
        }
      }
    };

    loadAudio();
  }, [formik?.values?.textConvertfileName]);

  useEffect(() => {
    audioRef.current = formik?.values?.textConvertfileName === null ? null : audioRef.current;
  }, [formik?.values?.textConvertfileName]);

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
    if (editVoiceType.type !== ('text-voice-convert' || 'text-voice')) {
      formik.setFieldValue('textDescription', '');
      resetAudio();
      if (audioRef.current) audioRef.current.src = '';
      setVoicePlaying(false);
      setUrlLoading(false);
    }
  }, [editVoiceType.type]);

  return (
    <div className="tab-speech">
      <div
        id="textSpeechMsg"
        className={`${editVoiceType.type === 'change-text-voice' ? '' : 'd-none'}`}
      >
        <div>
          <p className="text-primary fw-medium mb-2">Text to Speech</p>
          <p className="text-secondary ">
            When the caller reaches this component, can hear selected gender voice
          </p>
        </div>
        <div className="position-relative">
          <div className="form-group mt-3">
            <label className="text-primary mb-1">Voice description</label>
            <div
              className="custom-border-shadow form-control p-2 bg-white rounded-2 mb-2"
              style={isFormFieldValid(formik, 'textDescription') ? { border: '1px solid red' } : {}}
            >
              <textarea
                id="typeSms"
                placeholder="Hi, Welcome to Gsoft technology solutions.  We are happy to help you."
                className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                name="textDescription"
                onChange={formik?.handleChange}
                value={formik?.values?.textDescription}
                maxLength="500"
              />

              <div className="px-3  bg-white border-0 rounded-bottom sms-emoji-area d-flex justify-content-end align-items-end">
                <span className="fw-medium text-secondary">{`${message.length}/${maxCharacters}`}</span>
              </div>
            </div>
            {getFormErrorMessage(formik, 'textDescription')}
          </div>
        </div>

        <div className="row justify-content-between">
          <div className="col-md-5 col-sm-6">
            <div className="">
              <label className="mb-1 text-primary fs-13px">Language (Accent)</label>
              <div className="select">
                <div className="selectBtn" data-type="firstOption">
                  English (US)
                </div>
                <div className="selectDropdown">
                  <div className="option" data-type="firstOption">
                    English (US)
                  </div>
                  <div className="option" data-type="secondOption">
                    English (Country)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group col-md-5 col-sm-6">
            <label className="text-primary mb-1 mt-3 " htmlFor="language">
              Voice gender
            </label>
            <div className="d-flex gap-3 mt-2">
              <div>
                <input
                  id="female3"
                  className="gs-radio clear-radio"
                  name="Gender3"
                  type="radio"
                  checked={selectedGender === 'female3'}
                  onChange={handleGenderChange}
                />
                <label htmlFor="female3" className="radio-tick-label text-primary">
                  Female
                </label>
              </div>
              <div>
                <input
                  id="male3"
                  className="gs-radio clear-radio"
                  name="Gender3"
                  type="radio"
                  checked={selectedGender === 'male3'}
                  onChange={handleGenderChange}
                />
                <label htmlFor="male3" className="radio-tick-label text-primary">
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
            onClick={handleConvert}
            disabled
          >
            Convert
          </button>
          <ButtonWhiteModalCancel
            text="Cancel"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          />
        </div>
      </div>

      {/* text to voice conversion starts */}
      <div
        id="voiceConvertWrap"
        className={`${editVoiceType.type === 'change-text-voice-convert' ? '' : 'd-none'}`}
      >
        <div>
          <p className="text-primary fw-medium mb-2">Text to Speech</p>
        </div>

        <div className="d-flex gap-2 w-100 align-items-center flex-row card  p-3 bg-chat-blue border-0 rounded position-relative mt-4">
          <div
            role="button"
            className="play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
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
              className="card-progress-bar bg-blue-active rounded-2 h-1"
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
                      copyVoiceUrl(formik?.values?.textConvertfileName);
                    }}
                  >
                    Copy voice URL
                  </a>
                </li>
                <li>
                  <a
                    id="downloadVoiceBtn"
                    href="/#"
                    className="downloadVoiceFile dropdown-item py-2 px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      downloadAudio(formik?.values?.textConvertfileName);
                    }}
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
                setEditVoiceType({ isVisible: true, type: 'change-text-voice' });
              }}
            >
              <img className="pe-2" src="/assets/converter.svg" alt="" />
              Convert Another
            </a>
          </div>
          <div>
            <a
              id="downloadVoiceFile"
              href="/#"
              className="downloadVoiceFile text-blue-active"
              onClick={(e) => {
                e.preventDefault();
                downloadAudio();
              }}
            >
              <img className="pe-2" src="/assets/voice-download.svg" alt="" />
              Download
            </a>
          </div>
        </div>
        {urlLoading && (
          <div className="loading-spinner-container">
            <p>Loading......</p>
          </div>
        )}
        <audio ref={audioRef} controls style={{ display: 'none' }} onEnded={handleAudioEnd}>
          <track kind="captions" />
          <source src={formik?.values?.voiceURL} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          <button
            id="addVoiceButton"
            type="button"
            className="add-voice-final btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
            // onClick={handleSubmitTxt}
          >
            Edit Voice
          </button>
          <ButtonWhiteModalCancel
            text="Cancel"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          />
        </div>
      </div>
      {/* text to voice conversion ends */}
    </div>
  );
}

export default EditVoiceTextSpeechGreeting;
