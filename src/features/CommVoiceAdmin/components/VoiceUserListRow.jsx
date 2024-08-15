import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function VoiceUserListRow({
  formik,
  userlist,
  includedList,
  setShow,
  formatDate,
  setShowEditModal,
  isPlaying,
  onPlayPause,
  activeAudioId,
  setActiveAudioId,
}) {
  const audioRef = useRef(new Audio());
  const [size, setSize] = useState('');

  useEffect(() => {
    if (includedList && includedList.length > 0) {
      const voiceFile = includedList.find(
        (list) => parseInt(list?.id, 10) === userlist?.attributes?.media_id
      );
      if (voiceFile) {
        const sizeInMB = voiceFile.attributes.size / (1024 * 1024);
        setSize(`${sizeInMB.toFixed(2)} MB`);
      }
    }
  }, [includedList, userlist?.attributes?.media_id]);

  useEffect(() => {
    audioRef.current.src = userlist?.attributes.media_url;
  }, [userlist?.attributes.media_url]);

  useEffect(() => {
    const handleEnded = () => {
      audioRef.current.pause();
      onPlayPause(false);
      setActiveAudioId(null);
    };

    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, [onPlayPause, setActiveAudioId]);

  const stopActiveAudio = useCallback(() => {
    const activeAudio = document.getElementById(`audio-${activeAudioId}`);
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      onPlayPause(false);
      setActiveAudioId(null);
    }
  }, [activeAudioId, onPlayPause, setActiveAudioId]);

  const handlePlayPause = () => {
    if (userlist?.attributes.media_url === null) {
      alert('Media url null');
      return;
    }

    if (activeAudioId !== userlist?.id) {
      stopActiveAudio();
      setActiveAudioId(userlist?.id);
    }

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    onPlayPause(!audioRef.current.paused);
  };

  useEffect(() => {
    if (isPlaying && activeAudioId === userlist?.id) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, activeAudioId, userlist?.id]);

  const handleEditVoice = useCallback(() => {
    setShowEditModal({
      isVisible: true,
      type: 'edit-voice',
    });

    formik.setFieldValue('editLibrary.editName', userlist?.attributes?.name);
    formik.setFieldValue('editLibrary.editDescription', userlist?.attributes?.description);
    formik.setFieldValue('editLibrary.editId', userlist?.id);
    formik.setFieldValue('editLibrary.editSource', userlist?.attributes?.source);
    formik.setFieldValue('editLibrary.editMediaUrl', userlist?.attributes.media_url);
    formik.setFieldValue('editLibrary.editCategoryId', userlist?.attributes.category_id);
    formik.setFieldValue('editLibrary.existName', userlist?.attributes?.name);
    formik.setFieldValue('editLibrary.existDescription', userlist?.attributes?.description);
    formik.setFieldValue('editLibrary.existSource', userlist?.attributes?.source);
    formik.setFieldValue('editLibrary.existMediaUrl', userlist?.attributes?.media_url);
    formik.setFieldValue('editLibrary.existCategoryId', userlist?.attributes?.category_id);
    formik.setFieldValue('editSource', userlist?.attributes?.source);
  }, [
    formik,
    userlist?.attributes?.name,
    setShowEditModal,
    userlist?.id,
    userlist?.attributes?.media_url,
    userlist?.attributes?.source,
    userlist?.attributes?.category_id,
  ]);

  const handleMoveCategory = useCallback(() => {
    formik.setFieldValue('selectCategoryId', userlist?.attributes.category_id).then(
      setShow({
        isVisible: true,
        type: 'move-category',
        id: userlist?.id,
        selectId: userlist?.attributes.category_id,
        name: userlist?.attributes?.name,
      })
    );
  }, [setShow, userlist?.id, userlist?.attributes.category_id]);

  const handleDeleteVoice = useCallback(() => {
    setShow({
      isVisible: true,
      type: 'delete-voice',
      id: userlist?.id,
      name: userlist?.attributes?.name,
    });
  }, [setShow, userlist?.id, userlist?.attributes?.name]);

  return (
    <div className="row justify-content-between border-transparent bg-white align-items-center p-2 p-lg-2 p-sm-2 py-4 py-lg-2 rounded mt-3 shadow-1 roles-box cursor-pointer mx-0 flex-wrap border">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-12 col-md-5 col-lg-3   mb-lg-0 mb-3 mb-sm-0">
        <a
          href="/#"
          className="voice-play-btn d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
          onClick={(e) => {
            e.preventDefault();
            handlePlayPause();
          }}
        >
          <img
            src={isPlaying ? '/assets/pause.svg' : '/assets/play-yellow.svg'}
            alt={isPlaying ? 'pause' : 'play'}
          />
        </a>

        <div className="d-flex flex-grow-1" style={{ overflow: 'hidden' }}>
          <a
            href="/#"
            className="text-primary fw-medium"
            onClick={(e) => e.preventDefault()}
            style={{
              textAlign: 'start',
              wordWrap: 'break-word',
            }}
          >
            {userlist?.attributes?.name}
          </a>
        </div>
      </div>

      <audio controls style={{ display: 'none' }} id={`audio-${userlist?.id}`}>
        <track kind="captions" />
        {formik?.values?.voiceURL && <source src={formik?.values?.voiceURL} type="audio/ogg" />}
        Your browser does not support the audio element.
      </audio>

      <div className="col-6 col-md-1 col-lg-1 d-none d-lg-block">
        <a
          href="/"
          role="button"
          data-tooltip-id={`tooltip-${userlist?.id}`}
          className="text-primary fw-normal"
          onClick={(e) => e.preventDefault()}
        >
          <img src="/assets/chat-dots.svg" alt="" />
          <Tooltip
            id={`tooltip-${userlist?.id}`}
            content={userlist?.attributes?.description}
            place="top"
            style={{
              maxWidth: '200px',
              textAlign: 'center',
              wordWrap: 'break-word',
            }}
          />
        </a>
      </div>
      <div className="col-3 col-md-2 col-lg-2 ">
        {userlist?.attributes?.source !== 'url' && (
          <span className="text-primary fw-normal" style={{ width: '90px' }}>
            <span className="pe-1">Size:</span>
            {size}
          </span>
        )}
      </div>
      <div className="col-9 col-md-4 col-lg-3 ">
        <span className="text-primary fw-normal" href="/#">
          <span className="pe-1">Uploaded on:</span>
          {formatDate(userlist?.attributes?.updated_at)}
        </span>
      </div>

      <div className="col-12 col-md-12 col-lg-3  mt-3 mt-lg-0 mt-sm-0">
        <div className="d-flex align-items-center px-lg-2 px-sm-3 justify-content-start justify-content-lg-end gap-3 gap-lg-3 gap-sm-1  py-sm-2">
          <div className="d-flex gap-3 ms-2 ps-3">
            <a
              className="row-action"
              href="/#"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleMoveCategory();
              }}
            >
              <div data-tooltip-id="Move">
                <img src="/assets/swap.svg" alt="" />
                <Tooltip id="Move" content="Move" place="top" />
              </div>
            </a>
            <a
              className="row-action"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                handleEditVoice();
              }}
            >
              <div data-tooltip-id="Modify-file">
                <img src="/assets/edit-voice.svg" alt="" />
                <Tooltip id="Modify-file" content="Modify file" place="top" />
              </div>
            </a>
            <a
              className="row-action"
              data-tooltip-id="Delete"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteVoice();
              }}
            >
              <div>
                <img src="/assets/delete-voice.svg" alt="" />
                <Tooltip id="Delete" content="Delete" place="top" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceUserListRow;
