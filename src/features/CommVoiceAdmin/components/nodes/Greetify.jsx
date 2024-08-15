import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../handles/HandleSourceRight';
import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import { getEdges, isValueInArray } from '../../../../common/helpers/utils';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';
import SourceActive from '../SourceActive';

function Greetify() {
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
    <div style={{ width: '248px' }}>
      <div
        className="flow__component__outer flow__radius flow__shadow hours__flow__component flow__border bg-white"
        style={
          activeNodesDetails.sourceId === nodeId || activeNodesDetails.targetId === nodeId
            ? { border: activeBorderStyle, marginTop: '0' }
            : { marginTop: '0', border: '1px solid #c9cedf' }
        }
      >
        <NodeHeader
          name="Greetify"
          icon="/assets/call-flows-icons/greetify.svg"
          type="Greetify"
          actionType="edit-node"
          headerbg="aero-blue"
          iconbg="granny-smith-apple"
          nodeId={nodeId}
          tooltipContent="This component is used to set up the first message that callers listen when they call to your company"
        >
          {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
            <HandleTargetTop
              target={getEdgeDetails(activeEdgeId, flowEdges).target}
              targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
              type="greetify"
              nodeId={nodeId}
              isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
            />
          ) : ( */}
          <HandleTargetLeft
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="greetify"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
          {/* )} */}
        </NodeHeader>
        <ul className="bg-white" style={{ borderRadius: '10px', position: 'inherit' }}>
          <li
            className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items  position-relative dropdown"
            onClick={() => {
              setSelectedNode({ nodeId, type: 'after-play-greeting', sourceIndex: 1 });
            }}
          >
            <HandleSourceRight
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              nodeId={nodeId}
              type="after-play-greeting"
              isVisible={isValueInArray('after-play-greeting', activeEdges)}
            />
            <span className="fs-13px text-primary">After play greetings</span>

            <SourceActive
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              type="after-play-greeting"
              activeEdges={activeEdges}
              nodeId={nodeId}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Greetify;
