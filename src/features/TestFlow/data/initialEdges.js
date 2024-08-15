import edgeAttributes from './edgeAttributes';

const initialEdges = [
  {
    id: 'incoming-call',
    source: 'incomingCall',
    sourceHandle: 'incomingCall',
    target: 'node-2',
    type: 'smoothstep',
    style: {
      type: edgeAttributes.type,
      stroke: edgeAttributes.stroke,
      strokeWidth: edgeAttributes.strokeWidth,
    },
    sourceIndex: 0,
  },
];

export default initialEdges;
