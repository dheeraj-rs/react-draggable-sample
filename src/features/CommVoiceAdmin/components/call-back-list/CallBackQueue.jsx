import React, { useState } from 'react';

function CallBackQueue({
  // index,
  rank,
  number,
  name,
  region,
  callbackScheduled,
  initials,
  assigne,
  status,
  setShow,
  handleReorder,
  id,
  didNumber,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <tr className="vendor-table">
      <td>
        <p className="mb-0">{rank}</p>
      </td>

      <td>
        <p className="mb-0">{number}</p>
      </td>

      <td>
        <p className="mb-0 text-primary number-mob">
          {/* {name} */}
          {name ?? '----'}
        </p>
      </td>
      <td>
        <p className="mb-0 text-primary number-mob">{didNumber}</p>
      </td>
      <td>
        <p className="mb-0 text-primary number-mob">{region}</p>
      </td>
      <td>
        <p className="mb-0">
          {/* {callbackScheduled} */}
          {callbackScheduled ?? '----'}
        </p>
      </td>
      <td>
        <p className="mb-0 d-flex align-items-center gap-2">
          <span
            className="d-flex align-items-center justify-content-center fs-12px h-3 w-3 rounded-circle"
            style={{ background: '#BEC5D7' }}
          >
            {initials}
          </span>
          {assigne ?? '----'}
          {/* {assigne} */}
          <span />
        </p>
      </td>
      <td>
        <p className="mb-0 text-mango-orange">{status}</p>
      </td>
      <td>
        <div className="d-flex gap-4 align-items-center justify-content-end">
          <a
            href="/#"
            className="btn start-campaign-call call-now-btn"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: 'call-now-popup',
              });
            }}
          >
            Call Now
          </a>
          <div className="dropdown">
            <a
              href="/#"
              className="dropdown"
              data-bs-toggle="dropdown"
              // aria-expanded="false"
              aria-expanded={dropdownOpen}
              // onClick={(e) => {
              //   e.preventDefault();
              //   setDropdownOpen(!dropdownOpen);
              // }}
            >
              <img src="/assets/dark-vertical-dot.svg" alt="" />
            </a>

            <ul
              // className={` dropdown-menu-group drop-voice  p-3 ${dropdownOpen ? '' : 'd-none'}`}
              className="dropdown-menu dropdown-menu-group drop-voice  p-3"
              // style={{
              //   border: 'none',
              //   backgroundColor: 'white',
              //   boxSizing: 'border-box',
              //   boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.41)',
              //   borderRadius: '6px',
              //   padding: '11px 0',
              //   position: dropdownOpen ? 'absolute' : '',
              //   inset: dropdownOpen ? 'auto 0px 0px auto' : 'auto',
              //   margin: dropdownOpen ? '0px' : 'auto',
              //   transform: dropdownOpen ? `translate(-57.5px, -${50 + index * 50}px)` : 'none',
              //   zIndex: dropdownOpen ? '10' : '',
              // }}
            >
              <li>
                <button
                  type="button"
                  className="mb-0 dropdown-item py-3 px-4"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setShow({
                      isVisible: true,
                      type: 'delete-callback-modal',
                      callBackId: id,
                      callBackNumber: number,
                    });
                    // setDropdownOpen(!dropdownOpen);
                  }}
                >
                  Remove from queue
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="call-back-delete-toast-btn"
                  className="mb-0 dropdown-item py-3 px-4"
                  // onMouseDown={(e) => {
                  //   e.stopPropagation();
                  //   handleReorder();
                  //   setDropdownOpen(!dropdownOpen);
                  // }}
                >
                  Reorder
                </button>
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default CallBackQueue;
