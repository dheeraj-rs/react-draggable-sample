import React from 'react';
import ChatWidgetRight from '../chat-widget-settings/ChatWidgetRight';
import ChatWidgetLeft from '../chat-widget-settings/ChatWidgetLeft';

function ConfigArticleDetails({ setShowArticleDetails, showArticleDetails }) {
  return (
    <div
      className={`accordion-body rounded-bottom p-0 sample-article-new ${(showArticleDetails?.show) ? ('') : ('d-none')}`}
    >
      <div
        className="d-flex bg-white justify-content-between p-3 align-items-center"
      >
        <div className="d-flex align-items-center gap-2">
          <div className="p-1 rounded sample-back">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setShowArticleDetails({ show: false });
              }}
            >
              <img src="/assets/ArrowLeft.svg" alt="" />
            </a>
          </div>
          <div className="">
            <img src="/assets/sample-article2.svg" alt="" />
          </div>
          <div className="">
            <p className="fw-500 mb-0">Welcome to Gsoft</p>
          </div>
        </div>
      </div>
      <hr className="m-0 border-black o-16" />
      <div className="p-3 scroll-custom">
        <div
          className="scroll-chat-area scroll-custom pe-3"
          id="messages"
        >
          <ChatWidgetLeft
            BotName="Chat Bot"
            time="5 min ago"
            chatBotMsg="This is a name box to the Gsoft Bot Builder. This dialogue is initiated when users..."
          />

          <ChatWidgetRight
            userName="Me"
            userQuery="John Doe"
            time="2 min ago"
          />
          <ChatWidgetLeft
            BotName="Chat Bot"
            time="5 min ago"
            chatBotMsg="Thank you for choosing the right actions."
          />
          <ChatWidgetRight
            userName="Me"
            userQuery="John Doe"
            time="2 min ago"
          />
          <div className="chat-left">
            <div className="d-flex flex-row gap-2">
              <div className="">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="22"
                    height="22"
                    rx="11"
                    fill="#817EFF"
                  />
                  <path
                    d="M14.85 11H15.4C15.6917 11 15.9715 11.1159 16.1778 11.3222C16.3841 11.5285 16.5 11.8083 16.5 12.1V13.2C16.5 13.4917 16.3841 13.7715 16.1778 13.9778C15.9715 14.1841 15.6917 14.3 15.4 14.3H14.85C14.7041 14.3 14.5642 14.2421 14.4611 14.1389C14.3579 14.0358 14.3 13.8959 14.3 13.75V11.55C14.3 11.4041 14.3579 11.2642 14.4611 11.1611C14.5642 11.0579 14.7041 11 14.85 11ZM7.15 14.3H6.6C6.30826 14.3 6.02847 14.1841 5.82218 13.9778C5.61589 13.7715 5.5 13.4917 5.5 13.2V12.1C5.5 11.8083 5.61589 11.5285 5.82218 11.3222C6.02847 11.1159 6.30826 11 6.6 11H7.15C7.29587 11 7.43576 11.0579 7.53891 11.1611C7.64205 11.2642 7.7 11.4041 7.7 11.55V13.75C7.7 13.8959 7.64205 14.0358 7.53891 14.1389C7.43576 14.2421 7.29587 14.3 7.15 14.3Z"
                    fill="#817EFF"
                  />
                  <path
                    d="M15.8129 10.6534V9.8999C15.8129 8.62355 15.3059 7.39947 14.4033 6.49695C13.5008 5.59443 12.2767 5.0874 11.0004 5.0874C9.72404 5.0874 8.49996 5.59443 7.59744 6.49695C6.69492 7.39947 6.18789 8.62355 6.18789 9.8999V10.6534C5.87257 10.7428 5.59482 10.9322 5.39644 11.193C5.19805 11.4539 5.08977 11.7722 5.08789 12.0999V13.1999C5.08789 13.601 5.24724 13.9858 5.53089 14.2694C5.81454 14.5531 6.19925 14.7124 6.60039 14.7124H7.15039C7.40522 14.711 7.64919 14.6091 7.82939 14.4289C8.00958 14.2487 8.11145 14.0047 8.11289 13.7499V11.5499C8.11145 11.2951 8.00958 11.0511 7.82939 10.8709C7.64919 10.6907 7.40522 10.5888 7.15039 10.5874H7.01289V9.8999C7.01289 8.84235 7.433 7.82812 8.1808 7.08031C8.9286 6.33251 9.94284 5.9124 11.0004 5.9124C12.0579 5.9124 13.0722 6.33251 13.82 7.08031C14.5678 7.82812 14.9879 8.84235 14.9879 9.8999V10.5874H14.8504C14.5956 10.5888 14.3516 10.6907 14.1714 10.8709C13.9912 11.0511 13.8893 11.2951 13.8879 11.5499V13.7499C13.8893 14.0047 13.9912 14.2487 14.1714 14.4289C14.3516 14.6091 14.5956 14.711 14.8504 14.7124H14.9879V15.3999C14.9879 15.5822 14.9155 15.7571 14.7865 15.886C14.6576 16.015 14.4827 16.0874 14.3004 16.0874H11.0004C10.891 16.0874 10.7861 16.1309 10.7087 16.2082C10.6314 16.2856 10.5879 16.3905 10.5879 16.4999C10.5879 16.6093 10.6314 16.7142 10.7087 16.7916C10.7861 16.8689 10.891 16.9124 11.0004 16.9124H14.3004C14.7015 16.9124 15.0862 16.7531 15.3699 16.4694C15.6535 16.1858 15.8129 15.801 15.8129 15.3999V14.6464C16.1282 14.557 16.406 14.3676 16.6043 14.1068C16.8027 13.8459 16.911 13.5276 16.9129 13.1999V12.0999C16.911 11.7722 16.8027 11.4539 16.6043 11.193C16.406 10.9322 16.1282 10.7428 15.8129 10.6534ZM7.28789 11.5499V13.7499C7.28789 13.7864 7.2734 13.8213 7.24762 13.8471C7.22183 13.8729 7.18686 13.8874 7.15039 13.8874H6.60039C6.41805 13.8874 6.24319 13.815 6.11425 13.686C5.98532 13.5571 5.91289 13.3822 5.91289 13.1999V12.0999C5.91289 11.9176 5.98532 11.7427 6.11425 11.6138C6.24319 11.4848 6.41805 11.4124 6.60039 11.4124H7.15039C7.18686 11.4124 7.22183 11.4269 7.24762 11.4527C7.2734 11.4785 7.28789 11.5134 7.28789 11.5499ZM16.0879 13.1999C16.0879 13.3822 16.0155 13.5571 15.8865 13.686C15.7576 13.815 15.5827 13.8874 15.4004 13.8874H14.8504C14.8139 13.8874 14.7789 13.8729 14.7532 13.8471C14.7274 13.8213 14.7129 13.7864 14.7129 13.7499V11.5499C14.7129 11.5134 14.7274 11.4785 14.7532 11.4527C14.7789 11.4269 14.8139 11.4124 14.8504 11.4124H15.4004C15.5827 11.4124 15.7576 11.4848 15.8865 11.6138C16.0155 11.7427 16.0879 11.9176 16.0879 12.0999V13.1999Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="d-flex flex-column pt-1">
                <div className="text-dark-blue d-block fw-medium">
                  Chat Bot
                </div>
                <div className="d-flex mt-2 align-items-start">
                  <div
                    className="chat-cvr d-flex align-items-start flex-column w-100"
                  >
                    <div
                      className="chat-border-left bg-chat-blue p-3 d-flex flex-column align-items-end gap-2 mb-1"
                    >
                      <div>
                        <div className="d-flex gap-3">
                          <div>
                            <img
                              src="/assets/CalendarCheck.svg"
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="fw-500">
                              Calendar sent
                            </h6>
                            <p className="mb-1">
                              Calendar link shared
                            </p>
                          </div>
                        </div>

                        <div>
                          <a
                            href="/#"
                            onClick={(e) => { e.preventDefault(); }}
                          >
                            https://meeting.google.in.calendar
                          </a
                                                    >
                        </div>
                      </div>
                    </div>
                    <div className="text-secondary mt-2">
                      2 min ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-right">
            <div className="d-flex align-items-start">
              <div
                className="chat-cvr d-flex align-items-end w-100 justify-content-end"
              >
                <div className="d-flex flex-column align-items-end">
                  <span
                    className="text-mist-gray text-secondary d-block ps-4"
                  >
                    <span
                      className="tick h-3 w-3 d-inline-block me-1"
                    />
                    {' '}
                    Me
                  </span
                                    >
                  <div
                    className="w-100 justify-content-end align-items-center mt-2"
                  >
                    <div
                      className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1"
                    >
                      <div
                        className="d-flex align-items-center gap-2"
                      >
                        <div className="bg-white rounded p-2">
                          <img src="/assets/FilePdfblue.svg" alt="" />
                        </div>
                        <div>
                          <h6 className="fs-13px mb-0">
                            Sample document.pdf
                          </h6>
                          <p className="mb-0 fs-12px">304 MB</p>
                        </div>
                        <a
                          href="/#"
                          onClick={(e) => { e.preventDefault(); }}
                          className="rounded-circle bg-white p-2"
                        >
                          <img
                            src="/assets/DownloadSimpleIcon.svg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1"
                    >
                      <div
                        className="d-flex align-items-center gap-2"
                      >
                        <div className="bg-white rounded p-2">
                          <img src="/assets/FilePdfblue.svg" alt="" />
                        </div>
                        <div>
                          <h6 className="fs-13px mb-0">
                            Sample document.pdf
                          </h6>
                          <p className="mb-0 fs-12px">304 MB</p>
                        </div>
                        <a
                          href="/#"
                          onClick={(e) => { e.preventDefault(); }}
                          className="rounded-circle bg-white p-2"
                        >
                          <img
                            src="/assets/DownloadSimpleIcon.svg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>

                    <div
                      className="chat-border-right bg-chat-blue text-white p-3 py-2 flex-column align-items-end gap-2 mb-1 text-center"
                    >
                      <a
                        href="/#"
                        onClick={(e) => { e.preventDefault(); }}
                      >
                        +1 more files
                      </a>
                      <p className="mb-0 text-dark">4 MB</p>
                    </div>
                  </div>
                  <div className="text-secondary mt-2">
                    Delivered a 30 sec ago
                  </div>

                </div>

              </div>
            </div>
          </div>
          <ChatWidgetLeft
            BotName="Chat Bot"
            time="5 min ago"
            chatBotMsg="This is a name box to the Gsoft Bot Builder. This dialogue is initiated when users..."
          />

          <div className="chat-right">
            <div className="d-flex align-items-start">
              <div
                className="chat-cvr d-flex align-items-end w-100 justify-content-end"
              >
                <div className="d-flex flex-column align-items-end">
                  <span
                    className="text-mist-gray text-secondary d-block ps-4"
                  >
                    <span
                      className="tick h-3 w-3 d-inline-block me-1"
                    />
                    {' '}
                    Me
                  </span
                                    >
                  <div
                    className="w-100 justify-content-end align-items-center mt-2"
                  >

                    <div
                      className="chat-border-right bg-chat-blue text-white flex-column align-items-end gap-2 mb-1 text-center"
                    >
                      <img src="/assets/booksample.svg" alt="" />
                      <div className="d-flex justify-content-between align-items-center p-3">
                        <h6 className="text-dark mb-0">Book_sample.png</h6>
                        <p className="text-dark mb-0">4MB</p>
                        <a
                          href="/#"
                          onClick={(e) => { e.preventDefault(); }}
                        >
                          <img src="/assets/export-icon.svg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-secondary mt-2">
                    Delivered a 30 sec ago
                  </div>

                </div>

              </div>
            </div>
          </div>

          <ChatWidgetLeft
            BotName="Chat Bot"
            time="5 min ago"
            chatBotMsg="Thank you for choosing the right actions."
          />
          {/* <!-- live chat section action --> */}
          <div className="chat-right liveChat message d-none">
            <div className="d-flex align-items-start">
              <div
                className="chat-cvr d-flex align-items-end w-100 justify-content-end"
              >
                <div className="d-flex flex-column align-items-end">
                  <span
                    className="text-mist-gray text-secondary d-block ps-4"
                  >
                    <span
                      className="tick h-3 w-3 d-inline-block me-1"
                    />
                    Me
                  </span
                                    >
                  <div
                    className="d-flex w-100 justify-content-end align-items-center mt-2"
                  >
                    <div
                      className="chat-border-right bg-blue-active text-white p-3 d-flex flex-column align-items-end gap-2 mb-1"
                    >
                      <div className="realText" />
                    </div>
                  </div>
                  <div className="text-secondary mt-2">
                    1 sec ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center mt-3 h-8 border chat-area-config"
        >
          <textarea
            className="chatTextBox chat-type-input bg-transparent border-0 fs-12px mt-3 ps-2"
            placeholder="Type here"
          />
          <div
            className="ms-auto d-flex align-items-center gap-2 pe-2"
          >
            <div>
              <a
                href="/#"
                onClick={(e) => { e.preventDefault(); }}
                className="trigger empty"
              >
                <i className="me-2">
                  <img
                    height="20"
                    src="/assets/smiley-icon.svg"
                    alt=""
                  />
                </i>
              </a>
            </div>
            <div>
              <a
                className="me-3"
                href="/#"
                onClick={(e) => { e.preventDefault(); }}
              >
                <img src="/assets/file-attachement.svg" alt="" />
              </a>
            </div>
            <div>
              <a
                className="chatSendBtn"
                href="/#"
                onClick={(e) => { e.preventDefault(); }}
              >
                <img src="/assets/chat-send.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 text-dark-blue-bb">
          Powered by,
          {' '}
          <b>Gsoftcomm</b>
        </p>
      </div>
    </div>
  );
}

export default ConfigArticleDetails;
