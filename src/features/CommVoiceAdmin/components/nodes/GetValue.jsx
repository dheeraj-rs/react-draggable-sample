import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../handles/HandleSourceRight';
import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import { getEdges, getNodeDetails, isValueInArray } from '../../../../common/helpers/utils';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import SourceActive from '../SourceActive';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';

function GetValue() {
  const nodeId = useNodeId();
  const {
    activeEdgeId,
    flowNodes,
    selectedNode,
    setSelectedNode,
    flowEdges,
    activeNodesDetails,
    setActiveNodesDetails,
    setActiveEdgeId,
  } = useStore();

  const [nodeDetails, setNodeDetails] = useState();
  const [activeEdges, setActiveEdges] = useState([]);

  const options = [
    { name: 'Get any input', handleName: 'on-input', type: 'flow' },
    { name: 'Not getting any input', handleName: 'no-input', type: 'flow' },
    { name: 'API Response fails ', handleName: 'url-response-fails', type: 'url' },
  ];

  useEffect(() => {
    const nodeDetailsData = getNodeDetails(nodeId, flowNodes);
    if (nodeDetailsData) {
      setNodeDetails(nodeDetailsData);
    }
  }, [flowNodes]);

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
        name={`Get Value ${nodeDetails?.details?.type === 'url' ? '(API)' : ''}`}
        icon="/assets/call-flows-icons/getvalue.svg"
        type="get-value"
        actionType="edit-node"
        headerbg="cool-mint"
        iconbg="light-sky-blue"
        nodeId={nodeId}
        tooltipContent="The Get Value component allows you to take numeric information from the user when they are pressing something on their keypads"
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="get-value"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="get-value"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      <ul className="bg-white" style={{ borderRadius: '10px' }}>
        {options.map((option, index) => {
          const { name } = option;
          if (nodeDetails?.details?.type === 'url') {
            return (
              <li
                key={index}
                className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
                onClick={() => {
                  setSelectedNode({ nodeId, type: option?.handleName, sourceIndex: index });
                }}
              >
                <span className="fs-13px text-primary">{name}</span>

                <SourceActive
                  source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
                  sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
                  type={option?.handleName}
                  activeEdges={activeEdges}
                  nodeId={nodeId}
                />

                <HandleSourceRight
                  source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
                  sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
                  type={option?.handleName}
                  nodeId={nodeId}
                  isVisible={isValueInArray(option?.handleName, activeEdges)}
                />
              </li>
            );
          }
          if (nodeDetails?.details?.type === 'flow' && index < 2) {
            return (
              <li
                key={index}
                className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
                onClick={() => {
                  setSelectedNode({ nodeId, type: option?.handleName, sourceIndex: index });
                }}
              >
                <span className="fs-13px text-primary">{name}</span>

                <SourceActive
                  source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
                  sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
                  type={option?.handleName}
                  activeEdges={activeEdges}
                  nodeId={nodeId}
                />

                <HandleSourceRight
                  source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
                  sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
                  type={option?.handleName}
                  nodeId={nodeId}
                  isVisible={isValueInArray(option?.handleName, activeEdges)}
                />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default GetValue;
