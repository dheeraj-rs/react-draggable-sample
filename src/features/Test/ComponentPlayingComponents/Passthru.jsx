import React, { useEffect, useState } from 'react';
import useStore from '../store';

function Passthru({ isVisible, nodes = [], edges = [], moveToNextNode }) {
  const options = [
    { title: 'API returns success', type: 'on-success', async: false },
    { title: 'API returns any other values', type: 'other', async: false },
    { title: 'After run Passthru', type: 'other', async: true },
  ];

  const { activeNodeId } = useStore();

  const [nodeDetails, setNodeDetails] = useState();

  const handleMove = (type) => {
    const result = edges.filter(
      (a) => a.source === activeNodeId && a.sourceHandle.split(':')[0] === type
    )[0];
    moveToNextNode(result?.target);
  };

  useEffect(() => {
    if (nodes.length > 0 && activeNodeId) {
      const result = nodes.filter((e) => e.id === activeNodeId)[0];
      console.log('result : ', result);
      setNodeDetails(result);
    }
  }, [nodes, activeNodeId]);
  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="callHours"
    >
      <div className="choose-agent px-3 mt-4 pt-4">
        <div className="d-flex flex-column gap-2">
          {options?.map((option, index) => (
            <a
              key={index}
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
              onClick={(e) => {
                e.preventDefault();
                handleMove(option.type);
              }}
            >
              {option?.title} <img src="/assets/next-filled.svg" alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Passthru;
