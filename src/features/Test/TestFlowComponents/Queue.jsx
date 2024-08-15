import React from 'react';
import { useNodeId } from 'reactflow';

import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import useStore from '../store';

function Queue() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent ${
        activeNodeId === nodeId ? 'active' : ''
      }  `}
      role="button"
      id="queue"
    >
      <HandleTargetLeft name="queue" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/queue.svg" alt="" />
      </div>
      <p className="mb-0">Queue</p>
      <HandleSourceRight name="queue" />
    </div>
  );
}

export default Queue;
