import React from 'react';

function CompletedCalls({
  number,
  name,
  callbackDate,
  performedBy,
  duration,
  statusImg,
  status,
  visibility,
  audioSrc,
  handlePlayStop,
  handlePause,
  handleAudioEnd,
  formatTime,
  isPlaying,
  audioRef,
  audioId,
  itemId,
  audioIndex,
}) {
  return (
    <tr className="vendor-table">
      <td>
        <p className="mb-0">{number}</p>
      </td>
      <td>
        <p className="mb-0 text-primary number-mob">
          {/* {name} */}
          {name ?? '----'}
        </p>
      </td>
      <td>
        <p className="mb-0">
          {/* {callbackDate} */}

          {callbackDate ?? '----'}
        </p>
      </td>
      <td>
        <p className="mb-0">
          {/* {performedBy} */}
          {performedBy ?? '----'}
        </p>
      </td>
      <td>
        <p className="mb-0">
          {/* {duration} */}
          {duration ?? '----'}
        </p>
      </td>
      <td>
        <p className={`mb-0 d-flex gap-2 align-items-center text-${statusImg}`}>
          {' '}
          <span className={`h-1 w-1 rounded bg-${statusImg}`} /> {status}
        </p>
      </td>
      <td>
        <div
          className={`${visibility} d-flex gap-2 align-items-center flex-row card border-0 rounded position-relative`}
        >
          <div className="bg-titan-water d-flex gap-2 align-items-center p-2 rounded">
            <div
              role="button"
              className="d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
              id={itemId}
              onClick={() => {
                handlePlayStop(itemId, audioId);
              }}
            >
              {isPlaying.type === 'stop' && audioIndex === itemId ? (
                <img height="15px" src="/assets/stop-btn.svg" alt="stop" />
              ) : (
                <img height="15px" src="/assets/play-small.svg" alt="play" />
              )}
            </div>
            <div className="d-flex fs-12px" id={itemId}>
              {audioIndex === itemId ? (
                <>
                  <span style={{ maxWidth: '30px' }}>
                    {formatTime(audioRef?.current?.currentTime)}
                  </span>{' '}
                  / <span>{formatTime(audioRef?.current?.duration)}</span>
                </>
              ) : (
                <>
                  <span>0:00</span> / <span>{formatTime(audioRef?.current?.duration)}</span>
                </>
              )}
            </div>

            <div
              className="d-flex fs-12px"
              onClick={() => {
                if (audioIndex === itemId) {
                  handlePause(itemId);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src="/assets/pause-icon.svg" alt="pause" />
            </div>
            <audio id={audioId} ref={audioRef} src={audioSrc} onEnded={handleAudioEnd}>
              <track kind="captions" />
            </audio>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CompletedCalls;
