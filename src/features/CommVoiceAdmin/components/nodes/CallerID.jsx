import React, { useEffect, useState } from 'react';
import { useNodeId } from 'reactflow';

import HandleSourceRight from '../handles/HandleSourceRight';
import NodeHeader from '../NodeHeader';
import useStore from '../../../Test/store';
import HandleTargetLeft from '../handles/HandleTargetLeft';
import HandleTargetTop from '../handles/HandleTargetTop';
import { getEdges, getNodeDetails, isValueInArray } from '../../../../common/helpers/utils';
import { activeBorderStyle } from '../../../TestFlow/data/data';
import { getEdgeDetails, isNodeConnectedAsTarget } from '../../../TestFlow/actions';
import SourceActive from '../SourceActive';

function CallerID() {
  const nodeId = useNodeId();

  const {
    activeEdgeId,
    selectedNode,
    setSelectedNode,
    callerListArray,
    flowNodes,
    flowEdges,
    activeNodesDetails,
    setActiveNodesDetails,
    setActiveEdgeId,
  } = useStore();
  const [activeEdges, setActiveEdges] = useState([]);

  const nodeDetails = getNodeDetails(nodeId, flowNodes);

  const getCallerList = (id) => {
    if (id) {
      const result = callerListArray.filter((list) => parseInt(list.id, 10) === id);
      return result[0]?.attributes?.name;
    }
    return '';
  };

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
        name="Caller ID"
        icon="/assets/call-flows-icons/callerid.svg"
        type="caller-id"
        actionType="edit-node"
        nodeId={nodeId}
        headerbg="cool-mint"
        iconbg="light-sky-blue"
        tooltipContent="The Caller ID  component helps you fast and direct connection to a specific user based on the list selected."
      >
        {/* {flowNodes.findIndex((item) => item.id === nodeId) === 1 ? (
          <HandleTargetTop
            target={getEdgeDetails(activeEdgeId, flowEdges).target}
            targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
            type="caller-id"
            nodeId={nodeId}
            isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
          />
        ) : ( */}
        <HandleTargetLeft
          target={getEdgeDetails(activeEdgeId, flowEdges).target}
          targetType={getEdgeDetails(activeEdgeId, flowEdges)?.targetType}
          type="caller-id"
          nodeId={nodeId}
          isConnectable={isNodeConnectedAsTarget(flowEdges, nodeId)}
        />
        {/* )} */}
      </NodeHeader>
      <ul className="bg-white" style={{ borderRadius: '10px' }}>
        {nodeDetails?.details?.callerListIds?.map((option, index) => (
          <li
            className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
            key={index}
            onClick={() => {
              setSelectedNode({ nodeId, type: `caller-list-${index}`, sourceIndex: index });
            }}
          >
            <div>
              <div className="caller-id-component-dropdown">
                <div>
                  <p className="fs-13px text-primary m-0">If the caller is in the list</p>
                  <span
                    className="py-1 px-2 mt-1 d-inline-block rounded fs-12px text-white"
                    style={{ background: '#8c98a7' }}
                  >
                    {option && <span>{getCallerList(option)}</span>}
                  </span>
                </div>
              </div>
            </div>
            <SourceActive
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              type={`caller-list-${index}`}
              activeEdges={activeEdges}
              nodeId={nodeId}
            />

            <HandleSourceRight
              source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
              sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
              nodeId={nodeId}
              type={`caller-list-${index}`}
              isVisible={isValueInArray(`caller-list-${index}`, activeEdges)}
            />
          </li>
        ))}

        <li
          className="d-flex align-items-center justify-content-between cursor-pointer bg-alice-blue-two-hover flow__component__items position-relative"
          onClick={() => {
            setSelectedNode({
              nodeId,
              type: 'else',
              sourceIndex: parseInt(55, 10),
            });
          }}
        >
          <span className="fs-13px text-primary">Else</span>

          <SourceActive
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            type="else"
            activeEdges={activeEdges}
            nodeId={nodeId}
          />
          <HandleSourceRight
            source={getEdgeDetails(activeEdgeId, flowEdges)?.source}
            sourceType={getEdgeDetails(activeEdgeId, flowEdges)?.sourceHandle?.split(':')[0]}
            nodeId={nodeId}
            type="else"
            isVisible={isValueInArray('else', activeEdges)}
          />
        </li>
      </ul>
    </div>
  );
}

export default CallerID;
