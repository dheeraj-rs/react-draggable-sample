import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../common/components/forms/Input';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import ButtonToast from '../../../common/components/toast/ButtonToast';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function EditCarrier({
  show,
  setShow,
  formik,
  allCarrierGroups = [],
  dataSubmitting,
  countries = [],
  unpaginatedBatchList = [],
}) {
  const temp = [];

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [key, setKey] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleClose = () => {
    setIsAllSelected(false);
    setKey('');
    setShow({
      isVisible: false,
      type: '',
    });
    formik.resetForm();
  };

  const handleSearch = () => {
    const matchingNames = unpaginatedBatchList?.filter((batch) => {
      const result = batch.attributes.name.toLowerCase().includes(key.toLowerCase());
      return result;
    });
    setSearchResult(matchingNames);
  };

  const handleBatchIdSelection = (batchId) => {
    if (formik.values.batch.indexOf(parseInt(batchId, 10)) === -1) {
      // Value doesn't exist in the array, so add it.
      const newArray = [...formik.values.batch];
      newArray.push({ type: 'telephony_vendor_batches', id: parseInt(batchId, 10) });
      formik.setFieldValue('batch', newArray);
    } else {
      // Value already exists in the array, so remove it.
      const updatedArray = formik.values.batch.filter(
        (id) => parseInt(id, 10) !== parseInt(batchId, 10)
      );
      formik.setFieldValue('batch', updatedArray);
    }
  };

  useEffect(() => {
    if (key) {
      handleSearch();
    }
  }, [key]);

  useEffect(() => {
    if (isAllSelected) {
      unpaginatedBatchList?.map((e) => {
        temp.push({ type: 'telephony_vendor_batches', id: parseInt(e?.id, 10) });
        return null;
      });

      formik.setFieldValue('batch', temp);
    }
  }, [isAllSelected]);

  useEffect(() => {
    if (show === false) {
      setIsAllSelected(false);
    }
  }, [show]);
  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        id="addCarrierdropModal"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content p-lg-4 p-2 border-0">
            {/* <!-- Modal Header --> */}
            <div className="modal-header border-0 pb-0">
              <h4 className="modal-title text-dark fw-medium fs-15px">Edit Carrier</h4>

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

            <div className="modal-body pt-1 border-0">
              <div className="row d-flex">
                <div className="col-lg-6">
                  <Input
                    label="Carrier Name"
                    // id="carrierName"
                    type="text"
                    disabled=""
                    name="carrierName"
                    placeholder="Enter Carrier Name"
                    onChange={formik.handleChange}
                    value={formik?.values?.carrierName}
                    style={
                      isFormFieldValid(formik, 'carrierName') ? { border: '1px solid red' } : {}
                    }
                  />
                  {getFormErrorMessage(formik, 'carrierName')}

                  <div className="mt-3">
                    <label className="mb-1">Carrier Region</label>
                    <select
                      className="form-select bg-white"
                      aria-label="Default select example"
                      name="carrierRegion"
                      onChange={(e) => {
                        formik.setFieldValue('carrierRegion', e?.target?.value);
                      }}
                      value={formik?.values?.carrierRegion || 'select'}
                      style={
                        isFormFieldValid(formik, 'carrierRegion') ? { border: '1px solid red' } : {}
                      }
                    >
                      <option value="select" disabled>
                        select
                      </option>
                      {countries?.length > 0 &&
                        countries?.map((country) => (
                          <option key={country?.id} value={country?.attributes?.name}>
                            {country?.attributes?.name}
                          </option>
                        ))}
                    </select>
                    {getFormErrorMessage(formik, 'carrierRegion')}
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <label className="mb-1">Carrier Group</label>
                  <select
                    className="form-select bg-white"
                    aria-label="Default select example"
                    name="carrierGroup"
                    onChange={(e) => {
                      formik.setFieldValue('carrierGroup', parseInt(e?.target?.value, 10));
                    }}
                    value={formik?.values?.carrierGroup || 'select'}
                    style={
                      isFormFieldValid(formik, 'carrierGroup') ? { border: '1px solid red' } : {}
                    }
                  >
                    <option value="select" disabled>
                      select
                    </option>
                    {allCarrierGroups?.length > 0 &&
                      allCarrierGroups?.map((group) => (
                        <option key={group?.id} value={group?.id}>
                          {group?.attributes?.name}
                        </option>
                      ))}
                  </select>
                  {getFormErrorMessage(formik, 'carrierGroup')}

                  <div className="mt-3 d-none">
                    <div className="d-flex flex-column w-100">
                      <p className="mb-0 text-secondary fs-13px mb-1 mt-lg-0 mt-3">Batch(s)</p>
                      <div className="dropdown-center">
                        <button
                          className="form-control w-100 form-select text-start bg-white"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'batch') ? { border: '1px solid red' } : {}
                          }
                        >
                          <div className="d-flex gap-2">
                            <span className="p-1">-Select batch(s)-</span>
                          </div>
                        </button>

                        <ul className="dropdown-menu w-100 shadow-6 pb-2 p-3">
                          <div className="d-flex justify-content-between gap-3">
                            <div className="w-100">
                              <div className="input-group search-input-group border-0 custom-search-sidebar-border rounded overflow-hidden">
                                <span
                                  className="input-group-text border-0 bg-white  h-6"
                                  id="basic-addon1"
                                >
                                  <img src="/assets/search-form.svg" alt="" />
                                </span>
                                <input
                                  type="text"
                                  className="form-control border-0 px-0 bg-white search-input pe-5 h-6 custom_search"
                                  style={{ height: '3rem' }}
                                  placeholder="Search batch"
                                  aria-label="search"
                                  aria-describedby="basic-addon1"
                                  id=""
                                />
                                <img
                                  src="/bot-admin/search-close.svg"
                                  alt=""
                                  className="search-close search-clear"
                                  style={{
                                    width: '10px',
                                    height: '10px',
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    right: '10px',
                                    zIndex: 99,
                                    display: 'none',
                                    cursor: 'pointer',
                                  }}
                                  id=""
                                />
                              </div>
                            </div>
                            <div className="d-flex align-items-end">
                              <Link
                                to="/comm-telephony/vendor-batch/"
                                role="button"
                                className="bg-black d-flex align-items-center justify-content-center h-6 w-6 rounded"
                              >
                                <img src="/assets/plus-icon.svg" alt="" />
                              </Link>
                            </div>
                          </div>

                          <div className="scroll-custom scroll-custom-dropdown">
                            {key === '' ? (
                              <li className="mt-2">
                                <a
                                  href="/#"
                                  className="dropdown-item-outside py-3 px-2 d-flex"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                  style={{ color: '#212529' }}
                                >
                                  <div className="check-box ">
                                    <input
                                      type="checkbox"
                                      id="batch-11"
                                      checked={isAllSelected}
                                      onChange={() => {}}
                                    />
                                    <label
                                      className="text-primary mb-0"
                                      htmlFor="batch-11"
                                      onClick={() => {
                                        setIsAllSelected(!isAllSelected);
                                        if (isAllSelected) {
                                          formik.setFieldValue('batch', []);
                                        }
                                      }}
                                    />
                                  </div>
                                  Select All
                                </a>
                              </li>
                            ) : null}

                            {(key !== '' ? searchResult : unpaginatedBatchList)?.map(
                              (batch, index) => (
                                <li key={index}>
                                  <a
                                    href="/#"
                                    className="dropdown-item-outside py-3 px-2 d-flex"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                    style={{ color: '#212529' }}
                                    key={index}
                                  >
                                    <div className="check-box ">
                                      <input
                                        type="checkbox"
                                        id="batch-22"
                                        onClick={() => {}}
                                        checked={formik.values.batch.find(
                                          (e) => e?.id === parseInt(batch.id, 10)
                                        )}
                                      />
                                      <label
                                        className="text-primary mb-0"
                                        htmlFor="batch-22"
                                        onClick={() => {
                                          handleBatchIdSelection(batch.id);
                                        }}
                                      />
                                    </div>
                                    {batch?.attributes?.name}
                                  </a>
                                </li>
                              )
                            )}

                            {key !== '' && searchResult?.length === 0 ? (
                              <NoMatchingRecords />
                            ) : null}
                          </div>
                        </ul>
                        {getFormErrorMessage(formik, 'batch')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="mb-1">Batch</label>
                    <div className="input-group bg-input-gray">
                      <input
                        type="text"
                        className="form-control bg-white border-end-0"
                        aria-label="Text input with checkbox"
                        value={`${formik?.values?.batch} Batch attached`}
                      />
                      <div className="input-group-text border-start-0 bg-white d-flex gap-2">
                        <img src="/assets/actions-new.svg" alt="" />
                        <Link to="/comm-telephony/vendor-batch/" className="mb-0 text-blue-active">
                          Manage Batch
                        </Link>
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
                      type="text"
                      name="carrierIp"
                      placeholder="00:00:00:00"
                      onChange={formik.handleChange}
                      value={formik?.values?.carrierIp}
                      style={
                        isFormFieldValid(formik, 'carrierIp') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'carrierIp')}
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <Input
                      label="Carrier Port"
                      // id="carrierName"
                      type="text"
                      name="carrierPort"
                      placeholder="Enter port"
                      onChange={formik.handleChange}
                      value={formik?.values?.carrierPort}
                      style={
                        isFormFieldValid(formik, 'carrierPort') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {getFormErrorMessage(formik, 'carrierPort')}
                  </div>
                </div>
              </div>
              <div className="pb-4 rounded bg-light-blue2 px-4 mt-3 pt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0">Carrier Credentials</h6>
                  <CheckboxTickChat
                    checkid="carrierEdit"
                    title=""
                    onChange={() => {}}
                    onClick={() => {
                      formik.setFieldValue(
                        'isCarrierCredentialsActive',
                        !formik?.values?.isCarrierCredentialsActive
                      );
                    }}
                    active={formik?.values?.isCarrierCredentialsActive}
                  />
                </div>
                <div
                  className={`row creditials-fileds ${
                    formik?.values?.isCarrierCredentialsActive ? '' : 'd-none'
                  }`}
                >
                  <div className="col-lg-6 col-sm-6">
                    <Input
                      label="Username"
                      // id="userName"
                      type="text"
                      name="username"
                      onChange={(e) => {
                        formik.setFieldValue('username', e.target.value);
                      }}
                      value={formik?.values?.username}
                      style={
                        isFormFieldValid(formik, 'username') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'username')}
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
                          type={isPasswordVisible ? 'text' : 'password'}
                          name="password"
                          onChange={(e) => {
                            formik.setFieldValue('password', e.target.value.trim());
                          }}
                          value={formik?.values?.password}
                          style={
                            isFormFieldValid(formik, 'password') ? { border: '1px solid red' } : {}
                          }
                        />
                        <span
                          className="input-group-text bg-transparent confirm-password-showhide"
                          onClick={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                          }}
                          style={
                            isFormFieldValid(formik, 'password') ? { border: '1px solid red' } : {}
                          }
                        >
                          <i
                            className={
                              isPasswordVisible
                                ? 'fa fa-eye-slash trigger-password pwd-toggle '
                                : 'fa trigger-password pwd-toggle fa-eye'
                            }
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      {getFormErrorMessage(formik, 'password')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-6 d-flex gap-2">
                  <p className="mb-0 d-flex">Enable</p>
                  <CheckboxTickChat
                    checkid="activeId"
                    title=""
                    onChange={() => {}}
                    onClick={() => {
                      formik.setFieldValue('enable', !formik?.values?.enable);
                    }}
                    active={formik?.values?.enable}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0 justify-content-start">
              <ButtonToast
                text={dataSubmitting ? 'Editing...' : 'Edit  Carrier'}
                btnID="addCarrier"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={dataSubmitting}
              />
              <ButtonWhiteModalCancel
                text="cancel"
                onCancel={() => {
                  handleClose();
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
    </>
  );
}

export default EditCarrier;
