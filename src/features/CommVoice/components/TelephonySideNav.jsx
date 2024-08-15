import React from 'react';
import TabsTelephony from './TabsTelephony';
import TabsTelephonyBadge from './TabsTelephonyBadge';

function TelephonySideNav({ active }) {
  return (
    <div className="col-lg-3 col-sm-12 bg-white rounded shadow-1 d-none d-lg-block">
      <div className="panel-settings bg-white  rounded">
        <div className="d-flex flex-column gap-1 p-23px">
          <p className="fs-14px fw-medium text-primary mb-0">My Account</p>
          <p className="fs-13px text-secondary mb-0">Account management tools</p>
        </div>

        <TabsTelephony
          img="/assets/account-info.svg"
          active={active === 0}
          title="Account Information"
          desc="My company basic info, address, and billing address etc."
          path="/comm-telephony-contact-group/basic-information"
        />

        <TabsTelephonyBadge
          img="/assets/kyc-doc.svg"
          active={active === 1}
          title="KYC Documents"
          desc="Indian telecom regulations demands us to verify your KYC."
          path="/comm-telephony-contact-group/kyc-documents"
        />
        <hr className="m-0 border-black o-16" />
        <TabsTelephony
          img="/assets/general-settings.svg"
          active={active === 2}
          title="General Settings"
          desc="Customize the applications with advanced settings."
          path="/comm-telephony-contact-group/general-settings"
        />
      </div>
    </div>
  );
}

export default TelephonySideNav;
