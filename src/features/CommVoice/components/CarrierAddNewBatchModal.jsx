import React, { useState } from 'react';
import Input from '../../../common/components/forms/Input';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import TextArea from '../../../common/components/forms/TextArea';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import ButtonToast from '../../../common/components/toast/ButtonToast';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';

function CarrierAddNewBatchModal({
  show,
  setShow,
  formik,
  carrierName,
  outgoingPlans,
  incomingPlans,
  dataSubmitting,
}) {
  const [selectedIncomingPlan, setSelectedIncomingPlan] = useState(null);
  const [selectedOutgoingPlan, setSelectedOutgoingPlan] = useState(null);
  const handleClose = () => {
    setShow({
      isVisible: false,
      type: '',
    });
    formik.resetForm();
  };

  return (
    <div
      className="modal mt-65"
      style={show ? { display: 'block' } : { display: 'none' }}
      tabIndex="-1"
      id="newBatchModal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0">
          <div className="modal-content p-lg-4 p-2">
            {/* <!-- Modal Header --> */}
            <div className="modal-header border-0">
              <div className="d-flex flex-column">
                <h4 className="modal-title text-dark fw-medium fs-15px">
                  Add Batch - {carrierName}
                </h4>
              </div>

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

            <div className="modal-body pt-0">
              <div className="row gx-5">
                <div className="col-lg-6 col-sm-6">
                  <Input
                    label="Batch name"
                    id="batchName"
                    placeholder="Enter batch Name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik?.values?.name}
                    style={isFormFieldValid(formik, 'name') ? { border: '1px solid red' } : {}}
                  />
                  {getFormErrorMessage(formik, 'name')}
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="form-group mt-3">
                    <label className="text-primary mb-1" htmlFor="attachBatch">
                      Carrier
                    </label>
                    <select
                      disabled
                      className="form-control form-select bg-input-gray"
                      id="attachBatch"
                    >
                      <option>{carrierName}</option>
                      <option>-No carrer selected-</option>
                      <option>-No carrer selected-</option>
                      <option>-No batch selected-</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="mt-3">
                    <div className="d-flex flex-column w-100">
                      <p className="mb-0 text-secondary fs-13px mb-1 mt-lg-0 mt-3">Lot(s)</p>
                      <div className="dropdown-center">
                        <button
                          className="form-control w-100 form-select text-start bg-white"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className="d-flex gap-2">
                            <span className="p-1">Lot_bth_Bnglore0,Lot_bth_Bnglore1</span>
                          </div>
                        </button>

                        <ul className="dropdown-menu w-100 shadow-6 p-3">
                          <div className="d-flex justify-content-between gap-3">
                            <div className="w-100">
                              <SearchWithBorder
                                placeholderText="Search lot"
                                onChange={() => {}}
                                clearBtn={() => {}}
                              />
                            </div>
                            <div className="d-flex align-items-end">
                              <div
                                role="button"
                                className="bg-black d-flex align-items-center justify-content-center h-6 w-6 rounded"
                              >
                                <img src="/assets/plus-icon.svg" alt="" />
                              </div>
                            </div>
                          </div>

                          <div className="scroll-custom scroll-custom-dropdown">
                            <li className="mt-2">
                              <a href="/#" className="dropdown-item py-3 px-2 d-flex">
                                <div className="check-box ">
                                  <input type="checkbox" id="batch-1" />
                                  <label className="text-primary mb-0" htmlFor="topics-1" />
                                </div>
                                Select All
                              </a>
                            </li>
                            <li>
                              <a href="/#" className="dropdown-item py-3 px-2 d-flex">
                                <div className="check-box ">
                                  <input type="checkbox" id="batch-2" />
                                  <label className="text-primary mb-0" htmlFor="batch-2" />
                                </div>
                                Lot_bth_Bnglore0
                              </a>
                            </li>
                            <li>
                              <a href="/#" className="dropdown-item py-3 px-2 d-flex">
                                <div className="check-box ">
                                  <input type="checkbox" id="batch-3" />
                                  <label className="text-primary mb-0" htmlFor="batch-3" />
                                </div>
                                Lot_bth_Bnglore1
                              </a>
                            </li>
                            <li>
                              <a href="/#" className="dropdown-item py-3 px-2 d-flex">
                                <div className="check-box ">
                                  <input type="checkbox" id="batch-4" />
                                  <label className="text-primary mb-0" htmlFor="batch-4" />
                                </div>
                                Lot_bth_Bnglore2
                              </a>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-input-gray rounded mt-4 p-4">
                <div className="row gx-5">
                  <div className="col-lg-6">
                    <div className="d-flex flex-column w-100">
                      <p className="mb-0 text-secondary fs-13px mb-1">Carrier Plan In Package</p>
                      <div className="dropdown-center">
                        <button
                          className="form-control w-100 form-select text-start bg-white"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'inwardId') ? { border: '1px solid red' } : {}
                          }
                        >
                          <div className="d-flex gap-2">
                            <span className="p-1">
                              {selectedIncomingPlan || '-Select Package-'}
                            </span>
                          </div>
                        </button>

                        <ul className="dropdown-menu w-100 shadow-6 p-3">
                          <div className="d-flex justify-content-between gap-3">
                            <div className="w-100">
                              <SearchWithBorder
                                placeholderText="Search plan"
                                onChange={() => {}}
                                clearBtn={() => {}}
                              />
                            </div>
                            <div className="d-flex align-items-end">
                              <div
                                role="button"
                                className="bg-black d-flex align-items-center justify-content-center h-5 w-5 rounded"
                              >
                                <img src="/assets/plus-icon.svg" alt="" />
                              </div>
                            </div>
                          </div>

                          <div className="scroll-custom scroll-custom-flow">
                            {incomingPlans?.map((plan, index) => (
                              <li key={index} className="mt-2">
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedIncomingPlan(plan?.attributes?.name);
                                    formik.setFieldValue('inwardId', plan?.id);
                                  }}
                                >
                                  {plan?.attributes?.name}
                                </a>
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="d-flex flex-column w-100">
                      <p className="mb-0 text-secondary fs-13px mb-1">Carrier Plan Out Package</p>
                      <div className="dropdown-center">
                        <button
                          className="form-control w-100 form-select text-start bg-white"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'outwardId') ? { border: '1px solid red' } : {}
                          }
                        >
                          <div className="d-flex gap-2">
                            <span className="p-1">
                              {selectedOutgoingPlan || '-Select Package-'}
                            </span>
                          </div>
                        </button>

                        <ul className="dropdown-menu w-100 shadow-6 p-3">
                          <div className="d-flex justify-content-between gap-3">
                            <div className="w-100">
                              <SearchWithBorder
                                placeholderText="Search plan"
                                onChange={() => {}}
                                clearBtn={() => {}}
                              />
                            </div>
                            <div className="d-flex align-items-end">
                              <div
                                role="button"
                                className="bg-black d-flex align-items-center justify-content-center h-5 w-5 rounded"
                              >
                                <img src="/assets/plus-icon.svg" alt="" />
                              </div>
                            </div>
                          </div>

                          <div className="scroll-custom scroll-custom-flow">
                            {outgoingPlans?.map((plan, index) => (
                              <li key={index} className="mt-2">
                                <a
                                  href="/#"
                                  className="dropdown-item py-3 px-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedOutgoingPlan(plan?.attributes?.name);
                                    formik.setFieldValue('outwardId', plan?.id);
                                  }}
                                >
                                  {plan?.attributes?.name}
                                </a>
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mt-3">
                  <div className="w-100">
                    <TextArea
                      label="Batch Description"
                      placeholder="Enter description"
                      rowCount="4"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik?.values?.description}
                      style={
                        isFormFieldValid(formik, 'description') ? { border: '1px solid red' } : {}
                      }
                    />
                    <div />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div id="localServer" className="d-flex flex-column mt-3">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <p className="mb-0 text-primary">Priority</p>
                        <input
                          type="text"
                          className="form-control bg-white"
                          id="priority1"
                          //   value="1"
                        />
                      </div>
                      <div className="w-100">
                        <p className="mb-0 text-primary">Switch</p>
                        <div
                          className="alert alert-dismissible bg-secondary-light-blue p-2 mt-1 mb-0 fade show d-flex justify-content-between"
                          role="alert"
                        >
                          Local_Switch_001
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-3">
                      <div>
                        <input
                          type="text"
                          className="form-control bg-white"
                          id="priority1"
                          //   value="1"
                        />
                      </div>
                      <div className="w-100">
                        <div
                          className="alert alert-dismissible bg-secondary-light-blue p-2 mt-1 mb-0 fade show d-flex justify-content-between"
                          role="alert"
                        >
                          Local_Switch_002
                          <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                            <img src="/assets/close-alert.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top-0 justify-content-start">
                <ButtonToast
                  text={dataSubmitting ? 'Adding...' : 'Add Batch'}
                  btnID="addBatch"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  disabled={dataSubmitting}
                />
                <ButtonWhiteModalCancel
                  text="Cancel"
                  onCancel={() => {
                    handleClose();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarrierAddNewBatchModal;
