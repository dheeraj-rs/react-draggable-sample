import React from 'react';
import useStore from '../../Test/store';

function AddNode({
  nodeId,
  handleId,
  type = '',
  isIVR = false,
  keyValue = '',
}) {
  const { setShow } = useStore();
  return (
    <span
      className="icon__wrapper bg-lavender-mist d-flex align-items-center justify-content-center rounded-circle"
      onClick={() => {
        setShow({
          isVisible: true,
          type: 'select-components',
          prevNodeId: nodeId,
          prevHandleId: handleId,
          targetType: type,
          isIVR,
          keyValue,
        });
      }}
    >
      <img className="" src="/assets/call-flows-icons/plus-grey.svg" alt="" />
    </span>
  );
}

export default AddNode;
