import React, { useEffect, useMemo, useState } from 'react';

import Layout from '../../../common/layout';
import SideMenuAdmin from '../components/SideMenuAdmin';
import CommChatMenu from '../components/CommChatMenu';
import CommVoiceMenu from '../components/CommVoiceMenu';
import {
  isSuperAdminFunction,
  isTenantAdminFunction,
  isTenantUserFunction,
} from '../../../common/helpers/utils';

function CommTelephony() {
  const isTenantUSer = isTenantUserFunction();
  const isTenantAdmin = isTenantAdminFunction();
  const isSuperAdmin = isSuperAdminFunction();

  const [userType, setUserType] = useState('');

  const [onMobileView, setOnMobileView] = useState({
    isMobile: null,
    isProductsVisible: true,
    isCallSettingsVisible: null,
  });

  const [productType, setProductType] = useState('comm-voice');

  const handleStyle = useMemo(() => {
    if (onMobileView?.isMobile) {
      if (onMobileView?.isProductsVisible) {
        return {};
      }
      return { display: 'none' };
    }
    return {};
  }, [onMobileView]);

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
    setOnMobileView({ ...onMobileView, isMobile: window.innerWidth <= 1180 });
    getUSerType();
  }, []);

  useEffect(() => {
    if (onMobileView?.isMobile && onMobileView?.isProductsVisible) {
      setProductType('');
    }
  }, [onMobileView]);

  return (
    <Layout
      headerTitle="Gsoft admin"
      favIcon="/assets/favIcons/favicon-voice.ico"
      title="comm voice"
    >
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 commmon-mob-padding">
              <div
                className=" top-wrap-common-mob "
                id="telephonyMainHead"
                style={
                  onMobileView?.isMobile && onMobileView?.isProductsVisible
                    ? { display: 'none' }
                    : {}
                }
              >
                <div className="d-flex gap-2 align-items-center">
                  <a
                    id="adminBack"
                    href="/#"
                    className="d-block d-lg-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setOnMobileView({
                        ...onMobileView,
                        isProductsVisible: true,
                        isCallSettingsVisible: false,
                      });
                    }}
                  >
                    <img src="/assets/left-arrow-black.svg" alt="" />
                  </a>
                  <p className="mb-0 fs-16px fw-500">Gsoft Admin</p>
                </div>
                <p className="mb-0 mb-lg-4 mt-1">
                  All the configuration of your comm voice application
                </p>
              </div>

              <div className="row">
                <div className="col-12 col-lg-3">
                  <div
                    id="telephonyIndex"
                    className="d-lg-block h-100 shadow-6 rounded"
                    style={handleStyle}
                  >
                    <div className="scroll-custom scroll-landing pt-3">
                      <SideMenuAdmin
                        type={productType}
                        onClick={(type) => {
                          setProductType(type);
                          setOnMobileView({
                            ...onMobileView,
                            isProductsVisible: false,
                            isCallSettingsVisible: true,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {productType === 'comm-chat' && <CommChatMenu onMobileView={onMobileView} />}

                {productType === 'comm-voice' && (
                  <CommVoiceMenu onMobileView={onMobileView} userType={userType} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CommTelephony;
