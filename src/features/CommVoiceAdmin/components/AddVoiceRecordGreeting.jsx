import React, { useEffect, useMemo, useRef, useState } from 'react';
import ButtonWhiteModalCancel from '../../../common/components/buttons/ButtonWhiteModalCancel';
import Input from '../../../common/components/forms/Input';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';

function AddVoiceRecordGreeting({
  formik,
  setVoiceType,
  voiceType,
  onClose,
  copyVoiceUrl,
  downloadAudio,
}) {
  const [recordVoiceFrom, setRecordVoiceFrom] = useState('system');
  const [show, setShow] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState('female2');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [message, setMessage] = useState('');
  const maxCharacters = 500;

  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const maxRecordingTime = 30;
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.id);
  };

  const toggleRecodBtn = () => {
    setShow(!show);
  };

  const handleDataAvailable = (e) => {
    formik.setFieldValue('recordFile', e);
    if (e.data.size > 0) {
      chunksRef.current.push(e.data);
    }
  };

  const handleStop = () => {
    const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
    setAudioBlob(blob);
    chunksRef.current = [];
  };

  const handleRecordingStop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setShow(false);
      clearInterval(timerRef.current);
    }
  };

  const handleRecordingStart = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = handleDataAvailable;
          mediaRecorderRef.current.onstop = handleStop;
          mediaRecorderRef.current.start();
          toggleRecodBtn();

          setRecordingTime(0);
          timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => {
              if (prevTime >= maxRecordingTime) {
                handleRecordingStop();
                return prevTime;
              }
              return prevTime + 1;
            });
          }, 1000);
        })
        .catch((error) => {
          alert('Error accessing microphone:', error);
        });
    } else {
      alert('getUserMedia is not supported in this browser');
    }
  };

  const togglePlay = () => {
    if (audioBlob === null) return;

    const audioUrl = URL.createObjectURL(audioBlob);
    audioRef.current.src = audioUrl;

    if (voicePlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef?.current?.currentTime === audioRef?.current?.duration) {
        audioRef.current.currentTime = 0;
      }
      audioRef?.current?.play();
    }

    setVoicePlaying(!voicePlaying);
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

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
  };

  const handleAudioEnd = () => {
    audioRef.current.currentTime = 0;
    setVoicePlaying(false);
  };

  useEffect(
    () => () => {
      clearInterval(timerRef.current);
    },
    []
  );

  useEffect(() => {
    const inputMessage = formik?.values?.recordIvrDescription;
    if (inputMessage?.length <= maxCharacters) {
      setMessage(inputMessage);
    }
  }, [formik?.values?.recordIvrDescription]);

  useEffect(() => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
    }
  }, [audioBlob]);

  useEffect(() => {
    setAudioBlob(null);
    handleRecordingStop();
  }, [voiceType.type !== 'ivr-record-voice', voiceType.type !== 'record-voice']);

  const handleUploadAnother = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioBlob(null);
    formik.setFieldValue('recordFile', null);
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

  return (
    <div id="addVoiceRecordWrap">
      <div id="recordRadioGroup ">
        <div>
          <p className="text-primary fw-medium">Record Voice</p>
        </div>

        <div
          className="d-flex flex-column flex-sm-row flex-wrap gap-2 justify-content-between "
          id="greetingsVoiceRecord"
        >
          <div className="record-voice-radio rounded record-voice-active">
            <input
              id="system"
              className="gs-radio gs-file-upload clear-radio"
              value="system"
              name="system"
              type="radio"
              checked={recordVoiceFrom === 'system'}
              onChange={() => setRecordVoiceFrom('system')}
              onClick={(e) => {
                e.preventDefault();
                setVoiceType({ isVisible: true, type: 'record-voice' });
              }}
            />
            <label
              htmlFor="system"
              className="radio-tick-label"
              onClick={() => {
                setRecordVoiceFrom('system');
                setVoiceType({ isVisible: true, type: 'record-voice' });
              }}
            >
              From System
            </label>
          </div>
          <div className="record-voice-radio rounded">
            <input
              id="ivr"
              className="gs-radio gs-file-upload clear-radio"
              name="ivr"
              type="radio"
              value="ivr"
              checked={recordVoiceFrom === 'ivr'}
              onChange={() => setRecordVoiceFrom('ivr')}
              onClick={(e) => e.preventDefault()}
            />
            <label
              htmlFor="fromIVR"
              className="radio-tick-label"
              onClick={() => {
                setRecordVoiceFrom('ivr');
                setVoiceType({ isVisible: true, type: 'ivr-record-voice' });
              }}
            >
              Custom IVR
            </label>
          </div>
        </div>
      </div>

      <div
        id="fromSystem"
        className={`mt-4 ${recordVoiceFrom === 'system' ? '' : 'd-none'} ${
          audioBlob !== null ? 'd-none' : ''
        }`}
      >
        <p className="mb-0 text-secondary">
          Use your system microphone to record. Duration 30 sec.
        </p>
        <div
          id="recordWrap"
          className={`d-flex flex-column justify-content-center text-center mt-3 ${
            show ? 'd-none' : ''
          }`}
        >
          <div>
            {' '}
            <a className="record-btn" href="#/" onClick={handleRecordingStart}>
              <img src="/assets/record-button.svg" alt="" />
            </a>
          </div>
          <div>
            <p className="mb-0 text-secondary mt-2">Click mic button to record</p>
          </div>
        </div>
        <div
          id="recordingWrap"
          className={`d-flex flex-column justify-content-center text-center mt-4 ${
            show ? '' : 'd-none'
          }`}
        >
          <div>
            <button type="button" className="rec" onClick={handleRecordingStop}>
              Recording
            </button>
          </div>

          <div>
            <p className="mb-0 text-primary mt-2">
              Recording - <span className="text-primary fw-medium">{`00.00.${recordingTime}`}</span>
            </p>
          </div>
        </div>
      </div>

      {audioBlob && (
        <>
          <div className=" d-flex gap-2 w-100 align-items-center flex-row card  p-2 bg-seaShell border-0 rounded position-relative mt-4">
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
                      id=""
                      href="/#"
                      className="copyVoiceBtn dropdown-item py-3 px-4"
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
                maxLength="500"
                placeholder="This voice is use for greetings"
                onChange={formik?.handleChange}
                value={formik?.values?.voiceDescription}
                style={
                  isFormFieldValid(formik, 'voiceDescription') ? { border: '1px solid red' } : {}
                }
              />
              {getFormErrorMessage(formik, 'voiceDescription')}
            </div>
          </div>

          {/* upload completed ends */}
          <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
            <button
              id="addURLButton"
              type="button"
              onClick={formik.handleSubmit}
              className="add-voice-final btn addURLButton bg-black  d-flex align-items-center text-white  px-4 py-12px ms-0"
            >
              Add Voice
            </button>
            <ButtonWhiteModalCancel
              text="Cancel"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            />
          </div>
        </>
      )}

      <div
        id="fromIVR"
        className={` mt-4 ${recordVoiceFrom === 'ivr' ? '' : 'd-none'} ${
          voiceType?.ivr === 'ivr' ? 'd-none' : ''
        } `}
      >
        <div id="customIVRWrap">
          <div className="p-3 rounded bg-aqua-squeeze">
            <p className="mb-0 fs-13px text-mariner">
              <span className="pe-2">
                <img src="/assets/warning-blue.svg" alt="" />
              </span>
              This service is chargeable. Your account will be deducted with ₹200{' '}
            </p>
          </div>
          <div className="position-relative">
            <div className="form-group mt-3">
              <label className="text-primary mb-1">Type Message</label>
              <div
                className="custom-border-shadow form-control p-2 bg-white rounded-2 mb-2"
                style={
                  isFormFieldValid(formik, 'recordIvrDescription')
                    ? { border: '1px solid red' }
                    : {}
                }
              >
                <textarea
                  id="typeSms"
                  name="recordIvrDescription"
                  placeholder="Hi, Welcome to Gsoft technology solutions.  We are happy to help you."
                  className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                  onChange={formik?.handleChange}
                  value={formik?.values?.recordIvrDescription}
                  maxLength="500"
                />

                <div className="px-3  bg-white border-0 rounded-bottom sms-emoji-area d-flex justify-content-end align-items-end">
                  <span className="fw-medium text-secondary">{`${message?.length}/ ${maxCharacters}`}</span>
                </div>
              </div>
              {getFormErrorMessage(formik, 'recordIvrDescription')}
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-md-center align-items-start gap-30 mt-2">
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

            <div className="form-group">
              <label className="text-primary mb-1 mt-3" htmlFor="language">
                Voice gender
              </label>
              <div className="d-flex gap-3 mt-2">
                <div>
                  <input
                    id="female2"
                    className="gs-radio clear-radio"
                    name="Gender2"
                    type="radio"
                    checked={selectedGender === 'female2'}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="female2" className="radio-tick-label text-primary">
                    Female
                  </label>
                </div>
                <div>
                  <input
                    id="male2"
                    className="gs-radio clear-radio"
                    name="Gender2"
                    type="radio"
                    checked={selectedGender === 'male2'}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="male2" className="radio-tick-label text-primary">
                    Male
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
            <button
              id="createSubmit"
              type="button"
              className="btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
              onClick={formik.handleSubmit}
              disabled
            >
              Submit
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
      </div>
      <div id="customIVRSuccess" className={`mt-4 ${voiceType?.ivr === 'ivr' ? '' : 'd-none'}`}>
        <div className="px-5 py-4 rounded bg-green-mercury-light d-flex flex-column text-center justify-content-center">
          <img height="50" src="/assets/tick-circle-green.svg" alt="" />

          <p className="mb-0 text-deep-sea fw-medium mt-3 fs-15px">
            Your request has been submitted successfully.
          </p>
          <p className="mb-0 text-primary fw-medium mt-3">
            For more support, Please contact our support team by posting email to{' '}
            <a href="mailto:support@gsoftcomm.net" className="text-mariner pe-1">
              support@gsoftcomm.net
            </a>
            Our support team will contact you soon.
          </p>
          <p className="mb-0 text-secondary fw-medium mt-3">
            This service is chargeable. Your account will be deducted with ₹200{' '}
          </p>
        </div>
        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4">
          <button
            id="ivrSubmit"
            type="button"
            name="createSuccessfully"
            className="btn bg-black d-flex align-items-center text-white  px-4 py-12px ms-0"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            OK
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
    </div>
  );
}

export default AddVoiceRecordGreeting;
