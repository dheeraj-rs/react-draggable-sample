import { areArraysEqual } from '../../../common/helpers/utils';

const updateShortcutEdges = (
  setEdges,
  setFlowEdges,
  nodeDetails = {},
  updatedDetails = {},
  edges = []
) => {
  // Find edges connected to the node as source
  const connectedEdges = edges?.filter((e) => e?.source === nodeDetails?.id);

  if (nodeDetails?.type === 'shortcut') {
    const filteredEdgesArray = [];
    const removedEdges = [];

    const newKeys = updatedDetails?.keyList.filter(
      (value) => !nodeDetails?.details?.keyList.includes(value)
    );

    const isKeyListUpdated = !areArraysEqual(
      nodeDetails?.details?.keyList,
      updatedDetails?.keyList
    );

    if (isKeyListUpdated && connectedEdges?.length > 0) {
      connectedEdges.map((e) => {
        const inputString = e?.sourceHandle.split(':')[0];
        const valueAfterDash = inputString.split('-')[1];

        if (valueAfterDash !== 'input') {
          if (updatedDetails?.keyList.includes(parseInt(valueAfterDash, 10))) {
            filteredEdgesArray.push(e);
          } else {
            removedEdges.push(e);
          }
        } else {
          filteredEdgesArray.push(e);
        }

        return null;
      });

      // Remove all edges which has source as the current node source
      const updatedArray = edges.filter(
        (e) => String(e.source) !== String(connectedEdges[0]?.source)
      );

      if (newKeys.length > 0 && removedEdges.length > 0) {
        // Create new edges
        newKeys?.map((key, index) => {
          const edge = {
            id: `${removedEdges[index]?.id}`,
            keyValue: key,
            source: removedEdges[index]?.source,
            sourceHandle: `input-${key}:source:${removedEdges[index]?.source}`,
            target: removedEdges[index]?.target,
            targetHandle: removedEdges[index]?.targetHandle,
            targetType: removedEdges[index]?.targetHandle?.split(':')[0],
            type: removedEdges[index].type,
            style: removedEdges[index].style,
          };
          filteredEdgesArray.push(edge);
          return null;
        });
      }

      // Create a new array of edges
      const combinedArray = [...updatedArray, ...filteredEdgesArray];
      setEdges(combinedArray);
      setFlowEdges(combinedArray);
    }
  }

  return null;
};
const updateIVRMenuEdges = (setEdges, nodeDetails = {}, updatedDetails = {}, edges = []) => {
  // Find edges connected to the node as source
  function convertToInteger(valueAfterDash) {
    const mappings = {
      zero: '0',
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
      ten: '10',
      eleven: '11',
      twelve: '12',
      thirteen: '13',

      fourteen: '14',
      fifteen: '15',
      sixteen: '16',
      seventeen: '17',

      eighteen: '18',
      nineteen: '19',
      twenty: '20',
      hash: '#',
      star: '*',
    };

    const mappedValue = mappings[valueAfterDash.toLowerCase()];
    return mappedValue; // Return the mapped value
  }
  const connectedEdges = edges?.filter((e) => e?.source === nodeDetails?.id);

  if (nodeDetails?.type === 'ivr-menu') {
    const filteredEdgesArray = [];
    const removedEdges = [];

    // const newKeys = updatedDetails?.keys.filter(
    //   (value) => !nodeDetails?.details?.keys.includes(value)
    // );

    const isKeyListUpdated = !areArraysEqual(nodeDetails?.details?.keys, updatedDetails?.keys);
    if (isKeyListUpdated && connectedEdges?.length > 0) {
      connectedEdges.map((e) => {
        const inputString = e?.sourceHandle.split(':')[0];
        const valueAfterDash = inputString.split('-')[1];
        const valueBeforeDash = inputString.split('-')[0];
        if (valueAfterDash !== 'input') {
          if (
            updatedDetails?.keys.includes(convertToInteger(valueAfterDash)) ||
            valueBeforeDash === 'customer'
          ) {
            filteredEdgesArray.push(e);
          } else {
            removedEdges.push(e);
          }
        } else {
          filteredEdgesArray.push(e);
        }

        return null;
      });
      // Remove all edges which has source as the current node source
      const updatedArray = edges.filter(
        (e) => String(e.source) !== String(connectedEdges[0]?.source)
      );

      // Create a new array of edges
      const combinedArray = [...updatedArray, ...filteredEdgesArray];
      setEdges(combinedArray);
    }
  }

  return null;
};

const updatePassthruEdges = (setEdges, nodeDetails = {}, edges = []) => {
  if (nodeDetails?.type === 'passthru') {
    // Find edges connected to the node as source
    const connectedEdges = edges?.filter((e) => e?.source === nodeDetails?.id);

    // Remove all edges which has source as the current node source
    const updatedArray = edges.filter(
      (e) => String(e.source) !== String(connectedEdges[0]?.source)
    );

    setEdges(updatedArray);
  }
};

export { updateShortcutEdges, updateIVRMenuEdges, updatePassthruEdges };
