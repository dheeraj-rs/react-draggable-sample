/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useReactFlow } from 'reactflow';
import useFlowStore from '../../../store/store';

const selector = (state) => ({
  testEdges: state.testEdges,
  testNodes: state.testNodes,
  activeTest: state.activeTest,
  setActiveTest: state.setActiveTest,
  getNodeTypeById: state.getNodeTypeById,
});

function TestFlowControls() {
  const { fitView } = useReactFlow();
  const { setActiveTest, getNodeTypeById, activeTest, testNodes, testEdges } = useFlowStore(
    selector,
    shallow
  );
  const [testing, setTesting] = useState(false);
  const types = ['connect', 'greetify', 'hours', 'ivrMenu', 'hangUp'];

  useEffect(() => {
    setActiveTest('');
  }, []);

  useEffect(() => {
    if (testing === false) {
      return;
    }
    if (types.includes(getNodeTypeById(activeTest))) {
      //
    }
    testEdges.forEach((item) => {
      if (item.source === activeTest) {
        setTimeout(() => {
          setActiveTest(item.target);
        }, 3000);
      } else {
        //
      }
    });
  }, [activeTest]);

  return (
    <div className="shadow-11 rounded p-3 d-flex gap-4 justify-content-between mt-5 mt-sm-3">
      <p
        className={`mb-0 d-flex gap-2 align-items-center ${
          testing ? 'opacity-75' : 'cursor-pointer'
        }`}
        onClick={() => {
          setTesting(true);
          setActiveTest('incomingCall');
          fitView({
            nodes: {
              id: ['incomingCall'],
            },
          });
        }}
      >
        <img src="/assets/start-button.svg" alt="" /> Start
      </p>
      <p
        className={`mb-0 d-flex gap-2 align-items-center ${
          testing ? 'cursor-pointer' : 'opacity-75'
        }`}
        onClick={() => {
          setTesting(false);
          setActiveTest('');
        }}
      >
        <img src="/assets/stop-button.svg" alt="" /> Stop
      </p>
      <p
        className={`mb-0 d-flex gap-2 align-items-center ${
          testing ? 'cursor-pointer' : 'opacity-75'
        }`}
        onClick={() => {
          setTesting(true);
          setActiveTest('incomingCall');
        }}
      >
        <img src="/assets/reastat-button.svg" alt="" /> Restart
      </p>
    </div>
  );
}

export default TestFlowControls;
