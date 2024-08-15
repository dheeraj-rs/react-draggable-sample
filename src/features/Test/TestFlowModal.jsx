import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background, ReactFlowProvider } from 'reactflow';

import IncomingCall from './TestFlowComponents/IncomingCall';

import Greetify from './TestFlowComponents/Greetify';
import IVRMenu from './TestFlowComponents/IVRMenu';
import Connect from './TestFlowComponents/Connect';

import Hours from './TestFlowComponents/Hours';
import VoiceMail from './TestFlowComponents/VoiceMail';
import Email from './TestFlowComponents/Email';

import CallerID from './TestFlowComponents/CallerID';
import CallerList from './TestFlowComponents/CallerList';
import Shortcut from './TestFlowComponents/Shortcut';

import GetValue from './TestFlowComponents/GetValue';
import Passthru from './TestFlowComponents/Passthru';
import Sms from './TestFlowComponents/Sms';

import SendSMS from './TestFlowComponents/SendSMS';
import Queue from './TestFlowComponents/Queue';
import HangUp from './TestFlowComponents/HangUp';

import GoToFlow from './TestFlowComponents/GoToFlow';
import Callback from './TestFlowComponents/Callback';

import SuccessBadge from '../../common/components/badges/SuccessBadge';
import ComponentPlaying from './TestFlowComponents/ComponentPlaying';

import useStore from './store';

function TestFlowModal({
  isVisible,
  name,
  id,
  onClose,
  callFlowDetails,
  edges,
  nodes,
  isPublished,
}) {
  const {
    setComponentPlayingDetails,
    setActiveNodeId,
    activeNodeType,
    setActiveNodeType,
    addToActiveNode,
    resetActiveNode,
    setActiveVoiceUrl,
    setActiveNodes,
  } = useStore();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [edgesList, setEdgesList] = useState();
  const [nodeList, setNodeList] = useState([
    {
      x: 177,
      y: 23.5,
      id: 'incomingCall',
      data: {
        label: 'Incoming Call',
      },
      rank: 0,
      type: 'incomingCall',
      width: 300,
      height: 47,
      position: {
        x: 0,
        y: 0,
      },
      draggable: true,
    },
  ]);

  const nodeTypes = useMemo(
    () => ({
      incomingCall: IncomingCall,

      greetify: Greetify,
      'ivr-menu': IVRMenu,
      connect: Connect,

      hours: Hours,
      'voice-mail': VoiceMail,
      email: Email,

      'caller-id': CallerID,
      'caller-list': CallerList,
      shortcut: Shortcut,

      'get-value': GetValue,
      'pass-through': Passthru,
      sms: Sms,

      'send-sms': SendSMS,
      queue: Queue,
      'hang-up': HangUp,

      'go-to-flow': GoToFlow,
      callback: Callback,
    }),
    []
  );

  const handleStart = async () => {
    setEdgesList(edges);
    setNodeList(nodes);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setActiveNodes([]);
    setIsRunning(false);
    setTime(0);
    resetActiveNode();
    setComponentPlayingDetails({});
    setActiveNodeId('incomingCall');
    setActiveNodeType('incomingCall');
    setActiveVoiceUrl('');
    setEdgesList([]);
    setNodeList([
      {
        x: 177,
        y: 23.5,
        id: 'incomingCall',
        data: {
          label: 'Incoming Call',
        },
        rank: 0,
        type: 'incomingCall',
        width: 300,
        height: 47,
        position: {
          x: 0,
          y: 0,
        },
        draggable: true,
      },
    ]);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const onNodeDragStop = (event, node) => {
    // console.clear();

    const updatedNodes = nodeList.map((n) => {
      if (n.id === node.id) {
        if (node.position.x !== n.position.x || node.position.y !== n.position.y) {
          // Node has been dragged, perform your actions here
        }
        return {
          ...n,
          position: { x: node.position.x, y: node.position.y },
        };
      }
      return n;
    });
    setNodeList(updatedNodes);
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    // To get the first node
    if (time === 1) {
      const starter = callFlowDetails?.attributes?.flow?.actions[1]?.type;
      const starterId = callFlowDetails?.attributes?.flow?.actions[1]?.id;

      if (starter) {
        setActiveNodeType(starter);
        addToActiveNode(starterId);
        setActiveNodeId(starterId);
      }

      setComponentPlayingDetails({
        parentType: starter,
        parentId: starterId,
      });
    }
  }, [time]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="testFlowModalHeader"
          tabIndex="-1"
          aria-labelledby="testFlow"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0 pb-0 gap-4 flex-wrap">
                <div className="d-flex gap-4 align-items-center flex-wrap">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Test Flow
                  </h5>
                  <p className="mb-0">{name}</p>
                  <p className="mb-0">Flow ID: {id}</p>

                  {isPublished && <SuccessBadge title="Published" />}
                </div>
                <div>
                  <a
                    href="/#"
                    className="text-secondary d-none"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img
                      src="/assets/PencilSimpleLineicon.svg"
                      className="bg-chat-blue rounded p-1 modify-img"
                      alt=""
                    />
                    Modify Flow
                  </a>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                />
              </div>
              <div className="modal-body pt-0">
                <div className="row">
                  <div className="col-lg-8 col-sm-8">
                    <div
                      className="bg-light-blue2 rounded mt-3 p-3 call-status-wrap d-flex align-items-center gap-3"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <div
                        className="call-status-scroll d-flex gap-3"
                        style={{ width: '100%', height: '100%' }}
                      >
                        <ReactFlowProvider>
                          <ReactFlow
                            nodes={nodeList}
                            nodeTypes={nodeTypes}
                            edges={edgesList}
                            onNodeDragStop={onNodeDragStop}
                          >
                            <Background color="#e9f1fe" />
                          </ReactFlow>
                        </ReactFlowProvider>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-sm-4">
                    <ComponentPlaying
                      activeNodeType={activeNodeType}
                      time={time}
                      handleStart={handleStart}
                      handleStop={handleStop}
                      handleReset={handleReset}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
  return null;
}

export default TestFlowModal;
