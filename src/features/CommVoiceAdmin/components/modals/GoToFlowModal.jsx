import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';
import { getNodeDetails, isFormFieldValid } from '../../../../common/helpers/utils';

function GoToFlowModal({ isVisible, onSelect, onUpdate, callFlows, isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (data.flowId === 'select') {
      errors.flowId = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      flowId: 'select',
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            flowId: parseInt(formik.values.flowId, 10),
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'goto-flow',
          details: {
            flowId: parseInt(formik.values.flowId, 10),
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
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'go-to-flow') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('flowId', nodeDetails?.details?.flowId);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  return (
    <Modal width="490px" id="flowModal" show={isVisible}>
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium fs-16px mb-2">
          <img className="pe-2" src="/assets/go-to-flow.svg" alt="" />
          Go to flow
        </p>
        <ModalClose onClose={handleClose} />
      </div>
      <p className="fs-13px text-primary mb-4">
        This component helps you to transfer the call to another specified call work flow.
      </p>

      <div className="form-group mt-3">
        <label className="text-primary mb-1">Transfer the call to this call flow</label>
        <select
          name="flowId"
          className="form-control form-select bg-white"
          value={formik.values.flowId}
          onChange={(e) => {
            formik.setFieldValue('flowId', e?.target?.value);
          }}
          style={isFormFieldValid(formik, 'flowId') ? { border: '1px solid red' } : {}}
        >
          <option value="select" disabled>
            Select
          </option>

          {callFlows?.length > 0 &&
            callFlows?.map((option, index) => (
              <option
                key={index}
                value={option.id}
                className={String(option?.id) === String(formik.values.flowId) ? 'active' : ''}
              >
                {option?.attributes?.name}
              </option>
            ))}
        </select>
      </div>
      <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
        <button
          id="addFlowBtn"
          type="button"
          className="addFlowButton btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
          onClick={formik.handleSubmit}
          disabled={isDataSubmiting}
        >
          {isDataSubmiting ? 'Saving...' : 'Save'}
        </button>
        <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
      </div>
    </Modal>
  );
}

export default GoToFlowModal;
