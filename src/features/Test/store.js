import { create } from 'zustand';

const useStore = create((set) => ({
  // Your initial state goes here
  show: {
    isVisible: false,
    type: '',
  },
  flowNodes: [],
  selectedEdge: {},
  activeNodesDetails: { sourceId: '', targetId: '' },
  activeEdgeId: '',
  //

  flow: [],
  flowEdges: [],

  selectedNode: { nodeId: '', type: '' },
  activeNodeType: 'incomingCall',
  activeNodeId: '',
  activeNodes: [],
  componentPlayingDetails: {},
  activeVoiceUrl: '',
  activeNodeDetails: {},
  playingVoiceDetails: {
    count: 0,
    type: 'initial-voice',
  },
  callerListArray: [],
  nodeSelectedForDelete: { isVisible: false, nodeId: '', type: '' },

  // Actions to modify the state
  setShow: (state) => set({ show: state }),
  setFlowNodes: (state) => set({ flowNodes: state }),
  setActiveNodesDetails: (state) => set({ activeNodesDetails: state }),
  setActiveEdgeId: (id) => set({ activeEdgeId: id }),

  //
  setFlow: (newFlow) => set({ flow: newFlow }),
  setFlowEdges: (newFlow) => set({ flowEdges: newFlow }),
  setSelectedNode: (state) => set({ selectedNode: state }),
  setActiveNodeType: (state) => set({ activeNodeType: state }),
  setActiveNodeId: (state) => set({ activeNodeId: state }),
  setActiveNodes: (state) => set({ activeNodes: state }),
  isIncludedInActiveNodes: (nodeId) => {
    const isValueInArray = useStore.getState().activeNodes.includes(nodeId);
    return isValueInArray;
  },
  setComponentPlayingDetails: (state) => set({ componentPlayingDetails: state }),
  addToActiveNode: (node) => {
    set((state) => ({ activeNodes: [...state.activeNodes, node] }));
  },
  resetActiveNode: () => {
    set(() => ({ activeNodes: [] }));
  },
  setActiveVoiceUrl: (state) => set({ activeVoiceUrl: state }),
  setActiveNodeDetails: (state) => set({ activeNodeDetails: state }),
  setPlayingVoiceDetails: (state) => set({ playingVoiceDetails: state }),
  setCallerListArray: (list) => set({ callerListArray: list }),
  setSelectedEdge: (state) => set({ selectedEdge: state }),
  setNodeSelectedForDelete: (state) => set({ nodeSelectedForDelete: state }),
  //
}));

export default useStore;
