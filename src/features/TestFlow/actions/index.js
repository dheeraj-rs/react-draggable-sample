const handleDeleteNode = async (idToRemove, setNodes) => {
  return new Promise((resolve, reject) => {
    setNodes((prevArray) => {
      const updatedArray = prevArray.filter((node) => node.id !== idToRemove);
      resolve(updatedArray);
      return updatedArray;
    });
  });
};

const handleRemoveConnection = async (idToRemove, edges) => {
  const updatedArray = edges.filter(
    (edge) => String(edge.id) !== String(idToRemove)
  );
  return updatedArray;
};

const getEdgeDetails = (edgeId = '', flowEdges = []) => {
  const result = flowEdges.filter((edge) => String(edge.id) === String(edgeId));
  return result[0] || [];
};

const isNodeConnectedAsTarget = (flowEdges, nodeId) => {
  if (nodeId && flowEdges?.length > 0) {
    const result = flowEdges.filter(
      (edge) => String(edge.target) === String(nodeId)
    );
    return result.length > 0 ? false : true;
  }
};
export {
  handleDeleteNode,
  handleRemoveConnection,
  getEdgeDetails,
  isNodeConnectedAsTarget,
};
