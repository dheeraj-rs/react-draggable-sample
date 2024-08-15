import React from 'react';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import Pagination from '../../../CommVoice/components/pagination/Pagination';

function SmsTemplateModalWithPagination({ isVisible, setSsSmsTemplateModalVisible, formik }) {
  const handleClose = () => {
    setSsSmsTemplateModalVisible(false);
  };

  const onSelect = () => {
    formik.setFieldValue(
      'message',
      'YOU can win Rs 20,000 in Fantasy cricket use code 542321. Install FORERUN app now to WIN Click - https://www.forerunglobal.com'
    );
    setSsSmsTemplateModalVisible(false);
  };
  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="sms-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" style={{ maxWidth: '869px' }}>
            <div className="modal-content border-0">
              <div className="modal-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="fs-16px fw-500 m-0">Choose SMS Template</h4>
                  <span onClick={handleClose}>
                    <img
                      src="/assets/call-flows-hours/X.svg"
                      alt=""
                      data-bs-dismiss="modal"
                      className="cursor-pointer"
                    />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '310px' }}>
                      <SearchWithBorder
                        placeholderText="Search SMS template by id, content"
                        onChange={() => {}}
                        clearBtn={() => {}}
                      />
                    </div>
                    <div style={{ width: '145px' }}>
                      <div className="form-group mt-3">
                        <select
                          name=""
                          className="form-control form-select bg-white"
                          value="select"
                          onChange={() => {}}
                        >
                          <option value="select">Select</option>

                          {[]?.length > 0 &&
                            []?.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="fs-13px color-blue-active d-flex align-items-center justify-content-end blue-active-hover cursor-pointer">
                    <img className="me-2" src="/campaign/message_2.svg" alt="" />
                    Manage Templates
                  </div>
                </div>
                <div>
                  <div
                    className="sms-template-list-item bg-titan-water-hover rounded-2 p-4 mb-2"
                    onClick={() => {
                      onSelect();
                    }}
                  >
                    <p className="fs-13px m-0">
                      DLT Template ID : <b>65465456</b>{' '}
                      <span className="color-blue-active">Transactional (Service Implicit)</span>
                    </p>
                    <p className="fs-13px m-0">
                      YOU can win Rs 20,000 in Fantasy cricket use code 542321. Install FORERUN app
                      now to WIN Click -
                    </p>
                    <p className="fs-13px m-0">
                      https://www.forerunglobal.com/...
                      <a
                        href="/#"
                        className="color-blue-active"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        View less
                      </a>
                    </p>
                  </div>
                  <div
                    className="sms-template-list-item bg-titan-water-hover rounded-2 p-4 mb-2"
                    onClick={() => {
                      onSelect();
                    }}
                  >
                    <p className="fs-13px m-0">
                      DLT Template ID : <b>1107168862971591755</b>{' '}
                      <span className="color-blue-active">Transactional (Service Implicit)</span>
                    </p>
                    <p className="fs-13px m-0">Hello welcome to forerun family</p>
                  </div>
                  <div
                    className="sms-template-list-item bg-titan-water-hover rounded-2 p-4 mb-2"
                    onClick={() => {
                      onSelect();
                    }}
                  >
                    <p className="fs-13px m-0">
                      DLT Template ID : <b>1107168862971591755</b>{' '}
                      <span className="color-blue-active">Transactional (Service Implicit)</span>
                    </p>
                    <p className="fs-13px m-0">
                      This is a test message powered by Gsoft Omni. Report abuse to +918088919888
                      -Gsoft Omni
                    </p>
                  </div>
                  <div
                    className="sms-template-list-item bg-titan-water-hover rounded-2 p-4 mb-2"
                    onClick={() => {
                      onSelect();
                    }}
                  >
                    <p className="fs-13px m-0">
                      DLT Template ID : <b>65465456</b>{' '}
                      <span className="color-blue-active">Transactional (Service Implicit)</span>
                    </p>
                    <p className="fs-13px m-0">
                      Your Rs.#var# exclusive voucher is UNUSED!! Redeem it on purchase of
                      Rs.#var#...
                      <a
                        href="/#"
                        className="color-blue-active"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        View more
                      </a>
                    </p>
                  </div>
                  <div
                    className="sms-template-list-item bg-titan-water-hover rounded-2 p-4 mb-2"
                    onClick={() => {
                      onSelect();
                    }}
                  >
                    <p className="fs-13px m-0">
                      DLT Template ID : <b>1107168862971591755</b>{' '}
                      <span className="color-blue-active">Transactional (Service Implicit)</span>
                    </p>
                    <p className="fs-13px m-0">gsofttechnologies</p>
                  </div>

                  <Pagination />

                  <div className="d-flex align-items-center gap-2 mt-4">
                    <button
                      type="button"
                      className="btn bg-black fw-medium fs-14px text-white px-3 py-12px hangup-modal-extend"
                      data-bs-dismiss="modal"
                      id="sms-submit-btn"
                    >
                      Add Template
                    </button>
                    <button
                      type="button"
                      className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-2"
                      //   data-bs-dismiss="modal"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
  return null;
}

export default SmsTemplateModalWithPagination;
