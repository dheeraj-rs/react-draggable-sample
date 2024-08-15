import React from 'react';
import { Link } from 'react-router-dom';
import NotSubmitted from '../../../common/components/badges/NotSubmitted';

function PassportPhotoError() {
  return (
    <div className="col-lg-6 col-sm-12">
      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
        <div className="d-flex flex-row justify-content-between">
          <div className="fs-13px text-primary fw-medium">Your Passport size photo</div>
          <NotSubmitted title="not submitted" />
        </div>

        <div className="mt-3">
          <div className="d-flex flex column align-items-center gap-3">
            <div>
              <Link to="/">
                <img src="/assets/photo-error.svg" alt="" />
              </Link>
            </div>
            <div>
              <div className="doc-upload  w-100">
                <div className="position-relative">
                  <div className="text-primary fw-medium">Image upload error!</div>
                  <input type="file" multiple="" />
                  <Link to="/" className="link-btn">
                    <span className="text-primary">Please review the</span>
                  </Link>
                  <span className="dropup-center dropup">
                    <Link
                      to="/"
                      className="text-blue-active"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Guidelines
                    </Link>
                    <ul className="dropdown-menu dropdown-guide-error p-3 shadow-6 mt-4">
                      <div className="d-flex flex-column">
                        <div className="fw-bolder fs-16px text-blue-active">
                          <img src="/assets/camera.svg" alt="" />

                          <span className="ms-2">Photo upload guidelines</span>
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
                              Image file should be between <span className="fw-medium">15 kb</span>{' '}
                              and <span className="fw-medium">100 kb</span>file size.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </ul>
                  </span>

                  <span className="text-secondary">and </span>
                  <span className="text-blue-active"> Retry</span>
                </div>
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
  );
}

export default PassportPhotoError;
