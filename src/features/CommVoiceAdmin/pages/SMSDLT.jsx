import React from 'react';
import Layout from '../../../common/layout';
import SMSSideNav from '../components/SMSSideNav';
import Input from '../../../common/components/forms/Input';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function SMSDLT() {
  return (
    <Layout>
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area scroll-custom sms-scroll-touch">
                <div id="headerVoice" className="d-none d-lg-block">
                  {/* <!-- voice library header starts--> */}
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12 ps-0">
                          <div className="d-flex gap-2 align-items-start">
                            <a href="/#" className="d-block d-lg-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <a
                                href="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </a>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">SMS Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage all SMS settings information in an organized list.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  {/* <!-- voice library header starts--> */}
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <a id="voiceHeaderMainMob" href="/comm-voice-admin/">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <a id="voiceHeaderMob" href="/#" className="d-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <a
                                href="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </a>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">SMS Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage all SMS settings information in an organized list.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- voice library header ends--> */}
                {/* <!-- sms menu starts --> */}
                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 pe-xl-4 pb-xl-4 pe-3">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="inbox-voice-wrapper scroll-custom">
                        <div>
                          <SMSSideNav active={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!--.col-3--> */}

                {/* <!-- All send starts --> */}

                <div id="voice-expand" className="col-lg-9 col-sm-12">
                  <div className="scroll-custom scroll-carrier carrier-pad sms-padding">
                    <div className="d-flex gap-4 align-items-center mb-3 mt-3">
                      <h6 className="mb-0">SMS DLT</h6>
                    </div>

                    <div className="sms-dlt p-5 py-4 rounded bg-white d-flex  mb-3 gap-4 pb-5">
                      <div className="row">
                        <div className="col-sm-5">
                          <Input
                            type="text"
                            label="Enity ID"
                            placeholder=""
                            value="SMS template_777"
                            id="entity"
                          />
                        </div>
                        <div className="col-sm-7 mt-3 mt-lg-5">
                          <p className="mb-0 text-secondary">
                            Note: Entity ID is a unique numeric identifier for your business. You
                            can find it on the DLT operator portal.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12  d-flex justify-content-start align-items-center  border-0 mb-4 mt-4">
                        <button
                          type="button"
                          id="smsDLT"
                          className="btn bg-black d-flex align-items-center text-white  px-4 py-12px"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          id="dltClear"
                          className=" d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 ms-3 py-12px "
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- SMS  ends --> */}
                </div>
              </div>
              {/* <!--.col--9--> */}
            </div>
          </div>
        </div>
      </div>
      <ToastSuccess id="entityToastMsg">Entity ID been saved successfully.</ToastSuccess>
    </Layout>
  );
}

export default SMSDLT;
