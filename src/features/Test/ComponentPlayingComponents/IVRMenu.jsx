/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import useStore from '../store';
import IVRPlaying from './IVRPlaying';

function IVRMenu({
  isVisible = false,
  currentTime = 0,
  duration = 0,
  isVoicePalying = false,
  setIsVoicePalying,
  edges = [],
  nodes = [],
  activeNodeId = '',
  moveToNextNode,
  onPlay,
  stopAudio,
}) {
  const { activeVoiceUrl } = useStore();

  const [waitingForUserResponse, setWaitingForUserResponse] = useState(false);

  const [waitingDuration, setWaitingDuration] = useState(0);

  const [userKeyPressCount, setUserKeyPressCount] = useState({ invalidKey: 0, noInput: 0 });

  const [nodeDetails, setNodeDetails] = useState();

  function numberToWords(number) {
    switch (String(number)) {
      case '0':
        return 'input-zero';
      case '1':
        return 'input-one';
      case '2':
        return 'input-two';
      case '3':
        return 'input-three';
      case '4':
        return 'input-four';
      case '5':
        return 'input-five';
      case '6':
        return 'input-six';
      case '7':
        return 'input-seven';
      case '8':
        return 'input-eight';
      case '9':
        return 'input-nine';
      case '#':
        return 'input-hash';
      case '*':
        return 'input-star';
      default:
        return '';
    }
  }

  const handleKeySelection = (selectedKey) => {
    const key = numberToWords(selectedKey);

    const target = edges.filter(
      (e) => e.source === activeNodeId && e.sourceHandle.split(':')[0] === key
    )[0];
    if (target?.target) {
      // valid key
      stopAudio();
      moveToNextNode(target?.target);
    } else {
      // Invalid key
      const invalidTarget = edges.filter(
        (a) =>
          a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'customer-gives-wrong-input'
      )[0];
      setUserKeyPressCount({ ...userKeyPressCount, invalidKey: userKeyPressCount.invalidKey + 1 });
      setWaitingDuration(0);
      setWaitingForUserResponse(false);
      if (userKeyPressCount.invalidKey >= nodeDetails?.details?.wrongResponseVoiceRepeatCount) {
        stopAudio();
        moveToNextNode(invalidTarget?.target);
      } else {
        onPlay(activeVoiceUrl?.wrongResponseVoice)
          .then(() => {
            onPlay(activeVoiceUrl?.initialVoice).then(() => {
              setWaitingForUserResponse(true);
            });
          })
          .finally(() => {});
      }
    }
  };

  const handleCustomerNotResponded = () => {
    setWaitingDuration(0);
    setWaitingForUserResponse(false);
    const customerNotResponded = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'customer-not-responded'
    )[0];
    stopAudio();
    moveToNextNode(customerNotResponded?.target);
  };

  const handleCustomerGivesWrongInput = () => {
    setWaitingDuration(0);
    setWaitingForUserResponse(false);
    const invalidTarget = edges.filter(
      (a) =>
        a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'customer-gives-wrong-input'
    )[0];
    stopAudio();
    moveToNextNode(invalidTarget?.target);
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

  // Set the details of the active node
  useEffect(() => {
    if (isVisible && activeVoiceUrl?.initialVoice) {
      onPlay(activeVoiceUrl?.initialVoice)
        .then(() => {
          setWaitingForUserResponse(true);
        })
        .finally(() => {
          setIsVoicePalying(false);
        });
    } else {
      setWaitingForUserResponse(false);
      setUserKeyPressCount({ invalidKey: 0, noInput: 0 });
    }
  }, [isVisible, activeVoiceUrl?.initialVoice]);

  useEffect(() => {
    if (nodes.length > 0 && activeNodeId) {
      const result = nodes.filter((e) => e.id === activeNodeId)[0];
      setNodeDetails(result);
    }
  }, [nodes, activeNodeId]);

  useEffect(() => {
    const userResponseTimeout = nodeDetails?.details?.userResponseTimeout;
    const wrongResponseVoiceRepeatCount = nodeDetails?.details?.wrongResponseVoiceRepeatCount;

    const customerNotResponded = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'customer-not-responded'
    )[0];

    if (
      waitingDuration > userResponseTimeout &&
      userKeyPressCount.noInput < wrongResponseVoiceRepeatCount
    ) {
      setUserKeyPressCount({
        ...userKeyPressCount,
        noInput: userKeyPressCount.noInput + 1,
      });
      setWaitingForUserResponse(false);
      setWaitingDuration(0);
      onPlay(activeVoiceUrl?.noResponseVoice).then(() => {
        onPlay(activeVoiceUrl?.initialVoice)
          .then(() => {
            setWaitingForUserResponse(true);
          })
          .finally(() => {
            setIsVoicePalying(false);
          });
      });
    }

    if (userKeyPressCount.noInput >= wrongResponseVoiceRepeatCount) {
      stopAudio();
      moveToNextNode(customerNotResponded?.target);
    }
  }, [waitingForUserResponse, nodeDetails, waitingDuration, userKeyPressCount.noInput]);

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
                handleCustomerNotResponded();
              }}
            >
              Customer not responded <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                handleCustomerGivesWrongInput();
              }}
            >
              Customer gives wrong input <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IVRMenu;
