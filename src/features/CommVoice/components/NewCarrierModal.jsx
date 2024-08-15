import React from 'react';
import Input from '../../../common/components/forms/Input';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import Select2 from '../../../common/components/forms/Select2';
import ButtonToast from '../../../common/components/toast/ButtonToast';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function NewCarrierModal() {
  return (
    <div className="modal mt-65" tabIndex="-1" id="newCarrierModal">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0">
          <div className="modal-content p-4">
            {/* <!-- Modal Header --> */}
            <div className="modal-header border-0 pb-0">
              <h4 className="modal-title text-dark fw-medium fs-15px">New Carrier</h4>

              <a href="/#" type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <div className="modal-body pt-1">
              <p>Creating a new carrier and add numbers</p>
              <div className="row d-flex align-items-end justify-content-between">
                <div className="col-lg-6">
                  <Input
                    label="Carrier Name"
                    // id="carrierName"
                    placeholder="Enter Carrier Name"
                    type="text"
                    disabled=""
                    onChange={() => {}}
                  />
                </div>
                <div className="col-lg-6 d-flex gap-2 justify-content-end">
                  <p className="mb-0 d-flex">Enable</p>
                  <CheckboxTickChat checkid="activeId" title="" />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-6 col-sm-6">
                  <div className="shadow-10 p-4 rounded">
                    <h6>Carrier IP & Port</h6>

                    <Input
                      label="Carrier IP"
                      // id="carrierName"
                      placeholder="00:00:00:00"
                      type="text"
                      disabled=""
                      onChange={() => {}}
                    />

                    <Input
                      label="Carrier Port"
                      // id="carrierName"
                      placeholder="Enter port"
                      type="text"
                      disabled=""
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="shadow-10 p-4 rounded">
                    <h6>Carrier Credentials</h6>

                    <Input
                      label="Username"
                      // id="userName"
                      value="BRTH_1234_NEW"
                      type="text"
                      disabled=""
                      onChange={() => {}}
                    />

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

              <div className="row mt-4">
                <div className="col-lg-6 col-sm-6">
                  <div className="shadow-10 p-4 rounded">
                    <h6>Local Switch</h6>
                    <div className="form-group mt-3">
                      <label className="mb-1">Select switch</label>
                      <Select2 />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="shadow-10 p-4 rounded">
                    <h6>Carrier Group</h6>

                    <div className="form-group mt-3">
                      <label className="mb-1">Select group</label>
                      <Select2 />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0 justify-content-start">
              <ButtonToast text="Create Carrier" btnID="createCarrier" />
              <ButtonWhiteModalCancel text="cancel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCarrierModal;
