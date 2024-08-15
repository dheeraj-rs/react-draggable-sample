/* eslint-disable max-len */
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

function PassThru() {
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
  const [nodeDetails, setNodeDetails] = useState();

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

  useEffect(() => {
    if (nodeId) {
      setNodeDetails(getNodeDetails(nodeId, flowNodes));
    }
  }, [flowNodes, nodeId]);

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
        name={nodeDetails?.details?.async ? 'Passthru (Async) ' : 'Passthru'}
        icon="/assets/call-flows-icons/passthru.svg"
        type="Passthru"
        actionType="edit-node"
        nodeId={nodeId}
        headerbg="cool-mint"
        iconbg="light-sky-blue"
        tooltipContent="The Passthru component allows easy passage of information into an HTTP: link hosted on your end, to provide all the information."
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            customTargetType="passthru"
            type="pass-thru"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          customTargetType="passthru"
          type="pass-thru"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      <ul className="bg-white" style={{ borderRadius: '10px' }}>
        <li
          className={`d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative dropdown ${
            nodeDetails?.details?.async ? 'd-none' : ''
          }`}
          onClick={() => {
            setSelectedNode({ nodeId, type: 'on-success', sourceIndex: 1 });
          }}
        >
          <span className="fs-13px text-primary" data-bs-toggle="dropdown" aria-expanded="false">
            API returns success
          </span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="on-success"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="on-success"
            isVisible={isValueInArray('on-success', activeEdges)}
          />
        </li>
        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
          onClick={() => {
            setSelectedNode({ nodeId, type: 'other', sourceIndex: 2 });
          }}
        >
          <span className="fs-13px text-primary">
            {nodeDetails?.details?.async ? 'After run Passthru' : 'API returns any other values'}
          </span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="other"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="other"
            isVisible={isValueInArray('other', activeEdges)}
          />
        </li>
      </ul>
    </div>
  );
}

export default PassThru;
