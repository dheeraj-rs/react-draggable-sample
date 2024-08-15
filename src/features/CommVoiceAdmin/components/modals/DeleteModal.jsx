import React, { useState } from 'react';
import useStore from '../../../Test/store';
// import { useReactFlow } from 'reactflow';
// import useFlowStore from '../../store/store';

function DeleteModal({ isVisible }) {
  const { setShow } = useStore();

  const [key, setKey] = useState('');

  // const { activeNode, setActiveNode } = useFlowStore();
  // const reactFlowInstance = useReactFlow();
  // const deleteNodeById = (id) => {
  //   reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== id));
  // };

  const handleClose = () => {
    setShow({ isVisible: false, type: '' });
  };
  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="delete-component-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog hours-modal-outer">
            <div className="modal-content">
              <div className="modal-body hours-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/hours.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Delete Connection</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-3 mt-3">
                  This component is used to control your call flow based on the Agent Working Hours
                  and non Agent Working Hours.
                </p>
                <div className="d-flex p-4 rounded-2 align-items-top gap-3 disconnet-info mb-3">
                  <div>
                    <img src="/assets/call-flows-hours/info.svg" alt="" />
                  </div>
                  <div>
                    <p className="m-0">
                      Once remove the connection Already connected component will be stay
                      unconnected.
                    </p>
                  </div>
                </div>
                <p className="fw-bold">To confirm this action please type “Remove”</p>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder='Typr "Remove"'
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                  value={key}
                />
                <div className="timeslot-buttons mt-4 d-flex align-item-center gap-3">
                  <button
                    type="button"
                    className="btn bg-faded-red text-white px-4 py-12px delete-btn border-1"
                    data-bs-dismiss="modal"
                    id="delete-save"
                    onClick={() => {
                      // deleteNodeById(activeNode);
                      // setActiveNode('');
                    }}
                    disabled={!(key.toLocaleLowerCase() === 'remove')}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      // setActiveNode('');
                      handleClose();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
  return null;
}

export default DeleteModal;
