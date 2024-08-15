import React, { useEffect, useState } from 'react';
import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import LandingPageListing from '../../CommVoice/pages/LandingPageListing';
import {
  isSuperAdminFunction,
  isTenantAdminFunction,
  isTenantUserFunction,
} from '../../../common/helpers/utils';
import {
  CallSettingsMenu,
  PlanBillingMenu,
  SettingsMenu,
} from '../../../common/layout/components/navbars/menu';

function CommVoiceAdmin() {
  const isTenantUSer = isTenantUserFunction();
  const isTenantAdmin = isTenantAdminFunction();
  const isSuperAdmin = isSuperAdminFunction();

  const [userType, setUserType] = useState('');

  const getUSerType = () => {
    if (isSuperAdmin) {
      setUserType('super-admin');
    } else if (isTenantAdmin) {
      setUserType('tenant-admin');
    } else if (isTenantUSer) {
      setUserType('tenant-user');
    }
    return null;
  };

  useEffect(() => {
    getUSerType();
  }, []);

  return (
    <Layout
      title="comm voice"
      favIcon="/assets/favIcons/favicon-voice.ico"
      headerTitle="Settings"
      sideNavIcon="/assets/comm-voice-logo.svg"
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scroll-custom scroll-landing-admin  h-100 commmon-mob-padding ">
              <div
                className="top-wrap-common-mob d-flex justify-content-between align-items-center"
                id="telephonyMainHead"
              >
                <div>
                  <div className="d-flex gap-2 align-items-center">
                    <a
                      id="adminBack"
                      className="d-block d-lg-none"
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <img src="/assets/left-arrow-black.svg" alt="" />
                    </a>
                    <p className="mb-0 fs-16px fw-500">Comm Voice Admin</p>
                  </div>

                  <p className="mb-2 mb-lg-4 mt-1">
                    All the configuration of your comm voice application
                  </p>
                </div>
                <div className="col-sm-4 d-none d-sm-block">
                  <SearchWithBorder
                    placeholderText="Search"
                    onChange={() => {}}
                    clearBtn={() => {}}
                  />
                </div>
              </div>

              <div className="row">
                <div id="adminMainSec" className="equal-pad">
                  <div className="carrier-pad ps-3 pe-2">
                    <div className="col-lg-4 col-sm-12 mt-2 mt-lg-1 mt-sm-4 mb-4 d-block d-sm-none">
                      <SearchWithBorder
                        placeholderText="Search"
                        onChange={() => {}}
                        clearBtn={() => {}}
                      />
                    </div>
                    <h5 className="mb-0 fs-15px mt-sm-4">Call Settings</h5>

                    <div className="row mt-3">
                      {CallSettingsMenu?.map((item, index) => (
                        <div
                          key={index}
                          className={`col-lg-4 col-sm-6 mb-4 ${
                            item?.visibility?.includes(userType) ? '' : 'd-none'
                          }`}
                        >
                          <LandingPageListing
                            img={item?.img}
                            title={item?.title}
                            link={item?.link}
                            desc={item?.desc}
                            isVisible
                          />
                        </div>
                      ))}
                    </div>
                    <h5 className="mb-3 mt-3">Settings</h5>

                    <div className="row">
                      {SettingsMenu?.map((item, index) => (
                        <div
                          key={index}
                          className={`col-lg-4 col-sm-6 mb-4 ${
                            item?.visibility?.includes(userType) ? '' : 'd-none'
                          }`}
                        >
                          <LandingPageListing
                            img={item?.img}
                            title={item?.title}
                            link={item?.link}
                            desc={item?.desc}
                            isVisible
                          />
                        </div>
                      ))}
                    </div>

                    <h5 className="mb-3 mt-3">Plan & Billing</h5>

                    <div className="row">
                      {PlanBillingMenu?.map((item, index) => (
                        <div
                          key={index}
                          className={`col-lg-4 col-sm-6 mb-4 ${
                            item?.visibility?.includes(userType) ? '' : 'd-none'
                          }`}
                        >
                          <LandingPageListing
                            img={item?.img}
                            title={item?.title}
                            link={item?.link}
                            desc={item?.desc}
                            isVisible
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </Layout>
  );
}

export default CommVoiceAdmin;
