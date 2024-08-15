import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import { getNodeDetails } from '../../../../common/helpers/utils';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';

function HangUp() {
  const nodeId = useNodeId();

  const [nodeDetails, setNodeDetails] = useState();
  const { activeEdgeId, setSelectedNode, flowNodes, flowEdges, activeNodesDetails } = useStore();

  useEffect(() => {
    setNodeDetails(getNodeDetails(nodeId, flowNodes)?.details);
  }, [flowNodes, nodeId]);

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
      <NodeHeader
        name="Hang-Up"
        icon="/assets/call-flows-icons/hangup.svg"
        type="hang-up"
        actionType="edit-node"
        feedbackRequired={nodeDetails?.feedbackRequired}
        nodeId={nodeId}
        headerbg="misty-ros"
        iconbg="Light-Salmon-Pink"
        tooltipContent="This component terminate a call or with a feedback at the end."
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="hang-up"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="hang-up"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      {nodeDetails?.feedbackRequired === true ? (
        <ul>
          {nodeDetails?.feedbackType === 'sms' ? (
            <li className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items dropdown">
              <span className="fs-13px text-primary">Sms feedback</span>
            </li>
          ) : (
            <li className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items dropdown">
              <span className="fs-13px text-primary">IVR feedback</span>
            </li>
          )}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}

export default HangUp;
