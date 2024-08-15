import React, { useEffect } from 'react';
import Input from '../../../common/components/forms/Input';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function EditRecord({ show, onClose, formik, data }) {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    formik.setFieldValue('country', data?.country);
    formik.setFieldValue('state', data?.state);
    formik.setFieldValue('city', data?.city);
    formik.setFieldValue('number', data?.number);
    formik.setFieldValue('countryCode', data?.countryCode);
    formik.setFieldValue('channels', data?.channels);
    formik.setFieldValue('prefix', data?.prefix);
    formik.setFieldValue('mrc', data?.mrc);
  }, [data]);

  // if (show) {
  return (
    <>
      <div
        className={`modal mt-65 ${show ? 'showing' : ''}`}
        tabIndex="-1"
        id="editNewRecord"
        style={show ? { display: 'block' } : {}}
      >
        <div className="modal-dialog" style={{ maxWidth: '933px' }}>
          <div className="modal-content border-0">
            <div className="modal-content p-lg-4 p-2">
              {/* <!-- Modal Header --> */}
              <div className="modal-header border-0">
                <div className="d-flex gap-3 align-items-center">
                  <h4 className="modal-title text-dark fw-medium fs-15px">Edit Record</h4>
                </div>

                <a
                  href="/#"
                  type="button"
                  className="btn-close"
                  // data-bs-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                  }}
                />
              </div>

              <div className="modal-body pt-0">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <label className="mb-1">Country</label>
                    <select
                      className="form-select select bg-transparent text-black"
                      aria-label="Default select example"
                      value={formik?.values?.country || 'select'}
                      name="country"
                      onChange={(e) => {
                        formik.setFieldValue('country', e.target.value);
                      }}
                      style={isFormFieldValid(formik, 'country') ? { border: '1px solid red' } : {}}
                    >
                      <option value="select" disabled>
                        select
                      </option>
                      <option value="1">India</option>
                      <option value="2">country 2</option>
                      <option value="3">country 1</option>
                    </select>
                    {getFormErrorMessage(formik, 'country')}
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <label className="mb-1">State</label>
                    <select
                      className="form-select select bg-transparent text-black"
                      aria-label="Default select example"
                      value={formik?.values?.state || 'select'}
                      name="state"
                      onChange={(e) => {
                        formik.setFieldValue('state', e.target.value);
                      }}
                      style={isFormFieldValid(formik, 'state') ? { border: '1px solid red' } : {}}
                    >
                      <option value="select" disabled>
                        select
                      </option>
                      <option value="1">Kerala</option>
                      <option value="2">State 2</option>
                      <option value="3">State 3</option>
                    </select>
                    {getFormErrorMessage(formik, 'state')}
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <label className="mb-1">City</label>
                    <select
                      className="form-select select bg-transparent text-black"
                      aria-label="Default select example"
                      value={formik?.values?.state || 'select'}
                      name="state"
                      onChange={(e) => {
                        formik.setFieldValue('state', e.target.value);
                      }}
                      style={isFormFieldValid(formik, 'state') ? { border: '1px solid red' } : {}}
                    >
                      <option value="select" disabled>
                        select
                      </option>
                      <option value="1">Kochi</option>
                      <option value="2">City 2</option>
                      <option value="3">City 3</option>
                    </select>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <label className="mb-1">Number</label>
                    <input
                      type="text"
                      className="form-control bg-white"
                      id="end"
                      value={formik?.values?.number}
                      name="number"
                      onChange={formik.handleChange}
                      style={isFormFieldValid(formik, 'number') ? { border: '1px solid red' } : {}}
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'number')}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <Input
                      label="Country Code"
                      id="property"
                      type="text"
                      disabled={false}
                      name="countryCode"
                      onChange={formik.handleChange}
                      value={formik?.values?.countryCode}
                      style={
                        isFormFieldValid(formik, 'countryCode') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'countryCode')}
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <Input
                      label="Channels"
                      id="property"
                      type="text"
                      disabled={false}
                      name="channels"
                      onChange={formik.handleChange}
                      value={formik?.values?.channels}
                      style={
                        isFormFieldValid(formik, 'channels') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'channels')}
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <Input
                      label="Prefix"
                      id="property"
                      type="text"
                      disabled={false}
                      name="prefix"
                      onChange={formik.handleChange}
                      value={formik?.values?.prefix}
                      style={isFormFieldValid(formik, 'prefix') ? { border: '1px solid red' } : {}}
                    />
                    {getFormErrorMessage(formik, 'prefix')}
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <Input
                      label="MRC"
                      id="property"
                      type="text"
                      name="mrc"
                      onChange={formik.handleChange}
                      value={formik?.values?.mrc}
                      style={isFormFieldValid(formik, 'mrc') ? { border: '1px solid red' } : {}}
                    />
                    {getFormErrorMessage(formik, 'mrc')}
                  </div>
                </div>

                <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-4">
                  <a
                    href="/#"
                    // data-bs-dismiss="modal"
                    id="editRecordBtn"
                    type="button"
                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                  >
                    Save
                  </a>
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                    // data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
  // }
  // return null;
}

export default EditRecord;
