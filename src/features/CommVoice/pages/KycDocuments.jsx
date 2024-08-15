import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import TelephonySideNav from '../components/TelephonySideNav';
import SuccessBadge from '../../../common/components/badges/SuccessBadge';
import DangerBadge from '../../../common/components/badges/DangerBadge';
import UserStatusBadge from '../../../common/components/badges/UserStatusBagde';
import PassportPhotoUpload from '../components/PassportPhotoUpload';
import AddressProofUpload from '../components/AddressProofUpload';
import PanProofUpload from '../components/PanProofUpload';
import PassportPhotoError from '../components/PassportPhotoError';
import UploadingArea from '../components/UploadingArea';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function CommKycDocuments() {
  return (
    <Layout title="comm chat" headerTitle="Settings">
      <div className="wrapper">
        <div className="d-flex">
          {/* <!-- <SideNav /> --> */}
          <div className="bg-gray-bright w-100">
            {/* <!-- <TopBar /> --> */}
            <div className="gap-3 d-flex p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
              <TelephonySideNav active={1} />

              <div
                id="settings-expand"
                className="col-lg-9 col-sm-12 pe-2 scroll-custom overflow-x-hidden"
              >
                <div className="bg-white shadow-1 rounded p-23px ">
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-3">
                        <Link
                          to="/"
                          id="backBtnSettings"
                          className="text-dark me-2 d-flex d-block d-lg-none fw-medium"
                        >
                          <img height="20" src="/assets/left-arrow-black.svg" alt="" />
                        </Link>
                        <p className="fs-17px text-primary fw-500 mb-0">KYC Documents</p>
                      </div>
                      <p className="text-secondary fs-12px mb-0">
                        Indian telecom regulations demands us to verify your KYC documents. Below
                        are the major documents you have to submit.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mt-4">
                    <div className="text-primary fw-medium fs-14px">Document list</div>
                    <div className="ms-auto">
                      <div>
                        <span className="fw-bolder text-blue-active">1</span> of{' '}
                        <span className="fw-bolder text-blue-active">4</span>documents has verified
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* <!-- Agreement starts --> */}
                    <div className="col-lg-6 col-sm-12">
                      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
                        <div className="d-flex flex-row justify-content-between">
                          <div className="text-primary fs-13px fw-medium">
                            Certificate of Agreement
                          </div>
                          <SuccessBadge title="verified" />
                        </div>

                        <div className="mt-3">
                          <div className="d-flex flex column align-items-center gap-3">
                            <div>
                              <Link to="/">
                                <img src="/assets/coa.svg" alt="" />
                              </Link>
                            </div>
                            <div>
                              <div className="text-primary">Certificate of Agreement_2022.pdf</div>
                              <div className="mt-2 text-secondary">
                                Size: 700KB | Verified on: 12/07/2022
                              </div>
                            </div>
                            <div className="d-flex ms-auto">
                              {/* <!-- <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="Replace file"
                                aria-label="Replace file"
                              >
                                <img src="/assets/qr-code.svg" />
                              </a> --> */}

                              <div
                                className="doc-upload  w-100"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Replace file"
                                aria-label="Replace file"
                              >
                                <div className="position-relative">
                                  <input type="file" multiple="" />
                                  <Link to="/">
                                    <img src="/assets/qr-code.svg" alt="" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Agreement ends --> */}

                    {/* <!-- rejected document starts --> */}
                    <div className="col-lg-6 col-sm-12">
                      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
                        <div className="d-flex flex-row justify-content-between">
                          <div className="text-primary fs-13px fw-medium">
                            Your company PAN card
                          </div>
                          <DangerBadge title="Rejected" />
                        </div>

                        <div className="mt-3">
                          <div className="d-flex flex column align-items-center gap-3">
                            <div>
                              <Link to="/">
                                <img src="/assets/pan.svg" alt="" />
                              </Link>
                            </div>
                            <div>
                              <div className="text-primary">Company PAN(ABCDEF0).pdf</div>
                              <div className="mt-2">
                                This document has rejected
                                <span className="dropup-center dropup">
                                  <Link
                                    to="/"
                                    className="text-blue-active"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    View comment
                                  </Link>
                                  <ul className="dropdown-menu dropdown-reject p-3 shadow-6 mt-4">
                                    <div className="d-flex flex-column">
                                      <div className="fw-medium text-red fs-16px">
                                        <img src="/assets/danger.svg" alt="" />
                                        Reason for Rejection
                                      </div>
                                      <div className="text-secondary mt-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aliquam sem urna, condimentum sed nisl ac, rhoncus convallis
                                        diam.
                                      </div>
                                    </div>
                                  </ul>
                                </span>
                              </div>
                            </div>
                            <div className="d-flex ms-auto">
                              <div
                                className="doc-upload  w-100"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-original-title="Replace file"
                                aria-label="Replace file"
                              >
                                <div className="position-relative">
                                  <input type="file" multiple="" />
                                  <Link to="/">
                                    <img src="/assets/qr-code.svg" alt="" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- rejected doc ends --> */}

                    <div className="col-lg-6 col-sm-12">
                      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
                        <div className="d-flex flex-row justify-content-between">
                          <div className="text-primary fs-13px fw-medium">
                            Certificate of Agreement
                          </div>
                          <UserStatusBadge title="Not verified" />
                        </div>

                        <div className="mt-3">
                          <div className="d-flex flex column align-items-center gap-3">
                            <div>
                              <Link to="/">
                                <img src="/assets/pan.svg" alt="" />
                              </Link>
                            </div>
                            <div>
                              <div className="text-primary">Company PAN(ABCDEF0).pdf</div>
                              <div className="mt-2 text-secondary">
                                Size: 700KB | Uploaded on: 12/07/2022
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- doc box ends --> */}
                    </div>

                    {/* <!-- Not verified doc ends --> */}

                    {/* <!-- passport photo listing starts --> */}
                    <div className="col-lg-6 col-sm-12">
                      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
                        <div className="d-flex flex-row justify-content-between">
                          <div className="text-primary fs-13px fw-medium">
                            Your Passport size photo
                          </div>
                          <UserStatusBadge title="Not verified" />
                        </div>

                        <div className="mt-3">
                          <div className="d-flex flex column align-items-center gap-3">
                            <div>
                              <Link to="/">
                                <img src="/assets/passport-pic.png" alt="" />
                              </Link>
                            </div>
                            <div>
                              <div className="text-primary">Company PAN(ABCDEF0).pdf</div>
                              <div className="mt-2 text-secondary">
                                Size: 700KB | Uploaded on: 12/07/2022
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- passport photo listing ends --> */}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-sm-12">
                      <hr className="m-0 border-black o-16" />
                    </div>
                  </div>

                  <div className="row">
                    {/* <!-- pan  proof upload starts --> */}
                    <PanProofUpload />
                    {/* <!-- pan  proof upload ends --> */}
                    {/* <div className="col-lg-6 col-sm-12"> */}
                    <AddressProofUpload />
                  </div>
                  {/* <!-- Address  proof upload ends --> */}
                  {/* <!-- passport  photo upload starts --> */}
                  <PassportPhotoUpload />
                  {/* <!-- passport  photo upload ends --> */}
                  {/* <!-- uploading area starts --> */}
                  <UploadingArea />
                  {/* <!-- uploading area ends --> */}

                  {/* <!-- passport photo error starts --> */}
                  <PassportPhotoError />
                  {/* <!-- passport  photo error ends --> */}
                </div>
                <div className="d-flex mt-5">
                  {/* <!-- <ButtonBlack onClick="" text="Submit" />
                    <ButtonWhite onClick="" text="cancel" /> --> */}
                  <button
                    type="button"
                    id="kycInformationSave"
                    className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="kycInformationCancel"
                    className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- toast save account info --> */}
      <ToastSuccess id="kycSaveToastMsg">
        <span>
          {' '}
          KYC document details <span className="fw-bolder">saved </span> successfully
        </span>
      </ToastSuccess>
      {/* <!-- toast cancel account info --> */}
      <ToastSuccess id="kycCancelToastMsg">
        <span>
          {' '}
          KYC document details <span className="fw-bolder">discarded </span> successfully
        </span>
      </ToastSuccess>
    </Layout>
  );
}

export default CommKycDocuments;
