import React from 'react';
import { handleKeyPressForNumber } from '../../../../common/helpers/utils';

function InputListClose({ index, value, onChange, deleteValue, formik }) {
  return (
    <div className="mt-3 one-input">
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
            <input
              type="text"
              placeholder=""
              className="form-control bg-white"
              name={`timeout-${index}`}
              value={value}
              onKeyPress={handleKeyPressForNumber}
              onChange={onChange}
              style={
                formik.errors[`timeout-${index}`]
                  ? { border: '1px solid red', maxWidth: '100px' }
                  : { maxWidth: '100px' }
              }
            />
          </div>
          <div
            style={{ width: '70px' }}
            className={
              index === 0 ? 'd-none' : 'text-end cursor-pointer d-flex justify-content-end'
            }
            onClick={deleteValue}
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

export default InputListClose;
