import React from 'react';
import SideNavFlowLink from './SideNavFlowLink';

function SideNavFlow({ active }) {
  return (
    <div className="accordion virtual-accordion py-4" id="accordionVirtual">
      <SideNavFlowLink
        name="Templates"
        link="/comm-telephony/call-flow-admin/call-flow-template/"
        img="checks.svg"
        active={active === 0}
      />
      <SideNavFlowLink
        name="Components"
        link="/comm-telephony/call-flow-admin/call-flow-components/"
        img="checks.svg"
        active={active === 1}
      />
      <SideNavFlowLink
        name="Menu Options"
        link="/comm-telephony/call-flow-admin/call-flow-menu-options/"
        img="checks.svg"
        active={active === 2}
      />
    </div>
  );
}

export default SideNavFlow;
