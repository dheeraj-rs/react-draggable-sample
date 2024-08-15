import React from 'react';

function ContactUserProfileCallLogCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end offcanvas-size-xl"
      tabIndex="-1"
      id="offcanvasCallLog"
      aria-labelledby="offcanvasCallLogLabel"
    >
      <div className="offcanvas-header px-4 pt-4 pb-2">
        <h5 className="offcanvas-title fs-16px fw-medium" id="offcanvasCallLogLabel">
          Call Details
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body px-4">
        <div className="mt-4">
          <div className="d-flex flex-column flex-lg-row justify-content-center p-3 rounded bg-ash-white gap-4">
            <div className="d-flex gap-2">
              <div>
                <img src="/assets/forerun-build.svg" alt="" />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fw-medium">Forerun.com</p>
                <p className="mb-0 text-secondary">1800234564</p>
              </div>
            </div>
            <div>
              <img src="/assets/log.svg" alt="" />
            </div>
            <div className="d-flex gap-2">
              <div>
                <img src="/assets/user-empty.svg" alt="" />
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 fw-medium">9876543533</p>
                <p className="mb-0 text-secondary">Airtel</p>
              </div>
            </div>
            <div>
              <img src="/assets/speaker.svg" alt="" />
            </div>
          </div>
        </div>
        {/* <!-- tab starts --> */}

        <div className="tab-ticket mt-4">
          <ul
            className="nav nav-pills nav-call-details bg-white mb-3 d-flex align-items-center justify-content-between rounded"
            id="pills-tab-search"
            role="tablist"
          >
            <li
              className="nav-item new-ticket-mb nav-call-tab active"
              id="pills-ticket"
              data-bs-toggle="pill"
              data-bs-target="#pills-new-ticket-reopen"
              role="presentation"
              style={{ width: '50%' }}
            >
              <span className="fw-medium">Call info</span>
            </li>
            <li
              className="nav-item new-ticket-mb nav-call-tab"
              role="presentation"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-ext-ticket-reopen"
              style={{ width: '50%' }}
            >
              <span className="fw-medium d-flex align-items-center justify-content-center">
                Call timeline
              </span>
            </li>
          </ul>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active mt-4"
              id="pills-new-ticket-reopen"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="table-responsive">
                <table className="table table-call-log">
                  <tbody>
                    <tr className="mt-5">
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Talk time</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Hold time</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Acknowledgement time</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="mt-5">
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Wait time</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Call Cost</p>
                          <p className="mb-0 text-primary fw-medium">₹0.45</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">IVR time</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="mt-5">
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Ringing time</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Talking velocity</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <p className="mb-0 text-secondary">Time to answer</p>
                          <p className="mb-0 text-primary fw-medium">00m 00s</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-ext-ticket-reopen"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="call-timeline">
                <div className="d-flex gap-4">
                  <a href="/#" className="text-blue-active fw-medium">
                    <img className="pe-1" src="/assets/csv.svg" alt="" />
                    To CSV
                  </a>
                  <a href="/#" className="text-blue-active fw-medium">
                    <img className="pe-1" src="/assets/excel.svg" alt="" />
                    To Excel
                  </a>
                </div>
                <div className="sidebar-timeline">
                  <div className="sidebar-timeline">
                    <div className="user-timeline user-history">
                      <div className="user-action p-1">
                        <div className="text-primary">
                          <span className="fw-medium pe-2">Call dialed to</span>+91234-3456-345
                          <span />
                        </div>
                        <div className="text-secondary p-1 rounded bg-harp">05:13:20</div>
                      </div>
                    </div>

                    <div className="user-timeline  user-call-timeline">
                      <div className="user-action p-1">
                        <div className="text-primary">
                          <span className="fw-medium pe-2">Ringing at</span>+91234-3456-345
                          <span />
                        </div>
                        <div className="text-secondary p-1 rounded bg-harp">05:13:20</div>
                      </div>
                    </div>
                    <div className="user-timeline  user-call-timeline">
                      <div className="user-action p-1">
                        <div className="text-primary">
                          <span className="fw-medium pe-2">Call picked up by</span>+91234-3456-345
                          <span />
                        </div>
                        <div className="text-secondary p-1 rounded bg-harp">05:13:20</div>
                      </div>
                    </div>
                    <div className="user-timeline user-call-timeline user-call-timeline-end">
                      <div className="user-action p-1">
                        <div className="text-primary">
                          <span className="fw-medium pe-2">Call disconnected </span>
                          +91234-3456-345
                          <span />
                        </div>
                        <div className="text-secondary p-1 rounded bg-harp">05:13:20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUserProfileCallLogCanvas;
