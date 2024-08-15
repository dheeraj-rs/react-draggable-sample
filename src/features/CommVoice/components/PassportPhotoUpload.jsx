import React from 'react';
import { Link } from 'react-router-dom';
import NotSubmitted from '../../../common/components/badges/NotSubmitted';

function PassportPhotoUpload() {
  return (
    <div className="col-lg-6 col-sm-12">
      <div className="kyc-document bg-white rounded shadow-6 p-3 mt-4">
        <div className="d-flex flex-row justify-content-between">
          <div className="text-primary fs-13px fw-medium">Your Passport size photo</div>
          <NotSubmitted title="not submitted" />
        </div>

        <div className="doc-details">
          <div className="d-flex flex column align-items-center gap-3">
            <div>
              <Link to="/">
                <img src="/assets/address-proof.svg" alt="" />
              </Link>
            </div>
            <div>
              <div
                role="button"
                className="doc-upload w-100 d-flex flex-column align-items-center justify-content-center rounded p-3"
              >
                <div className="position-relative">
                  <input type="file" multiple="" />
                  <span>
                    <Link to="/" className="text-blue-active fw-bolder">
                      Click
                    </Link>
                    <span className="fw-medium text-primary">to upload</span> or{' '}
                    <span className="fw-medium text-primary">drag and drop</span>
                    <br />
                    Maximum file size less than 100kb (jpg, png).
                  </span>
                  <span className="dropup-center dropup">
                    <Link
                      to="/"
                      className="text-blue-active"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Guidelines
                    </Link>
                    <ul className="dropdown-menu dropdown-guide p-3 shadow-6 mt-4">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassportPhotoUpload;
