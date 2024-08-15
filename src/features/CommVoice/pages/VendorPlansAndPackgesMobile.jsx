import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import SideMenu from '../components/common/SideMenu';

function VendorPlansAndPackgesMobile() {
  return (
    <Layout>
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link to="/comm-telephony/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                    <Link to="/comm-telephony/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Vendor Plan & Packages
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-12">
                    <SideMenu />
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

export default VendorPlansAndPackgesMobile;
