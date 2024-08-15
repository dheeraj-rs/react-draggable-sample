import React from 'react';
import Selectbox from './Selectbox';

function InputListCloseWithDropDown({ index, id, callerList, onChange, deleteValue, getName }) {
  return (
    <div>
      <div
        className="px-3 py-2 rounded"
        style={{ boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.41)' }}
      >
        <div className="d-flex align-items-center justify-content-between gab-3">
          <div className="d-flex align-items-center gap-2">
            <span className="d-flex align-items-center justify-content-center h-4 w-4 rounded bg-seaShell">
              {index + 1}
            </span>
            <span>Input</span>
          </div>
          <div>
            <div style={{ width: '165px' }}>
              <Selectbox options={callerList} onChange={onChange} id={id} getName={getName} />
            </div>
          </div>
          <div
            className="text-end cursor-pointer d-flex justify-content-end"
            style={{ width: '70px' }}
            onClick={() => {
              deleteValue(index);
            }}
          >
            <span className="input-close">
              <img src="/assets/plus.svg" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputListCloseWithDropDown;
