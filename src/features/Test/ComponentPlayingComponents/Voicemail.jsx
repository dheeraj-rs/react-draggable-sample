import React, { useEffect, useState } from 'react';
import useStore from '../store';
import IVRPlaying from './IVRPlaying';

function Voicemail({
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

  const [voiceDuration, setVoiceDuration] = useState(0);
  const [waitingForUserResponse, setWaitingForUserResponse] = useState(false);

  const handleAfterVoicemailEnds = () => {
    const voicemailEnds = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'voicemail-ends'
    )[0];
    stopAudio();
    moveToNextNode(voicemailEnds?.target);
  };

  const handleKeySelection = (selectedKey) => {
    const isValidKey = nodeDetails?.details?.endKey === selectedKey;
    if (isValidKey) {
      const voicemailEnds = edges.filter(
        (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'voicemail-ends'
      )[0];
      stopAudio();
      moveToNextNode(voicemailEnds?.target);
    }
  };

  useEffect(() => {
    let interval;

    if (waitingForUserResponse && isVisible) {
      interval = setInterval(() => {
        setVoiceDuration((prevTime) => prevTime + 1);
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
    if (isVisible && activeVoiceUrl?.voice) {
      onPlay(activeVoiceUrl?.voice).then(() => {
        setWaitingForUserResponse(true);
      });
    } else {
      setWaitingForUserResponse(false);
      setVoiceDuration(0);
    }
  }, [isVisible, activeVoiceUrl?.voice]);

  useEffect(() => {
    if (voiceDuration > nodeDetails?.details?.duration) {
      handleAfterVoicemailEnds();
    }
  }, [voiceDuration, nodeDetails]);
  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="ivrMenu"
    >
      <div className="choose-agent px-3 mt-4 pb-4">
        <IVRPlaying isVoicePalying={isVoicePalying} currentTime={currentTime} duration={duration} />

        <div className="choose-ivr mt-4">
          <h6 className="mb-2">Choose option based on the IVR</h6>

          <div className="shadow-11 rounded p-4 mb-4">
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
          <div className="ivr-btns d-flex gap-2 flex-column">
            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                handleAfterVoicemailEnds();
              }}
            >
              After voicemail ends <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voicemail;
