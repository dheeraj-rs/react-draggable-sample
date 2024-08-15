import React from 'react';
import { Handle, Position } from 'reactflow';
import {
  targetLeftStyleActive,
  targetLeftStyleInActive,
} from '../../../TestFlow/data/handleAttributes';

function HandleTargetLeft({
  target = '',
  targetType = '',
  customTargetType = '',
  type,
  nodeId,
  isConnectable = true,
}) {
  return (
    <Handle
      className=""
      style={
        (targetType === type || customTargetType === targetType) && target === nodeId
          ? targetLeftStyleActive
          : targetLeftStyleInActive
      }
      type="target"
      position={Position.Left}
      id={`${type}:target:${nodeId}`}
      isConnectable={isConnectable}
    />
  );
}

export default HandleTargetLeft;
