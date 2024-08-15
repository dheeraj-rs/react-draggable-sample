import React from 'react';

function NoApiAvailable({ setShow }) {
  return (
    <div className="api-library bg-thin-blue-light rounded p-5 pb-4 ">
      <div className="row">
        <div className="col-lg-8 col-sm-8">
          <h5 className="fs-18px text-primary fw-500 mb-3">No APIs are available!</h5>
          <p>
            There is no API fonund in the libarary. Please Add APIs to the list by clicking the
            button
          </p>
          <div className="d-flex justify-content-center justify-content-sm-start">
            <a
              href="#/"
              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px mt-2"
              onClick={() => setShow({ isVisible: true, type: 'add-api' })}
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
                <a href="#/" onClick={() => setShow({ isVisible: true, type: 'ChatBot' })}>
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
  );
}

export default NoApiAvailable;
