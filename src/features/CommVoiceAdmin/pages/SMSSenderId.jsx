/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Layout from '../../../common/layout';
import DeleteSMSTemplateModal from '../components/modals/DeleteSMSTemplateModal';
import EditSMSTemplate from '../components/modals/EditSMSTemplate';
import SMSTemplateModal from '../components/modals/SMSTemplateModal';
import SMSTemplateModalSuccess from '../components/modals/SMSTemplateModalSuccess';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Selectbox from '../../../common/components/forms/SelectBox';
import SMSSender from '../components/SMSSender';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import SMSSideNav from '../components/SMSSideNav';
import Pagination from '../../../common/components/pagination/Pagination';

function SMSSenderId() {
  const [paginatedData, setPaginatedData] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });
  const [page, setPage] = useState();

  const [show, setShow] = useState({ isVisible: false, type: ' ' });

  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [refresh, setRefresh] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [isEnabled, setIsEnabled] = useState('');

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };
  return (
    <Layout>
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area scroll-custom sms-scroll-touch">
                <div id="headerVoice" className="d-none d-lg-block">
                  {/* <!-- voice library header starts--> */}
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12 ps-0">
                          <div className="d-flex gap-2 align-items-start">
                            <a href="/#" className="d-block d-lg-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <a
                                href="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </a>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">SMS Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage all SMS settings information in an organized list.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  {/* <!-- voice library header starts--> */}
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-23px w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <a id="voiceHeaderMainMob" href="/comm-voice-admin/">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <a id="voiceHeaderMob" href="/#" className="d-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </a>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <a
                                href="/comm-voice-admin/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </a>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">SMS Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Manage all SMS settings information in an organized list.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- voice library header ends--> */}
                {/* <!-- sms menu starts --> */}
                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 pe-xl-4 pb-xl-4 pe-3">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="inbox-voice-wrapper scroll-custom">
                        <div>
                          <SMSSideNav active={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- sms menu ends --> */}
                {/* <!--.col-3--> */}

                {/* <!-- All caller starts --> */}

                <div id="voice-expand" className="col-lg-9 col-sm-12">
                  <div className="scroll-custom scroll-carrier carrier-pad sms-padding">
                    <div className="d-flex gap-4 align-items-center mb-3 mt-3">
                      <h6 className="mb-0">SMS Sender IDs</h6>
                      <p className="mb-0 text-secondary">
                        <span className="fw-medium text-primary">2</span> Sender IDs available
                      </p>
                    </div>
                    <div className="d-flex gap-3 justify-content-between align-items-sm-center mb-3 flex-column flex-sm-row align-item-start">
                      <div className="d-flex gap-4 align-items-center justify-content-between justify-content-sm-start">
                        <div>
                          <SearchWithBorder
                            placeholderText="Search ID"
                            onChange={() => {}}
                            clearBtn={() => {}}
                          />
                        </div>
                        <div>
                          {/* <!-- ####### --> */}
                          <div id="roleSelection" className="filter-wrap">
                            <a
                              href="/#"
                              className="filter-btn p-10px fw-medium rounded-3 border role-selection"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span className="filter-text">Filter</span>
                              <img
                                className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                                src="/assets/black-filter.svg"
                                alt=""
                              />
                            </a>

                            <ul className="dropdown-menu p-4">
                              <div className="d-flex flex-column">
                                <Selectbox
                                  label="Type"
                                  options={[
                                    'All',
                                    'Organization admin',
                                    'Product admin',
                                    'Agent',
                                    'Supervisor',
                                  ]}
                                />
                              </div>
                              <div className="d-flex flex-column mt-2 mb-3">
                                <div className="mb-3">
                                  <Selectbox
                                    label="Enabled/disabled"
                                    options={['All', 'Active', 'Inactive']}
                                  />
                                </div>
                                <div
                                  className="setting-buttons  d-flex align-items-center mt-3"
                                  style={{ marginBottom: '0 !important' }}
                                >
                                  <button
                                    id="applyBtn"
                                    type="button"
                                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                                  >
                                    Apply
                                  </button>
                                  <a
                                    href="/"
                                    role="button"
                                    id="roleCancel"
                                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                  >
                                    Clear
                                  </a>
                                </div>
                              </div>
                            </ul>
                          </div>
                          {/* <!-- ####### --> */}
                        </div>
                      </div>
                      <div>
                        <a
                          href="/"
                          data-bs-toggle="modal"
                          data-bs-target="#editSmsTemplate2"
                          id="editSmsTemplateBtn"
                          className="btn bg-black fw-medium fs-14px text-white px-3 py-12px newCarrier"
                        >
                          Add Sender ID
                        </a>
                      </div>
                    </div>

                    <div className="table-responsive vendor-plans-table">
                      <table className="table table-width-mobile">
                        <tbody>
                          <SMSSender name="9845628467" type="COMSMS" checked="true" />
                          <SMSSender name="9845628468" type="COMSMS" />
                          <SMSSender name="9845628467" type="GSFSMS" />
                          <SMSSender name="9845628467" type="COMSMS" />
                          <SMSSender name="9845628467" type="GSFSMS" />
                          <SMSSender name="9845628467" type="COMSMS" />
                        </tbody>
                      </table>
                    </div>

                    {/* <!-- pagination --> */}
                    {paginatedData?.meta?.pagination != null && (
                      <Pagination
                        handlePagination={handlePaginationFunction}
                        currentPage={paginatedData?.meta?.pagination?.current_page}
                        totalPages={paginatedData?.meta?.pagination?.total_pages}
                        count={paginatedData?.meta?.pagination?.per_page}
                      />
                    )}
                  </div>
                  {/* <!-- pagination end --> */}
                </div>
                {/* <!-- SMS  ends --> */}
              </div>
            </div>
            {/* <!--.col--9--> */}
          </div>
        </div>
      </div>
      <SMSTemplateModalSuccess />
      <DeleteSMSTemplateModal />
      <SMSTemplateModal />
      <EditSMSTemplate />
      <DeleteSMSTemplateModal />
      <ToastSuccess id="deleteToastMsg">SMS Sender ID has been deleted successfully.</ToastSuccess>

      <ToastSuccess id="addToastMsg">SMS Template has been added successfully.</ToastSuccess>

      <ToastSuccess id="editToastMsg">SMS Template has been saved successfully.</ToastSuccess>
      <ToastSuccess id="deletecategoryToastMsg">
        SMS Template been deleted successfully.
      </ToastSuccess>
    </Layout>
  );
}

export default SMSSenderId;
