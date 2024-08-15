import React from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import useStore from '../store';

function Connect() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();
  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent  ${
        activeNodeId === nodeId ? 'active' : ''
      }`}
      role="button"
      id="connectCallId"
    >
      <HandleTargetLeft name="connect" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/PhoneConnect.svg" alt="" />
      </div>
      <p className="mb-0">Connect</p>
      <HandleSourceRight name="connect" />
    </div>
  );
}

export default Connect;
