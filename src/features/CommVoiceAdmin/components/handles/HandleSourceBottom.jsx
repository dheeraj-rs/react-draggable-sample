import React from 'react';
import { Handle, Position } from 'reactflow';

function HandleSourceBottom({ type, nodeId, isConnectable = true }) {
  return (
    <Handle
      className="bg-gray"
      style={{ width: '0px', height: '0px', marginBottom: '0' }}
      type="source"
      position={Position.Bottom}
      id={`${type}:source:${nodeId}`}
      isConnectable={isConnectable}
    />
  );
}

export default HandleSourceBottom;
