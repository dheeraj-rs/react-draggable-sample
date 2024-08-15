import React from 'react';
import Layout from '../../../../common/layout';
import AccountInfoSidebar from './AccountInfoSidebar';
import SocialMediaProfiles from './SocialMediaProfiles';

function AccountInformations() {
  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="d-flex">
          {/* <!-- <SideNav /> --> */}
          <div className="bg-gray-bright w-100">
            {/* <!-- <TopBar /> --> */}
            <div className="d-flex flex-column flex-lg-row gap-3 d-flex flex-column flex-lg-row gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="col-lg-3 col-sm-12 bg-white rounded shadow-1 h-max-content panel-left right-sec-campaign">
                <AccountInfoSidebar active="profile" />
              </div>
              <div
                className="col-lg-9 col-sm-12 pe-0 pe-lg-3 overflow-x-hidden campaign-box rounded"
                id="campaign-box"
              >
                <div className="bg-white shadow-1 rounded scroll-custom campaign-wrapper campaign-right-outer">
                  <h5 className="fs-15px mb-3 text-primary d-flex gap-2 fw-bolder">
                    <a
                      href="/comm-voice-admin/account-information/"
                      className="d-flex justify-content-center d-block d-lg-none"
                    >
                      <img src="/assets/mobile-back.svg" alt="" />
                    </a>{' '}
                    My Profile
                  </h5>
                  <div className="justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-2">
                    {/* <!-- account details --> */}
                    <div className="bg-orange-img-100 rounded p-4">
                      <div className="d-flex justify-content-between flex-column flex-sm-row align-items-sm-center account-my-profile">
                        <div className="d-flex gap-3 align-items-center mb-3 mb-sm-0">
                          <div>
                            <img src="/assets/johnimg.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="fw-bolder fs-14px">John Doe</h6>
                            <p className="mb-0 d-flex gap-2 align-items-center">
                              <span className="text-white fs-10px bg-sky-blue-dark p-1 rounded">
                                Agent
                              </span>{' '}
                              ID: <span className="fw-500">15456</span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="mb-1 d-flex gap-1 align-items-sm-center">
                            <img src="/assets/email.svg" alt="" />
                            <a href="mailto:JohnD@company.com">JohnD@company.com</a>
                          </p>
                          <p className="d-flex gap-1 align-items-sm-center mt-2 mb-0">
                            <img
                              src="/assets/call_outcomin.svg"
                              className="phone-icon-black"
                              alt=""
                            />
                            <a href="#/" className="text-secondary">
                              +989235677865
                            </a>
                          </p>
                        </div>

                        <div className="d-flex gap-3 align-items-center mt-3 mt-sm-0 account-btns">
                          <a className="btn btn-account py-2" href="account-security" role="button">
                            Account Security
                          </a>
                          <a className="btn btn-edit py-2" href="edit-profile" role="button">
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <!-- account details end--> */}

                    <div className="border-account rounded p-4 mt-3">
                      <h6 className="mb-3 fs-14px text-primary fw-500">About Me</h6>
                      <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur.
                      </p>
                    </div>
                    <div className="border-account rounded p-4 mt-3">
                      {/* <!-- basic details --> */}
                      <h6 className="mb-3 fs-14px text-primary fw-500 mt-sm-2">Basic details</h6>

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">First Name</p>
                          <p className="text-primary">John</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Middle Name</p>
                          <p className="text-primary">-</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Last Name</p>
                          <p className="text-primary">Doe</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Phone (Personal)</p>
                          <p className="text-primary">+989235677865</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Email</p>
                          <a
                            href="mailto:JohnD@company.com"
                            className="text-darker-blue text-break"
                          >
                            JohnD@company.com
                          </a>
                        </div>
                        <div className="col-sm-3 ">
                          <p className="mb-1 text-secondary mt-3 mt-sm-0">City</p>
                          <p className="text-primary">Chicago</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary mt-2 mt-sm-0">Country</p>
                          <p className="text-primary">United States</p>
                        </div>

                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary mt-2 mt-sm-0">Zip Code</p>
                          <p className="text-primary">452654</p>
                        </div>
                      </div>
                    </div>

                    {/* <!-- basic details --> */}

                    <div className="border-account rounded p-4 mt-3">
                      {/* <!-- professional details --> */}
                      <h6 className="mb-3 fs-14px text-primary fw-500 mt-2">
                        Professional details
                      </h6>

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Company</p>
                          <p className="text-primary">ABC International</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Role</p>
                          <p className="text-primary">Executive admin</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Phone (Work)</p>
                          <p className="text-primary">+989235677865</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary">Email(Work)</p>
                          <a
                            href="mailto:JohnD@company.com"
                            className="text-darker-blue text-break"
                          >
                            JohnD@company.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <SocialMediaProfiles />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccountInformations;
