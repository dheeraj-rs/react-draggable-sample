import React from 'react';
import InComplete from '../../../common/components/badges/InComplete';

function TabsTelephony({ img, active, title, desc, path }) {
  return (
    <a
      href={path}
      className={`telephony-list bg-ghost-white-alt-hover d-flex cursor-pointer p-23px gap-13px ${
        active === true ? 'bg-chat-blue' : null
      }`}
      role={active !== true ? 'button' : null}
    >
      <div className="d-flex align-items-center gap-13px align-self-start">
        <div
          className={`rounded-circle bg-blue-light h-7px w-7px ${active !== true && 'invisible'}`}
        />
        <div className="w-32px h-32px">
          <img src={img} alt="" />
        </div>
      </div>

      <div className="d-flex flex-column">
        <div className="d-flex">
          <p className="fs-13px fw-semibold mb-2 text-primary">{title}</p>
          <div className="ms-auto">
            <InComplete title="Incomplete" />
          </div>
        </div>
        <p className="fs-13px text-secondary mb-0">{desc}</p>
      </div>
    </a>
  );
}

export default TabsTelephony;
