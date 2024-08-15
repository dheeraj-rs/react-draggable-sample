import React from 'react';

function ConnectTest() {
  return (
    <div className="mt-3 shadow-11 rounded call-playing" id="connectCall">
      <div className="choose-agent px-3 mt-4">
        <div className="bg-cyan-blue p-4 d-flex justify-content-center rounded py-5">
          <p className="mb-0 text-blue-active">Ringing...</p>
        </div>

        <div className="choose-ivr mt-4 pb-3">
          <h6 className="mb-3">Choose an option to redirect the flow</h6>

          <div className="" />
          <div className="ivr-btns d-flex gap-2 flex-column">
            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              On Call Ends <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              Agent is/are not available <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              Agent is online but no answer <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              All agents are busy <img src="/assets/next-filled.svg" alt="" />
            </a>

            <a
              href="/#"
              role="button"
              type="btn"
              className="text-secondary px-4 border-transparent d-flex justify-content-between align-items-center"
            >
              No response from URL <img src="/assets/next-filled.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectTest;
