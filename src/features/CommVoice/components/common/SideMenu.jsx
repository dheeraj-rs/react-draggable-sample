import React from 'react';
import SideMenuLink from './SideMenuLink';

function SideMenu({ active = null }) {
  return (
    <div className="accordion virtual-accordion  rounded" id="accordionVirtual">
      <SideMenuLink
        name="Carrier group"
        link="/comm-telephony/vendor-plans-and-packges"
        active={active === 0}
      />
      <SideMenuLink name="Carriers" link="/comm-telephony/vendor-carriers" active={active === 1} />
      <SideMenuLink name="Batch" link="/comm-telephony/vendor-batch" active={active === 2} />
      <SideMenuLink name="Lot" link="/comm-telephony/vendor-lot" active={active === 3} />
      <SideMenuLink
        name="Local Switch"
        link="/comm-telephony/vendor-local-switch"
        active={active === 4}
      />
      <div className="accordion-item virtual-item bg-white">
        <h2 className="accordion-header virtual-header">
          <p className="virtual-button  text-primary fw-medium collapsed">Plans</p>
        </h2>
      </div>
      <hr />
      <SideMenuLink
        name="Carrier Plan"
        link="/comm-telephony/vendor-carrier-plan"
        active={active === 5}
      />
      <SideMenuLink
        name="DID/TF Plan"
        link="/comm-telephony/vendor-did-plan"
        active={active === 6}
      />
      <SideMenuLink
        name="Carrier Package"
        link="/comm-telephony/vendor-packages"
        active={active === 7}
      />
    </div>
  );
}

export default SideMenu;
