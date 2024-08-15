import React from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import useStore from '../store';

function Greetify() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent ${
        activeNodeId === nodeId ? 'active' : ''
      }`}
      role="button"
      id="greetifyId"
    >
      <HandleTargetLeft name="greetify" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/greetify.svg" alt="" />
      </div>
      <p className="mb-0">Greetify</p>
      <HandleSourceRight name="greetify" />
    </div>
  );
}

export default Greetify;
