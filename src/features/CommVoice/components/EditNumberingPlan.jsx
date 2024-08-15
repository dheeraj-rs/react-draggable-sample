import React, { useState, useEffect } from 'react';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import Input from '../../../common/components/forms/Input';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import '../../../styles/formvalidation.css';

function EditNumberingPlan({ show, onClose, formik, planDetails, dataSubmitting }) {
  const [isToggleActive, setIsToggleActive] = useState({
    isVisible: false,
    selectedOption: 'select',
    selectedTitle: 'select',
  });

  const handleClose = () => {
    setIsToggleActive({
      isVisible: false,
      selectedOption: 'select',
      selectedTitle: 'select',
    });
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    if (planDetails?.name) {
      formik.setFieldValue('planName', planDetails.name);
      formik.setFieldValue('numberType', planDetails.numberType);
      formik.setFieldValue('enable', planDetails.enable);
      setIsToggleActive({
        isVisible: false,
        selectedOption: planDetails.numberType,
        selectedTitle: planDetails.numberType,
      });
    }
  }, [planDetails]);
  if (show) {
    return (
      <>
        <div
          className={`modal mt-65 ${show ? 'show' : ''}`}
          tabIndex="-1"
          id="newNumberModal"
          style={show ? { display: 'block' } : { display: 'none' }}
        >
          <div className="modal-dialog" style={{ maxWidth: '515px' }}>
            <div className="modal-content border-0">
              <div className="modal-content p-23px">
                {/* <!-- Modal Header --> */}
                <div className="modal-header border-0 p-0">
                  <div className="d-flex flex-column">
                    <h4 className="modal-title text-dark fw-medium fs-15px">Edit Numbering Plan</h4>
                  </div>

                  <a
                    href="/#"
                    type="button"
                    className="btn-close"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                    }}
                  />
                </div>

                <div className="modal-body pt-0 p-0">
                  <div className="row gx-5">
                    <div className="col-lg-12 col-sm-12">
                      <Input
                        label="Plan name"
                        id="planName"
                        type="text"
                        placeholder="Uninor_DID_test"
                        name="planName"
                        onChange={formik.handleChange}
                        value={formik?.values?.planName}
                        style={
                          isFormFieldValid(formik, 'planName') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'planName')}
                    </div>
                    <div className="col-lg-12 col-sm-12">
                      <div className="mt-3">
                        <label className="text-primary mb-2">Number Type</label>
                        <div
                          className="select"
                          style={
                            isFormFieldValid(formik, 'numberType')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        >
                          <div
                            className="selectBtn"
                            data-type={isToggleActive.selectedOption}
                            onClick={() => {
                              setIsToggleActive({
                                ...isToggleActive,
                                isVisible: !isToggleActive.isVisible,
                              });
                            }}
                          >
                            {isToggleActive.selectedTitle}
                          </div>

                          <div
                            className={`selectDropdown ${isToggleActive.isVisible ? 'toggle' : ''}`}
                            style={isToggleActive.isVisible ? {} : { zIndex: '1' }}
                          >
                            <div
                              className="option"
                              data-type="firstOption"
                              onClick={() => {
                                formik.setFieldValue('numberType', 'DID');

                                setIsToggleActive({
                                  isVisible: false,
                                  selectedOption: 'firstOption',
                                  selectedTitle: 'DID',
                                });
                              }}
                            >
                              DID
                            </div>
                            <div
                              className="option"
                              data-type="secondOption"
                              onClick={() => {
                                formik.setFieldValue('numberType', 'Toll free');
                                setIsToggleActive({
                                  isVisible: false,
                                  selectedOption: 'secondOption',
                                  selectedTitle: 'Toll free',
                                });
                              }}
                            >
                              Toll free
                            </div>
                          </div>
                        </div>
                        {getFormErrorMessage(formik, 'numberType')}
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-3">
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
                <div className="d-flex align-items-center gap-2 border-0 ps-0 mt-4">
                  <button
                    href="/#"
                    id="addSlabButton"
                    type="button"
                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    disabled={dataSubmitting}
                  >
                    {dataSubmitting ? 'Save...' : 'Save'}
                  </button>

                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                    onClick={() => {
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
        <div className="offcanvas-backdrop fade show" style={show ? {} : { display: 'none' }} />
      </>
    );
  }
  return null;
}

export default EditNumberingPlan;
