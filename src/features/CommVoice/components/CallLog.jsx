import React from 'react';

function CallLog({ time, date, timeZone, name, duration, status }) {
  return (
    <tr>
      <td>
        <div className="d-flex gap-3">
          <div>
            <img src="/assets/call-log.svg" alt="" />
          </div>
          <div className="d-flex flex-column">
            <p className="mb-0 text-primary fs-13px">
              {date}, {time}
            </p>
            <p className="mb-0 text-secondary fs-12px">{timeZone}</p>
          </div>
          <a
            href="/#"
            className="d-flex"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img src="/assets/speaker.svg" alt="" />
          </a>
        </div>
      </td>
      <td>
        <p className="mb-0 text-notification-blue">{name}</p>
      </td>
      <td>
        <p className="mb-0 text-primary">{duration}</p>
      </td>
      <td>
        <p className="mb-0 text-primary">{status}</p>
      </td>
      <td>
        {' '}
        <a href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCallLog">
          <img src="/assets/call-info.svg" alt="" />
        </a>
      </td>
      <td>
        <a href="/#" className="mb-0 text-notification-blue">
          call log
        </a>
      </td>
    </tr>
  );
}

export default CallLog;
