import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../../common/layout';
import SearchWithBorder from '../../../TeamInbox/components/SearchWithBorder';
import ButtonToast from '../../../../common/components/toast/ButtonToast';
import DangerBadge from '../../../../common/components/badges/DangerBadge';
import KycDocumentBox from '../../../CommVoice/components/KycDocumentBox';
import Modal from './Modal';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';
import ButtonCancel from '../../../../common/components/common/ButtonCancel';
import ToastCustom from '../call-back-list/ToastCustom';

function CommKycDocument() {
  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 commmon-mob-padding">
              <div className="d-flex gap-2 left-mob pb-lg-4 pb-sm-4 pb-0">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link
                    to="/comm-voice-admin/account-information/documents"
                    className="d-flex justify-content-center"
                  >
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="top-wrap-common-mob">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link
                      to="/comm-voice-admin/account-information/documents"
                      className="d-block d-lg-none"
                    >
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    KYC Documents
                  </h5>
                  <p className="mb-0 text-secondary">
                    Telecom Regulatory Authority of India (TRAI) demands us to verify your KYC
                    documents. Below are the major documents you have to submit.
                  </p>
                </div>
              </div>
              <div className="equal-pad scroll-wrap-doc scroll-custom pb-3">
                <div className="d-flex justify-content-between align-items-center  mb-2 mt-0 mb-lg-4 flex-wrap mt-sm-2 mx-lg-0 mx-1">
                  <div className="col-lg-4 col-sm-12 col-12 px-lg-0">
                    <SearchWithBorder placeholderText="Search" />
                  </div>
                  <div className="mt-3 mt-lg-0">
                    1 of <b>5</b> documents has verified
                  </div>
                </div>

                <h5 className="mb-0 mt-lg-4 mt-4 fs-13px mx-lg-0 mx-1">Pending upload (3)</h5>

                {/* <!-- Uploading discard --> */}
                <div className="global-hover row justify-content-between shadow-6 align-items-center p-4 rounded mt-4 flex-wrap mx-lg-0 mx-1 px-3">
                  <div className="d-flex gap-3 align-items-center mb-3 mb-lg-0 col-lg-6 col-sm-4 col-md-4">
                    <a href="#/">
                      <img src="/assets/png-image.svg" alt="" />
                    </a>

                    <div className="d-flex flex-wrap">
                      <h5 className="fs-13px fw-500 w-100">Passport size photo</h5>
                      <span className="fs-13px mb-0">
                        <a
                          href="#/"
                          data-bs-toggle="modal"
                          data-bs-target="#passportImage"
                          className="fs-13px text-blue-badge text-break"
                        >
                          My_image_new.png
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-5 col-md-5">
                    <p className="mb-0">Size: 120 KB</p>
                    <p className="mb-0">Verified on: 12/07/2022</p>
                  </div>

                  <div className="doc-upload col-lg-3 justify-content-lg-end justify-content-start d-flex col-sm-3 col-md-3 mt-lg-0 mt-sm-0 mt-3 justify-content-sm-end">
                    <div>
                      <ButtonToast text="Submit" btnID="Submitdocument" />
                      <div className="d-none SubmittedBtn">
                        <ButtonToast text="Submitted" btnID="Submitdocument" />
                      </div>
                    </div>
                    <div className="doc-upload col-lg-2 justify-content-end d-flex col-sm-3 col-md-3 d-none uploadSubmit d-none">
                      <div className="position-relative">
                        <input type="file" multiple="" />
                        <button
                          type="button"
                          id="#"
                          className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                    <div>
                      <a
                        href="#/"
                        data-bs-toggle="modal"
                        data-bs-target="#discardModal"
                        className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                      >
                        Discard
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Uploading --> */}
                <div className="global-hover row px-2 justify-content-between shadow-6 align-items-center p-4 rounded mt-4 flex-wrap mx-lg-0 mx-1">
                  <div className="d-flex gap-3 align-items-center col-lg-7 col-sm-6 col-md-6">
                    <a href="#/">
                      <img src="/assets/pdf-icon.svg" alt="" />
                    </a>
                    <div className="d-flex flex-wrap">
                      <h5 className="fs-13px fw-500 w-100">Company PAN Card</h5>
                      <p className="fs-13px mb-0">Max. file size 4 MB. (Accept jpg, png, pdf)</p>
                    </div>
                  </div>

                  <div className="doc-details mt-lg-0 mt-3 mb-lg-0 mb-3 col-lg-3 col-sm-3 col-md-3 uploadingProgress">
                    <div className="d-flex justify-content-between">
                      <div className="mb-2">Uploading...</div>
                      <div className="fw-medium">80%</div>
                    </div>
                    <div className="card-progress mb-15">
                      <div
                        className="progress-bar card-progress-bar kyc-progress"
                        role="progressbar"
                        style={{ width: '75%' }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-2 col-md-2 uploadError d-none mt-3 mt-lg-0 mt-sm-0">
                    <span className="text-red">Upload error!</span>
                  </div>

                  <div className="upload-btn col-lg-2 justify-content-end d-flex col-sm-3 col-md-3 uploadClose">
                    <ButtonCancel text="Cancel" textId="UploadCancel" />
                  </div>

                  <div className="doc-upload col-lg-2 justify-content-end d-flex col-sm-3 col-md-3 d-none uploadDoc">
                    <div className="position-relative">
                      <input type="file" multiple="" />
                      <button
                        type="button"
                        id="#"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- end --> */}

                {/* <!-- Uploading error --> */}
                <div className="global-hover row px-2 justify-content-between shadow-6 align-items-center p-4 rounded mt-4 flex-wrap mx-lg-0 mx-1">
                  <div className="d-flex gap-3 align-items-center mb-3 mb-lg-0 col-lg-7 col-sm-6 col-md-6">
                    <a href="#/">
                      <div className="position-relative">
                        <img src="/assets/pdf-icon.svg" alt="" />
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <img src="/assets/error-red-icon.svg" alt="" />
                        </div>
                      </div>
                    </a>

                    <div className="d-flex flex-wrap">
                      <h5 className="fs-13px fw-500 w-100">Passport size photo</h5>
                      <span className="fs-13px mb-0">Max. file size 200 KB. (Accept jpg, png)</span>

                      <span className="dropup-center dropup">
                        <a
                          href="#/"
                          className="text-blue-badge"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          guideline
                        </a>
                        <ul className="dropdown-menu dropdown-guide p-3 shadow-6 mt-4 px-4 text-white bg-dark">
                          <div className="d-flex flex-column">
                            <div>
                              <span> Photo upload guidelines</span>
                            </div>
                            <div className="guideline p-3">
                              <ul>
                                <li>Photograph should be in passport size format.</li>
                                <li>Photo, wearing mask, cap and dark glass will be rejected.</li>
                                <li>
                                  Image file should be in <span className="fw-medium">jpg</span> or{' '}
                                  <span className="fw-medium">png</span> format.
                                </li>
                                <li>
                                  Dimensions of the photograph should be{' '}
                                  <span className="fw-medium">150 X 200</span>
                                </li>
                                <li>
                                  Image file should be between{' '}
                                  <span className="fw-medium">15 KB</span> and{' '}
                                  <span className="fw-medium">100 KB</span> file size.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </ul>
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-md-3">
                    <span className="text-red">Upload error!</span>
                  </div>

                  <div className="doc-upload col-lg-2 justify-content-end d-flex col-sm-3 col-md-3">
                    <div className="position-relative">
                      <input type="file" multiple="" />
                      <button
                        type="button"
                        id="#"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>

                {/* <!-- upload errorend --> */}

                {/* <!-- upload --> */}
                <div className="global-hover row px-2 justify-content-between shadow-6 align-items-center p-4 rounded mt-4 flex-wrap mx-lg-0 mx-1">
                  <div className="d-flex gap-3 align-items-center mb-3 mb-lg-0 col-lg-7 col-sm-6 col-md-6">
                    <a href="#/">
                      <img src="/assets/pdf-icon.svg" alt="" />
                    </a>
                    <div className="d-flex flex-wrap">
                      <h5 className="fs-13px fw-500 w-100">Passport size photo</h5>
                      <span className="fs-13px mb-0">Max. file size 200 KB. (Accept jpg, png)</span>

                      <span className="dropup-center dropup">
                        <a
                          href="#/"
                          className="text-blue-badge"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          guideline
                        </a>
                        <ul className="dropdown-menu dropdown-guide p-3 shadow-6 mt-4 px-4 text-white bg-dark">
                          <div className="d-flex flex-column">
                            <div>
                              <span> Photo upload guidelines</span>
                            </div>
                            <div className="guideline p-3">
                              <ul>
                                <li>Photograph should be in passport size format.</li>
                                <li>Photo, wearing mask, cap and dark glass will be rejected.</li>
                                <li>
                                  Image file should be in <span className="fw-medium">jpg</span> or{' '}
                                  <span className="fw-medium">png</span> format.
                                </li>
                                <li>
                                  Dimensions of the photograph should be{' '}
                                  <span className="fw-medium">150 X 200</span>
                                </li>
                                <li>
                                  Image file should be between{' '}
                                  <span className="fw-medium">15 KB</span> and{' '}
                                  <span className="fw-medium">100 KB</span>file size.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </ul>
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-md-3">
                    <span>
                      <p className="bg-sandal-color rounded text-yellow-600 text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
                        NOT SUBMITTED
                      </p>
                    </span>
                  </div>

                  <div className="doc-upload col-lg-2 justify-content-end d-flex col-sm-3 col-md-3">
                    <div className="position-relative">
                      <input type="file" multiple="" />
                      <button
                        type="button"
                        id="#"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>

                <div className="global-hover row px-2 justify-content-between shadow-6 align-items-center p-4 rounded mt-4 flex-wrap mx-lg-0 mx-1">
                  <div className="d-flex gap-3 align-items-center mb-3 mb-lg-0 col-lg-7 col-sm-6 col-md-6">
                    <a href="#/">
                      <img src="/assets/pdf-icon.svg" alt="" />
                    </a>
                    <div className="d-flex flex-wrap">
                      <h5 className="fs-13px fw-500 w-100">Company PAN Card</h5>
                      <p className="fs-13px mb-0">Max. file size 4 MB. (Accept jpg, png, pdf)</p>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-md-3">
                    <span>
                      <p className="bg-sandal-color rounded text-yellow-600 text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
                        NOT SUBMITTED
                      </p>
                    </span>
                  </div>

                  <div className="doc-upload col-lg-2 justify-content-end d-flex col-sm-3 col-md-3">
                    <div className="position-relative">
                      <input type="file" multiple="" />
                      <button
                        type="button"
                        id="#"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>

                <div className="global-hover row px-2 justify-content-between shadow-6 align-items-center p-4 rounded mt-4 flex-wrap mx-lg-0 mx-1">
                  <div className="d-flex gap-3 align-items-center mb-3 mb-lg-0 col-lg-7 col-sm-6 col-md-6">
                    <a href="#/">
                      <img src="/assets/pdf-icon.svg" alt="" />
                    </a>
                    <div className="d-flex flex-wrap">
                      <h5 className="fs-13px fw-500 w-100">Company Address Proof</h5>
                      <p className="fs-13px mb-0">Max. file size 4 MB. (Accept jpg, png, pdf)</p>
                    </div>
                  </div>

                  <div className="gap-3 d-flex align-items-center col-lg-3 col-sm-3 col-md-3">
                    <DangerBadge title="Rejected" />

                    <div className="tooltip-content cursor-pointer">
                      <img src="/assets/info-svgrepo-com.svg" alt="" />
                      <span className="tooltiptext-content p-3">
                        <p className="fw-500 mb-0">Reason for Rejection</p>
                        <p className="mb-0">Document is not clear lack of visibility of fonts</p>
                      </span>
                    </div>
                  </div>

                  <div className="doc-upload col-lg-2 justify-content-end d-flex col-sm-3 col-md-3">
                    <div className="position-relative">
                      <input type="file" multiple="" />
                      <button
                        type="button"
                        id="#"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>

                <h5 className="mb-0 mt-4 mt-lg-5 mt-sm-5 ms-1 ms-lg-0 ms-sm-0">
                  Verification pending (1)
                </h5>

                <KycDocumentBox
                  title="Company PAN Card"
                  pdfLink="#abcCerficate"
                  pdfName="ABCCorporatiionPAN.png"
                  fileSize="Size: 120 KB"
                  verifiedDate="Verified on: 12/07/2022"
                  bgColor="tropical-blue"
                  badgeTitle="SUBMITTED"
                  textColor="blueberry"
                  pdfIcon="/assets/png-image.svg"
                />

                <h5 className="mb-0 mt-4 mt-lg-5 mt-sm-5 ms-1 ms-lg-0 ms-sm-0">
                  Documents verified (1)
                </h5>

                <KycDocumentBox
                  title="Certificate of Incorporation"
                  pdfLink="#modalCerficate"
                  pdfName="Certificate of Incorporation_2022.pdf"
                  fileSize="Size: 700 KB"
                  verifiedDate="Verified on: 12/07/2022"
                  bgColor="green-torquoise"
                  badgeImage="/assets/check-green.svg"
                  badgeTitle="VERIFIED"
                  textColor="green"
                  pdfIcon="/assets/pdfred.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal width="" id="">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between w-100">
            <p className="fs-15px text-primary fw-medium">Certificate of Incorporation_2018.pdf</p>
            <div className="me-4">
              <a
                href="/assets/agreement.svg"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-original-title="Download"
                download
              >
                <img src="/assets/upload-icon.svg" alt="" />
              </a>
            </div>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <p className="text-secondary fs-13px mb-2">
          file-size: <span>700 KB</span>
        </p>
        <div>
          <img className="w-100" src="/assets/certificate-img.svg" alt="" />
        </div>
        <div />
      </Modal>

      <div
        className="modal fade"
        id="modalCerficate"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content border-0">
            <div className="modal-header border-0">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <p className="fs-15px text-primary fw-medium mb-0">
                    Certificate of Incorporation_2018.pdf
                  </p>
                  {/* <!-- <p class="text-secondary fs-13px mb-0">
                file-size: <span>700 KB</span>
              </p> --> */}
                </div>
                <div className="me-4">
                  <a
                    href="https://drive.google.com/viewerng/viewer?embedded=true&url=http://infolab.stanford.edu/pub/papers/google.pdf"
                    target="_blank"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    data-bs-original-title="Download"
                    download
                    rel="noreferrer"
                  >
                    <img src="/assets/upload-icon.svg" alt="" />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body bg-light-gray-white">
              <div>
                <iframe
                  src="/assets/sample.pdf"
                  style={{ height: 'calc(100vh - 160px)' }}
                  width="100%"
                  title="sample"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- modal passport size pic --> */}

      <div
        className="modal fade"
        id="passportImage"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-sm">
          <div className="modal-content border-0">
            <div className="modal-header border-0">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <p className="fs-15px text-primary fw-medium mb-0">Passport size photo</p>
                  <p className="text-secondary fs-13px mb-0">
                    file-size: <span>200 KB</span>
                  </p>
                </div>
                <div className="me-4">
                  <a
                    href="/assets/agreement.svg"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    data-bs-original-title="Download"
                    download
                  >
                    <img src="/assets/upload-icon.svg" alt="" />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body bg-light-gray-white">
              <div>
                <img className="w-100" src="/assets/passport-dummy.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modal abc corporation --> */}
      <div
        className="modal fade"
        id="abcCerficate"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header border-0">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <p className="fs-15px text-primary fw-medium mb-0">ABC Incorporation_2018</p>
                  <p className="text-secondary fs-13px mb-0">
                    file-size: <span>700 KB</span>
                  </p>
                </div>
                <div className="me-4">
                  <a
                    href="/assets/agreement.svg"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    data-bs-original-title="Download"
                    download
                  >
                    <img src="/assets/upload-icon.svg" alt="" />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body bg-light-gray-white">
              <div>
                <img className="w-100" src="/assets/abc-img-doc.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- delete modal starts--> */}

      <Modal width="450px" id="discardModal">
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium mb-24px">Discard document</p>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <p className="fs-13px text-primary mb-3">This action will discard the uploaded document</p>

        <div className="modal-footer d-flex justify-content-center align-items-center  border-0 p-0 mt-4">
          <button
            type="button"
            id="discardBtn"
            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
            data-bs-dismiss="modal"
          >
            Discard
          </button>
          <ButtonWhiteModalCancel text="Cancel" onCancel={() => {}} />
        </div>
      </Modal>
      {/* <!-- delete modal ends --> */}

      <ToastCustom id="SubmitBtnmsg" btnId="Submitdocument">
        <span>
          <span className="fw-bolder">Document submitted : </span> You have successfully submitted
          the document
        </span>
      </ToastCustom>
    </Layout>
  );
}

export default CommKycDocument;
