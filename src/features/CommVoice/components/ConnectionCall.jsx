import React from 'react';

function ConnectionCall({ isConnecting, setIsConnecting }) {
  return (
    <div id="callConnection" className={`col-sm-3 start-call ${isConnecting.show ? '' : 'd-none'}`}>
      <div className="card card shadow-6 p-23px bg-haiti border-0 rounded position-relative">
        <div className="d-flex gap-3">
          <div>
            <img src="/assets/caller-img.svg" alt="" />
          </div>
          <div className="d-flex flex-column">
            <p className="mb-0 fw-medium fs-13px text-white">Connecting</p>
            <p className="mb-0 fs-20px text-white">{isConnecting.mobile}</p>
            {/* <!-- bubble loading --> */}
            <div className="bubble mt-3 bubble-hide">
              <div className="ellipsis-call dot_1" />
              <div className="ellipsis-call dot_2" />
              <div className="ellipsis-call dot_3" />
            </div>
            {/* <!-- bubble loading --> */}
          </div>
        </div>
        <div className="d-flex">
          <div className="w-100 mt-5">
            <button
              type="button"
              className="w-100 btn rounded text-white bg-fire-red px-4 py-12px"
              onClick={() => {
                setIsConnecting({ show: false });
              }}
            >
              <img className="pe-2" src="/assets/end-call.svg" alt="" />
              End Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCall;
