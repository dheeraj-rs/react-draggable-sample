import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import {
  getAgentAvailabilitiesDetails,
  getNodeDetails,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function HoursModal({ isVisible, onSelect, onUpdate, agentAvailabilities = [], isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};
    if (data.agentAvailabilityId === '') {
      errors.agentAvailabilityId = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { agentAvailabilityName: 'Select', agentAvailabilityId: '' },

    validate,
    onSubmit: () => {
      const { values } = formik;

      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: { agentAvailabilityId: values.agentAvailabilityId },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'hours',
          details: { agentAvailabilityId: values.agentAvailabilityId },
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'hours') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue(
        'agentAvailabilityName',
        getAgentAvailabilitiesDetails(
          agentAvailabilities,
          nodeDetails?.details?.agentAvailabilityId
        )?.attributes?.name
      );
      formik.setFieldValue('agentAvailabilityId', nodeDetails?.details?.agentAvailabilityId);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="hoursModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog hours-modal-outer">
            <div className="modal-content">
              <div className="modal-body hours-modal">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/hours.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Hours</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-5 mt-0">
                  This component is used to control your call flow based on the Agent Working Hours
                  and non Agent Working Hours.
                </p>
                <h5 className="fs-13px mb-2 fw-normal">Select agent time slot</h5>
                <div className="dropdown select-hour-dropdown">
                  <button
                    className="select-time-slot d-flex align-items-center justify-content-between"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={
                      isFormFieldValid(formik, 'agentAvailabilityId')
                        ? { border: '1px solid red' }
                        : {}
                    }
                  >
                    <p className="m-0">{formik.values.agentAvailabilityName}</p>
                    <img src="/assets/call-flows-hours/CaretDown.svg" alt="" />
                  </button>
                  <div className="dropdown-menu">
                    <div className="d-flex gap-3">
                      <SearchWithBorder
                        placeholderText="Select time slot"
                        onChange={() => {}}
                        clearBtn={() => {}}
                      />
                      <div className="d-flex align-item-center search-actions gap-3">
                        <a
                          href="../../agent-availability/agent-time-slot"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Add time slot"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img src="/assets/call-flows-hours/add.svg" alt="" />
                        </a>
                        <a
                          href="../../agent-availability/"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Manage hours"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img src="/assets/call-flows-hours/settings.svg" alt="" />
                        </a>
                      </div>
                    </div>
                    <ul className="timeslot-list scroll-custom">
                      {agentAvailabilities.length > 0 &&
                        agentAvailabilities.map((slot, index) => (
                          <li
                            key={index}
                            className={`${
                              String(slot?.id) === String(formik.values.agentAvailabilityId)
                                ? 'active'
                                : ''
                            } d-flex align-items-center gap-3`}
                            onClick={() => {
                              formik.setFieldValue('agentAvailabilityName', slot?.attributes?.name);

                              formik.setFieldValue('agentAvailabilityId', slot.id);
                            }}
                          >
                            <span>
                              <img src="/assets/call-flows-hours/time-half-past.svg" alt="" />
                            </span>
                            <span>{slot?.attributes?.name}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* {getFormErrorMessage(formik, 'agentAvailabilityId')} */}
                  <div className="timeslot-buttons mt-4 d-flex align-item-center">
                    <button
                      type="button"
                      className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                      data-bs-dismiss="modal"
                      id="timeslot-save"
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
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
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

export default HoursModal;
