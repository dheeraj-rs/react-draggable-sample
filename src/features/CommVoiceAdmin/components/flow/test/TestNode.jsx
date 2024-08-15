import React, { Fragment, useState } from 'react';
import { Handle, Position, useEdges, useNodeId } from 'reactflow';
import { shallow } from 'zustand/shallow';
import useFlowStore from '../../../store/store';

const selector = (state) => ({
  activeTest: state.activeTest,
});

function TestNode({ data }) {
  const { activeTest } = useFlowStore(selector, shallow);
  const edges = useEdges();
  const nodeId = useNodeId();
  const [name] = useState(data?.label);
  return (
    <div
      className={`call-status d-flex gap-3 p-2 bg-white rounded align-items-center border-transparent position-relative ${
        activeTest === nodeId ? 'active' : ''
      }`}
      role="button"
    >
      <div className="bg-light-blue2 p-1 rounded">
        <img src="/assets/PhoneOutgoingIcon.svg" alt="" />
      </div>
      <p className="mb-0">{name}</p>
      {edges.map((edge, index) => (
        <Fragment key={index}>
          {edge.source === nodeId ? (
            <Handle
              key={index}
              className="bg-gray"
              style={{ width: '10px', height: '10px', marginRight: '-7px' }}
              type="source"
              position={Position.Right}
              id={data.sourceHandle}
            />
          ) : null}
          {edge.target === nodeId && (
            <Handle
              key={index}
              className="bg-gray"
              style={{ width: '10px', height: '10px', marginLeft: '-7px' }}
              type="target"
              position={Position.Left}
              id={data.targetHandle}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default TestNode;
