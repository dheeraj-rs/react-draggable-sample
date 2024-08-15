import React from 'react';

function DepartmentsHeader() {
  return (
    <div id="headerVoice">
      <div className="col-lg-12">
        <div className="bg-white rounded p-23px w-100">
          <div className="row">
            <div className="col-lg-8 col-sm-8">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-2 left-mob">
                  <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                    <a href="/comm-telephony/" className="d-flex justify-content-center">
                      <img src="/assets/leftback.svg" alt="" />
                    </a>
                  </div>
                  <div>
                    <h5 className="fs-16px fw-500 d-flex gap-3">
                      <a href="/comm-telephony/" className="d-block d-lg-none">
                        <img src="/assets/leftback.svg" className="me-2" alt="" />
                      </a>{' '}
                      Agents and Departments
                    </h5>
                    <p className="text-secondary">Manage agents based on their departments</p>
                  </div>
                </div>
                {/* <!-- mobile view only --> */}
                <div id="mobileCompany" className="d-flex align-items-center d-block d-lg-none">
                  <a
                    href="/#"
                    className="bg-white border d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded fw-semibold"
                  >
                    <img src="/assets/mobile-company.svg" alt="" />
                  </a>
                </div>
                {/* <!-- mobile view only --> */}
              </div>
            </div>

            <div className="col-lg-4 col-sm-12">
              <div className="d-flex gap-3 align-items-center float-start float-lg-end mt-4">
                {/* <!-- call button --> */}
                <a
                  data-bs-toggle="collapse"
                  href="#startCalling"
                  className="bg-black d-flex align-items-center text-white px-sm-5 px-10px px-lg-4 py-12px rounded call-button"
                >
                  <i className="me-2">
                    <span>
                      <img src="/assets/call-white-icon.svg" alt="# " />
                    </span>
                  </i>
                  <span>Call</span>
                </a>
                {/* <!-- call button --> */}
                {/* <!-- sms button --> */}
                <a
                  href="/#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSms"
                  aria-controls="offcanvasSms"
                  className="bg-black d-flex align-items-center text-white px-sm-5 px-10px px-lg-4 py-12px rounded"
                >
                  <i className="me-2">
                    <span>
                      <img src="/assets/sms-white.svg" alt="# " />
                    </span>
                  </i>
                  <span>SMS</span>
                </a>
                {/* <!-- sms button --> */}
                {/* <!-- campaign button --> */}
                <a
                  href="/#"
                  className="bg-white d-flex align-items-center text-blue-active px-sm-5 px-10px px-lg-4 py-12px rounded border border-blue-active fw-bolder"
                >
                  <i className="me-2">
                    <span>
                      <img src="/assets/campaign-blue.svg" alt="# " />
                    </span>
                  </i>
                  <span>Campaigns</span>
                </a>
                {/* <!-- campaign button --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentsHeader;
