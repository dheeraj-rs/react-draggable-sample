/* eslint-disable no-unused-vars */
import 'reactflow/dist/style.css';
import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import ReactFlow, { Background, Controls, useReactFlow } from 'reactflow';
import SuccessBadge from '../../../../../common/components/badges/SuccessBadge';
import IncomingCallTest from './IncomingCallTest';
import useFlowStore from '../../../store/store';
import TestNode from './TestNode';
import TestFlowControls from './TestFlowControls';
import TestFlowActions from './TestFlowActions';

const selector = (state) => ({
  onLayout: state.onLayout,
  testNodes: state.testNodes,
  testEdges: state.testEdges,
  activeTest: state.activeTest,
  getNodeTypeById: state.getNodeTypeById,
});

const nodeTypes = {
  start: TestNode,
  incomingCall: TestNode,
  hours: TestNode,
  greetify: TestNode,
  ivrMenu: TestNode,
  connect: TestNode,
  email: TestNode,
  queue: TestNode,
  callBack: TestNode,
  getValue: TestNode,
  goToFlow: TestNode,
  hangUp: TestNode,
  passThru: TestNode,
  sendSMS: TestNode,
  shortcut: TestNode,
  sms: TestNode,
  voiceMail: TestNode,
  callerID: TestNode,
  callerList: TestNode,
};

const proOptions = { hideAttribution: true };

function TestFlowModal({ setShow }) {
  const { fitView } = useReactFlow();
  const [testNodeType, setTestNodeType] = useState('');
  const [view, setView] = useState(<IncomingCallTest />);
  const { testNodes, testEdges, activeTest, getNodeTypeById } = useFlowStore(selector, shallow);

  useEffect(() => {
    fitView();
  }, [testNodes, testEdges]);

  return (
    <div
      className="modal fade"
      id="testFlowModal"
      tabIndex="-1"
      aria-labelledby="testFlow"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
        <div className="modal-content p-2">
          <div className="modal-header border-bottom-0 pb-0 gap-4 flex-wrap">
            <div className="d-flex gap-4 align-items-center flex-wrap">
              <h5 className="modal-title" id="exampleModalLabel">
                Test Flow
              </h5>
              <p className="mb-0">Support_flow 2023</p>
              <p className="mb-0">Flow ID: CL0023</p>

              <SuccessBadge title="Published" />
            </div>
            <div>
              <a href="/#" className="text-secondary">
                <img
                  src="/assets/PencilSimpleLineicon.svg"
                  className="bg-chat-blue rounded p-1 modify-img"
                  alt=""
                />{' '}
                Modify Flow
              </a>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body pt-0">
            <div className="row">
              <div className="col-lg-8 col-sm-8">
                <div className="bg-light-blue2 rounded mt-3 p-3 h-100 w-100">
                  <ReactFlow
                    className=""
                    nodes={testNodes}
                    nodeTypes={nodeTypes}
                    edges={testEdges}
                    proOptions={proOptions}
                  >
                    <Background color="#e9f1fe" />
                    <Controls />
                  </ReactFlow>
                </div>
              </div>

              <div className="col-lg-4 col-sm-4" style={{ minHeight: '40vh' }}>
                <TestFlowControls />
                <TestFlowActions setShow={setShow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestFlowModal;
