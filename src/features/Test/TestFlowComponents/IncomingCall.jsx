import React from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import useStore from '../store';

function IncomingCall() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent ${
        activeNodeId === nodeId ? 'active' : ''
      }`}
      id="incomingCallID"
      role="button"
    >
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/PhoneOutgoingIcon.svg" alt="" />
      </div>
      <p className="mb-0">Incoming call</p>
      <HandleSourceRight name="incomingCall" />
    </div>
  );
}

export default IncomingCall;
