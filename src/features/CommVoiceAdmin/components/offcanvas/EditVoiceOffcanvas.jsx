import React, { useEffect, useMemo, useRef, useState } from 'react';
import TextArea from '../../../../common/components/forms/TextArea';
import SpinningLoaderSM from '../../../../common/components/Loader/SpinningLoaderSM';

function EditVoiceOffcanvas({
  formik,
  categories,
  showEditModal,
  setVoicePlaying,
  voicePlaying,
  setShow,
  show,
  onClose,
  voiceType,
  downloadAudio,
  copyVoiceUrl,
  setEditVoiceType,
  loading,
}) {
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const audioRef = useRef();

  const {
    editId,
    editName,
    editDescription,
    editSource,
    editMediaUrl,
    editCategoryId,
    existName,
    existDescription,
    existSource,
    existMediaUrl,
    existCategoryId,
  } = formik.values.editLibrary;

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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
  };

  const handleAudioEnd = () => {
    resetAudio();
    setVoicePlaying(false);
    setIsPlaying(false);
  };

  const handleClose = () => {
    resetAudio();
    onClose();
  };

  const togglePlay = async () => {
    if (audioRef?.current?.duration < 1) {
      audioRef.current.muted = true;
      await audioRef.current.play();
      resetAudio();
    } else {
      setVoicePlaying((prevPlaying) => !prevPlaying);

      const audio = audioRef.current;

      if (voicePlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          setUrlLoading(false);
          setIsPlaying(false);
        }
      }
    }
  };

  const changedMusic = () => {
    setShow({ isVisible: true, type: 'change-voice' });
    setEditVoiceType({ isVisible: true, type: 'change-text-voice' });
    setIsPlaying(false);
    resetAudio();
  };

  const handleSubmitUrl = () => {
    resetAudio();
    formik.handleSubmit();
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
    const loadAudio = async () => {
      setUrlLoading(true);

      if (editMediaUrl) {
        try {
          audioRef.current.src = editMediaUrl;
          await audioRef.current.load();
          audioRef.current.onloadedmetadata = () => {
            const updatedDuration = formatTime(audioRef?.current?.duration);
            if (updatedDuration && updatedDuration !== '0:00') {
              setIsPlaying(false);
              setUrlLoading(false);
            } else {
              setUrlLoading(false);
              setIsPlaying(false);
            }
          };
          audioRef.current.onended = handleAudioEnd;
        } catch (error) {
          setUrlLoading(false);
        }
      } else {
        setUrlLoading(false);
        resetAudio();
      }
    };

    if (showEditModal) {
      loadAudio();
    }
  }, [editMediaUrl, showEditModal]);

  useEffect(() => {
    if (!show) {
      setVoicePlaying(false);
      setIsPlaying(false);
    }
  }, [show]);

  useEffect(() => {
    if (showEditModal.type !== 'edit-voice') {
      resetAudio();
      setVoicePlaying(false);
      setIsPlaying(false);
      setUrlLoading(false);
    }
  }, [voiceType.type]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end  ${show ? 'show' : 'hiding'}`}
        style={show ? { display: 'block' } : {}}
        tabIndex="-1"
        id="offcanvasEditVoice"
        aria-labelledby="offcanvasEditVoiceLabel"
        aria-hidden="true"
      >
        <div className="offcanvas-header offcanvas-header-title d-flex justify-content-between p-23px pb-10px">
          <div>
            <h5
              className="mb-0 offcanvas-title text-dark fs-16px fw-medium"
              id="offcanvasContactLabel"
            >
              Edit Voice File
            </h5>
          </div>
          <div>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose} />
          </div>
        </div>

        <div className="offcanvas-body p-23px pt-0px">
          <div>
            <div className="form-group w-100 mt-3">
              <label className="text-primary mb-1 label-mandatory" htmlFor="fileName">
                File name
              </label>
              <input
                type="text"
                className="form-control bg-white"
                id="fileName"
                name="editLibrary.editName"
                onChange={formik.handleChange}
                value={editName}
                placeholder="Voice Name"
                style={formik.errors.editName ? { border: '1px solid red' } : {}}
              />
              {formik.errors.editName && (
                <span className="invalid-message">
                  <sup>*</sup>
                  {formik.errors.editName}
                </span>
              )}
            </div>

            <TextArea
              label="Voice Description*"
              placeholder="This music is used for greetings"
              rowCount="6"
              name="editLibrary.editDescription"
              onChange={formik.handleChange}
              value={editDescription}
              style={formik.errors.editDescription ? { border: '1px solid red' } : {}}
            />
            {formik.errors.editDescription && (
              <span className="invalid-message">
                <sup>*</sup>
                {formik.errors.editDescription}
              </span>
            )}
          </div>
          <div className="mt-3 bg-aqua-squeeze p-3 rounded">
            <label className="mb-0 text-primary">
              File added via : <span className="fw-medium">{editSource}</span>{' '}
            </label>
          </div>

          <div className="mt-4">
            <div className="form-group mt-3">
              <label className="text-primary mb-1">Category(optional)</label>
              <select
                name="editLibrary.editCategoryId"
                className="form-control form-select bg-white"
                value={formik.values.editLibrary.editCategoryId}
                onChange={(e) => {
                  const selectedValue = parseInt(e.target.value, 10);
                  formik.handleChange(e);
                  formik.setFieldValue('editLibrary.editCategoryId', selectedValue);
                }}
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
          </div>

          <div className="d-flex mt-4 gap-2 w-100 align-items-center flex-row card  p-3 bg-chat-blue border-0 rounded position-relative mt-2">
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
                }}
              >
                <img
                  height="15px"
                  src="/assets/play-btn-black.svg"
                  alt="play"
                  style={isPlaying === true ? { display: 'none' } : {}}
                />
                <img
                  height="15px"
                  src="/assets/stop-btn.svg"
                  alt="stop"
                  style={isPlaying === false ? { display: 'none' } : {}}
                />
              </div>
            )}
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
                        copyVoiceUrl(editMediaUrl);
                      }}
                    >
                      Copy voice URL
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <audio ref={audioRef} controls style={{ display: 'none' }} onEnded={handleAudioEnd}>
            <track kind="captions" />
            <source src={editMediaUrl} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>

          <div className="d-flex justify-content-between align-items-center  mt-3">
            <div>
              <a
                id=""
                href="/#"
                className="text-blue-active"
                onClick={(e) => {
                  e.preventDefault();
                  changedMusic();
                }}
              >
                <img className="pe-2" src="/assets/converter.svg" alt="" />
                Change Music
              </a>
            </div>
            <div>
              <a
                id=""
                href="/#"
                className="downloadVoiceFile text-blue-active"
                onClick={(e) => {
                  e.preventDefault();
                  downloadAudio(editMediaUrl);
                }}
              >
                <img className="pe-2" src="/assets/voice-download.svg" alt="" />
                Download
              </a>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
            <button
              id="editVoiceToast"
              type="button"
              className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
              onClick={handleSubmitUrl}
              disabled={
                loading ||
                (editName === existName &&
                  editDescription === existDescription &&
                  editCategoryId === existCategoryId &&
                  editSource === existSource &&
                  editMediaUrl === existMediaUrl)
              }
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
              onClick={handleClose}
            >
              Cancel
            </button>
            <a
              href="/#"
              className="delete-btn d-flex align-items-center ms-3  px-sm-5 px-10px px-lg-4 py-12px rounded "
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'delete-voice',
                  id: editId,
                  name: editName,
                });
              }}
            >
              <span>Delete</span>
            </a>
          </div>
        </div>
      </div>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default EditVoiceOffcanvas;
