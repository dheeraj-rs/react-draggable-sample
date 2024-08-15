import React, { useEffect, useState } from 'react';
import useStore from '../store';
import IVRPlaying from './IVRPlaying';

function GetValue({
  isVisible,
  currentTime,
  duration,
  isVoicePalying = false,
  nodes = [],
  edges = [],
  moveToNextNode,
  onPlay,
  stopAudio,
}) {
  const { activeNodeId, activeVoiceUrl } = useStore();

  const [nodeDetails, setNodeDetails] = useState();

  const [totalInactiveTime, setTotalInactiveTime] = useState(0);
  const [waitingForUserResponse, setWaitingForUserResponse] = useState(false);
  const [key, setKey] = useState('');
  const [noInputGivenUserCount, setNoInputGivenUserCount] = useState(0);

  const getAnyInput = () => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'on-input'
    )[0];
    stopAudio();
    moveToNextNode(result?.target);
  };

  const apiResponseFails = () => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'url-response-fails'
    )[0];
    stopAudio();
    moveToNextNode(result?.target);
  };

  const notGettingAnyInput = () => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'no-input'
    )[0];
    stopAudio();
    moveToNextNode(result?.target);
  };

  const handleKeySelection = (selectedKey) => {
    if (selectedKey !== nodeDetails?.details?.completionKey) {
      if (key.length < nodeDetails?.details?.maxDigitsAllowed) {
        setTotalInactiveTime(0);
        setKey((preVal) => preVal + selectedKey);
        setWaitingForUserResponse(true);
      }
    } else {
      getAnyInput();
    }
  };
  useEffect(() => {
    let interval;

    if (waitingForUserResponse && isVisible) {
      interval = setInterval(() => {
        setTotalInactiveTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [waitingForUserResponse, isVisible]);

  useEffect(() => {
    if (nodes.length > 0 && activeNodeId) {
      const result = nodes.filter((e) => e.id === activeNodeId)[0];
      setNodeDetails(result);
    }
  }, [nodes, activeNodeId]);

  useEffect(() => {
    if (isVisible && activeVoiceUrl?.initialVoice && nodeDetails?.details?.type === 'flow') {
      setTotalInactiveTime(0);
      setKey('');
      setNoInputGivenUserCount(0);
      onPlay(activeVoiceUrl?.initialVoice).then(() => {
        setWaitingForUserResponse(true);
      });
    } else {
      setWaitingForUserResponse(false);
      setTotalInactiveTime(0);
    }
  }, [isVisible, activeVoiceUrl?.voice, nodeDetails?.details?.type]);

  useEffect(() => {
    if (totalInactiveTime > nodeDetails?.details?.userResponseTimeout) {
      setWaitingForUserResponse(false);
      setTotalInactiveTime(0);
      onPlay(activeVoiceUrl?.noResponseVoice).then(() => {
        setWaitingForUserResponse(false);
      });
    } else if (totalInactiveTime > nodeDetails?.details?.timeInterval) {
      setWaitingForUserResponse(false);
      setTotalInactiveTime(0);
      onPlay(activeVoiceUrl?.timeIntervalVoice).then(() => {
        onPlay(activeVoiceUrl?.initialVoice).then(() => {
          setWaitingForUserResponse(true);
          setNoInputGivenUserCount((preValue) => preValue + 1);
        });
      });
    }
  }, [totalInactiveTime, nodeDetails]);

  useEffect(() => {
    if (noInputGivenUserCount >= nodeDetails?.details?.repeatCount) {
      setWaitingForUserResponse(false);
      setTotalInactiveTime(0);
      onPlay(activeVoiceUrl?.repeatVoice).then(() => {
        setWaitingForUserResponse(false);
        notGettingAnyInput();
      });
    }
  }, [nodeDetails?.details?.repeatCount, noInputGivenUserCount]);

  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="ivrMenu"
    >
      <div className="choose-agent px-3 mt-4 pt-2">
        <div className={nodeDetails?.details?.type === 'url' ? 'd-none' : ''}>
          <IVRPlaying
            isVoicePalying={isVoicePalying}
            currentTime={currentTime}
            duration={duration}
          />
        </div>
        <div className="choose-ivr mt-4 ">
          <h6 className={`mb-2  ${nodeDetails?.details?.type === 'url' ? 'd-none' : ''}`}>
            Choose option based on the IVR
          </h6>

          <div
            className={`shadow-11 rounded p-4 mb-4 ${
              nodeDetails?.details?.type === 'url' ? 'd-none' : ''
            }`}
          >
            <div className="d-flex gap-3 justify-content-center">
              {[1, 2, 3]?.map((e) => (
                <button
                  type="button"
                  className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                  key={e}
                  onClick={() => {
                    handleKeySelection(e);
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="d-flex gap-3 justify-content-center">
              {[4, 5, 6]?.map((e) => (
                <button
                  type="button"
                  className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                  key={e}
                  onClick={() => {
                    handleKeySelection(e);
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="d-flex gap-3 justify-content-center">
              {[7, 8, 9]?.map((e) => (
                <button
                  type="button"
                  className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                  key={e}
                  onClick={() => {
                    handleKeySelection(e);
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="d-flex gap-3 justify-content-center">
              {['*', 0, '#']?.map((e) => (
                <button
                  type="button"
                  className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                  key={e}
                  onClick={() => {
                    handleKeySelection(e);
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="ivr-btns d-flex gap-2 flex-column pt-2 pb-2">
            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                getAnyInput();
              }}
            >
              Get any input <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>

          <div className="ivr-btns d-flex gap-2 flex-column pt-2 pb-2">
            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                notGettingAnyInput();
              }}
            >
              Not getting any input <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>

          <div className="ivr-btns d-flex gap-2 flex-column pt-2 pb-2">
            <a
              href="/#"
              role="button"
              type="btn"
              className={`text-secondary px-4 border-transparent d-flex justify-content-between align-items-center ${
                nodeDetails?.details?.type === 'url' ? '' : 'd-none'
              } `}
              onClick={(e) => {
                e.preventDefault();
                apiResponseFails();
              }}
            >
              API Response fails <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetValue;
