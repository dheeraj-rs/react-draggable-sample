import React from 'react';

import Input from '../../../../common/components/forms/Input';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function NewCallFlowModal({ formik, show, onClose, isLoading, templatesArray = [] }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        id="newCallFlowModal"
        tabIndex="-1"
        aria-labelledby="newCallFlow"
        aria-hidden="true"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-call-flow">
          <div className="modal-content p-4 border-0 shadow-7">
            <div className="modal-header border-bottom-0 pb-0">
              <h5 className="modal-title" id="exampleModalLabel">
                New Call Flow
              </h5>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  handleClose();
                }}
              />
            </div>
            <div className="modal-body">
              <div>
                <Input
                  name="name"
                  label="Call flow name"
                  id="botName"
                  placeholder="Provide a call flow name"
                  type="textbox"
                  value={formik?.values?.name}
                  onChange={formik.handleChange}
                  style={isFormFieldValid(formik, 'name') ? { border: '1px solid red' } : {}}
                />
                {getFormErrorMessage(formik, 'name')}
              </div>
              <div className="first-sec">
                {/* <!-- First section --> */}
                <div className="row">
                  <p className="mb-3 fw-500 fs-13px mt-4">Choose Template</p>

                  {templatesArray?.map((template, index) => (
                    <div
                      key={index}
                      className="col-lg-4 col-sm-4 mb-3 cursor-pointer templateId-outer "
                      onClick={() => {
                        formik.setFieldValue('templatedId', template?.id);
                        formik.setFieldValue('is_published', template?.attributes?.is_published);
                      }}
                    >
                      <div
                        className={`d-flex gap-3 align-items-start start-scratch  p-4 rounded-3 flow-type-box ${
                          formik?.values?.templatedId === template?.id ? 'active' : ''
                        }`}
                      >
                        <img src={template?.image} alt="" />
                        <div>
                          <h6 className="fw-500 fs-13px">{template?.attributes?.name}</h6>
                          <p className="mb-0 ">{template?.attributes?.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="fs-13px mt-2 mb-4 text-center d-none">
                  <h6>OR</h6>
                </div>

                <div
                  role="button"
                  className="d-flex gap-3 align-items-start start-scratch  p-4 rounded-3 flow-type-box connect-agent d-none"
                >
                  <img src="/assets/custome-flow.svg" alt="" />
                  <div>
                    <h6 className="fw-500 fs-13px">Connect Agent</h6>
                    <p className="mb-0  line-clamp-2">
                      Configure direct calling with a specific agent.
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-center border-top-0 mt-4 mb-0">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px btn-flow-continue"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'loading...' : 'Continue'}
                  </button>
                  <a
                    href="/#"
                    // data-bs-dismiss="modal"
                    className="d-flex align-items-center fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${show ? 'show' : 'd-none'}`} />
    </>
  );
}

export default NewCallFlowModal;
