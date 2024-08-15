import React from 'react';
import Input from '../../../common/components/forms/Input';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import ButtonToast from '../../ChatWidget/components/ButtonToast';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function VendorViewAddCarrier() {
  return (
    <div className="modal mt-65" tabIndex="-1" id="addCarrierdropModal">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content p-lg-4 p-2 border-0">
          {/* <!-- Modal Header --> */}
          <div className="modal-header border-0 pb-0">
            <h4 className="modal-title text-dark fw-medium fs-15px">
              Edit Carrier - <span className="text-secondary fw-normal">Bharati group</span>
            </h4>

            <a href="/#" type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>

          <div className="modal-body pt-1 border-0">
            <div className="row d-flex">
              <div className="col-lg-6">
                <Input
                  label="Carrier Name"
                  //  id="carrierName"
                  value="Reliance delhi"
                  type="text"
                  disabled=""
                  onChange={() => {}}
                />

                <Input
                  label="Carrier Region"
                  // id="carrierName"
                  value="Delhi"
                  type="text"
                  disabled=""
                  onChange={() => {}}
                />
              </div>
              <div className="col-lg-6 mt-3">
                <label className="mb-1">Carrier Group</label>
                <select className="form-select bg-white" aria-label="Default select example">
                  <option defaultValue>Bharati group</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>

                <div className="mt-3">
                  <label className="mb-1">Batch</label>
                  <div className="input-group bg-input-gray">
                    <input
                      type="text"
                      className="form-control bg-white border-end-0"
                      aria-label="Text input with checkbox"
                      value="2 Batch attached"
                      onChange={() => {}}
                    />
                    <div className="input-group-text border-start-0 bg-white d-flex gap-2">
                      <img src="/assets/actions-new.svg" alt="" />
                      <a href="/comm-telephony/vendor-batch/" className="mb-0 text-blue-active">
                        Manage Batch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-4 rounded bg-light-blue2 px-4 mt-3">
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <Input
                    label="Carrier IP"
                    // id="carrierName"
                    value="185.254.54.00"
                    type="text"
                    disabled=""
                    onChange={() => {}}
                  />
                </div>
                <div className="col-lg-6 col-sm-6">
                  <Input
                    label="Carrier Port"
                    // id="carrierName"
                    value="4070"
                    type="text"
                    disabled=""
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="pb-4 rounded bg-light-blue2 px-4 mt-3 pt-4">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0">Carrier Credentials</h6>
                <CheckboxTickChat checkid="carrierEdit" title="" />
              </div>
              <div className="row creditials-fileds d-none">
                <div className="col-lg-6 col-sm-6">
                  <Input
                    label="Username"
                    // id="userName"
                    value="BRTH_1234_NEW"
                    type="text"
                    disabled=""
                    onChange={() => {}}
                  />
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group form-custom-group mt-2">
                    <label className="mt-2 mb-1" htmlFor="group">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control bg-white border-end-0"
                        // id="confirmPassword"
                        type="password"
                        name="password"
                      />
                      <span className="input-group-text bg-transparent confirm-password-showhide">
                        <i
                          className="fa fa-eye-slash trigger-password pwd-toggle"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-lg-6 d-flex gap-2">
                <p className="mb-0 d-flex">Enable</p>
                <CheckboxTickChat checkid="activeId" title="" />
              </div>
            </div>
          </div>

          <div className="modal-footer border-top-0 justify-content-start">
            <ButtonToast text="Add Carrier" btnID="addCarrier" />
            <ButtonWhiteModalCancel text="cancel" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorViewAddCarrier;
