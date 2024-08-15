import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import useStore from '../../../Test/store';

import HandleSourceRight from '../handles/HandleSourceRight';
import NodeHeader from '../NodeHeader';
import HandleTargetBottom from '../handles/HandleTargetBottom';
import { getEdges, getNodeDetails, isValueInArray } from '../../../../common/helpers/utils';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import SourceActive from '../SourceActive';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';

function IVRMenu() {
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
  const nodeId = useNodeId();

  const [nodeDetails, setNodeDetails] = useState();
  const [nodeName, setNodeName] = useState('');
  const [activeEdges, setActiveEdges] = useState([]);

  function numberToWords(number) {
    switch (number) {
      case '0':
        return 'zero';
      case '1':
        return 'one';
      case '2':
        return 'two';
      case '3':
        return 'three';
      case '4':
        return 'four';
      case '5':
        return 'five';
      case '6':
        return 'six';
      case '7':
        return 'seven';
      case '8':
        return 'eight';
      case '9':
        return 'nine';
      case '#':
        return 'hash';
      case '*':
        return 'star';
      default:
        return '';
    }
  }

  useEffect(() => {
    const nodeDetailsData = getNodeDetails(nodeId, flowNodes);

    if (nodeDetailsData) {
      setNodeDetails(nodeDetailsData);
      setNodeName(nodeDetailsData?.name);
    }
  }, [flowNodes, nodeId]);

  useEffect(() => {
    const edgesArray = getEdges(nodeId, flowEdges);

    setActiveEdges(edgesArray);
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
        name={nodeName}
        icon="/assets/call-flows-icons/ivr.svg"
        type="IVR menu"
        actionType="edit-node"
        headerbg="cool-mint"
        iconbg="light-sky-blue"
        nodeId={nodeId}
        tooltipContent='An IVR menu provides interactive options and ask the users to "respond" and hence making the decision'
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="ivr-menu"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="ivr-menu"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      <ul className="bg-white" style={{ borderRadius: '10px', position: 'inherit', zIndex: '1' }}>
        {nodeDetails?.details?.keys.map((number, index) => (
          <li
            key={index}
            className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
            onClick={() => {
              setSelectedNode({
                nodeId,
                type: `input-${numberToWords(number)}`,
                sourceIndex: index,
              });
            }}
          >
            <span
              className="fs-13px text-primary"
              // data-bs-toggle="dropdown"
              //  aria-expanded="false"
            >
              Press Key <span className="presskry-number">{number}</span>
            </span>

            <SourceActive
              isIVR
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              type={`input-${numberToWords(number)}`}
              activeEdges={activeEdges}
              nodeId={nodeId}
            />

            <HandleSourceRight
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              nodeId={nodeId}
              type={`input-${numberToWords(number)}`}
              isVisible={isValueInArray(`input-${numberToWords(number)}`, activeEdges)}
            />
          </li>
        ))}
        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
          onClick={() => {
            setSelectedNode({
              nodeId,
              type: 'customer-not-responded',
              sourceIndex: parseInt(55, 10),
            });
          }}
        >
          <span className="fs-13px text-primary">Customer not responded</span>

          <SourceActive
            isIVR
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="customer-not-responded"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="customer-not-responded"
            isVisible={isValueInArray('customer-not-responded', activeEdges)}
          />
        </li>
        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative "
          onClick={() => {
            setSelectedNode({
              nodeId,
              type: 'customer-gives-wrong-input',
              sourceIndex: parseInt(56, 10),
            });
          }}
        >
          <span className="fs-13px text-primary">Customer gives wrong input</span>

          <SourceActive
            isIVR
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="customer-gives-wrong-input"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />

          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="customer-gives-wrong-input"
            isVisible={isValueInArray('customer-gives-wrong-input', activeEdges)}
          />
        </li>
      </ul>
      <HandleTargetBottom nodeId={nodeId} type="ivr-menu-2" />
    </div>
  );
}

export default IVRMenu;
