import React from 'react';
import { Link } from 'react-router-dom';
import AccountInformationLeft from './AccountInformationLeft';

function AccountInfoSidebar({ active }) {
  return (
    <div className="campaign-wrapper scroll-custom campaign-wrapper-left ">
      <div id="headerCampaign">
        {/* <!-- message template back button web --> */}

        <div className="d-flex gap-2 align-items-center mb-4">
          <div role="button" className="left-widget d-none d-lg-block">
            <Link to="/comm-voice-admin" className="d-flex justify-content-center">
              <img src="/assets/leftback.svg" alt="" />
            </Link>
          </div>
          {/* <!-- message template back button mob --> */}
          <div role="button" className="left-widget d-block d-lg-none">
            <Link to="/comm-voice-admin" className="msg-temp-back d-flex justify-content-center">
              <img src="/assets/leftback.svg" alt="" />
            </Link>
          </div>
          <div className="d-flex flex-column msg-temp-back">
            <p className="msg-template-back fs-14px fw-bolder text-primary mb-0">
              Account Information
            </p>
          </div>
          {/* <!-- sms template back button  mob--> */}

          <div role="button" className="sms-temp-back d-flex d-none align-items-center gap-2">
            <Link to="/account-information" className="d-flex justify-content-center">
              <img src="/assets/mobile-back.svg" alt="" />
            </Link>
            <p className="msg-template-back fs-14px fw-bolder text-primary mb-0">
              Account Information
            </p>
          </div>
        </div>
      </div>
      <div>
        <AccountInformationLeft
          active={active === 'profile' || false}
          title="My Profile"
          subTitle="Your personal information"
          path="/comm-voice-admin/account-information/"
          image="my-profile.svg"
        />
        <AccountInformationLeft
          active={active === 'company' || false}
          title="Company Profile"
          subTitle="Get APIs of the application"
          path="/comm-voice-admin/account-information/company-profile"
          image="building-1.svg"
        />
        <AccountInformationLeft
          active={active === 'integration' || false}
          title="Integration"
          subTitle="Get APIs of the application"
          path="/comm-voice-admin/account-information/integration"
          image="integration.svg"
        />
        <AccountInformationLeft
          active={active === 'document' || false}
          title="Documents"
          subTitle="Your document list"
          path="/comm-voice-admin/account-information/documents"
          image="approve1.svg"
        />
        <AccountInformationLeft
          active={active === 'notifications' || false}
          title="Notification Preference"
          subTitle="Manage notifications"
          path="/comm-voice-admin/account-information/notification-preference"
          image="notification-1.svg"
        />
      </div>
    </div>
  );
}

export default AccountInfoSidebar;
