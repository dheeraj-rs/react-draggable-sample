import React from 'react';
import { Handle, Position } from 'reactflow';

function HandleTargetTop({
  target = '',
  targetType = '',
  customTargetType = '',
  type,
  nodeId,
  isConnectable = true,
}) {
  const styleInActive = {
    width: '13px',
    height: '13px',
    marginRight: '-7px',
    backgroundColor: '#828FB2',
  };
  const styleActive = {
    width: '13px',
    height: '13px',
    marginRight: '-7px',
    backgroundColor: '#0879FF',
  };

  return (
    <Handle
      className=""
      style={
        (targetType === type || customTargetType === targetType) && target === nodeId
          ? styleActive
          : styleInActive
      }
      type="target"
      position={Position.Top}
      id={`${type}:target:${nodeId}`}
      isConnectable={isConnectable}
    />
  );
}

export default HandleTargetTop;
