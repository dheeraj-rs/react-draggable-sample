import React from 'react';
import Checkbox from '../../../common/components/forms/Checkbox';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Input from '../../../common/components/forms/Input';

function VendorViewCarrierUsage() {
  return (
    <div
      className="offcanvas offcanvas-end offcanwasusage"
      tabIndex="-1"
      id="offcanvasUsage"
      aria-labelledby="offcanvasUsageLabel"
    >
      <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
        <div>
          <p className="fs-16px text-primary fw-medium mb-0">Usage</p>
          <p className="mb-0">Account usage summary</p>
        </div>
        <div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
      </div>
      <div className="offcanvas-body p-23px pt-0px">
        <div className="d-flex gap-4 align-items-center bg-light-blue2 rounded p-3 mb-4 mt-3">
          <p className="mb-0">Usage:</p>
          <p className="mb-0 fw-500">$ 300</p>
        </div>
        <h6 className="fs-14px mt-2 mb-3">Usage history</h6>
        <div className="sidebar-timeline">
          <div className="sidebar-timeline">
            <div className="user-timeline user-accounts">
              <div className="user-amount p-2 bg-light-pnk-bg rounded py-2 mt-4">
                <div className="row">
                  <div className="col-lg-5">
                    <h6 className="fs-13px">Amount credited</h6>
                    <p className="mb-0 fs-13px">2 Jan 2023, 4.30 PM</p>
                  </div>
                  <div className="col-lg-3">
                    <h6 className="fw-normal fs-13px">Amount</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                  <div className="col-lg-4">
                    <h6 className="fw-normal fs-13px">Credit balance</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-timeline user-accounts">
              <div className="user-amount p-2 bg-light-pnk-bg rounded py-2 mt-4">
                <div className="row">
                  <div className="col-lg-5">
                    <h6 className="fs-13px">Amount credited</h6>
                    <p className="mb-0 fs-13px">2 Jan 2023, 4.30 PM</p>
                  </div>
                  <div className="col-lg-3">
                    <h6 className="fw-normal fs-13px">Amount</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                  <div className="col-lg-4">
                    <h6 className="fw-normal fs-13px">Credit balance</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-timeline user-accounts">
              <div className="user-amount p-2 bg-light-pnk-bg rounded py-2 mt-4">
                <div className="row">
                  <div className="col-lg-5">
                    <h6 className="fs-13px">Amount credited</h6>
                    <p className="mb-0 fs-13px">2 Jan 2023, 4.30 PM</p>
                  </div>
                  <div className="col-lg-3">
                    <h6 className="fw-normal fs-13px">Amount</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                  <div className="col-lg-4">
                    <h6 className="fw-normal fs-13px">Credit balance</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-timeline user-accounts user-call-timeline-end">
              <div className="user-amount p-2 bg-light-pnk-bg rounded py-2 mt-4">
                <div className="row">
                  <div className="col-lg-5">
                    <h6 className="fs-13px">Amount credited</h6>
                    <p className="mb-0 fs-13px">2 Jan 2023, 4.30 PM</p>
                  </div>
                  <div className="col-lg-3">
                    <h6 className="fw-normal fs-13px">Amount</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                  <div className="col-lg-4">
                    <h6 className="fw-normal fs-13px">Credit balance</h6>
                    <p className="fw-500 mb-0 fs-13px">$ 200.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- carrier credintials --> */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvascredintials"
            aria-labelledby="offcanvascredintialsLabel"
          >
            <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
              <div>
                <p className="fs-16px text-primary fw-medium mb-0">View Carrier Credentials</p>
                <p className="mb-0">Bharti Banglore</p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
            </div>
            <div className="offcanvas-body p-23px pt-0px">
              <div className="mt-4">
                <p>For access the API you have to confirm below</p>

                <div className="capcha text-center mt-4">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6Lel4Z4UAAAAAOa8LO1Q9mqKRUiMYl_00o5mXJrR"
                  />
                </div>

                <div className="shadow-10 rounded p-3 pt-1">
                  <Input
                    label="Username"
                    // id="userName"s
                    value="BRTH_1234_NEW"
                    type="text"
                    disabled=""
                    onChange={() => {}}
                  />

                  <div className="form-group form-custom-group mt-3">
                    <label className="mt-2 mb-1" htmlFor="group">
                      Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control bg-white border-end-0"
                        // id="confirmPassword"
                        type="password"
                        name="password"
                      />
                      <span className="input-group-text bg-transparent confirm-password-showhide">
                        <i
                          className="fa fa-eye-slash trigger-password pwd-toggle"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <a
                    href="/#"
                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end --> */}
          {/* <!-- edit Carrier Group --> */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasEditGroup"
            aria-labelledby="offcanvasRightEditCarrierGroupLabel"
          >
            <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
              <div>
                <p className="fs-16px text-primary fw-medium mb-0">
                  Edit Carrier group - <span className="text-secondary">Virgin group</span>
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
            </div>
            <div className="offcanvas-body p-23px pt-0px">
              <div>
                <Input
                  label="Carrier Group Name"
                  id="property"
                  placeholder="Enter group name"
                  type="text"
                  disabled={false}
                  value="Contact details"
                  onChange={() => {}}
                />
              </div>

              <div>
                <div className="d-flex flex-column mt-3">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 text-secondary fw-medium fs-13px mb-2">
                      Carriers (optional)
                    </p>
                    <p className="mb-0">
                      <span className="fw-medium">4</span> Carriers selected
                    </p>
                  </div>

                  <div className="dropdown-center">
                    <button
                      className="form-control w-100 form-select text-start bg-white py-12px mb-4"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Choose carriers
                    </button>

                    <div id="selectedCarriers">
                      <div className="d-flex gap-2 flex-wrap shadow-6 p-3 rounded">
                        <div
                          className="alert alert-dismissible bg-original-gray p-2 fade show w-100 py-2 d-flex justify-content-between mb-2"
                          role="alert"
                          id="virginBanglurSelected"
                        >
                          Virgin Banglore
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>

                        <div
                          className="alert alert-dismissible bg-original-gray p-2 fade show w-100 py-2 d-flex justify-content-between mb-2"
                          role="alert"
                          id="virginCochinSelected"
                        >
                          Virgin Cochin
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>
                        <div
                          className="alert alert-dismissible bg-original-gray p-2 fade show w-100 py-2 d-flex justify-content-between mb-2"
                          role="alert"
                          id="virginMumbiSelected"
                        >
                          Virgin Mumbai
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>
                        <div
                          className="alert alert-dismissible bg-original-gray p-2 fade show w-100 py-2 d-flex justify-content-between mb-2"
                          role="alert"
                          id="virginRelianceSelected"
                        >
                          Reliance Chennai
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>
                        <div
                          className="alert alert-dismissible bg-original-gray p-2 fade show w-100 py-2 d-flex justify-content-between mb-2"
                          role="alert"
                          id="virginHydrabadSelected"
                        >
                          Virgin Hyderabad
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <ul className="dropdown-menu shadow-6 p-3 w-100">
                      <div className="w-100 w-md-auto mt-3 mb-3">
                        <SearchWithBorder
                          placeholderText="Search carrier"
                          onChange={() => {}}
                          clearBtn={() => {}}
                        />
                      </div>
                      <div className="">
                        <div className="mb-3 search-carrier">
                          <Checkbox title="All carriers" id="allCarriersSelected" />
                        </div>

                        <div className="mb-3 search-carrier">
                          <Checkbox title="Virgin Banglore" id="virginBanglur" />
                        </div>

                        <div className="mb-3 search-carrier">
                          <Checkbox title="Virgin Cochin" id="virginCochin" />
                        </div>
                        <div className="mb-3 search-carrier">
                          <Checkbox title="Virgin Mumbai" id="virginMumbi" />
                        </div>
                        <div className="mb-3 search-carrier">
                          <Checkbox title="Reliance Chennai" id="virginReliance" />
                        </div>
                        <div className="mb-3 search-carrier">
                          <Checkbox title="Virgin Hyderabad" id="virginHydrabad" />
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
                <button
                  id="editCarrierButton"
                  data-bs-dismiss="offcanvas"
                  type="button"
                  className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                  data-bs-dismiss="offcanvas"
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorViewCarrierUsage;
