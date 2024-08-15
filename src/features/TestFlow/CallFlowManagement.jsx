import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import ReactFlow, {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Background,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import customNodeTypes from './data/customNodeTypes';
import edgeAttributes from './data/edgeAttributes';
import { activeEdgeColor } from './data/data';
import initialNodes from './data/initialNodes';
import initialEdges from './data/initialEdges';

import Modals from './components/Modals';
import CallFlowsFitScreen from './components/CallFlowsFitScreen';
import CallFlowsZoomIn from './components/CallFlowsZoomIn';
import CallFlowsZoomOut from './components/CallFlowsZoomOut';
import CallFlowsResetZoom from './components/CallFlowsResetZoom';
import CallFlowsAutoArrange from './components/CallFlowsAutoArrange';
import CallFlowsRedo from './components/CallFlowsRedo';
import CallFlowsUndo from './components/CallFlowsUndo';

import { handleDeleteNode, handleRemoveConnection } from './actions';
import { customLayout, getMinHeight } from './actions/flow-actions';
import ComponentSelectPopup from '../CommVoiceAdmin/components/modals/ComponentSelectPopup';
import useStore from '../Test/store';

const MIN_ZOOM = 0.005;
const MAX_ZOOM = 3;
const ZOOM_STEP = 1.2;

function CallFlowManagementInner() {
  const isSmallDevice = window.innerWidth < 768;

  const containerRef = useRef(null);
  const isUndoRedoAction = useRef(false);

  const modifiedInitialNodes = initialNodes.map((node) => ({
    ...node,
    parentId: node.parentId === 'root-node' ? undefined : node.parentId,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(modifiedInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [history, setHistory] = useState([
    { nodes: modifiedInitialNodes, edges: initialEdges },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isResetZoomEnabled, setIsResetZoomEnabled] = useState(false);
  const [savedViewport, setSavedViewport] = useState(null);
  //   const [isFlowVisible, setIsFlowVisible] = useState(false);
  const [edgeStyles, setEdgeStyles] = useState({});
  const [lastAdded, setLastAdded] = useState({ nodeId: null, edgeId: null });

  const [selectedNode, setSelectedNode] = useState({});

  const reactFlowInstance = useReactFlow();

  const {
    show,
    setShow,
    setSelectedNode: setStoreSelectedNode,
    activeEdgeId,
    setActiveNodeId,
    setFlowNodes,
    setFlowEdges,
    nodeSelectedForDelete,
    setActiveEdgeId,
    setNodeSelectedForDelete,
  } = useStore();

  const handleUpdateCallFlow = useCallback(
    (nodesArray = [], edgesArray = []) => {
      console.log('Call flow updated:', {
        nodes: nodesArray,
        edges: edgesArray,
      });
      setNodes(nodesArray);
      setEdges(edgesArray);
      setFlowNodes(nodesArray);
      setFlowEdges(edgesArray);
    },
    []
  );

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode({
        nodeId: node.id,
        sourceIndex: node.sourceIndex || 0,
      });
      setActiveNodeId(node.id);
      setStoreSelectedNode({ nodeId: node.id, type: node.type });
    },
    [setActiveNodeId, setStoreSelectedNode]
  );

  const animateNodePositions = useCallback(
    (startNodes, endNodes, duration = 500) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const interpolatedNodes = startNodes.map((startNode, index) => {
          const endNode = endNodes[index];
          return {
            ...startNode,
            position: {
              x:
                startNode.position.x +
                (endNode.position.x - startNode.position.x) * progress,
              y:
                startNode.position.y +
                (endNode.position.y - startNode.position.y) * progress,
            },
          };
        });

        setNodes(interpolatedNodes);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setNodes(endNodes);
          handleUpdateCallFlow(endNodes, edges);
        }
      };

      requestAnimationFrame(animate);
    },
    [edges, handleUpdateCallFlow, setNodes]
  );

  const handleRightClick = useCallback(
    (event) => {
      event.preventDefault();
      setActiveEdgeId(null);
      setSelectedNode({});
      setLastAdded({ nodeId: null, edgeId: null });
      setEdges((prevEdges) =>
        prevEdges.map((e) => ({ ...e, style: edgeAttributes }))
      );
    },
    [setEdges, setActiveEdgeId]
  );

  const saveToHistory = useCallback(
    (newNodes, newEdges) => {
      if (!isUndoRedoAction.current) {
        setHistory((prevHistory) => {
          const newHistory = prevHistory.slice(0, historyIndex + 1);
          newHistory.push({
            nodes: JSON.parse(JSON.stringify(newNodes)),
            edges: JSON.parse(JSON.stringify(newEdges)),
          });
          return newHistory;
        });
        setHistoryIndex((prevIndex) => prevIndex + 1);
      }
      isUndoRedoAction.current = false;
    },
    [historyIndex]
  );

  const onNodesDragEnd = useCallback(() => {
    handleUpdateCallFlow(nodes, edges);
    saveToHistory(nodes, edges);
  }, [edges, handleUpdateCallFlow, nodes, saveToHistory]);

  const createEdge = useCallback((source, target, data) => {
    const id = uuidv4();
    return {
      id: `edge-${id}`,
      source,
      target,
      sourceHandle:
        source === 'incomingCall'
          ? 'incomingCall'
          : `${data.targetType || 'default'}:source:${source}`,
      targetHandle: `${data.type}:target:${target}`,
      type: edgeAttributes.type,
      style: edgeAttributes,
      ...edgeAttributes,
      sourceIndex: data.sourceIndex || 0,
    };
  }, []);

  const handleAddComponent = useCallback(
    (data) => {
      const id = uuidv4();
      const newNode = {
        id,
        type: data.type,
        position: { x: 0, y: 0 },
        data: { label: data.label },
        details: data.details,
        draggable: true,
        name: data.name,
        sourceIndex: selectedNode.sourceIndex + 1,
        prevNodeId: data.prevNodeId,
        prevHandleId: data.prevHandleId,
        // parentId: selectedNode.nodeId || '',
        childrens: [],
        minHeight: getMinHeight(data.type, data),
        height: getMinHeight(data.type, data) + 50,
        width: 250,
      };

      setNodes((currentNodes) => {
        let updatedNodes = [...currentNodes];
        let updatedEdges = [...edges];

        if (data.prevNodeId === 'incomingCall') {
          // Remove the existing node connected to 'incomingCall'
          const incomingCallEdge = edges.find(
            (e) => e.source === 'incomingCall'
          );
          if (incomingCallEdge) {
            updatedNodes = updatedNodes.filter(
              (node) => node.id !== incomingCallEdge.target
            );
            updatedEdges = updatedEdges.filter(
              (edge) => edge.id !== incomingCallEdge.id
            );
          }
          newNode.position = { x: 220, y: 55 };
        } else {
          const parentNode = updatedNodes.find(
            (node) => node.id === data.prevNodeId
          );
          if (parentNode) {
            newNode.position = {
              x: parentNode.position.x + 300,
              y: parentNode.position.y + 100,
            };
          } else {
            newNode.position = { x: 500, y: 500 };
          }
        }

        updatedNodes.push(newNode);

        // Create new edge
        const newEdge = createEdge(data.prevNodeId, newNode.id, {
          type: data.type,
          targetType: data.targetType || show.targetType,
          sourceIndex: selectedNode.sourceIndex + 1,
        });
        updatedEdges.push(newEdge);

        // Apply layout
        const layoutedNodes = customLayout(updatedNodes, updatedEdges);

        // Update state immediately
        setEdges(updatedEdges);
        setFlowEdges(updatedEdges);
        setNodes(layoutedNodes);
        setFlowNodes(layoutedNodes);

        // Save to history and update call flow
        handleUpdateCallFlow(layoutedNodes, updatedEdges);
        saveToHistory(layoutedNodes, updatedEdges);
        setLastAdded({ nodeId: newNode.id, edgeId: newEdge.id });

        return layoutedNodes;
      });

      setShow({
        isVisible: false,
        type: data?.type,
        prevNodeId: data?.prevNodeId,
        prevHandleId: data?.prevHandleId,
        targetType: show?.targetType,
        id,
      });
      data?.formik?.resetForm();
    },
    [
      edges,
      createEdge,
      show,
      selectedNode.sourceIndex,
      setEdges,
      setFlowEdges,
      handleUpdateCallFlow,
      saveToHistory,
      setLastAdded,
      setShow,
    ]
  );

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (!sourceNode || !targetNode) {
        console.error('Source or target node not found');
        return;
      }

      const newEdge = createEdge(params.source, params.target, {
        type: targetNode.type,
        targetType: params.sourceHandle?.split(':')[0] || 'default',
        sourceIndex: sourceNode.sourceIndex || 0,
      });

      const updatedEdges = addEdge(newEdge, edges);
      const newNodes = customLayout(nodes, updatedEdges);

      setNodes(newNodes);
      setFlowNodes(newNodes);
      setEdges(updatedEdges);
      setFlowEdges(updatedEdges);
      handleUpdateCallFlow(newNodes, updatedEdges);
      saveToHistory(newNodes, updatedEdges);
    },
    [
      nodes,
      edges,
      createEdge,
      setNodes,
      setFlowNodes,
      setEdges,
      setFlowEdges,
      handleUpdateCallFlow,
      saveToHistory,
    ]
  );

  const handleUpdateNode = useCallback(
    (data) => {
      setShow({
        id: data?.nodeId,
        prevNodeId: data.prevNodeId,
        prevHandleId: data.prevHandleId,
        position: { x: 0, y: 0 },
        parentId: selectedNode.nodeId || '',
        childrens: [],
        sourceIndex: selectedNode.sourceIndex + 1,
        minHeight: getMinHeight(data.type, data),
        height: getMinHeight(data.type, data) + 50,
        width: 250,
        type: data.type,
        data: {
          label: data.label,
        },
        details: data.details,
        draggable: true,
        name: data.name,
      });

      const updatedNodeIndex = nodes.findIndex(
        (node) => node.id === data?.nodeId
      );
      if (updatedNodeIndex === -1) return;

      const updatedNodes = [...nodes];
      updatedNodes[updatedNodeIndex] = {
        ...updatedNodes[updatedNodeIndex],
        details: data?.details,
        height: getMinHeight(updatedNodes[updatedNodeIndex].type, data),
      };

      setTimeout(() => {
        setNodes(updatedNodes);
        saveToHistory(updatedNodes, edges);
        handleUpdateCallFlow(updatedNodes, edges);
      }, 500);
    },
    [
      edges,
      handleUpdateCallFlow,
      nodes,
      saveToHistory,
      selectedNode,
      setNodes,
      setShow,
    ]
  );

  const handleDeleteComponent = useCallback(() => {
    const selectedNodeId = nodeSelectedForDelete.nodeId;

    if (nodes.length === 2) {
      setNodes(modifiedInitialNodes);
      setEdges(initialEdges);
    }

    const relatedEdges = edges.filter(
      (e) => e.source === selectedNodeId || e.target === selectedNodeId
    );

    handleDeleteNode(selectedNodeId, setNodes).then((updatedNodesArray) => {
      const updatedEdgesArray = edges.filter((e) => !relatedEdges.includes(e));
      setEdges(updatedEdgesArray);
      handleUpdateCallFlow(updatedNodesArray, updatedEdgesArray);
      saveToHistory(updatedNodesArray, updatedEdgesArray);
    });

    setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
  }, [
    edges,
    handleUpdateCallFlow,
    nodes,
    nodeSelectedForDelete.nodeId,
    saveToHistory,
    setEdges,
    setNodeSelectedForDelete,
    setNodes,
    modifiedInitialNodes,
  ]);

  const handleRemoveConnections = useCallback(() => {
    const selectedNodeId = nodeSelectedForDelete.nodeId;
    const parentEdge = edges.find((e) => e.target === selectedNodeId);

    if (nodes.length <= 2) {
      console.log(
        'Cannot remove connections when only two initial nodes remain.'
      );
      setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
      return;
    }

    if (parentEdge) {
      handleRemoveConnection(parentEdge.id, edges).then((updatedEdges) => {
        setEdges(updatedEdges);
        handleUpdateCallFlow(nodes, updatedEdges);
        saveToHistory(nodes, updatedEdges);
      });
    }
    setNodeSelectedForDelete({ isVisible: false, nodeId: '', type: '' });
  }, [
    edges,
    handleUpdateCallFlow,
    nodes,
    nodeSelectedForDelete.nodeId,
    saveToHistory,
    setEdges,
    setNodeSelectedForDelete,
  ]);

  const resetFlowLayout = useCallback(() => {
    const startNodes = [...nodes];
    const endNodes = customLayout(nodes, edges);
    animateNodePositions(startNodes, endNodes);
  }, [animateNodePositions, edges, nodes]);

  const handleZoom = useCallback(
    (zoomIn) => {
      const { x, y, zoom } = reactFlowInstance.getViewport();
      const newZoom = zoomIn
        ? Math.min(zoom * ZOOM_STEP, MAX_ZOOM)
        : Math.max(zoom / ZOOM_STEP, MIN_ZOOM);
      const zoomFactor = newZoom / zoom;
      const newX =
        x * zoomFactor +
        ((1 - zoomFactor) * containerRef.current.clientWidth) / 2;
      const newY =
        y * zoomFactor +
        ((1 - zoomFactor) * containerRef.current.clientHeight) / 2;
      reactFlowInstance.setViewport(
        { x: newX, y: newY, zoom: newZoom },
        { duration: 300 }
      );
    },
    [reactFlowInstance]
  );

  const handleFitView = useCallback(() => {
    const currentViewport = reactFlowInstance.getViewport();
    setSavedViewport(currentViewport);

    const nodesBounds = nodes.reduce((acc, node) => {
      if (!acc) {
        return {
          minX: node.position.x,
          minY: node.position.y,
          maxX: node.position.x + (node.width || 0),
          maxY: node.position.y + (node.height || 0),
        };
      }
      return {
        minX: Math.min(acc.minX, node.position.x),
        minY: Math.min(acc.minY, node.position.y),
        maxX: Math.max(acc.maxX, node.position.x + (node.width || 0)),
        maxY: Math.max(acc.maxY, node.position.y + (node.height || 0)),
      };
    }, null);

    if (nodesBounds) {
      const padding = 35;
      let topPadding = 40;

      const containerHeight =
        containerRef.current.clientHeight - padding * 2 - topPadding;
      const containerWidth = containerRef.current.clientWidth - padding * 2;

      const targetZoom = Math.min(
        containerHeight / (nodesBounds.maxY - nodesBounds.minY),
        containerWidth / (nodesBounds.maxX - nodesBounds.minX),
        MAX_ZOOM
      );

      const targetX = -nodesBounds.minX * targetZoom + padding;
      const targetY = -nodesBounds.minY * targetZoom + padding + topPadding;

      reactFlowInstance.setViewport(
        { x: targetX, y: targetY, zoom: Math.max(targetZoom, MIN_ZOOM) },
        { duration: 800 }
      );
    }

    setIsResetZoomEnabled(true);
  }, [nodes, reactFlowInstance]);

  const handleResetZoom = useCallback(() => {
    if (savedViewport && isResetZoomEnabled) {
      reactFlowInstance.setViewport(savedViewport, { duration: 800 });
      setIsResetZoomEnabled(false);
    }
  }, [isResetZoomEnabled, reactFlowInstance, savedViewport]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const prevState = history[historyIndex - 1];
      const newNodes = customLayout(prevState.nodes, prevState.edges);
      const startNodes = nodes.map((node) => ({ ...node }));

      if (startNodes.length === newNodes.length) {
        animateNodePositions(startNodes, newNodes, 500);
        setEdges(prevState.edges);
        setHistoryIndex((prevIndex) => prevIndex - 1);
        handleUpdateCallFlow(newNodes, prevState.edges);
      } else {
        setNodes(newNodes);
        setEdges(prevState.edges);
        setHistoryIndex((prevIndex) => prevIndex - 1);
        handleUpdateCallFlow(newNodes, prevState.edges);
      }
    }
  }, [
    animateNodePositions,
    handleUpdateCallFlow,
    history,
    historyIndex,
    nodes,
    setEdges,
    setNodes,
  ]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const nextState = history[historyIndex + 1];
      const newNodes = customLayout(nextState.nodes, nextState.edges);
      const startNodes = nodes.map((node) => ({ ...node }));

      if (startNodes.length === newNodes.length) {
        animateNodePositions(startNodes, newNodes, 500);
        setEdges(nextState.edges);
        setHistoryIndex((prevIndex) => prevIndex + 1);
        handleUpdateCallFlow(newNodes, nextState.edges);
      } else {
        setNodes(newNodes);
        setEdges(nextState.edges);
        setHistoryIndex((prevIndex) => prevIndex + 1);
        handleUpdateCallFlow(newNodes, nextState.edges);
      }
    }
  }, [
    animateNodePositions,
    handleUpdateCallFlow,
    history,
    historyIndex,
    nodes,
    setEdges,
    setNodes,
  ]);

  const onEdgeClick = useCallback(
    (event, e) => {
      setActiveEdgeId(e.id);
    },
    [setActiveEdgeId]
  );

  const onEdgeMouseEnter = useCallback(
    (event, e) => {
      if (e.id !== lastAdded.edgeId) {
        setActiveEdgeId(e.id);
      }
    },
    [lastAdded.edgeId, setActiveEdgeId]
  );

  const onEdgeMouseLeave = useCallback(
    (event, e) => {
      if (e.id !== lastAdded.edgeId) {
        setActiveEdgeId(null);
      }
    },
    [lastAdded.edgeId, setActiveEdgeId]
  );

  useEffect(() => {
    const newEdgeStyles = {};
    edges.forEach((edgeItem) => {
      if (edgeItem.id === lastAdded.edgeId) {
        newEdgeStyles[edgeItem.id] = {
          ...edgeAttributes,
          stroke: activeEdgeColor,
          strokeWidth: 3,
        };
      } else if (edgeItem.id === activeEdgeId) {
        newEdgeStyles[edgeItem.id] = {
          ...edgeAttributes,
          stroke: activeEdgeColor,
          strokeWidth: 3,
        };
      } else {
        newEdgeStyles[edgeItem.id] = edgeAttributes;
      }
    });
    setEdgeStyles(newEdgeStyles);
  }, [edges, lastAdded.edgeId, activeEdgeId]);

  useLayoutEffect(() => {
    const layoutedNodes = customLayout(nodes, edges);
    setNodes(layoutedNodes);
  }, [edges, setNodes]);

  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(
    () =>
      edges.map((e) => ({ ...e, style: edgeStyles[e.id] || edgeAttributes })),
    [edges, edgeStyles]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }} ref={containerRef}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          //   width: '45px',
          position: 'absolute',
          left: isSmallDevice ? '10px' : '30px',
          bottom: isSmallDevice ? '10px' : '30px',
          zIndex: '111',
          userSelect: 'none',
          padding: '10px',
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CallFlowsRedo
          setToDefaultLayout={redo}
          isEnabled={historyIndex < history.length - 1}
        />
        <CallFlowsUndo setToDefaultLayout={undo} isEnabled={historyIndex > 0} />
        <CallFlowsResetZoom
          setToDefaultLayout={handleResetZoom}
          isEnabled={isResetZoomEnabled}
        />
        <CallFlowsFitScreen setToDefaultLayout={handleFitView} />
        <CallFlowsAutoArrange setToDefaultLayout={resetFlowLayout} />
      </div>
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          right: isSmallDevice ? '10px' : '30px',
          bottom: isSmallDevice ? '30px' : '80px',
          zIndex: '111',
          userSelect: 'none',
          padding: '3px',
        }}
      >
        <CallFlowsZoomIn setToDefaultLayout={() => handleZoom(true)} />
        <CallFlowsZoomOut setToDefaultLayout={() => handleZoom(false)} />
      </div>

      <ReactFlow
        nodes={memoizedNodes}
        edges={memoizedEdges}
        nodeTypes={customNodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodesDragEnd}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onPaneClick={handleRightClick}
        snapToGrid
        snapGrid={[15, 15]}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        defaultViewport={{
          x: 0,
          y: 0,
          zoom: 0.5,
        }}
      >
        <Background />
      </ReactFlow>
      <ComponentSelectPopup
        isVisible={show?.isVisible && show?.type === 'select-components'}
        vendorComponents={[
          {
            type: 'telephony_components',
            id: '10',
            attributes: {
              name: 'Shortcut',
              description:
                'This component is used to set up the first message that callers listen to when they call your company',
              is_published: 1,
              is_enabled: true,
              created_at: '2024-01-03T12:32:42.000000Z',
              updated_at: '2024-02-15T11:59:36.000000Z',
            },
          },
        ]}
        setSearch={() => {}}
        search=""
        componentsloading={false}
        iVRSearchResult={[]}
        handleIVRSearch={() => {}}
        handleSelectIVR={() => {}}
      />

      <Modals
        show={show}
        setShow={setShow}
        onSelect={handleAddComponent}
        onUpdate={handleUpdateNode}
        nodeSelectedForDelete={nodeSelectedForDelete}
        setNodeSelectedForDelete={setNodeSelectedForDelete}
        handleDeleteComponent={handleDeleteComponent}
        handleRemoveConnections={handleRemoveConnections}
        apiLibraries={[]}
      />
    </div>
  );
}

function CallFlowManagement() {
  return (
    <ReactFlowProvider>
      <CallFlowManagementInner />
    </ReactFlowProvider>
  );
}

export default CallFlowManagement;
