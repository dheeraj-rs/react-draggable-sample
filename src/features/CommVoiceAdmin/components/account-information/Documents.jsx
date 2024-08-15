import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDocuments from './ProfileDocuments';
import PaginationWithCount from '../../../../common/components/pagination/PaginationWithCount';
import AccountInfoSidebar from './AccountInfoSidebar';
import Layout from '../../../../common/layout';
import Modal from './Modal';
import ToastCustom from '../call-back-list/ToastCustom';
import SearchWithBorder from '../../../TeamInbox/components/SearchWithBorder';

function Documents() {
  return (
    <>
      <Layout
        title="comm voice"
        headerTitle="Settings"
        favIcon="/assets/favIcons/favicon-voice.ico"
      >
        <div className="wrapper">
          <div className="d-flex">
            {/* <!-- <SideNav /> --> */}
            <div className="bg-gray-bright w-100">
              {/* <!-- <TopBar /> --> */}
              <div className="d-flex flex-column flex-lg-row gap-3 d-flex flex-column flex-lg-row gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
                <div className="col-lg-3 col-sm-12 bg-white rounded shadow-1 h-max-content panel-left right-sec-campaign">
                  <AccountInfoSidebar active="document" />
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
                      </a>{' '}
                      Documents
                    </h5>
                    <div className="d-flex justify-content-between bg-orange-gray align-items-center p-3 p-lg-4 rounded mt-3 flex-column flex-sm-row">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="bg-white rounded-circle p-3 shadow-1">
                          <img src="/assets/IdentificationCard.svg" alt="" />
                        </div>
                        <div>
                          <h5 className="fs-14px align-items-center gap-4 d-flex">
                            KYC Documents{' '}
                            <span>
                              <p className="bg-golden-zest rounded text-mocha-brown text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
                                INCOMPLETE
                              </p>
                            </span>
                          </h5>
                          <p className="mb-0">Manage and configure chat related settings</p>
                        </div>
                      </div>

                      <div className="complete-kyc">
                        <Link
                          to="/comm-voice-admin/account-information/comm-kyc-documents"
                          className="btn bg-black fw-medium fs-14px text-white px-3 py-12px mt-3 mt-lg-0 complete-kyc-btn"
                        >
                          Complete your KYC
                        </Link>
                      </div>
                    </div>

                    <hr />

                    <div className="justify-content-between align-items-center mt-0 mt-sm-4 mb-4 row">
                      <div className="col-lg-4 col-sm-4 col-12">
                        <h6 className="fs-14px fw-500 mb-0">Company documents</h6>
                      </div>

                      <div className="col-lg-4 col-sm-5 col-12 mt-4 mt-lg-0 mt-sm-0 text-end">
                        <SearchWithBorder placeholderText="Search file" />
                      </div>
                    </div>

                    <ProfileDocuments
                      name="Regulatory_document_fri, 25-06-2023"
                      updatedTime="Last updated on: 25/11/2023 9.30 am"
                    />

                    <ProfileDocuments
                      name="Regulatory_document_fri, 25-06-2023"
                      updatedTime="Company_termsofuse_fri, 25-06-2023"
                    />

                    <ProfileDocuments
                      name="Regulatory_document_fri, 25-06-2023"
                      updatedTime="Company_termsofuse_fri, 25-06-2023"
                    />

                    <ProfileDocuments
                      name="Regulatory_document_fri, 25-06-2023"
                      updatedTime="Companypolicy_document_fri, 25-06-2023"
                    />

                    <ProfileDocuments
                      name="Regulatory_document_fri, 25-06-2023"
                      updatedTime="Otherdocument_fri, 25-06-2023"
                    />

                    <PaginationWithCount />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Modal width="535px" id="documentSample">
        <div className="d-flex justify-content-between">
          <p className="fs-15px text-primary fw-medium">Regulatory_document_fri, 25-06-2023</p>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <p className="text-secondary fs-13px mb-2">
          file-size: <span>120kb</span>
        </p>
        <div>
          <img className="w-100" src="/assets/kyc-img.svg" alt="" />
        </div>
        <div />
      </Modal>
      <ToastCustom id="downloadDocumentMsg" btnId="downloadDocument">
        You have successfully downloaded the document.
      </ToastCustom>
    </>
  );
}

export default Documents;
