import React from 'react';
import SMSSideNavLink from './SMSSideNavLink';

function SMSSideNav({ active }) {
  return (
    <div className="accordion virtual-accordion py-4" id="accordionVirtual">
      <SMSSideNavLink
        name="SMS Templates"
        link="/comm-voice-admin/sms-settings/"
        img="sms-icon-blue.svg"
        active={active === 0}
      />
      <SMSSideNavLink
        name="SMS Sender IDs"
        link="/comm-voice-admin/sms-settings/sms-sender-id"
        img="sms-icon-blue.svg"
        active={active === 1}
      />
      <SMSSideNavLink
        name="SMS DLT"
        link="/comm-voice-admin/sms-settings/sms-dlt"
        img="sms-icon-blue.svg"
        active={active === 2}
      />
    </div>
  );
}

export default SMSSideNav;
