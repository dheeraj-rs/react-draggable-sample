import React from 'react';
import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CalendarTab from '../../../common/components/common/CalendarTab';

function Landing() {
  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100">
              <h5 className="fs-16px fw-500">Comm Voice Admin</h5>
              <p>All the configuration of your comm voice application</p>
              <hr />
              <div className="equal-pad">
                <div className="col-lg-4 col-sm-12 mt-5 mb-4">
                  <SearchWithBorder
                    placeholderText="Search"
                    onChange={() => {}}
                    clearBtn={() => {}}
                  />
                </div>
                <h5 className="mb-0">Settings</h5>

                <div className="row">
                  <div className="col-lg-4 col-sm-12 mt-4 d-flex">
                    <CalendarTab
                      img="/assets/Account-admintools.svg"
                      title="Account Information"
                      link="/comm-telephony/account-information/"
                      desc="Company basic info, address, KYC and billing address etc."
                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mt-4 d-flex">
                    <CalendarTab
                      img="/assets/comm-admin-tool-icons.svg"
                      title="Agents & Departments"
                      link="/comm-telephony/agents-departments/"
                      desc="Manage agents based on their departments"
                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mt-4 d-flex">
                    <CalendarTab
                      img="/assets/General-settings-icon.svg"
                      title="General Settings"
                      link="/comm-telephony/comm-general-settings/"
                      desc="Customize the applications with advanced settings."
                    />
                  </div>
                  <div className="col-lg-4 col-sm-12 mt-4 d-flex">
                    <CalendarTab
                      img="/assets/roles-icon.svg"
                      title="Roles and Permissions"
                      link="/comm-telephony/roles-and-permissions/"
                      desc="Manage roles and associated permissions to users."
                    />
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

export default Landing;
