const START_X = 0;
const START_Y = 50;
const CHILD_GAP_X = 500;
const VERTICAL_GAP = 50;
const SIBLING_HORIZONTAL = 1050;
const INITIAL_NODE_CHILD_GAP_X = 220;

const getMinHeight = (nodeType, data) => {
  const baseHeight = 45;
  const extraHeight = 45;
  const nodeTypeHeights = {
    greetify: 100,
    shortcut:
      (data.details.keyList?.length || 0) * baseHeight + 2 * extraHeight,
    'ivr-menu': (data.details.keys?.length || 0) * baseHeight + 2 * extraHeight,
    connect: 5 * baseHeight + extraHeight,
    hours: 2 * baseHeight + extraHeight,
    voicemail: baseHeight + extraHeight,
    email: baseHeight + extraHeight,
    'caller-id':
      (data?.details?.callerListIds?.length || 0) * 62 + 50 + extraHeight,
    'caller-list': baseHeight + extraHeight,
    'get-value':
      data?.details?.type === 'url'
        ? 3 * baseHeight + extraHeight
        : 2 * baseHeight + extraHeight,
    passthru: data?.details?.async
      ? baseHeight + extraHeight
      : 2 * baseHeight + extraHeight,
    sms:
      data?.details?.type === 'url'
        ? 2 * baseHeight + extraHeight
        : baseHeight + extraHeight,
    'send-sms': 2 * baseHeight + extraHeight,
    queue: 2 * baseHeight + extraHeight,
    'hang-up': data?.details?.feedbackRequired
      ? 2 * baseHeight + extraHeight
      : baseHeight + extraHeight,
    'goto-flow': baseHeight + extraHeight,
    callBack: 2 * baseHeight + extraHeight,
  };

  return nodeTypeHeights[nodeType] || '';
};

const customLayout = (nodes, edges) => {
  if (!nodes || nodes.length === 0) return [];
  const nodeMap = new Map(nodes.map((node) => [node.id, { ...node }]));
  const childrenMap = new Map();
  edges.forEach(({ source, target }) => {
    childrenMap.set(source, (childrenMap.get(source) || []).concat(target));
  });

  const getNodeBottomY = (nodeId) => {
    const node = nodeMap.get(nodeId);
    return (node?.position?.y || 0) + (node?.height || 0);
  };

  const positionSubtree = (nodeId, startX, startY, level = 0) => {
    const node = nodeMap.get(nodeId);
    if (!node) return startY;
    node.position = { x: startX, y: startY };
    const children = (childrenMap.get(nodeId) || [])
      .map((childId) => nodeMap.get(childId))
      .filter(Boolean)
      .sort((a, b) => a.sourceIndex - b.sourceIndex);
    let maxChildY = startY;
    let childStartX = startX;
    children.forEach((child, index) => {
      const childGap =
        level === 0 && child?.parentId === 'incomingCall'
          ? INITIAL_NODE_CHILD_GAP_X
          : CHILD_GAP_X;
      childStartX += childGap;
      if (index > 0) {
        childStartX -= SIBLING_HORIZONTAL / 2;
      }
      const childY = maxChildY + (index > 0 ? VERTICAL_GAP : 0);
      const newChildY = positionSubtree(
        child.id,
        childStartX,
        childY,
        level + 1
      );
      maxChildY = Math.max(maxChildY, newChildY);
    });
    return Math.max(getNodeBottomY(nodeId), maxChildY);
  };

  const disconnectedNodes = nodes
    .filter((node) => !edges.some((edge) => edge.target === node.id))
    .sort((a, b) => a.sourceIndex - b.sourceIndex);

  let currentX = START_X;
  let maxY = START_Y;

  disconnectedNodes.forEach((rootNode, index) => {
    const subtreeMaxY = positionSubtree(rootNode.id, currentX, maxY, 0);
    maxY = subtreeMaxY + VERTICAL_GAP;

    if (index === 0) {
      currentX = 0;
    } else {
      currentX += 0;
    }
  });

  return Array.from(nodeMap.values());
};

export { customLayout, getMinHeight };
