import React from 'react';
import { Handle, Position } from 'reactflow';
import useStore from '../../../Test/store';

function Start() {
  const { setShow, setSelectedNode } = useStore();

  return (
    <div className="flow__component__outer flow__radius flow__shadow new__flow__component flow__border bg-white">
      <Handle
        type="target"
        position={Position.Left}
        // style={{
        //   right: '-8px',
        //   top: '28%',
        //   transform: 'translateY(-200%)',
        //   background: '#555',
        //   width: '12px',
        //   height: '12px',
        //   border: '2px solid white',
        // }}
      />
      <div className="add-component-hours rounded-2">
        <h5 className="text-primary fs-13px mt-0 mb-4 text-center">
          Lets Start
        </h5>

        <button
          className="addcomponent-button d-flex align-items-center py-2 px-3 border-0 rounded-2 gap-2 justify-content-center"
          type="button"
          onClick={() => {
            setShow({
              isVisible: true,
              type: 'select-components',
              prevNodeId: 'incomingCall',
              prevHandleId: 'incoming-call',
              targetType: 'incoming-call',
              isIVR: false,
            });
            setSelectedNode({
              nodeId: 'incomingCall',
              sourceType: 'node-incoming',
              sourceIndex: 0,
            });
          }}
        >
          <span>
            <img
              src="/call-flows-hours/8687019_ic_fluent_cursor_click_regular_icon.svg"
              alt=""
            />
          </span>
          <span>Add component</span>
        </button>

        <p className="fs-13px text-secondary text-center mt-4 mb-0">
          Add a start component to initiate the flow.
        </p>
      </div>
    </div>
  );
}

export default Start;
