/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import Layout from '../../../common/layout';
import TabsInbox from '../../../common/components/common/TabsInbox';
import CalendarTab from '../../../common/components/common/CalendarTab';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';

function ChatWidget() {
  const isActive = true;
  const [searchTerm, setSearchTerm] = useState('');

  const [onMobileView, setOnMobileView] = useState({
    isMobile: false,
    allSettings: true,
    configurations: false,
  });

  useEffect(() => {
    setOnMobileView({ ...onMobileView, isMobile: window.innerWidth <= 1180 });
  }, []);

  return (
    <Layout
      title="comm chat"
      headerTitle="Settings"
      favIcon="/favicon.svg"
      sideNavIcon="/assets/sidenav/g-logo.svg"
    >
      <div className="wrapper ">
        <div className="d-flex">
          <div className="bg-gray-bright w-100 ">
            <div className="d-flex flex-column flex-lg-row gap-3 d-flex flex-column flex-lg-row gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit ">
              <div
                className="col-lg-3 col-sm-12 bg-white rounded shadow-1 h-max-content panel-left"
                style={
                  onMobileView?.isMobile
                    ? onMobileView?.allSettings
                      ? {}
                      : { display: 'none' }
                    : {}
                }
              >
                <div className="d-flex flex-column gap-1 p-23px">
                  <p className="fs-14px fw-medium text-primary mb-0">Inbox Admin tools</p>
                  <p className="fs-13px text-secondary mb-0">All settings related to your chat</p>
                </div>
                <hr className="m-0 border-black o-16" />
                <TabsInbox
                  img="/assets/configuration.svg"
                  active={isActive}
                  title="Configurations"
                  desc="Manage and configure chat related settings"
                  path=""
                  onClick={() => {
                    setOnMobileView({ ...onMobileView, allSettings: false, configurations: true });
                  }}
                />
                <hr className="m-0 border-black o-16" />
                <TabsInbox
                  img="/assets/chat-settings.svg"
                  active={false}
                  title="Chat Settings"
                  desc="Manage and configure chat related settings"
                  path=""
                  onClick={() => {
                    setOnMobileView({ ...onMobileView, allSettings: false, configurations: true });
                  }}
                />
              </div>
              <div
                id="chat-expand"
                className="col-lg-9 col-sm-12 pe-0 pe-lg-3 d-lg-block"
                style={
                  onMobileView?.isMobile
                    ? onMobileView?.configurations
                      ? {}
                      : { display: 'none' }
                    : {}
                }
              >
                <div className=" p-23px bg-white shadow-1 rounded h-100">
                  <div className="d-flex flex-column flex-lg-row">
                    <div className="col-lg-9 col-sm-12">
                      <div className="d-flex flex-column">
                        <p className="fs-17px text-primary fw-500 mb-0">Configurations</p>
                        <p className="text-secondary fs-12px mb-0">
                          Manage and configure chat related settings
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-12 mt-3 mt-lg-0">
                      <SearchWithBorder
                        placeholderText="Search Settings"
                        searchTerm={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e?.target?.value);
                        }}
                        clearBtn={() => {
                          setSearchTerm('');
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-12 mt-4 d-flex">
                      <CalendarTab
                        img="/assets/channels.svg"
                        title="Channels"
                        link="/chat-widget/new-widget"
                        desc="Integrate channels to simplify the chatting experience."
                      />
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

export default ChatWidget;
