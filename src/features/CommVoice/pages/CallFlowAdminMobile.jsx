import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import SideNavFlow from '../components/SideNavFlow';

function CallFlowAdminMobile() {
  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area">
                <div id="headerVoice" className="d-none d-lg-block">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <a href="/#" className="d-block d-lg-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/call-flow-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Flows Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Configure call flow components and related settings
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link id="voiceHeaderMainMob" to="/comm-voice-admin/call-flow-admin/">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <a id="voiceHeaderMob" href="/#" className="d-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link to className="d-flex justify-content-center">
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Flows Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Configure call flow components and related settings
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 pe-xl-4 pb-xl-4 pe-3">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="scroll-custom">
                        <div>
                          <SideNavFlow active={0} />
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
    </Layout>
  );
}
export default CallFlowAdminMobile;
