import React from 'react';
import Layout from '../../../../common/layout';
import AccountInfoSidebar from './AccountInfoSidebar';
import SocialMediaProfiles from './SocialMediaProfiles';

function CompanyProfile() {
  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="d-flex">
          {/* <!-- <SideNav /> --> */}
          <div className="bg-gray-bright w-100">
            {/* <!-- <TopBar /> --> */}
            <div className="d-flex flex-column flex-lg-row gap-3 d-flex flex-column flex-lg-row gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="col-lg-3 col-sm-12 bg-white rounded shadow-1 h-max-content panel-left right-sec-campaign">
                <AccountInfoSidebar active="company" />
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
                    Company Profile
                  </h5>
                  <div className="justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-2">
                    {/* <!-- account details --> */}
                    <div className="bg-dark-blue-light-sky rounded p-4">
                      <div className="d-flex justify-content-between flex-column flex-sm-row align-items-sm-center">
                        <div className="col-xl-4 d-flex gap-3 align-items-center mb-3 mb-sm-0">
                          <div className="bg-white rounded-circle p-3 shadow-1">
                            <img src="/assets/business-and-trade.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="fw-500 fs-14px">Forerun Global pvt. ltd.</h6>
                            <p className="mb-0">Chicago, United States</p>
                          </div>
                        </div>

                        <div className="col-xl-4">
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
                            <a href="#/" className="text-secondary ">
                              +989235677865
                            </a>
                          </p>
                        </div>

                        <div className="col-xl-4 d-flex gap-3 align-items-center mt-3 mt-sm-0 justify-content-xl-end">
                          <a
                            className="btn btn-edit py-2 px-4 button-edit"
                            href="edit-profile"
                            role="button"
                          >
                            Edit
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <!-- account details end--> */}

                    <div className="border-account rounded p-4 mt-3">
                      <h6 className="mb-3 fs-14px text-primary fw-500 mt-2">About Company</h6>
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
                      <h6 className="mb-3 fs-14px text-primary fw-500 mt-sm-2">Company details</h6>

                      <div className="row">
                        <div className="col-sm-3 mt-2">
                          <p className="mb-1 text-secondary">Company Name</p>
                          <p className="text-primary">Forerun Global</p>
                        </div>
                        <div className="col-sm-3 mt-2">
                          <p className="mb-1 text-secondary">Business Type</p>
                          <p className="text-primary">Telecom</p>
                        </div>
                        <div className="col-sm-3 mt-2">
                          <p className="mb-1 text-secondary">Company Email</p>
                          <p>
                            <a
                              href="mailto:JohnD@company.com"
                              className="text-darker-blue text-break"
                            >
                              mycompany@domain.com
                            </a>
                          </p>
                        </div>
                        <div className="col-sm-3 mt-2">
                          <p className="mb-1 text-secondary">Company Phone</p>
                          <p className="text-primary mob-num">+989235677865</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3 mt-2">
                          <p className="mb-1 text-secondary">Website</p>
                          <p>
                            <a href="https://mycompany.com" className="text-darker-blue text-break">
                              https://mycompany.com
                            </a>
                          </p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary mt-2">Country</p>
                          <p className="text-primary">United States</p>
                        </div>
                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary mt-2">City</p>
                          <p className="text-primary">Chicago</p>
                        </div>

                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary mt-2">Zip Code</p>
                          <p className="text-primary">452654</p>
                        </div>

                        <div className="col-sm-3">
                          <p className="mb-1 text-secondary mt-2">Company Address</p>
                          <p className="text-primary">
                            Address line 1,
                            <br />
                            Address line 2,
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <!-- basic details --> */}
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

export default CompanyProfile;
