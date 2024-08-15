import React, { useState } from 'react';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Pagination from '../../CommVoice/components/pagination/Pagination';
import Layout from '../../../common/layout';
import DeleteApiModal from '../components/add-api-library/DeleteApiModal';
import AddApiModal from '../components/add-api-library/AddApiModal';
import DisableApiModal from '../components/add-api-library/DisableApiModal';
import EditApiModal from '../components/add-api-library/EditApiModal';
import ApiList from '../components/add-api-library/ApiList';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';

function AddApiLibrary() {
  const [showApilist, setShowApilist] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  return (
    <>
      <Layout
        title="comm voice"
        headerTitle="Settings"
        favIcon="/assets/favIcons/favicon-voice.ico"
      >
        <div className="wrapper">
          <div className="bg-gray-bright w-100">
            <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
              <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 scroll-custom api-library-wrap">
                <div className="col-lg-12 col-sm-12 pe-0 campaign-landing">
                  <div>
                    <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                      <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                        <a href="/comm-voice-admin/" className="d-flex justify-content-center">
                          <img src="/assets/leftback.svg" alt="" />
                        </a>
                      </div>

                      <h5 className="fs-16px fw-500 d-flex gap-2 mb-0 mt-2 mt-sm-0">
                        <a href="/app/comm-voice-admin/" className="d-block d-lg-none">
                          <img alt="" src="/assets/left-arrow-black.svg" className="me-2" />
                        </a>{' '}
                        API Library
                      </h5>
                    </div>

                    <div
                      className={`api-library bg-thin-blue-light rounded p-5 pb-4 ${
                        showApilist ? 'd-none' : ''
                      }`}
                    >
                      <div className="row">
                        <div className="col-lg-8 col-sm-8">
                          <h5 className="fs-18px text-primary fw-500 mb-3">
                            No APIs are available!
                          </h5>
                          <p>
                            There is no API fonund in the libarary. Please Add APIs to the list by
                            clicking the button
                          </p>
                          <div className="d-flex justify-content-center justify-content-sm-start">
                            <a
                              href="#/"
                              // data-bs-toggle="offcanvas"
                              // data-bs-target="#offcanvasRightAddAction"
                              // aria-controls="offcanvasRightAddAction"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px mt-2"
                              onClick={() => setShowApilist(true)}
                            >
                              Add API
                            </a>
                          </div>

                          <div className="mt-4 gap-sm-4  gap-3 d-flex flex-column flex-sm-row">
                            <p className="d-flex gap-2 align-items-center justify-content-center justify-content-sm-start mb-0 mb-lg-0">
                              <a href="#/">
                                <img
                                  data-bs-toggle="tooltip"
                                  data-bs-title="Know more about API"
                                  src="/assets/how-to.svg"
                                  alt=""
                                />
                              </a>
                              <span className="color-blue-active fw-500">
                                <a href="#/">How to?</a>
                              </span>
                            </p>
                            <p className="text-primary fs-13px fw-normal mb-3 mb-sm-0">
                              If you having any issue?{' '}
                              <span className="color-blue-active">
                                <a
                                  href="#/"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasChatBot"
                                >
                                  Chat with us
                                </a>
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 text-center">
                          <img src="/assets/api-library.svg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className={`add-api-compaign ${showApilist ? '' : 'd-none'}`}>
                      <div className="d-flex align-items-center justify-content-between row">
                        <div className="col-lg-5 col-sm-7 col-12 mt-3 mt-sm-0 mb-3 mb-sm-0">
                          <SearchWithBorder
                            placeholderText="Search API"
                            onChange={() => {}}
                            clearBtn={() => {}}
                          />
                        </div>
                        <div className="col-lg-7 col-sm-5 col-12 d-flex justify-content-end gap-3">
                          <a
                            href="#/"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightAddAction"
                            aria-controls="offcanvasRightAddAction"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px black-btn-mobile"
                          >
                            Add API
                          </a>
                        </div>
                      </div>

                      <div className="mt-4 mb-3">
                        <ApiList
                          apiTitle="Forerun API"
                          campaign="Top deal 2023"
                          type="Connect"
                          updatedDate="23 Dec 2022"
                        />
                      </div>

                      <div className="mb-3">
                        <ApiList
                          apiTitle="VoiceBlast_API"
                          campaign="Year_end_sales_23"
                          type="Get value"
                          updatedDate="23 Dec 2022"
                        />
                      </div>

                      <div className="mb-3">
                        <ApiList
                          apiTitle="Forerun API"
                          campaign="Top deal 2023"
                          type="Get value"
                          updatedDate="23 Dec 2022"
                        />
                      </div>

                      <div className="mb-3">
                        <ApiList
                          apiTitle="VoiceBlast_API"
                          campaign="Year_end_sales_23"
                          type="Passthrough"
                          updatedDate="23 Dec 2022"
                        />
                      </div>
                      <Pagination />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <DeleteApiModal />
      <AddApiModal setToastAction={setToastAction} />
      <EditApiModal />
      <DisableApiModal />

      {/* <ToastCustom id="editPropertyButtonMsg" btnId="editPropertyButton">
        <span className="fw-bolder">Saved :</span>You have successfully Saved API
      </ToastCustom>
      <ToastCustom id="savePropertyButtonMsg" btnId="addPropertyButton">
        {toastError === true ? (
          <span className="fw-bolder">You have not added API</span>
        ) : (
          <span className="fw-bolder ">You have successfully added API</span>
        )}
      </ToastCustom>
      <ToastCustom id="deleteApiBtnMsg" btnId="deleteApiBtn">
        <span className="fw-bolder">Deleted :</span> You have successfully deleted the API
        VoiceBlast_API .
      </ToastCustom>
      <ToastCustom id="disableComponentMsg" btnId="disableComponent">
        <span className="fw-bolder">Disabled :</span> You have successfully disabled the API
        VoiceBlast_API .
      </ToastCustom> */}

      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </>
  );
}

export default AddApiLibrary;
