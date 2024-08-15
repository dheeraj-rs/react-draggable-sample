import React, { useEffect, useState } from 'react';
import IVRPlaying from './IVRPlaying';
import useStore from '../store';

function Callback({
  isVisible = false,
  currentTime = 0,
  duration = 0,
  isVoicePalying = false,
  edges = [],
  nodes = [],
  activeNodeId = '',
  moveToNextNode,
  onPlay,
  stopAudio,
}) {
  const { activeVoiceUrl } = useStore();
  const options = [
    { title: 'Callback accepted', type: 'callback-accepted' },
    { title: 'Callback failed', type: 'callback-declined' },
  ];

  const [waitingForUserResponse, setWaitingForUserResponse] = useState(false);

  const [waitingDuration, setWaitingDuration] = useState(0);

  const [nodeDetails, setNodeDetails] = useState();

  const handleCallbackAction = (type) => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === type
    )[0];

    if (type === 'callback-accepted') {
      onPlay(activeVoiceUrl?.confirmationVoice).finally(() => {
        stopAudio();
        moveToNextNode(result?.target);
      });
    } else if (type === 'callback-declined') {
      onPlay(activeVoiceUrl?.declineVoice).finally(() => {
        stopAudio();
        moveToNextNode(result?.target);
      });
    } else if (type === 'timeout') {
      const data = edges.filter(
        (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'callback-declined'
      )[0];
      stopAudio();
      moveToNextNode(data?.target);
    }
  };

  useEffect(() => {
    let interval;

    if (waitingForUserResponse && isVisible) {
      interval = setInterval(() => {
        setWaitingDuration((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [waitingForUserResponse, isVisible]);

  useEffect(() => {
    if (isVisible && activeVoiceUrl?.initialVoice) {
      onPlay(activeVoiceUrl?.initialVoice).finally(() => {
        setWaitingForUserResponse(true);
      });
    }
  }, [isVisible, activeVoiceUrl?.initialVoice]);

  useEffect(() => {
    if (isVisible && waitingDuration > nodeDetails?.details?.userResponseTimeout) {
      setWaitingDuration(0);
      setWaitingForUserResponse(false);
      onPlay(activeVoiceUrl?.timeoutVoice).finally(() => {
        handleCallbackAction('timeout');
      });
    }
  }, [waitingDuration, nodeDetails]);

  useEffect(() => {
    if (nodes.length > 0 && activeNodeId) {
      const result = nodes.filter((e) => e.id === activeNodeId)[0];
      setNodeDetails(result);
    }
  }, [nodes, activeNodeId]);

  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="callHours"
    >
      <div className="choose-agent px-3 mt-4">
        <div className="d-flex flex-column gap-2 pt-4">
          <IVRPlaying
            isVoicePalying={isVoicePalying}
            currentTime={currentTime}
            duration={duration}
          />
          {options?.map((option, index) => (
            <a
              key={index}
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                handleCallbackAction(option.type);
              }}
            >
              {option?.title} <img src="/assets/next-filled.svg" alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Callback;
