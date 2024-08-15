import React from 'react';
import AddNodeSelected from './AddNodeSelected';
import { isValueInArray } from '../../../common/helpers/utils';
import AddNodeActive from './AddNodeActive';
import AddNode from './AddNode';

function SourceActive({
  isIVR = false,
  source = '',
  sourceType = '',
  type = '',
  activeEdges = [],
  nodeId = '',
  keyValue = '',
}) {
  if (sourceType === type && source === nodeId) {
    return <AddNodeSelected />;
  }
  if (isValueInArray(type, activeEdges)) {
    return <AddNodeActive />;
  }
  return (
    <AddNode
      nodeId={nodeId}
      handleId={`${nodeId}-${type}`}
      type={type}
      isIVR={isIVR}
      keyValue={keyValue}
    />
  );
}

export default SourceActive;
