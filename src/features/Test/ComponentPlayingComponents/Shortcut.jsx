import React, { useEffect, useState } from 'react';
import useStore from '../store';

function Shortcut({ isVisible, nodes = [], edges = [], moveToNextNode }) {
  const { activeNodeId } = useStore();

  const [nodeDetails, setNodeDetails] = useState();

  const [waitingDuration, setWaitingDuration] = useState(0);
  const [key, setKey] = useState('');
  const [waitingForUserKeyPress, setWaitingForUserKeyPress] = useState({
    state: false,
    duration: 0,
  });

  const handleKeySelection = (selectedKey) => {
    setKey((preVal) => preVal + selectedKey);
    setWaitingForUserKeyPress({
      state: true,
      duration: 0,
    });
  };

  const handleCallerGivesWrongInput = () => {
    const wrongInput = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'wrong-input'
    )[0];

    setWaitingDuration(0);
    moveToNextNode(wrongInput?.target);
  };

  const handleCallerDoesntinputAnything = () => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === 'no-input'
    )[0];
    setWaitingDuration(0);
    moveToNextNode(result?.target);
  };

  const handleShortcut = () => {
    if (key) {
      const result = edges.filter(
        (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === `input-${key}`
      )[0];

      if (result) {
        setWaitingDuration(0);
        moveToNextNode(result?.target);
      }
      handleCallerGivesWrongInput();
    }
  };

  useEffect(() => {
    let interval;

    if (isVisible) {
      interval = setInterval(() => {
        setWaitingDuration((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isVisible]);

  useEffect(() => {
    let interval;

    if (waitingForUserKeyPress.state && isVisible) {
      interval = setInterval(() => {
        setWaitingForUserKeyPress((prevState) => ({
          ...prevState,
          duration: prevState.duration + 1,
        }));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [waitingForUserKeyPress.state, isVisible]);

  useEffect(() => {
    if (waitingForUserKeyPress.duration > 0) {
      setWaitingForUserKeyPress({ state: false, duration: 0 });
      handleShortcut();
    }
  }, [key, waitingForUserKeyPress.duration]);

  useEffect(() => {
    if (nodes.length > 0 && activeNodeId) {
      const result = nodes.filter((e) => e.id === activeNodeId)[0];
      setNodeDetails(result);
    }
  }, [nodes, activeNodeId]);

  useEffect(() => {
    if (waitingDuration > nodeDetails?.details?.timeout) {
      handleCallerDoesntinputAnything();
    }
  }, [waitingDuration, nodeDetails?.details?.timeout]);

  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="shortcut"
    >
      <div className="choose-agent px-3 mt-4 pb-4">
        <div className="choose-ivr mt-4">
          <h6 className="mb-2">Choose option</h6>

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
                handleCallerGivesWrongInput();
              }}
            >
              Caller gives wrong input <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                handleCallerDoesntinputAnything();
              }}
            >
              Caller doesn’t input anything <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shortcut;
