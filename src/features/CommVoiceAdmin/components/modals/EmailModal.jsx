import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import CheckboxTick from '../../../../common/components/forms/CheckBoxTick';
import {
  getDepartmentDetails,
  getNodeDetails,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function EmailModal({ isVisible, onSelect, onUpdate, departments, isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (!data.departmentId) {
      errors.departmentId = ' required';
    }
    if (data.addCustomMessage && !data.message) {
      errors.message = '  required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      departmentId: '',
      departmentName: '-No department selected-',
      message: '',
      addCustomMessage: false,
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            departmentId: parseInt(formik.values.departmentId, 10),
            ...(formik.values?.addCustomMessage && { message: formik.values.message }),
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'email',
          details: {
            departmentId: parseInt(formik.values.departmentId, 10),
            ...(formik.values?.addCustomMessage && { message: formik.values.message }),
          },
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'email') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('departmentId', nodeDetails?.details?.departmentId);
      formik.setFieldValue(
        'departmentName',
        getDepartmentDetails(departments, nodeDetails?.details?.departmentId)?.attributes?.name
      );
      formik.setFieldValue('message', nodeDetails?.details?.message);
      formik.setFieldValue('addCustomMessage', !!nodeDetails?.details?.message);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="emailModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog email-modal-outer">
            <div className="modal-content">
              <div className="modal-body email-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/email.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Email</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The Email component mails a group email id or a user with all the details of the
                  call info on who called, what time, what they input
                </p>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  This component will send the call details to the department.
                </p>
                <div>
                  <label className="fs-13px text-primary mb-2" htmlFor="">
                    Select department
                  </label>
                  <div className="dropdown position-relative sms-sender-id-dropdown">
                    <button
                      className=""
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={
                        isFormFieldValid(formik, 'departmentId') ? { border: '1px solid red' } : {}
                      }
                    >
                      <span>{formik.values.departmentName}</span>
                    </button>
                    <img
                      className="connect-dropdown-caret"
                      src="/assets/call-flows-hours/CaretDown.svg"
                      alt=""
                    />
                    <div className="dropdown-menu">
                      <ul>
                        {departments?.map((e, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              formik.setFieldValue('departmentName', e?.attributes?.name);
                              formik.setFieldValue('departmentId', e.id);
                            }}
                            className={
                              String(e.id) === String(formik?.values?.departmentId) ? 'active' : ''
                            }
                          >
                            {e?.attributes?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* {getFormErrorMessage(formik, 'departmentId')} */}
                </div>
                <div className="mt-4 bg-seaShell p-3 rounded-3">
                  <div className="custom-message-check-box d-flex align-items-center">
                    <CheckboxTick
                      title=""
                      onChange={() => {}}
                      checked={formik.values.addCustomMessage}
                      onClick={() => {
                        formik.setFieldValue('addCustomMessage', !formik.values.addCustomMessage);
                      }}
                    />
                    <label className="fs-13" htmlFor="">
                      Add custom message to the email
                    </label>
                  </div>
                  <div className="custom-message-check-box-content mt-3">
                    <label htmlFor="" className="fs-13px text-primary mb-2">
                      Type message
                    </label>
                    <textarea
                      placeholder="-Message body-"
                      className={`${
                        isFormFieldValid(formik, 'message') ? '' : 'rounded-2 border'
                      }  bg-white p-3`}
                      name="message"
                      onChange={formik.handleChange}
                      value={formik.values.message}
                      style={isFormFieldValid(formik, 'message') ? { border: '1px solid red' } : {}}
                    />
                    {/* {getFormErrorMessage(formik, 'message')} */}
                  </div>
                </div>
                <div className="timeslot-buttons mt-4 d-flex align-item-center">
                  <button
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                    data-bs-dismiss="modal"
                    id="email-save"
                    type="button"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={isDataSubmiting}
                  >
                    {isDataSubmiting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default EmailModal;
