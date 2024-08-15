import React from 'react';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';

function MapToBot({ img, heading, desc, bgColor, botBg, border }) {
  return (
    <div className="d-flex align-items-start align-items-md-center m-1 flex-column flex-md-row justify-content-center p-3 shadow-6 rounded bg-white mt-3 gap-4">
      <div>
        <a className="position-relative" href="/#">
          {' '}
          <img src={img} alt="" />
          <span className="position-absolute  start-100 translate-middle-y badge border border-light rounded-circle bg-lime-green p-1">
            <span className="visually-hidden">unread messages</span>
          </span>
        </a>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="text-primary fw-medium">{heading} </div>
        <div className="text-truncate fs-12px">{desc}</div>
      </div>
      <div className="ms-md-auto mr-sm-auto">
        <div className="form-group mt-3">
          <div className="dropdown ">
            <div
              className={`d-flex align-items-center justify-content-between gap-3 border border-${border} bg-${botBg} rounded-pill p-2`}
            >
              <div
                className={`bg-${bgColor} bot-color-icon d-flex align-items-center h-4 w-4 justify-content-center rounded-circle`}
              >
                <a href="/#">
                  <img src="/assets/white-bot.svg" alt="user" />
                </a>
              </div>
              <div className="bot-selected-name-width">
                <a
                  href="/#"
                  className=" text-secondary mb-3  "
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  <span className="selected-bot-name"> No Bot mapped</span>
                  <img className="ms-2 bot-down-menu" src="/assets/toggle-down.svg" alt="" />
                  <img src="/assets/toggle-up.svg" alt="" className="d-none ms-2" />
                  <img
                    className="ms-2 bot-close-menu d-none"
                    src="/assets/toggle-close.svg"
                    alt=""
                  />
                </a>
                <ul className="dropdown-menu shadow-1 drop-menu-bot">
                  <div className="d-flex align-items-center p-3">
                    <div className="">Select a Bot</div>
                    <div className="ms-auto d-flex align-items-center gap-2">
                      <div>
                        <a href="/#">Clear map</a>
                      </div>
                      <div className="settings-round-dropdown">
                        <img src="/assets/settings-icon.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 p-3">
                    <SearchWithBorder
                      placeholderText="Search bot"
                      onChange={() => {}}
                      clearBtn={() => {}}
                    />
                  </div>
                  <div className="dropdown-scroll overflow-auto scroll-custom">
                    <li className="bot-listing ">
                      <div className="d-flex align-items-center gap-3 py-3 px-4 mt-2">
                        <div className="bg-white d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                          <a href="/#">
                            <img src="/assets/blue-bot.svg" alt="bot" />
                          </a>
                        </div>

                        <div>
                          <a className="bot-name-list" href="/#">
                            Healthcare Bot
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="bot-listing">
                      <div className="d-flex align-items-center gap-3 py-3 px-4 mt-2">
                        <div className="bg-blue-chalk d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                          <a href="/#">
                            <img src="/assets/blue-bot.svg" alt="bot" />
                          </a>
                        </div>

                        <div>
                          <a className=" bot-name-list" href="/#">
                            Finance Bot
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="bot-listing">
                      <div className="d-flex align-items-center gap-3 py-3 px-4 mt-2">
                        <div className="bg-blue-chalk d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                          <a href="/#">
                            <img src="/assets/blue-bot.svg" alt="bot" />
                          </a>
                        </div>

                        <div>
                          <a className="bot-name-list" href="/#">
                            Education Bot
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="bot-listing">
                      <div className="d-flex align-items-center gap-3 py-3 px-4 mt-2">
                        <div className="bg-blue-chalk d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                          <a href="/#">
                            <img src="/assets/blue-bot.svg" alt="bot" />
                          </a>
                        </div>

                        <div>
                          <a className="bot-name-list" href="/#">
                            Sample Bot
                          </a>
                        </div>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>

              <div className="bg-chat-blue d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                <a
                  href="/#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="View"
                >
                  <img src="/assets/eye-close.svg" alt="eye" />
                </a>
              </div>
              <div className="d-none bg-chat-blue d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                <a href="/#">
                  <img src="/assets/eye-active-close.svg" alt="eye" />
                </a>
              </div>

              <div className=" bg-chat-blue d-flex align-items-center h-4 w-4 justify-content-center rounded-circle">
                <a
                  href="/#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Settings"
                >
                  <img src="/assets/settings-icon.svg" alt="eye" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapToBot;
