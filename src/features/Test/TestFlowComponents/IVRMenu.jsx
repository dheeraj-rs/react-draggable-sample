import React from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import useStore from '../store';

function IVRMenu() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent  ${
        activeNodeId === nodeId ? 'active' : ' '
      }`}
      role="button"
      id="ivrMenuId"
    >
      <HandleTargetLeft name="ivr-menu" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/greetify.svg" alt="" />
      </div>
      <p className="mb-0">IVR Menu</p>
      <HandleSourceRight name="ivr-menu" />
    </div>
  );
}

export default IVRMenu;
