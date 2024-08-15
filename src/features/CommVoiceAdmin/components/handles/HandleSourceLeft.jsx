import React from 'react';
import { Handle, Position } from 'reactflow';

function HandleSourceLeft({ type, nodeId }) {
  return (
    <Handle
      className="bg-gray"
      style={{ width: '13px', height: '13px', marginRight: '-7px' }}
      type="source"
      position={Position.Left}
      id={`${type}:source:${nodeId}`}
    />
  );
}

export default HandleSourceLeft;
