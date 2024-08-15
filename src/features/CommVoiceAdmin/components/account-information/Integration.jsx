import React, { useState } from 'react';
import Selectbox from '../../../CommVoice/components/Selectbox';
import AccountInfoSidebar from './AccountInfoSidebar';
import Layout from '../../../../common/layout';
import Modal from './Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Input from '../../../ChatWidget/components/InputLabel';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';
import ButtonToast from '../../../../common/components/toast/ButtonToast';
import ToastCustom from '../call-back-list/ToastCustom';

function Integration() {
  const [toggleGenerateToken, setToggleGenerateToken] = useState();
  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="d-flex">
          {/* <!-- <SideNav /> --> */}
          <div className="bg-gray-bright w-100">
            {/* <!-- <TopBar /> --> */}
            <div className="d-flex flex-column flex-lg-row gap-3 d-flex flex-column flex-lg-row gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="col-lg-3 col-sm-12 bg-white rounded shadow-1 h-max-content panel-left right-sec-campaign">
                <AccountInfoSidebar active="integration" />
              </div>

              <div
                className="col-lg-9 col-sm-12 pe-0 pe-lg-3 overflow-x-hidden campaign-box rounded"
                id="campaign-box"
              >
                <div className="bg-white shadow-1 rounded scroll-custom campaign-wrapper campaign-right-outer">
                  <h5 className="fs-15px mb-3 text-primary d-flex gap-2 fw-bolder">
                    <a
                      href="/comm-voice-admin/account-information/"
                      className="d-flex justify-content-center d-block d-lg-none"
                    >
                      <img src="/assets/mobile-back.svg" alt="" />
                    </a>
                    Integration
                  </h5>
                  <div className="justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-2">
                    {/* <!-- account details --> */}
                    <div className="bg-dark-blue-light-sky rounded p-4">
                      <div className="d-flex flex-column flex-sm-row align-items-sm-center row">
                        <div className="col-sm-6 col-lg-5 col-xl-4 d-flex gap-3 align-items-center mb-3 mb-sm-0 ">
                          <div className="bg-white rounded-circle p-3 shadow-1">
                            <img src="/assets/business-and-trade.svg" alt="" />
                          </div>
                          <div>
                            <h6 className="fw-500 fs-14px">Forerun Global pvt. ltd.</h6>
                            <p className="mb-0">Chicago, United States</p>
                          </div>
                        </div>

                        <div className="col-sm-6 col-lg-5 col-xl-5">
                          <p className="mb-1 d-flex gap-1 align-items-sm-center">
                            <img src="/assets/email.svg" alt="" />
                            <a href="mailto:JohnD@company.com">JohnD@company.com</a>
                          </p>
                          <p className="d-flex gap-1 align-items-sm-center mt-2 mb-0">
                            <img
                              src="/assets/call_outcomin.svg"
                              className="phone-icon-black"
                              alt=""
                            />
                            <a href="#/" className="text-secondary">
                              +989235677865
                            </a>
                          </p>
                        </div>

                        {/* <!-- <div class="d-flex gap-3 align-items-center mt-3 mt-sm-0">

                    <a class="btn btn-edit py-2" href="#" role="button">Edit</a>
                 </div> --> */}
                      </div>
                    </div>
                    {/* <!-- account details end--> */}

                    <div className="rounded p-sm-4 p-3 mt-4 border-account">
                      {/* <!-- basic details --> */}
                      <h6 className="fs-14px text-primary fw-500">SID</h6>
                      <p className="mb-0 fs-12px">
                        Use this secure application ID to integrate with other comm products. Please
                        do not share with anyone.
                      </p>

                      <div className="row">
                        <div className="col-lg-4 col-xl-4 col-sm-4">
                          <label className="mb-1 mt-3">Region</label>
                          <Selectbox
                            options={['Chicago, USA', 'America', 'UK', 'US']}
                            search="true"
                            onSelect={() => {}}
                          />
                        </div>
                        <div className="col-lg-8 col-xl-7 col-sm-8 mt-3">
                          <label className="mb-1">Account SID</label>
                          <div className="border-transparent gap-2 bg-titan-water rounded d-flex align-items-center p-3 position-relative copy-code-integration">
                            <span>
                              <label className="text-secondary text-break">
                                AC-4J0eXAiOiJKV1QiLCJhbGciOiJJAiOiJKDGFHGV1Q...
                              </label>
                            </span>
                            <a href="#/" className="ms-auto copy-button copy-identifier copy-icon">
                              <img src="/assets/duplicate.svg" className="copy-img" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Application Integration --> */}

                    <div className="rounded p-sm-4 p-3 mt-4 border-account">
                      <h6 className="fs-14px text-primary fw-500">Application Integration</h6>
                      <p className="mb-0 fs-12px">
                        Use this secure application ID to integrate with other comm products. Please
                        do not share with anyone.
                      </p>

                      <div className="row">
                        <div className="col-lg-9 col-xl-7 col-sm-9 mt-3">
                          <label className="mb-1">Application ID</label>
                          <div className="bg-titan-water rounded gap-2 d-flex align-items-center p-3 position-relative copy-code-integration">
                            <span>
                              <label className="text-secondary text-break">
                                4J0eXAiOiJKV1QiLCJhbGciOiJJAiOiJKDGFHGV1Q...
                              </label>
                            </span>
                            <a href="#/" className="ms-auto copy-button copy-identifier copy-icon">
                              <img src="/assets/duplicate.svg" className="copy-img" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- API Token --> */}
                    <div className="rounded p-sm-4 p-3 mt-4 border-account">
                      <div className="d-flex justify-content-between mb-2 mb-sm-1">
                        <div>
                          <h6 className="fs-14px text-primary fw-500 mb-0">API Token</h6>
                        </div>
                        <div>
                          <a href="#/">
                            <img src="/assets/FileTextblue.svg" alt="" /> API documentation
                          </a>
                        </div>
                      </div>
                      <p className="mb-0 fs-12px">
                        API generated to access the comm chat features.
                      </p>
                      <div className="row">
                        <div className="col-lg-9 col-xl-7 col-sm-9 mt-3">
                          <label className="mb-1">URL</label>
                          <div className="bg-titan-water rounded d-flex align-items-center p-3 position-relative copy-code-integration">
                            <span>
                              <label className="text-secondary">
                                https://gsoftcomm-commchat012345.net
                              </label>
                            </span>
                            <a href="#/" className="ms-auto copy-button copy-identifier copy-icon">
                              <img src="/assets/duplicate.svg" className="copy-img" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        id="generateToken"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px mt-4"
                        onClick={(e) => {
                          e.preventDefault();
                          setToggleGenerateToken(!toggleGenerateToken);
                        }}
                      >
                        Generate a Token
                      </button>
                      <div
                        className={`col-lg-12 col-xl-10 generate-token-content ${
                          toggleGenerateToken ? '' : 'd-none'
                        }`}
                      >
                        <div className="border-account p-3 rounded mt-3">
                          <div className="d-flex gap-sm-5 gap-3 flex-column flex-sm-row">
                            <div>
                              <p className="mb-1">API name</p>
                              <p className="mb-0 fw-500">Comm_api_new</p>
                            </div>

                            <div>
                              <p className="mb-1">Profile name</p>

                              <div className="dropdown dropdown-integration">
                                <a
                                  href="#/"
                                  className="d-flex gap-2 align-items-center new-list-campaign profile-list"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Comm_api
                                </a>
                                <ul className="dropdown-menu dropdown-menu-group p-4 dropdown-menu-new-list dropdown-profile">
                                  <h6>Profile name</h6>
                                  <p>Use this name while sending message using this token</p>

                                  <input
                                    className="form-control bg-white"
                                    type="text"
                                    placeholder="Sample name"
                                    aria-label="default input example"
                                  />
                                  <div className="d-flex gap-3 mt-3">
                                    <button
                                      type="button"
                                      id="profileSave"
                                      className="btn bg-black d-flex align-items-center text-white px-3 py-12px profile-save"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      id="cancelProfile"
                                      className="cancel-Profile-List d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </ul>
                              </div>
                            </div>

                            <div>
                              <p className="mb-1">Created on</p>
                              <p className="mb-0">23 Dec 2022</p>
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 mt-4">API Key</label>
                            <div className="d-flex gap-4 align-items-sm-center flex-column flex-sm-row">
                              <div className="col-lg-9 col-xl-9 col-sm-9">
                                <div>
                                  <div className="bg-titan-water gap-2 rounded d-flex align-items-center p-3 position-relative copy-code-integration">
                                    <span>
                                      <label className="text-secondary text-break">
                                        2J0eXAiOiJKV1QiLCJhbGciOiJAiOiJT56JAiOiJKDGFHGV1Q....
                                      </label>
                                    </span>
                                    <a
                                      href="#/"
                                      className="ms-auto copy-button copy-identifier copy-icon"
                                    >
                                      <img
                                        src="/assets/duplicate.svg"
                                        className="copy-img"
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex gap-3 gap-sm-3">
                                <a
                                  href="#/"
                                  className="d-flex gap-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#resetApi"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  <img src="/assets/reset-api.svg" alt="" /> Reset API
                                </a>

                                <a
                                  href="#/"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteApi"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  <img src="/assets/Trash-img-black.svg" alt="" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- delete bot --> */}
      <Modal width="500px" id="deleteApi">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium mb-24px">Delete API key</p>
          <ModalClose onClose={() => {}} />
        </div>

        <p>
          This action will <span className="fw-500">Delete</span> the API key{' '}
          <span className="fw-500">Comm_api_new</span> from the list
        </p>
        <div className="d-flex gap-2 align-items-start bg-version-blue bg-version-blue p-3 rounded">
          <div>
            <img src="/assets/info-svgrepo-com.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once delete API key all the connections with the third party applications will be
              lost.
            </p>
          </div>
        </div>

        <Input id="responseTitle" placeholder="Type “Delete”" type="textbox" disabled="false" />

        <div className="modal-footer border-top-0 justify-content-start p-0 mt-4 gap-1">
          <button
            type="button"
            className="btn bg-faded-red text-white px-3 py-12px delete-btn border-1"
            data-bs-dismiss="modal"
            id="deleteApiBtn"
          >
            Delete
          </button>
          <ButtonWhiteModalCancel text="Cancel" onCancel={() => {}} />
        </div>
      </Modal>

      <Modal width="500px" id="resetApi">
        <div className="d-flex justify-content-between">
          <p className="fs-15px text-primary fw-medium mb-3">Reset API key</p>
          <ModalClose onClose={() => {}} />
        </div>

        <p>
          This action will <span className="fw-500">reset</span> the APY Key
        </p>

        <div className="d-flex gap-2 align-items-start bg-version-blue bg-version-blue p-3 mb-4 mt-2 rounded">
          <div>
            <img src="/assets/info-svgrepo-com.svg" alt="" />
          </div>
          <div>
            <p className="mb-0 text-mariner">
              Once reset API key all the connections with the third party applications will be lost.
            </p>
          </div>
        </div>
        <Input
          label="To confirm this action please type “Reset”"
          id="AgentXYZ"
          placeholder="Type “Reset”"
          type="textbox"
          disabled=""
        />

        <div className="modal-footer d-flex justify-content-start border-0 p-0 mt-4 gap-1">
          <ButtonToast text="Reset" btnID="resetBtn" />
          <ButtonWhiteModalCancel text="Cancel" onCancel={() => {}} />
        </div>
      </Modal>

      <ToastCustom id="resetBtnMsg" btnId="resetBtn">
        <span className="fw-bolder" /> You have successfully Reset the API key.
      </ToastCustom>
      <ToastCustom id="deleteApiBtnMsg" btnId="deleteApiBtn">
        <span className="fw-bolder">Deleted :</span> You have successfully deleted the API key.
      </ToastCustom>

      <ToastCustom id="profileSaveMsg" btnId="profileSave">
        You have successfully saved the profile name.
      </ToastCustom>
    </Layout>
  );
}

export default Integration;
