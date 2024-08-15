import React from 'react';

function ConnectedCall() {
  return (
    <div id="callConnection" className="col-sm-3 start-call d-none">
      <div className="card card shadow-6 p-23px bg-haiti border-0 rounded position-relative">
        <div className="d-flex gap-3">
          <div>
            <img src="/assets/caller-img.svg" alt="" />
          </div>
          <div className="d-flex flex-column">
            <p className="mb-0 fw-medium fs-13px text-white">Connected</p>
            <p className="mb-0 fs-20px text-white">
              00:00:45 <span className="ps-2 fs-12px"> +1 9834527645</span>
            </p>
            {/* <!-- call options --> */}
            <div className="mt-3 d-flex gap-2">
              <div className="d-flex flex-column align-items-center justify-content-center fs-11px h-6 w-6 fw-semibold call-option">
                <img src="/assets/mic.svg" alt="" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center fs-11px h-6 w-6 fw-semibold call-option">
                <img src="/assets/pause.svg" alt="" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center fs-11px h-6 w-6 fw-semibold call-option">
                <img src="/assets/record.svg" alt="" />
              </div>
            </div>
            {/* <!-- call options --> */}
          </div>
        </div>
        <div className="d-flex">
          <div className="w-100 mt-5">
            <button type="button" className="w-100 btn rounded text-white bg-fire-red px-4 py-12px">
              <img className="pe-2" src="/assets/end-call.svg" alt="" />
              End Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedCall;
