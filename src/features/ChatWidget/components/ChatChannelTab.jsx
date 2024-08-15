import React from 'react';

function ChatChannelTab({ img, active, title, desc, onMobileView, setOnMobileView, type }) {
  return (
    <>
      <a
        href="/#"
        onClick={(e) => {
          e.preventDefault();
          setOnMobileView({ ...onMobileView, type });
        }}
        className={`chat-list-social d-flex cursor-pointer p-23px gap-13px ${
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
          <p className="fs-13px fw-semibold mb-2 text-primary">{title}</p>
          <p className="fs-13px text-secondary mb-0">{desc}</p>
        </div>
      </a>
      <hr className="m-0 border-black o-16" />
    </>
  );
}

export default ChatChannelTab;
