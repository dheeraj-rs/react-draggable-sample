// store.js

import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
import Dagre from '@dagrejs/dagre';

import initialNodes from './nodes';
import initialEdges from './edges';

const getTestLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const setTestLayout = (nodes, edges, set) => {
  const layouted = getTestLayoutedElements(nodes, edges, { direction: 'LR' });
  const updatedNodes = layouted.nodes.map((node) => ({ ...node, draggable: false }));
  set({ testNodes: updatedNodes, testEdges: layouted.edges });
};

const useFlowStore = createWithEqualityFn(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      testNodes: [],
      testEdges: [],
      activeNode: '',
      activeTest: '',
      source: '',
      onNodesChange: (changes) => {
        const newNodes = applyNodeChanges(changes, get().nodes);
        const layouted = getTestLayoutedElements(newNodes, get().edges, { direction: 'LR' });
        const updatedNodes = layouted.nodes.map((node) => ({ ...node, draggable: true }));
        set({ nodes: updatedNodes });
        setTestLayout(newNodes, get().edges, set);
      },
      onEdgesChange: (changes) => {
        const newEdges = applyEdgeChanges(changes, get().edges);
        set({ edges: newEdges });
        setTestLayout(get().nodes, newEdges, set);
      },
      onConnect: (connection) => {
        const newEdges = addEdge(connection, get().edges);
        set({ edges: newEdges });
        setTestLayout(get().nodes, newEdges, set);
      },
      addNode: (newNode) => {
        const currentNodes = get().nodes;
        const filteredNodes = currentNodes.filter((node) => node.id !== 'start');
        set({
          nodes: [...filteredNodes, newNode],
        });
      },
      setActiveNode: (newNode) => set({ activeNode: newNode }),
      setActiveTest: (newTest) => set({ activeTest: newTest }),
      setSource: (newSource) => {
        set({ source: newSource });
      },

      getNodeTypeById: (nodeId) => {
        const node = get().testNodes.find((n) => n.id === nodeId);
        return node ? node.type : null;
      },
      getEdgeHasSourceHandle: (id) => {
        const { edges } = get();
        return edges.some((edge) => edge.sourceHandle === id);
      },
      setLastNodePosition: (position) => set({ lastNodePosition: position }),
    }),
    {
      name: 'flow-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useFlowStore;
