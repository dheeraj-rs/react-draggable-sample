import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../handles/HandleSourceRight';
import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import { getEdges, isValueInArray } from '../../../../common/helpers/utils';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import SourceActive from '../SourceActive';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';

function Connect() {
  const nodeId = useNodeId();
  const {
    activeEdgeId,
    selectedNode,
    setSelectedNode,
    flowNodes,
    flowEdges,
    activeNodesDetails,
    setActiveNodesDetails,
    setActiveEdgeId,
  } = useStore();

  const [activeEdges, setActiveEdges] = useState([]);

  useEffect(() => {
    if (flowEdges && nodeId) {
      const edgesArray = getEdges(nodeId, flowEdges);
      setActiveEdges(edgesArray);
    }
  }, [flowEdges, nodeId]);

  useEffect(() => {
    if (selectedNode.nodeId === nodeId) {
      const result = activeEdges.filter(
        (edge) => String(edge.sourceHandle.split(':')[0]) === String(selectedNode?.type)
      );

      if (result.length > 0) {
        setActiveNodesDetails({ sourceId: result[0].source, targetId: result[0].target });
        setActiveEdgeId(result[0].id);
      } else {
        setActiveNodesDetails({ sourceId: '', targetId: '' });
        setActiveEdgeId(null);
      }
    }
  }, [selectedNode, activeEdges]);

  const options = [
    { name: 'On call ends', handleName: 'on-call-ends', type: 'on-call-ends' },
    {
      name: 'Agent is/are not available',
      handleName: 'agent-not-available',
      type: 'agent-not-available',
    },
    {
      name: 'Agent is online but no answer',
      handleName: 'agent-not-answered',
      type: 'agent-not-answered',
    },
    { name: 'All agents are busy', handleName: 'agent-busy', type: 'agent-busy' },
    {
      name: 'No response from URL',
      handleName: 'no-response-from-url',
      type: 'no-response-from-url',
    },
  ];
  return (
    <div
      className="flow__component__outer flow__radius flow__shadow hours__flow__component flow__border bg-white"
      style={
        activeNodesDetails.sourceId === nodeId || activeNodesDetails.targetId === nodeId
          ? { minWidth: '248px', border: activeBorderStyle }
          : { minWidth: '248px', border: '1px solid #c9cedf' }
      }
    >
      <NodeHeader
        name="Connect"
        icon="/assets/call-flows-icons/connect-updated.svg"
        type="Connect"
        actionType="edit-node"
        headerbg="cool-mint"
        iconbg="light-sky-blue"
        nodeId={nodeId}
        tooltipContent="The Connect component helps you connect the caller to an agent, department or a specific number."
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="connect"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="connect"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      <ul className="bg-white" style={{ borderRadius: '10px', zIndex: '999999999' }}>
        {options.map((option, index) => (
          <li
            key={index}
            className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
            onClick={() => {
              setSelectedNode({ nodeId, type: option?.type, sourceIndex: index });
            }}
          >
            <span className="fs-13px text-primary">{option.name}</span>

            <SourceActive
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              type={option?.type}
              activeEdges={activeEdges}
              nodeId={nodeId}
            />

            <HandleSourceRight
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              nodeId={nodeId}
              type={option?.type}
              isVisible={isValueInArray(option?.type, activeEdges)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Connect;
