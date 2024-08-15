import React from 'react';
import { Handle, Position } from 'reactflow';
import {
  sourceRightStyleInActive,
  sourceRightStyleActive,
} from '../../../TestFlow/data/handleAttributes';

function HandleSourceRight({ source = '', sourceType = '', type, nodeId, isVisible = true }) {
  return (
    <Handle
      className={isVisible ? '' : 'bg-transparent border-0'}
      style={
        sourceType === type && source === nodeId ? sourceRightStyleActive : sourceRightStyleInActive
      }
      type="source"
      position={Position.Right}
      id={`${type}:source:${nodeId}`}
      isConnectable={!isVisible}
    />
  );
}

export default HandleSourceRight;
