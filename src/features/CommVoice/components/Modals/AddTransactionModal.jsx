import React, { useRef } from 'react';
import Input from '../../../../common/components/forms/Input';
import ButtonToast from '../../../ChatWidget/components/ButtonToast';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function AddTransactionModal({
  onClose,
  show,
  carrierGroupName = '',
  formik,
  handleFileInputChange,
  loading,
}) {
  const reciptInputRef = useRef(null);

  return (
    <>
      <div
        className="modal mt-65"
        tabIndex="-1"
        id="newTransactionModal"
        style={{ display: show ? 'block' : '' }}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content border-0">
            <div className="modal-content p-lg-4 p-2">
              {/* <!-- Modal Header --> */}
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title text-dark fw-medium fs-15px">
                  Add Transaction - {carrierGroupName}
                </h4>

                <a
                  href="/#"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    formik.resetForm();
                    onClose();
                  }}
                />
              </div>

              <div className="modal-body pt-1">
                <div className="row d-flex align-items-end justify-content-between">
                  <div className="col-lg-6">
                    <Input
                      label="Amount Paid"
                      id="amountPaid"
                      type="text"
                      disabled={false}
                      name="amountPaid"
                      onChange={formik.handleChange}
                      value={formik?.values?.amountPaid}
                      style={
                        isFormFieldValid(formik, 'amountPaid') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'amountPaid')}
                  </div>
                  <div className="col-lg-6">
                    <Input
                      label="Total Tax Paid"
                      id="totalTaxPaid"
                      type="text"
                      disabled={false}
                      name="totalTaxPaid"
                      onChange={formik.handleChange}
                      value={formik?.values?.totalTaxPaid}
                      style={
                        isFormFieldValid(formik, 'totalTaxPaid') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'totalTaxPaid')}
                  </div>
                  <div className="col-lg-6 mt-3">
                    <label className="mb-1">Payment Method</label>
                    <select
                      className="form-select bg-white"
                      aria-label="Default select example"
                      disabled={false}
                      name="paymentMethod"
                      onChange={formik.handleChange}
                      value={formik?.values?.paymentMethod || 'select'}
                      style={
                        isFormFieldValid(formik, 'paymentMethod') ? { border: '1px solid red' } : {}
                      }
                    >
                      <option value="select" disabled>
                        select
                      </option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                    {getFormErrorMessage(formik, 'paymentMethod')}
                  </div>

                  <div className="col-lg-6">
                    <Input
                      label="Transaction Reference No."
                      id="transRefNo"
                      type="text"
                      disabled={false}
                      name="transRefNo"
                      onChange={formik.handleChange}
                      value={formik?.values?.transRefNo}
                      style={
                        isFormFieldValid(formik, 'transRefNo') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'transRefNo')}
                  </div>
                  <div className="col-lg-6">
                    <label className="fw-500 mt-3">Attach Payment Receipt</label>
                    <input
                      ref={reciptInputRef}
                      hidden
                      className="d-none"
                      id="file-input-vendor"
                      type="file"
                      disabled={false}
                      name="reciptInput"
                      // onChange={formik.handleChange}
                      // value={formik?.values?.reciptInput}
                      onChange={(e) => {
                        e.preventDefault();
                        handleFileInputChange(e);
                      }}
                    />
                    <div
                      className="upload-logo uplod-draft gap-3 rounded mt-1 border-dotted text-center uploading-carrier d-flex align-items-center cursor-pointer"
                      onClick={() => {
                        reciptInputRef.current.click();
                      }}
                    >
                      <div className="image-upload">
                        <label htmlFor="file-input-vendor">
                          <img src="/assets/document-upload.svg" alt="" />
                        </label>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        {reciptInputRef?.current?.files[0]?.name || (
                          <div className="text-secondary">
                            <p className="mb-0">
                              Click
                              <b>to Upload</b> or <b>Drag and Drop</b>
                            </p>
                            <p className="mb-0">Maximum file size less than 6 MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mt-3" id="descriptionBox">
                      <label className="text-primary mb-1">Description</label>
                      <textarea
                        className="form-control bg-white"
                        rows="4"
                        placeholder=""
                        disabled={false}
                        name="description"
                        onChange={formik.handleChange}
                        value={formik?.values?.description}
                        style={
                          isFormFieldValid(formik, 'description') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'description')}
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top-0 justify-content-start px-0 mt-3">
                  <ButtonToast
                    text={loading ? 'Saving...' : 'Save'}
                    btnID="addTransaction"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    disabled={loading}
                  />
                  <ButtonWhiteModalCancel text="cancel" onCancel={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop show" />}
    </>
  );
}

export default AddTransactionModal;
