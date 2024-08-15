import React from 'react';
import { Handle, Position } from 'reactflow';

function HandleTargetRight({ type, nodeId }) {
  return (
    <Handle
      className="bg-gray"
      style={{ width: '13px', height: '13px', marginLeft: '-7px' }}
      type="target"
      position={Position.Right}
      id={`${type}:target:${nodeId}`}
    />
  );
}

export default HandleTargetRight;
