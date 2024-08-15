import React, { useEffect, useState } from 'react';
import useStore from '../store';

function CallerID({ isVisible, nodes = [], edges = [], moveToNextNode }) {
  const { activeNodeId, callerListArray } = useStore();

  const [nodeDetails, setNodeDetails] = useState();

  const getCallerList = (id) => {
    if (id) {
      const result = callerListArray.filter((list) => parseInt(list.id, 10) === id);
      return result[0]?.attributes?.name;
    }
    return '';
  };

  const handleSelectOption = (index) => {
    if (index === 'else') {
      const target = edges.filter(
        (e) => e.source === activeNodeId && e.sourceHandle.split(':')[0] === 'else'
      )[0];
      moveToNextNode(target?.target);
    } else {
      const target = edges.filter(
        (e) => e.source === activeNodeId && e.sourceHandle.split(':')[0] === `caller-list-${index}`
      )[0];
      moveToNextNode(target?.target);
    }
  };

  useEffect(() => {
    if (nodes.length > 0 && activeNodeId) {
      const result = nodes.filter((e) => e.id === activeNodeId)[0];
      setNodeDetails(result);
    }
  }, [nodes, activeNodeId]);

  return (
    <div
      className={`mt-3 shadow-11 rounded call-playing ${isVisible ? '' : 'd-none'}`}
      id="callHours"
    >
      <div className="choose-agent px-3 pt-1">
        <div className="d-flex flex-column gap-2 mt-5">
          {nodeDetails?.details?.callerListIds?.length > 0 &&
            nodeDetails?.details?.callerListIds?.map((option, index) => (
              <a
                key={index}
                href="/#"
                role="button"
                type="btn"
                className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectOption(index);
                }}
              >
                {`Caller is in the list ${getCallerList(option)}`}{' '}
                <img src="/assets/next-filled.svg" alt="" />
              </a>
            ))}

          <a
            href="/#"
            role="button"
            type="btn"
            className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            onClick={(e) => {
              e.preventDefault();
              handleSelectOption('else');
            }}
          >
            Caller not in the list
            <img src="/assets/next-filled.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CallerID;
