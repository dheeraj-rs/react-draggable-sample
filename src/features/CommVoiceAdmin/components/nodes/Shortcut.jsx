import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../handles/HandleSourceRight';
import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import { getEdges, getNodeDetails, isValueInArray } from '../../../../common/helpers/utils';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';
import SourceActive from '../SourceActive';

function Shortcut() {
  //

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
  //
  const nodeDetails = getNodeDetails(nodeId, flowNodes);
  //
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
        name="Shortcut"
        // name={nodeDetails?.nodeIndex}
        icon="/assets/call-flows-icons/shortcut.svg"
        type="shortcut"
        actionType="edit-node"
        headerbg="cool-mint"
        iconbg="light-sky-blue"
        nodeId={nodeId}
        tooltipContent="The Shortcut component helps you fast and direct connection to a specific feature with a set of input keys."
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="shortcut"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="shortcut"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>

      <ul className="bg-white" style={{ borderRadius: '10px' }}>
        {nodeDetails?.details?.keyList?.map((key, index) => (
          <li
            className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
            key={index}
            onClick={() => {
              setSelectedNode({ nodeId, type: `input-${key}`, sourceIndex: index });
            }}
          >
            <span className="fs-13px text-primary">
              Press Key{' '}
              <span
                className="py-1 px-2 d-inline-block rounded fs-12px text-white ms-2"
                style={{ background: '#8c98a7' }}
              >
                {key}
              </span>
            </span>

            <SourceActive
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              type={`input-${key}`}
              activeEdges={activeEdges}
              nodeId={nodeId}
              keyValue={key}
            />

            <HandleSourceRight
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              nodeId={nodeId}
              type={`input-${key}`}
              isVisible={isValueInArray(`input-${key}`, activeEdges)}
            />
          </li>
        ))}

        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
          onClick={() => {
            setSelectedNode({
              nodeId,
              type: 'wrong-input',
              sourceIndex: parseInt(55, 10),
            });
          }}
        >
          <span className="fs-13px text-primary">Caller gives wrong input</span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="wrong-input"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="wrong-input"
            isVisible={isValueInArray('wrong-input', activeEdges)}
          />
        </li>

        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
          onClick={() => {
            setSelectedNode({
              nodeId,
              type: 'no-input',
              sourceIndex: parseInt(56, 10),
            });
          }}
        >
          <span className="fs-13px text-primary">Caller doesn’t input anything</span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="no-input"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="no-input"
            isVisible={isValueInArray('no-input', activeEdges)}
          />
        </li>
      </ul>
    </div>
  );
}

export default Shortcut;
