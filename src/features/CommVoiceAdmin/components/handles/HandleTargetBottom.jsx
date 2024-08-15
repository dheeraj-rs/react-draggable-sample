import React from 'react';
import { Handle, Position } from 'reactflow';

function HandleTargetBottom({ type, nodeId }) {
  return (
    <Handle
      className="bg-gray"
      style={{ width: '13px', height: '13px', marginBottom: '-7px' }}
      type="target"
      position={Position.Bottom}
      id={`${type}:target:${nodeId}`}
    />
  );
}

export default HandleTargetBottom;
