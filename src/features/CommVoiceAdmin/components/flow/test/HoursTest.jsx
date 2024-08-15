import React from 'react';

function HoursTest() {
  return (
    <div className="mt-3 shadow-11 rounded call-playing" id="callHours">
      <div className="d-flex justify-content-between bg-chat-blue p-3">
        <div className="">
          <h6 className="text-secondary">Component Playing</h6>
          <p className="mb-0 text-secondary">Hours</p>
        </div>

        <div className="">
          <h6 className="text-secondary">Time</h6>
          <p className="mb-0 text-secondary">--</p>
        </div>
      </div>

      <div className="choose-agent px-3 mt-4">
        <h6 className="text-secondary mb-2">Choose Agent Working Hours</h6>
        <div className="d-flex flex-column gap-2">
          <a href="/#" role="button" type="btn" className="text-secondary px-4 border-transparent">
            Choose Agent Working Hours
          </a>

          <a href="/#" role="button" type="btn" className="text-secondary px-4 border-transparent">
            On Agent Non-Working Hours
          </a>
        </div>
      </div>
    </div>
  );
}

export default HoursTest;
