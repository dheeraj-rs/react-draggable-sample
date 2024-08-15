import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import InputListWithDropDown from './InputListWithDropDown';
import InputListCloseWithDropDown from './InputListCloseWithDropDown';
import { getNodeDetails } from '../../../../common/helpers/utils';

function CallerIdModal({ isVisible, onSelect, onUpdate, callerList, isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    data.callerListIds?.map((e, index) => {
      if (e === '') {
        errors[`callerListId-${index}`] = 'required';
      }
      return null;
    });
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      callerListIds: [''],
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            callerListIds: formik.values.callerListIds,
            action: 'remove',
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'caller-id',
          details: {
            callerListIds: formik.values.callerListIds,
            action: 'remove',
          },
          label: 'Caller ID',
          width: 300,
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  const updateValue = (callerId, index) => {
    const updatedArray = [...formik.values.callerListIds];

    if (callerId) {
      updatedArray[index] = parseInt(callerId, 10);
    } else {
      updatedArray[index] = '';
    }

    formik.setFieldValue('callerListIds', updatedArray);
  };

  const addNewInput = () => {
    formik.setFieldValue('callerListIds', [...formik.values.callerListIds, '']);
  };

  const deleteValue = (indexToDelete) => {
    const updatedArray = [...formik.values.callerListIds];
    updatedArray.splice(indexToDelete, 1);

    formik.setFieldValue('callerListIds', updatedArray);
  };

  const getName = (id) => {
    const resultObject = callerList.find((e) => parseInt(e.id, 10) === parseInt(id, 10));
    if (resultObject) {
      return resultObject?.attributes?.name;
    }
    return 'select';
  };

  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'caller-id') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('callerListIds', nodeDetails?.details?.callerListIds);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade  show"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div
            className="modal-dialog hours-modal-outer modal-dialog-scrollable"
            style={{ maxWidth: '550px' }}
          >
            <div className="modal-content">
              <div className="modal-body hours-modal">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/hours.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Caller ID</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The Shortcut component helps you fast and direct connection to a specific feature
                  with a set of input keys.
                </p>
                <h5 className="fs-13px mb-3 fw-normal">Input list</h5>
                {formik?.values?.callerListIds?.length > 0 &&
                  formik.values.callerListIds.map((value, index) => {
                    if (index === 0) {
                      return (
                        <div
                          key={index}
                          style={
                            formik.errors[`callerListId-${index}`]
                              ? { border: '1px solid red', borderRadius: '0.375rem' }
                              : {}
                          }
                        >
                          <InputListWithDropDown
                            key={index}
                            index={index}
                            id={value}
                            callerList={callerList}
                            onChange={(callerId) => {
                              updateValue(callerId, index);
                            }}
                            getName={getName}
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        className="mt-3 one-input"
                        key={index}
                        style={
                          formik.errors[`callerListId-${index}`]
                            ? { border: '1px solid red', borderRadius: '0.375rem' }
                            : {}
                        }
                      >
                        <InputListCloseWithDropDown
                          key={index}
                          index={index}
                          id={value}
                          callerList={callerList}
                          onChange={(e) => {
                            updateValue(e, index);
                          }}
                          deleteValue={() => {
                            deleteValue(index);
                          }}
                          getName={getName}
                        />
                      </div>
                    );
                  })}

                <span
                  className="color-blue-active mt-3 d-inline-block cursor-pointer add-two"
                  onClick={() => {
                    addNewInput();
                  }}
                >
                  <img src="/assets/call-flows-hours/add-circle.svg" alt="" className="me-2" />
                  Add Input
                </span>

                <div className="timeslot-buttons mt-4 d-flex align-item-center">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                    id="caller-id-drop-menu"
                    onClick={formik.handleSubmit}
                    disabled={isDataSubmiting}
                  >
                    {isDataSubmiting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-2"
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

export default CallerIdModal;
