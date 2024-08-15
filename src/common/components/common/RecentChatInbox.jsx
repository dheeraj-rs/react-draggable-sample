import React from 'react';
import MobileViewRightSection from '../../../features/TeamInbox/team-inbox-user-listing/MobileViewRightSection';
import Search from './Search';
import StatusBadge from '../badges/StatusBadge';
import SuccessBadge from '../badges/SuccessBadge';
import SearchSection from '../../../features/TeamInbox/team-inbox-user-listing/SearchSection';

function RecentChatInbox() {
  return (
    <div className="col-lg-3">
      <div className="panel-left">
        <div className="panel-filter">
          <div className="filter-box bg-white rounded-3 shadow-sm p-3 d-flex align-items-center">
            <div className="px-0">
              <div className="dropdown more">
                <a
                  className="select-box select-chat d-flex align-items-center pe-4 text-primary fw-bolder fs-13px"
                  href="/#"
                  role="button"
                  id="dropdownMenu"
                  data-bs-toggle="dropdown"
                >
                  <div id="selectedVal" className="status-truncate d-inline-block">
                    Recent Chats
                  </div>
                  <i className="count h-3 fw-medium fst-normal bg-blue-active text-white text-center ms-3 d-inline-block fs-12px">
                    1
                  </i>
                </a>

                <ul
                  id="dropdown-left-status"
                  className="dropdown-menu dropdown-left-status mt-4 m-auto dropdown-status shadow-6"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <div className="d-flex flex-row align-items-center p-3">
                      <div className="input-group custom-search-sidebar rounded">
                        <span className="input-group-text border-end-0 bg-white" id="basic-addon1">
                          <img src="/assets/search-form.svg" alt="" />
                        </span>
                        <input
                          type="search"
                          className="form-control bg-white border-start-0"
                          placeholder="Search"
                          aria-label="search"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <a className="dropdown-item py-3 px-4 filter-item" href="/#">
                      New
                      <span className="select-box-value float-end p-0">
                        <i className="count d-flex align-items-center justify-content-center h-3 w-3 fst-normal bg-blue-badge text-white text-center ms-3 d-inline-block rounded-circle fs-12">
                          3
                        </i>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item py-3 px-4 filter-item" href="/#">
                      Open
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item py-3 px-4 filter-item" href="/#">
                      Assigned to me
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item py-3 px-4 filter-item" href="/#">
                      All Assigned
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item py-3 px-4 filter-item" href="/#">
                      Resolved
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item py-3 px-4 filter-item" href="/#">
                      Bot Conversations
                    </a>
                  </li>
                  <li />

                  <a
                    id="custom-filter"
                    className="dropdown-item dropdown-item-hover text-center primary-blue mt-1 py-3 px-4 "
                    href="/#"
                  >
                    <img className="pe-2" src="/assets/add-blue.svg" alt="" />
                    New custom view
                  </a>
                </ul>
              </div>
            </div>

            <div className="ms-auto me-3">
              <a className="text-blue-badge fw-medium" href="/team-inbox">
                <img className="pe-2" src="/assets/left-arrow-chat.svg" alt="" />
                Back to Inbox
              </a>
            </div>

            {/* <!-- right section responsive view starts--> */}
            <MobileViewRightSection />
            {/* <!-- right section responsive view ends--> */}
          </div>

          {/* <!-- custom search starts --> */}
          <Search />
          {/* <!--/.custom_search ends--> */}
        </div>

        <p className="text-primary mb-0 mt-3">
          <span className="fw-medium">3</span> Conversations found
        </p>

        {/* <!-- inbox user listing starts --> */}
        <div className="inbox-user-listing">
          <div className="bg-white rounded mt-3 shadow-1 overflow-hidden pe-1">
            <div className="inbox-wrapper scrollbox pe-1">
              <div className="scrollbox-content">
                <div className="card rounded border-0 position-relative p-4">
                  <div className="d-flex">
                    <div className="card-round d-flex flex-nowrap">
                      <div className="avatar-conv h-6 w-6 d-inline-flex align-items-center justify-content-center text-center text-uppercase position-relative fs-3" />
                    </div>
                    <div className="ps-3 w-100">
                      <div className="d-flex">
                        <div>
                          <a
                            href="/team-inbox/inbox-search-result-details"
                            className=" d-block fw-500 text-primary card-truncate"
                          >
                            <span className="d-inline-block bg-golden-glow p-1 rounded">Tic</span>
                            ket has been created
                          </a>
                          <span className="text-gray-medium fs-12px d-block mt-2 card-truncate">
                            1 hour ago
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <StatusBadge title="open" />

                        <a
                          className="text-contrast-blue fs-12 fw-normal bg-transparent align-items-center rounded-pill py-1 px-2 chat-whatsapp ms-auto"
                          href="/#"
                        >
                          <i>
                            <img className="me-1" src="/assets/facebook.svg" alt="" />
                          </i>
                          Page-tuner
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-active rounded border-0 position-relative p-4">
                  <div className="d-flex">
                    <div className="card-round d-flex flex-nowrap">
                      <div className="avatar-conv h-6 w-6 d-inline-flex align-items-center justify-content-center text-center text-uppercase position-relative fs-3" />
                    </div>
                    <div className="ps-3 w-100">
                      <div className="d-flex">
                        <div>
                          <a
                            href="/team-inbox/inbox-search-result-details"
                            className=" d-block fw-medium text-primary card-truncate"
                          >
                            Ticket has been created
                          </a>
                          <span className="text-gray-medium fs-12px d-block mt-2 card-truncate">
                            1 hour ago
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <SuccessBadge title="resolved" />
                        <a
                          className="text-contrast-blue fs-12 fw-normal bg-transparent align-items-center rounded-pill py-1 px-2 chat-whatsapp ms-auto"
                          href="/#"
                        >
                          <i>
                            <img className="me-1" src="/assets/whatsapp.svg" alt="" />
                          </i>
                          Page-tuner
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="m-0 border-black o-16" />
                <div className="card  rounded border-0 position-relative p-4">
                  <div className="d-flex">
                    <div className="card-round d-flex flex-nowrap">
                      <div className="avatar-conv h-6 w-6 d-inline-flex align-items-center justify-content-center text-center text-uppercase position-relative fs-3" />
                    </div>
                    <div className="ps-3 w-100">
                      <div className="d-flex">
                        <div>
                          <a
                            href="/team-inbox/inbox-search-result-details"
                            className=" d-block fw-medium text-primary card-truncate"
                          >
                            Ticket has been created
                          </a>
                          <span className="text-gray-medium fs-12px d-block mt-2 card-truncate">
                            1 hour ago
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <SuccessBadge title="resolved" />
                        <a
                          className="text-contrast-blue fs-12 fw-normal bg-transparent align-items-center rounded-pill py-1 px-2 chat-whatsapp ms-auto"
                          href="/#"
                        >
                          <i>
                            <img className="me-1" src="/assets/whatsapp.svg" alt="" />
                          </i>
                          Page-tuner
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card  rounded border-0 position-relative p-4">
                  <div className="d-flex">
                    <div className="card-round d-flex flex-nowrap">
                      <div className="avatar-conv h-6 w-6 d-inline-flex align-items-center justify-content-center text-center text-uppercase position-relative fs-3" />
                    </div>
                    <div className="ps-3 w-100">
                      <div className="d-flex">
                        <div>
                          <a
                            href="/team-inbox/inbox-search-result-details"
                            className=" d-block fw-medium text-primary card-truncate"
                          >
                            Ticket has been created
                          </a>
                          <span className="text-gray-medium fs-12px d-block mt-2 card-truncate">
                            1 hour ago
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mt-3">
                        <SuccessBadge title="resolved" />
                        <a
                          className="text-contrast-blue fs-12 fw-normal bg-transparent align-items-center rounded-pill py-1 px-2 chat-whatsapp ms-auto"
                          href="/#"
                        >
                          <i>
                            <img className="me-1" src="/assets/whatsapp.svg" alt="" />
                          </i>
                          Page-tuner
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- inbox user listing ends -->
          <!-- search section starts --> */}
        <SearchSection />
        {/* <!-- search section ends --> */}
      </div>

      {/* <!--/-panel-left--> */}
    </div>
  );
}

export default RecentChatInbox;
