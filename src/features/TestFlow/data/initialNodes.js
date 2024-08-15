const initialNodes = [
  {
    id: 'incomingCall',
    defaultPosition: {
      x: 30,
      y: 80,
    },
    position: {
      x: 0,
      y: 60,
    },
    type: 'incomingCall',
    data: {
      label: 'Incoming Call',
    },
    parentId: 'root-node',
    width: 100,
    height: 47,
    x: 177,
    y: 23.5,
    rank: 0,
    draggable: false,
    column: 1,
    numbetOfKeys: 100,
    nodeIndex: 0,
  },
  {
    id: 'node-2',
    defaultPosition: {
      x: 10,
      y: 155,
    },
    position: {
      x: 220,
      y: 80,
    },
    type: 'start',
    data: {
      label: 'Start',
    },
    width: 154,
    height: 155,
    x: 177,
    y: 174.5,
    rank: 0,
    column: 1,
    numbetOfKeys: 100,
    nodeIndex: 0,
  },
];

export default initialNodes;
