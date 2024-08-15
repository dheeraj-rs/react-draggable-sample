import React, { useState } from 'react';
import NotificationPreferenceList from './NotificationPreferenceList';
import AccountInfoSidebar from './AccountInfoSidebar';
import Layout from '../../../../common/layout';

const PreferenceList = [
  {
    title: 'Account alert notifications',
    content: 'Get notifications on every account related activities',
  },
  {
    title: 'Call notifications',
    content: 'Get notifications on inbound and outbound calls statuses',
  },
  { title: 'SMS notifications', content: 'Get notifications on every sms status' },
  {
    title: 'Campaign notifications',
    content: 'Get notifications on every currently running and upcoming campaigns status ',
  },
  {
    title: 'Task notifications',
    content: 'Get notifications on individual tasks created and its states.',
  },
  {
    title: 'Other notifications',
    content: 'Get notifications on other application related activities.',
  },
];

function NotificationPreference() {
  const [activeCheckbox, setActiveCheckbox] = useState([]);
  const handleActiveCheckbox = (index) => {
    if (activeCheckbox.includes(index)) {
      const filter = activeCheckbox.filter((id) => id !== index);
      setActiveCheckbox(filter);
    } else {
      setActiveCheckbox([...activeCheckbox, index]);
    }
  };

  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="d-flex">
          <div className="bg-gray-bright w-100">
            <div className="d-flex flex-column flex-lg-row gap-3 d-flex flex-column flex-lg-row gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="col-lg-3 col-sm-12 bg-white rounded shadow-1 h-max-content panel-left right-sec-campaign">
                <AccountInfoSidebar active="notifications" />
              </div>
              <div
                className="col-lg-9 col-sm-12 pe-0 pe-lg-3 overflow-x-hidden campaign-box rounded"
                id="campaign-box"
              >
                <div className="bg-white shadow-1 rounded scroll-custom campaign-wrapper campaign-right-outer">
                  <h5 className="fs-16px mb-4 text-primary d-flex gap-2 d-block d-lg-none fw-bolder">
                    <a
                      href="/comm-voice-admin/account-information/"
                      className="d-flex justify-content-center"
                    >
                      <img src="/assets/mobile-back.svg" alt="" />
                    </a>{' '}
                    Notification Settings
                  </h5>
                  <h5 className="fs-15px mb-3 text-primary d-flex gap-2 fw-bolder">
                    Notification Preference
                  </h5>

                  {PreferenceList.map((item, index) => (
                    <NotificationPreferenceList
                      key={index}
                      title={item.title}
                      content={item.content}
                      checked={activeCheckbox.includes(index)}
                      onClick={() => {
                        handleActiveCheckbox(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotificationPreference;
