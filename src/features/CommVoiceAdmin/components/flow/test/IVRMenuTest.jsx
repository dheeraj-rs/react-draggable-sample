import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import useFlowStore from '../../../store/store';

const selector = (state) => ({
  testEdges: state.testEdges,
  testNodes: state.testNodes,
  activeTest: state.activeTest,
  setActiveTest: state.setActiveTest,
});

function IVRMenuTest() {
  const { setActiveTest, activeTest, testEdges } = useFlowStore(selector, shallow);
  const [handles, setHandles] = useState([]);
  useEffect(() => {
    testEdges.forEach((item) => {
      if (item.source === activeTest) {
        setHandles([...handles, item]);
      }
    });
  }, []);
  return (
    <div className="mt-3 shadow-11 rounded call-playing" id="ivrMenu">
      <div className="choose-agent px-3 mt-4 pb-4">
        <div className="shadow-11 rounded p-3 px-4">
          <h6>IVR Playing...</h6>
          <div className="d-flex gap-2 w-100 align-items-center flex-row card position-relative mt-2 border-transparent">
            <div
              role="button"
              className="play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
            >
              <img height="15px" src="/assets/play-btn-black.svg" alt="play" />
              <img
                height="15px"
                src="/assets/stop-btn.svg"
                alt="stop"
                style={{ display: 'none' }}
              />
            </div>
            <div className="d-flex">
              <span>0:00</span> / <span>0:00</span>
            </div>
            <div
              className="card-progress d-flex rounded-2 overflow-hidden"
              style={{ width: '50%' }}
            >
              <div
                className="card-progress-bar bg-blue-active rounded-2 h-1"
                role="progressbar"
                style={{ width: '50%' }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>

        <div className="choose-ivr mt-4">
          <h6 className="mb-2">Choose option based on the IVR</h6>

          <div className="shadow-11 rounded p-4 mb-4">
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-1')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                1
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-2')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                2
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-3')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                3
              </button>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-4')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                4
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-5')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                5
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-6')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                6
              </button>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-7')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                7
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-8')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                8
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
                onClick={() => {
                  handles.forEach((item) => {
                    if (item.sourceHandle.startsWith('input-9')) {
                      setActiveTest(item.target);
                    }
                  });
                }}
              >
                9
              </button>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
              >
                *
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
              >
                0
              </button>
              <button
                type="button"
                className="btn bg-cyan-blue btn-call-click rounded-circle text-primary"
              >
                #
              </button>
            </div>
          </div>
          <div className="ivr-btns d-flex gap-2 flex-column">
            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              Customer not responded <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              Customer gives wrong input <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IVRMenuTest;
