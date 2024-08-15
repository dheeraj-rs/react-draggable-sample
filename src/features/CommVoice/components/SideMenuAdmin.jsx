import React from 'react';
import SideMenuAdminLink from './SideMenuAdminLink';

function SideMenuAdmin({ type, onClick }) {
  return (
    <div className="accordion virtual-accordion py-4" id="accordionVirtual">
      <div className="fs-13px fw-500 text-primary px-3 pb-2">
        <h6>Products</h6>
        <hr />
      </div>

      <SideMenuAdminLink
        name="Comm Chat"
        link="/comm-telephony/comm-chat-admin"
        img="chat-menu.svg"
        active={type === 'comm-chat'}
        onClick={onClick}
        type="comm-chat"
      />
      <SideMenuAdminLink
        name="Comm Voice"
        link="/comm-telephony/"
        img="chat-voice.svg"
        active={type === 'comm-voice'}
        onClick={onClick}
        type="comm-voice"
      />
      <SideMenuAdminLink
        name="Comm Support"
        link="#"
        img="chat-support.svg"
        active={type === 'comm-support'}
        onClick={onClick}
        type="comm-support"
      />
      <SideMenuAdminLink
        name="Comm Omnichannel"
        link="#"
        img="chat-omni.svg"
        active={type === 'comm-omnichannel'}
        onClick={onClick}
        type="comm-omnichannel"
      />
    </div>
  );
}

export default SideMenuAdmin;
