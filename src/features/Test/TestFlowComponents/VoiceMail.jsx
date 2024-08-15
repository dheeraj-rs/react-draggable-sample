import React from 'react';
import { useNodeId } from 'reactflow';

import HandleTargetLeft from '../../CommVoiceAdmin/components/handles/HandleTargetLeft';
import HandleSourceRight from '../../CommVoiceAdmin/components/handles/HandleSourceRight';
import useStore from '../store';

function VoiceMail() {
  const { activeNodeId } = useStore();
  const nodeId = useNodeId();

  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent ${
        activeNodeId === nodeId ? 'active' : ''
      }  `}
      role="button"
      id="voiceMail"
    >
      <HandleTargetLeft name="voiceMail" />
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/voicemail.svg" alt="" />
      </div>
      <p className="mb-0">Voicemail</p>
      <HandleSourceRight name="hours" />
    </div>
  );
}

export default VoiceMail;
