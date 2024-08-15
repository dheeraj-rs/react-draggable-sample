import React from 'react';
import { useNodeId } from 'reactflow';

import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';

function GoToFlow() {
  const nodeId = useNodeId();
  const { flowEdges, activeEdgeId, setSelectedNode, flowNodes, activeNodesDetails } = useStore();

  return (
    <div
      className="flow__component__outer flow__radius flow__shadow hours__flow__component flow__border bg-white"
      style={
        activeNodesDetails.sourceId === nodeId || activeNodesDetails.targetId === nodeId
          ? { minWidth: '248px', border: activeBorderStyle }
          : { minWidth: '248px', border: '1px solid #c9cedf' }
      }
      onClick={() => {
        setSelectedNode({ nodeId, type: 'node', sourceIndex: 1 });
      }}
    >
      <div style={{ width: '100%' }}>
        <NodeHeader
          name="Go to flow"
          icon="/assets/call-flows-icons/gotoflow.svg"
          type="go-to-flow"
          actionType="edit-node"
          headerbg="cool-mint"
          iconbg="light-sky-blue"
          nodeId={nodeId}
          tooltipContent="This component helps you to transfer the call to another specified call work flow."
        >
          {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
            <HandleTargetTop
              target={getEdgeDetails(activeEdgeId, flowEdges).target}
              targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
              customTargetType="goto-flow"
              type="go-to-flow"
              nodeId={nodeId}
              isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
            />
          ) : ( */}
          <HandleTargetLeft
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            customTargetType="goto-flow"
            type="go-to-flow"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
          {/* )} */}
        </NodeHeader>
      </div>
    </div>
  );
}

export default GoToFlow;
