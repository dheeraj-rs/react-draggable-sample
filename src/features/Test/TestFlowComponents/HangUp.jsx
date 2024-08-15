import React from 'react';
import { useNodeId } from 'reactflow';

import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import useStore from '../store';

function HangUp() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent  ${
        activeNodeId === nodeId ? 'active' : ''
      } `}
      role="button"
      id="hangUpId"
    >
      <HandleTargetLeft name="hangup" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/PhoneDisconnect.svg" alt="" />
      </div>
      <p className="mb-0">Hang-up</p>
    </div>
  );
}

export default HangUp;
