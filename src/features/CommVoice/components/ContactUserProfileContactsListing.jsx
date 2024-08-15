import React from 'react';
import CallLog from './CallLog';

function ContactUserProfileContactsListing() {
  return (
    <div id="chat-expand" className="col-lg-10 mx-auto">
      <div className="panel-center bg-white rounded-bottom">
        <div className="p-23px pt-0 user-list-profile scroll-custom">
          <div className="response-search">
            <div className="d-flex justify-content-start align-items-center flex-column">
              <div>
                <p className="text-primary fw-medium fs-14px mb-0">Call log</p>
              </div>

              <p className="text-secondary">
                Details of the accounts in which this agent associated
              </p>
            </div>
          </div>
          {/* <!-- table section starts --> */}
          {/* <!-- web view starts --> */}
          <div className="table-responsive">
            <table className="table table-user-profile mt-3">
              <thead>
                <tr>
                  <th scope="col">Call Date</th>
                  <th scope="col">Agent</th>
                  <th scope="col">Call Duration</th>
                  <th scope="col">Call Status</th>
                  <th scope="col">Call info</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                <CallLog
                  date="22 Dec 2022"
                  time="04:30:12"
                  timeZone="UTC +5:30"
                  name="Steven Paul"
                  duration="0:50:00"
                  status="Completed"
                />
                <CallLog
                  date="22 Dec 2022"
                  time="04:30:12"
                  timeZone="UTC +5:30"
                  name="Kevin Paul"
                  duration="0:00:00"
                  status="Failed"
                />
                <CallLog
                  date="22 Dec 2022"
                  time="04:30:12"
                  timeZone="UTC +5:30"
                  name="Mathew Stock"
                  duration="0:50:00"
                  status="Completed"
                />
                <CallLog
                  date="22 Dec 2022"
                  time="04:30:12"
                  timeZone="UTC +5:30"
                  name="Melvin Sam"
                  duration="0:50:00"
                  status="Completed"
                />
                <CallLog
                  date="22 Dec 2022"
                  time="04:30:12"
                  timeZone="UTC +5:30"
                  name="Steven Paul"
                  duration="0:50:00"
                  status="Completed"
                />
              </tbody>
            </table>
          </div>
          {/* <!-- web view end --> */}

          <div className="d-flex flex-row align-items-center shadow-1 p-3">
            <div className="d-flex align-items-center gap-3">
              <span className="bg-blue-lily border-0 rounded h-4 w-4 d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold">
                5
              </span>{' '}
              Records per page
            </div>
            <div className="ms-auto">
              <nav aria-label="Page navigation contact">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                      href="/#"
                      aria-label="Previous"
                    >
                      <img src="/assets/pagination-left.svg" alt="" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded bg-transparent-hover fw-semibold text-blue-active"
                      href="/#"
                    >
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className="page-link border-0 rounded bg-transparent-hover fw-semibold text-primary"
                      href="/#"
                    >
                      2
                    </a>
                  </li>

                  <li className="page-item">
                    <a
                      className="page-link previous bg-blue-lily border-0 rounded d-flex flex-column align-items-center justify-content-center fs-11px fw-semibold"
                      href="/#"
                      aria-label="Previous"
                    >
                      <img src="/assets/pagination-right.svg" alt="" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* <!-- table section ends --> */}
        </div>
      </div>
    </div>
  );
}

export default ContactUserProfileContactsListing;
