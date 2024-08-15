import React, { useState } from 'react';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import Input from '../../../common/components/forms/Input';

function CarrierCredentials({ show, setShow, carrierName, userName, password }) {
  const [showCarrierCredentials, setShowCarrierCredentials] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowCarrierCredentials(false);
  };

  return (
    <>
      <div
        className="modal mt-65"
        tabIndex="-1"
        id="carrierCredentials"
        style={show ? { display: 'block' } : {}}
      >
        <div className="modal-dialog">
          <div className="modal-content border-0">
            <div className="modal-content p-4">
              {/* <!-- Modal Header --> */}
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title text-dark fw-medium fs-15px">
                  Carrier Credentials - {carrierName}
                </h4>

                <a
                  href="/#"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                />
              </div>

              <div className="modal-body pt-1">
                <div className={showCarrierCredentials ? 'd-none' : 'reacptcha-content'}>
                  <p className="mb-2 mt-5">For access the API you have to confirm below</p>
                  <div className="d-flex reacatcha-wrap align-items-center justify-content-between rounded p-3">
                    <div>
                      <div className="check-box">
                        <input
                          type="checkbox"
                          id="recaptcha"
                          onClick={() => {
                            setShowCarrierCredentials(!showCarrierCredentials);
                          }}
                          checked={showCarrierCredentials}
                          onChange={() => {}}
                        />
                        <label className="text-primary mb-0" htmlFor="recaptcha">
                          Iam not a robot
                        </label>
                      </div>
                    </div>
                    <div>
                      <img src="/assets/recaptcha.svg" alt="" />
                    </div>
                  </div>
                </div>

                <div className={showCarrierCredentials ? 'creditials  ' : 'd-none'}>
                  <p>Credentials unlocked</p>
                  <Input
                    label="Username"
                    // id="userName"
                    value={userName}
                    type="text"
                    disabled
                  />

                  <div className="form-group form-custom-group mt-3">
                    <label className="mt-2 mb-1" htmlFor="group">
                      Password
                    </label>
                    <div className="input-group mb-3">
                      <input
                        className="form-control bg-white border-end-0"
                        // id="confirmPassword"
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        value={password}
                        disabled
                      />
                      <span className="input-group-text bg-transparent confirm-password-showhide">
                        <i
                          className={
                            isPasswordVisible
                              ? 'fa fa-eye-slash trigger-password pwd-toggle'
                              : 'fa trigger-password pwd-toggle fa-eye'
                          }
                          aria-hidden="true"
                          onClick={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-top-0 justify-content-center">
                <ButtonWhiteModalCancel
                  text="Close"
                  onCancel={() => {
                    handleClose();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default CarrierCredentials;
