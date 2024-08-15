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

function Hours() {
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
        name="Hours"
        icon="/assets/call-flows-hours/phone.svg"
        type="hours"
        actionType="edit-node"
        nodeId={nodeId}
        headerbg="dutch-white"
        iconbg="golden-ochre"
        tooltipContent="This component is used to control your call flow based on the Agent Working Hours and non Agent Working Hours."
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="hours"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="hours"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      <ul className="bg-white" style={{ borderRadius: '10px', position: 'inherit' }}>
        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items dropdown position-relative"
          onClick={() => {
            setSelectedNode({ nodeId, type: 'working-hours', sourceIndex: 1 });
          }}
        >
          <span className="fs-13px text-primary" data-bs-toggle="dropdown" aria-expanded="false">
            On Agent Working Hours
          </span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="working-hours"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="working-hours"
            isVisible={isValueInArray('working-hours', activeEdges)}
          />
        </li>
        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
          onClick={() => {
            setSelectedNode({ nodeId, type: 'non-working-hours', sourceIndex: 2 });
          }}
        >
          <span className="fs-13px text-primary">On Agent Non-Working Hours</span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="non-working-hours"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="non-working-hours"
            isVisible={isValueInArray('non-working-hours', activeEdges)}
          />
        </li>
      </ul>
    </div>
  );
}

export default Hours;
