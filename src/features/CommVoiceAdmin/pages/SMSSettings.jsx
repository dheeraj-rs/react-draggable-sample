/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Layout from '../../../common/layout';
import SMSSideNav from '../components/SMSSideNav';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SMSTemplateRow from '../components/SMSTemplateRow';
import DeleteSMSTemplateModal from '../components/modals/DeleteSMSTemplateModal';
import SMSTemplateModal from '../components/modals/SMSTemplateModal';
import SMSTemplateModalSuccess from '../components/modals/SMSTemplateModalSuccess';
import EditSMSTemplate from '../components/modals/EditSMSTemplate';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import Pagination from '../../../common/components/pagination/Pagination';

function SMSSettings() {
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
                    <div className="bg-white rounded p-md-23px w-100 px-4 py-3 pt-4">
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
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 pe-xl-4 pb-xl-4 pe-3 sms-settings">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="inbox-voice-wrapper scroll-custom">
                        <div>
                          <SMSSideNav active={0} />
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
                      <h6 className="mb-0">SMS Templates</h6>
                      <p className="mb-0 text-secondary">
                        <span className="fw-medium text-primary">6</span> Groups available
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row">
                      <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                        <SearchWithBorder
                          placeholderText="Search template"
                          onChange={() => {}}
                          clearBtn={() => {}}
                        />
                      </div>
                      <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
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
                              <p className="mb-0">Type</p>
                              <select
                                className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                aria-label="Default select example"
                              >
                                <option selected>All</option>
                                <option value="1">Organization admin</option>
                                <option value="2">Product admin</option>
                                <option value="3">Agent</option>
                                <option value="4">Supervisor</option>
                              </select>
                            </div>
                            <div className="d-flex flex-column mt-2">
                              <p className="mb-0">Enabled/disabled</p>
                              <select
                                className="form-select select w-auto form-select-custom role bg-transparent text-black"
                                aria-label="Default select example"
                              >
                                <option selected>All</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                              </select>

                              <div
                                className="setting-buttons d-flex align-items-center mt-3"
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
                        <div id="selectedRole" className="d-none">
                          <a
                            href="/#"
                            className="p-10px rounded text-blue-active border border-blue-active position-relative"
                          >
                            <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
                              <span className="visually-hidden">New alerts</span>
                            </span>
                            <span className="filter-text">Filter</span>
                            <img
                              id="clearFilter"
                              className="ps-0 ps-md-4"
                              src="/assets/close-blue.svg"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end gap-3">
                        <a
                          href="/#"
                          data-bs-toggle="modal"
                          data-bs-target="#SMSTemplate"
                          aria-controls="SMSTemplate"
                          id="smsTemplate"
                          className="btn bg-black fw-medium fs-14px text-white px-3 py-12px newCarrier"
                        >
                          New SMS Template
                        </a>
                        <div className="dropdown">
                          <a href="/#" data-bs-toggle="dropdown">
                            <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                              <img src="/assets/dot-menu-black.svg" alt="# " />
                            </span>
                          </a>
                          <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                            <a href="/#" data-bs-toggle="dropdown">
                              {' '}
                            </a>
                            <li className="caller-select opacity-50">
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#deleteVoiceCategory"
                                href="/#"
                                className="dropdown-item py-3 px-4"
                              >
                                <img className="me-2" src="/assets/delete-voice.svg" alt="" />
                                Delete SMS Template
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive vendor-plans-table">
                      <table className="table table-width-mobile">
                        <tbody>
                          <SMSTemplateRow
                            name="SMS template_001"
                            type="Transactional"
                            dlt="56372689"
                          />
                          <SMSTemplateRow
                            name="SMS template_002"
                            type="Transactional"
                            dlt="56372610"
                          />
                          <SMSTemplateRow
                            name="SMS template_003"
                            type="Promotional"
                            dlt="56372611"
                          />
                          <SMSTemplateRow
                            name="SMS template_004"
                            type="Transactional"
                            dlt="56372689"
                          />
                          <SMSTemplateRow
                            name="SMS template_005"
                            type="Promotional"
                            dlt="56372612"
                          />
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
      <DeleteSMSTemplateModal />
      <SMSTemplateModal />
      <SMSTemplateModalSuccess />
      <EditSMSTemplate />
      <ToastSuccess id="deleteToastMsg">SMS Template has been deleted successfully.</ToastSuccess>
      <ToastSuccess id="addToastMsg">SMS Template has been added successfully.</ToastSuccess>
      <ToastSuccess id="editToastMsg">SMS Template has been saved successfully.</ToastSuccess>
      <ToastSuccess id="deletecategoryToastMsg">
        SMS Template been deleted successfully.
      </ToastSuccess>
    </Layout>
  );
}

export default SMSSettings;
