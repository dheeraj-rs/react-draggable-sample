import React, { useEffect, useState } from 'react';
import { Background, useNodeId } from 'reactflow';
import '../../../../styles/scss/components/call-flows-component.scss';
import { getEdges, isValueInArray } from '../../../../common/helpers/utils';
import useStore from '../../../Test/store';

import HandleSourceBottom from '../handles/HandleSourceBottom';
// import HandleSourceRight from '../handles/HandleSourceRight';

function IncomingCall() {
  const nodeId = useNodeId();

  const { flowEdges } = useStore();
  const [activeEdges, setActiveEdges] = useState([]);

  useEffect(() => {
    if (flowEdges && nodeId) {
      const edgesArray = getEdges(nodeId, flowEdges);
      setActiveEdges(edgesArray);
    }
  }, [flowEdges, nodeId]);

  return (
    <div
      className="incomming__call__flow__component flex justify-end"
      style={{
        display: 'flex',
        justifyContent: 'end',
        // left: '190%',
        top: '70%',
        transform: 'translateY(-200%)',
        position: 'relative',
        // marginLeft: '100px',
      }}
    >
      <div className="incomming__call_inner d-flex justify-content-center">
        <div className="incomming__call_item d-flex align-items-center justify-content-between">
          <span className="icon__wrap d-flex align-items-center justify-content-center rounded-circle">
            <img src="/assets/call-flows-icons/incomming.svg" alt="" />
          </span>
          <span className="fs-13px fw-500">Incoming Call</span>
          <HandleSourceBottom
            type="incoming-call"
            nodeId={nodeId}
            isConnectable={!isValueInArray('incoming-call', activeEdges)}
          />
          {/* <HandleSourceRight
            type="source"
            position="right"
            id="incoming-call"
            isConnectable={!isValueInArray('incoming-call', activeEdges)}
            style={{
              right: '-8px',
              top: '70%',
              transform: 'translateY(-200%)',

              background: '#555',
              width: '12px',
              height: '12px',
              border: '2px solid white',
            }}
          /> */}
        </div>
      </div>
      <Background />
    </div>
  );
}

export default IncomingCall;
