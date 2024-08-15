import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import RadioButtonCircle from '../../../../common/components/forms/RadioButtonCircle';
import '../../../../styles/scss/components/hangupModal.scss';
import {
  getNodeDetails,
  getcallerListDetails,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function CallerListModal({ isVisible, onSelect, onUpdate, callerList, isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (!data.callerListId) {
      errors.callerListId = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      callerListId: '',
      callerListName: 'Select list',
      action: 'add',
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            callerListId: formik.values.callerListId,
            action: formik.values.action,
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'caller-list',
          details: {
            callerListId: formik.values.callerListId,
            action: formik.values.action,
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
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'caller-list') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('callerListId', nodeDetails?.details?.callerListId);
      formik.setFieldValue(
        'callerListName',
        getcallerListDetails(callerList, nodeDetails?.details?.callerListId)?.attributes?.name
      );
      formik.setFieldValue('action', nodeDetails?.details?.action);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="callerListModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog hang-up-modal-outer">
            <div className="modal-content">
              <div className="modal-body hang-up-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/hangUp.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Caller List</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The Caller list component helps you dynamically add each caller into or remove
                  from a specific list.
                </p>
                <div>
                  <div className="caller-id-component-dropdown">
                    <div>
                      <label className="fs-13px text-primary mb-2">
                        If the caller is in the list
                      </label>
                      <div className="dropdown position-relative sms-sender-id-dropdown custom-dropdown">
                        <button
                          className="fs-13px"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'callerListId')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        >
                          <span>{formik.values.callerListName || 'Select list'}</span>
                        </button>
                        <img
                          className="connect-dropdown-caret"
                          src="/assets/call-flows-hours/CaretDown.svg"
                          alt=""
                        />
                        <div className="dropdown-menu custom-dropdown-menu">
                          <ul>
                            {callerList?.map((e, index) => (
                              <li
                                key={index}
                                className={`${
                                  e.id === formik.values.callerListId ? 'active ' : ''
                                }ford`}
                                onClick={() => {
                                  formik.setFieldValue('callerListName', e?.attributes?.name);
                                  formik.setFieldValue('callerListId', e.id);
                                }}
                              >
                                {e?.attributes?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* {getFormErrorMessage(formik, 'callerListId')} */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-4">
                    <div className="hang-up-radio-outer-1 hang-up-radio-outer-one p-4 active">
                      <RadioButtonCircle
                        id="hang-up-radio-one"
                        name="hang-up-radio"
                        title="Add to selected list"
                        checked={formik.values.action === 'add'}
                        onChange={() => {}}
                        onClick={() => {
                          formik.setFieldValue('action', 'add');
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <div className="hang-up-radio-outer-1 hang-up-radio-outer-two p-4">
                      <RadioButtonCircle
                        id="hang-up-radio-two"
                        name="hang-up-radio"
                        title="Remove from selected list"
                        checked={formik.values.action === 'remove'}
                        onChange={() => {}}
                        onClick={() => {
                          formik.setFieldValue('action', 'remove');
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="timeslot-buttons mt-5 d-flex align-item-center gap-1">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                    id="callerList_save"
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

export default CallerListModal;
