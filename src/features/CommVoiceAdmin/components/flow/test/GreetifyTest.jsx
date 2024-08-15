import React from 'react';

function GreetifyTest() {
  return (
    <div className="mt-3 shadow-11 rounded call-playing" id="callGreetify">
      <div className="choose-agent px-3 mt-4">
        <div className="shadow-11 rounded p-3 px-4">
          <h6>IVR Playing...</h6>
          <div className="d-flex gap-2 w-100 align-items-center flex-row card position-relative mt-2 border-transparent">
            <div
              role="button"
              className="play-pause d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
            >
              <img height="15px" src="/assets/play-btn-black.svg" alt="play" />
              <img
                height="15px"
                src="/assets/stop-btn.svg"
                alt="stop"
                style={{ display: 'none' }}
              />
            </div>
            <div className="d-flex">
              <span>0:00</span> / <span>0:00</span>
            </div>
            <div
              className="card-progress d-flex rounded-2 overflow-hidden"
              style={{ width: '50%' }}
            >
              <div
                className="card-progress-bar bg-blue-active rounded-2 h-1"
                role="progressbar"
                style={{ width: '50%' }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreetifyTest;
