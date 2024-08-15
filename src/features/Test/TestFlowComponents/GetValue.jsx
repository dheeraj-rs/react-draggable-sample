import React from 'react';
import { useNodeId } from 'reactflow';

import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import useStore from '../store';

function GetValue() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent ${
        nodeId === activeNodeId ? 'active' : ''
      }  `}
      role="button"
      id="getValue"
    >
      <HandleTargetLeft name="getValue" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/call-flows-hours/getValue.svg" alt="" />
      </div>
      <p className="mb-0">Get value</p>
      <HandleSourceRight name="getValue" />
    </div>
  );
}

export default GetValue;
