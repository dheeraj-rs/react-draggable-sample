import React from 'react';
import { Link } from 'react-router-dom';
import Select from '../../CommAdminCentre/components/common/Select';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SmsTemplateEdit from './SmsTemplateEdit';

function GeneralSettingsTab() {
  return (
    <div className="nav-setting mt-4">
      <ul
        className="nav nav-setting-tab nav-tabs d-flex flex-wrap mb-0 list-unstyled"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <Link
            to="/"
            className="nav-setting-link nav-link nav-call active"
            id="call-tab"
            data-bs-toggle="tab"
            data-bs-target="#calltab"
            type="button"
            role="tab"
            aria-controls="call"
            aria-selected="true"
          >
            <span className="ms-4"> Call Settings</span>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            to="/"
            className="nav-setting-link nav-link nav-sms"
            id="sms-tab"
            data-bs-toggle="tab"
            data-bs-target="#sms"
            type="button"
            role="tab"
            aria-controls="sms"
            aria-selected="false"
          >
            <span className="ms-4"> SMS Settings</span>
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            to="/"
            className="nav-setting-link nav-link nav-agent"
            id="agent-tab"
            data-bs-toggle="tab"
            data-bs-target="#agent"
            type="button"
            role="tab"
            aria-controls="agent"
            aria-selected="false"
          >
            <span className="ms-4">Agents & Department</span>
          </Link>
        </li>
      </ul>
      <div className="tab-content nav-tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="calltab"
          role="tabpanel"
          aria-labelledby="call-tab"
        >
          <div className="call-panel bg-white rounded shadow-6 mt-5 p-4">
            <div className="d-flex text-primary fw-medium">DID Number</div>
            <div className="d-flex mt-3 align-items-center">
              <div className="text-secondary">Default DID Number:</div>
              <div className="active-did bg-blue-chalk rounded text-dark py-2 px-3 fw-medium ms-2">
                4562765427
              </div>
            </div>
            <div className="d-flex align-items-start align-items-lg-end flex-column flex-lg-row gap-3">
              <div className="col-lg-6 col-sm-12 mt-3">
                <Select
                  label="Switch default DID Number"
                  id="didNumber"
                  value="4562765427"
                  onchange={() => {}}
                />
              </div>
              <div className="setting-buttons d-flex align-items-start align-items-lg-end flex--row gap-3">
                <button
                  type="button"
                  id="generalaccountSubmitToast"
                  className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                >
                  Save
                </button>
                <button
                  type="button"
                  id="generalaccountCancelToast"
                  className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="sms" role="tabpanel" aria-labelledby="sms-tab">
          <div className="call-panel bg-white rounded shadow-6 mt-5 p-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex text-primary fw-medium">SMS Sender IDs</div>
              <div>
                <button
                  type="button"
                  id="generalaccountSubmitToast"
                  className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRightSender"
                  aria-controls="offcanvasRightSender"
                >
                  Add Sender ID
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="text-secondary">Default Sender ID</div>
              <div className="active-did bg-blue-chalk rounded text-dark py-2 px-3 fw-medium ms-2">
                600231 (GSSMS)
              </div>
            </div>
            <div className="d-flex align-items-start align-items-lg-end flex-column flex-lg-row gap-3">
              <div className="col-lg-6 col-sm-12 mt-2">
                <Select
                  label="Switch default SMS Sender ID"
                  id="didNumber"
                  value="450231 (DSSMS)"
                  onchange={() => {}}
                />
              </div>
              <div className="setting-buttons d-flex align-items-start align-items-lg-end flex--row gap-3">
                <button
                  type="button"
                  id="generalaccountSubmitToast"
                  className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                >
                  Save
                </button>
                <button
                  type="button"
                  id="generalaccountCancelToast"
                  className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/* <!-- template section starts --> */}
          <div className="sms-template shadow-6 rounded p-3 mt-3">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item sms-accordion">
                <h2 className="accordion-header bg-white" id="headingOne">
                  <button
                    className="accordion-button bg-white text-primary fw-medium shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    SMS Templates
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body bg-white">
                    <div className="d-flex flex-column flex-lg-row gap-5 align-items-center">
                      <div>
                        <a
                          to="/"
                          className="text-blue-active"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRightSmsTemplate"
                          aria-controls="offcanvasRightSmsTemplate"
                        >
                          <span className="svg-container me-2">
                            <img src="/assets/plus-circle-blue.svg" alt="" />
                          </span>
                          New SMS Template
                        </a>
                      </div>
                      <div>
                        <a className="text-blue-active" to="/">
                          <span className="svg-container me-2">
                            <img src="/assets/trash-blue.svg" alt="" />
                          </span>
                          Delete selected Templates
                        </a>
                      </div>
                      <div className="ms-auto">
                        <SearchWithBorder
                          placeholderText="Search by template name"
                          onChange={() => {}}
                          clearBtn={() => {}}
                        />
                      </div>
                    </div>

                    {/* <!-- <div className="seperator mt-4 mb-4"></div> --> */}

                    <div className="template-sms-wrapper scroll-custom">
                      <div className="template-content-wrapper">
                        <SmsTemplateEdit desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem urna, condimentum sed nisl ac, rhoncus convallis diam.consectetur adipiscing elit. Aliquam se">
                          <div className="check-box">
                            <input type="checkbox" id="escalation" defaultChecked="checked" />
                            <label className="text-primary mb-0 fw-medium" htmlFor="escalation">
                              Escalations
                            </label>
                          </div>
                        </SmsTemplateEdit>
                        <SmsTemplateEdit desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem urna, condimentum sed nisl ac, rhoncus convallis diam.">
                          <div className="check-box">
                            <input type="checkbox" id="transactions" defaultChecked="checked" />
                            <label className="text-primary mb-0 fw-medium" htmlFor="transactions">
                              Transactions
                            </label>
                          </div>
                        </SmsTemplateEdit>

                        <SmsTemplateEdit desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem urna, condimentum sed nisl ac, rhoncus convallis diam.consectetur adipiscing elit. Aliquam se">
                          <div className="check-box">
                            <input type="checkbox" id="offer" />
                            <label className="text-primary mb-0 fw-medium" htmlFor="offer">
                              New offer
                            </label>
                          </div>
                        </SmsTemplateEdit>
                        <SmsTemplateEdit desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem urna, condimentum sed nisl ac, rhoncus convallis diam.consectetur adipiscing elit. Aliquam se">
                          <div className="check-box">
                            <input type="checkbox" id="support" />
                            <label className="text-primary mb-0 fw-medium" htmlFor="support">
                              Support
                            </label>
                          </div>
                        </SmsTemplateEdit>

                        <SmsTemplateEdit desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem urna, condimentum sed nisl ac, rhoncus convallis diam.consectetur adipiscing elit. Aliquam se">
                          <div className="check-box">
                            <input type="checkbox" id="support" />
                            <label className="text-primary mb-0 fw-medium" htmlFor="support">
                              Support
                            </label>
                          </div>
                        </SmsTemplateEdit>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Agent tab starts --> */}
        <div className="tab-pane fade" id="agent" role="tabpanel" aria-labelledby="agent-tab">
          <div className="agent-section position-relative">
            <div className="rounded shadow-6 mt-4 p-4">
              <div className="d-flex text-primary fw-medium">Agents</div>
              <div className="row">
                <div className="col-lg-5 col-sm-12">
                  <div className="rounded bg-lavender mt-3 p-4">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <div className="progress-agent" data-percentage="30">
                          <span className="progress-left-agent">
                            <span className="progress-bar-agent" />
                          </span>
                          <span className="progress-right-agent">
                            <span className="progress-bar-agent" />
                          </span>
                          <div className="progress-value-agent">
                            <div>
                              <span className="fs-9px fw-bolder">4</span>/
                              <span className="fs-9px">4</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <span className="text-secondary">Current plan:</span>
                          <span className="fw-medium text-primary">Plan name</span>
                          {/* <!-- <a
                                      to="/"
                                      className="text-blue-active fw-medium"
                                      >Upgrade</a
                                    > --> */}
                        </div>
                        <div>
                          <span className="text-secondary">Total license:</span>
                          <span className="fw-medium text-primary">4</span> |{' '}
                          <span className="text-secondary">Remaining:</span>
                          <span className="fw-medium text-primary">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5 col-sm-12">
                  <div className="rounded bg-lavender mt-3 p-4">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <img src="/assets/agenticon.svg" alt="" />
                      </div>
                      <div className="d-flex flex-column">
                        <div>
                          <span className="fw-normal text-primary">
                            Buy additional agent license
                          </span>
                        </div>
                        <div>
                          <a to="/" className="text-blue-active fw-medium">
                            View plans
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-4">
                <button
                  type="button"
                  id="generalaccountSubmitToast"
                  className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRightPassword"
                  aria-controls="offcanvasRightPassword"
                >
                  Reset Agent’s Password
                </button>
              </div>
            </div>
          </div>
          {/* <!-- </div> sms template --> */}
        </div>
      </div>
    </div>
  );
}

export default GeneralSettingsTab;
