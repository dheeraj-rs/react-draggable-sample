/* eslint-disable no-lonely-if */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import ConnectModalMainInputSection from '../connect/ConnectModalMainInputSection';
import ConnectDepartment from '../connect/ConnectDepartment';
import ConnectAgent from '../connect/ConnectAgent';
import ConnectNumber from '../connect/ConnectNumber';
import ConnectFetchNumber from '../connect/ConnectFetchNumber';
import {
  getAgentDetails,
  getDepartmentDetails,
  getFormErrorMessage,
  getNodeDetails,
  getVoiceFileDetails,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function ConnectModal({
  isVisible,
  onSelect,
  onUpdate,
  categoriesList,
  voiceLibraryList,
  setVoiceLibraryList,
  active,
  setActive,
  loading = false,
  setLoading,
  togglePlay,
  selectedVoice,
  onPause,
  isDataSubmiting,
  departments = [],
  agents = [],
  apiLibraries = [],
  allAvailableVoices = [],
  setShowModal,
  showModal,
}) {
  let details = {};

  const callRecordingTypeList = [
    { name: 'Customer side', type: 'customer-only' },
    { name: 'Agent side', type: 'agent-only' },
    { name: 'Both side', type: 'both' },
  ];

  const PrimaryAPIList = [
    { id: 1, name: 'API 1' },
    { id: 2, name: 'API 2' },
    { id: 3, name: 'API 3' },
  ];

  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (data.connectType === 'flow') {
      if (data.callToType.type === 'department') {
        if (data.departmentId === '') {
          errors.departmentId = 'required';
        }
        if (data.popupApiId === '' && data.pushDialog) {
          errors.popupApiId = 'required';
        }

        if (data.ringDuration === '' && data.duration) {
          errors.ringDuration = 'required';
        }

        if (data.conversationDuration === '' && data.duration) {
          errors.conversationDuration = 'required';
        }
      }

      if (data.callToType.type === 'agent') {
        if (data.agentId === '') {
          errors.agentId = 'required';
        }
        if (data.popupApiId === '' && data.pushDialog) {
          errors.popupApiId = 'required';
        }
        if (data.ringDuration === '' && data.duration) {
          errors.ringDuration = 'required';
        }

        if (data.conversationDuration === '' && data.duration) {
          errors.conversationDuration = 'required';
        }
      }

      if (data.callToType.type === 'number') {
        if (data.popupApiId === '' && data.pushDialog) {
          errors.popupApiId = 'required';
        }
        if (data.ringDuration === '' && data.duration) {
          errors.ringDuration = 'required';
        }

        if (data.conversationDuration === '' && data.duration) {
          errors.conversationDuration = 'required';
        }
      }

      if (data.callToType.type === 'number-from-url') {
        if (data.popupApiId === '' && data.pushDialog) {
          errors.popupApiId = 'required';
        }
        if (data.ringDuration === '' && data.duration) {
          errors.ringDuration = 'required';
        }

        if (data.conversationDuration === '' && data.duration) {
          errors.conversationDuration = 'required';
        }
      }

      if (data.callRecordingEnabled) {
        if (data.callRecordingType.type === 'select') {
          errors.callRecordingType = 'required';
        }
      }

      if (data.ringDuration) {
        if (parseInt(data.ringDuration, 10) === 0) {
          errors.ringDuration = 'duration cannot be 0';
        } else if (data.ringDuration === '') {
          errors.ringDuration = 'required';
        }
      }

      if (data.musicWhenCallConnectingId === '') {
        errors.musicWhenCallConnecting = 'required';
      }

      if (data.musicWhenCallOnHoldId === '') {
        errors.musicWhenCallOnHold = 'required';
      }
    }

    if (data.connectType === 'url') {
      if (data.apiId === 'select') {
        errors.apiId = 'required';
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      connectType: 'flow',
      callToType: { name: 'Department', type: 'department' },
      departmentId: '',
      departmentName: '',
      allocationMethod: { name: 'Uniform', type: 'uniform' },
      agentId: '',
      agentName: '',
      lockAgent: false,
      doNotTransferIfLockedAgentBusy: false,
      number: '',
      fetchNumberApiId: 'select',
      callRecordingEnabled: false,
      callRecordingType: { name: 'select', type: 'select' },
      duration: false,
      // durationApi: false,
      ringDuration: 5,
      conversationDuration: 100,
      pushDialog: false,
      popupApiId: '',
      apiId: '',
      //
      musicWhenCallConnecting: 'Select IVR',
      musicWhenCallConnectingId: '',
      musicWhenCallOnHold: 'Select IVR',
      musicWhenCallOnHoldId: '',
    },

    validate,
    onSubmit: () => {
      const { values } = formik;
      // setShow({ isVisible: false, type: '' });
      let updatedDetails = {};
      if (show?.actionType === 'edit-node') {
        if (values.connectType === 'flow') {
          updatedDetails = {
            type: 'flow',
            callToType: values.callToType?.type,
            ...(values.callToType?.type === 'department' && {
              departmentId: values.departmentId,
            }),
            allocationMethod: values.allocationMethod.type,
            ...(values.callToType?.type === 'department' && {
              lockAgent: values.lockAgent,
            }),
            ...(values.callToType?.type === 'department' && {
              doNotTransferIfLockedAgentBusy: values.doNotTransferIfLockedAgentBusy,
            }),
            ...(values.callToType?.type === 'agent' && {
              agentId: values.agentId,
            }),
            ...(values.callToType?.type === 'number' && {
              number: values.number,
            }),
            ...(values.callToType?.type === 'number-from-url' && {
              fetchNumberApiId: parseInt(values.fetchNumberApiId, 10),
            }),
            callRecordingEnabled: values.callRecordingEnabled,
            callRecordingType: values.callRecordingType.type,
            ringDuration: values.ringDuration,
            conversationDuration: values.conversationDuration,
            duration: values.duration,
            pushDialog: values.pushDialog,
            popupApiId: parseInt(values.popupApiId, 10),
            connectingVoiceId: parseInt(values.musicWhenCallConnectingId, 10),
            onHoldVoiceId: parseInt(values.musicWhenCallOnHoldId, 10),
          };
        } else {
          updatedDetails = { type: 'url', apiId: values.apiId };
        }
        onUpdate({
          nodeId: show?.nodeId,
          details: updatedDetails,
        });
      } else {
        if (values.connectType === 'flow') {
          details = {
            type: 'flow',
            callToType: values.callToType?.type,
            ...(values.callToType?.type === 'department' && {
              departmentId: values.departmentId,
            }),
            allocationMethod: values.allocationMethod.type,
            ...(values.callToType?.type === 'department' && {
              lockAgent: values.lockAgent,
            }),
            ...(values.callToType?.type === 'department' && {
              doNotTransferIfLockedAgentBusy: values.doNotTransferIfLockedAgentBusy,
            }),
            ...(values.callToType?.type === 'agent' && {
              agentId: values.agentId,
            }),
            ...(values.callToType?.type === 'number' && {
              number: values.number,
            }),
            ...(values.callToType?.type === 'number-from-url' && {
              fetchNumberApiId: parseInt(values.fetchNumberApiId, 10),
            }),
            callRecordingEnabled: values.callRecordingEnabled,
            callRecordingType: values.callRecordingType.type,
            ringDuration: values.ringDuration,
            conversationDuration: values.conversationDuration,
            duration: values.duration,
            pushDialog: values.pushDialog,
            popupApiId: parseInt(values.popupApiId, 10),
            connectingVoiceId: parseInt(values.musicWhenCallConnectingId, 10),
            onHoldVoiceId: parseInt(values.musicWhenCallOnHoldId, 10),
          };
        } else {
          details = { type: 'url', apiId: values.apiId };
        }
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'connect',
          details,
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  useEffect(() => {
    if (
      show?.actionType === 'edit-node' &&
      show?.nodeId &&
      show?.type === 'Connect' &&
      allAvailableVoices?.length > 0
    ) {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('connectType', nodeDetails?.details?.type);

      if (nodeDetails?.details?.type === 'url') {
        formik.setFieldValue('apiId', nodeDetails?.details?.apiId);
      } else {
        formik.setFieldValue('callToType', {
          name: nodeDetails?.details?.callToType,
          type: nodeDetails?.details?.callToType,
        });
        if (nodeDetails?.details?.callToType === 'agent') {
          formik.setFieldValue('agentId', nodeDetails?.details?.agentId);
          formik.setFieldValue(
            'agentName',
            getAgentDetails(agents, nodeDetails?.details?.agentId)?.attributes?.display_name
          );
        }

        if (nodeDetails?.details?.callToType === 'department') {
          formik.setFieldValue('departmentId', nodeDetails?.details?.departmentId);
          formik.setFieldValue(
            'departmentName',
            getDepartmentDetails(departments, nodeDetails?.details?.departmentId)?.attributes?.name
          );
        }

        if (nodeDetails?.details?.callToType === 'number') {
          formik.setFieldValue('number', nodeDetails?.details?.number);
        }

        if (nodeDetails?.details?.callToType === 'number-from-url') {
          formik.setFieldValue('fetchNumberApiId', nodeDetails?.details?.fetchNumberApiId);
        }

        formik.setFieldValue('allocationMethod', {
          name: nodeDetails?.details?.allocationMethod,
          type: nodeDetails?.details?.allocationMethod,
        });

        formik.setFieldValue('musicWhenCallConnectingId', nodeDetails?.details?.connectingVoiceId);
        formik.setFieldValue(
          'musicWhenCallConnecting',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.connectingVoiceId)
            ?.attributes?.name
        );

        formik.setFieldValue('conversationDuration', nodeDetails?.details?.conversationDuration);

        formik.setFieldValue('musicWhenCallOnHoldId', nodeDetails?.details?.onHoldVoiceId);
        formik.setFieldValue(
          'musicWhenCallOnHold',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.onHoldVoiceId)?.attributes
            ?.name
        );
        formik.setFieldValue('popupApiId', nodeDetails?.details?.popupApiId);
        formik.setFieldValue('pushDialog', nodeDetails?.details?.pushDialog);
        formik.setFieldValue('ringDuration', nodeDetails?.details?.ringDuration);

        formik.setFieldValue('lockAgent', nodeDetails?.details?.lockAgent);
        formik.setFieldValue(
          'doNotTransferIfLockedAgentBusy',
          nodeDetails?.details?.doNotTransferIfLockedAgentBusy
        );
        formik.setFieldValue('duration', nodeDetails?.details?.duration);
        formik.setFieldValue('fetchNumberApiId', nodeDetails?.details?.fetchNumberApiId);
        formik.setFieldValue('callRecordingEnabled', nodeDetails?.details?.callRecordingEnabled);
        formik.setFieldValue('callRecordingType', {
          name: nodeDetails?.details?.callRecordingType,
          type: nodeDetails?.details?.callRecordingType,
        });
      }
    }
  }, [show?.actionType, show?.nodeId, flowNodes, allAvailableVoices]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="connectModal"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="connectModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog connect-modal-outer">
            <div className="modal-content">
              <div className="modal-body connect-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/ivr.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Connect</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The Connect component helps you connect the caller to an agent, department or a
                  specific number.
                </p>
                <ul className="connect-modal-main-tab-header d-flex align-items-center mb-4">
                  <li
                    className={`connect-modal-main-tab-one ${
                      formik.values.connectType === 'flow' ? 'active' : ''
                    }`}
                    onClick={() => {
                      formik.setFieldValue('connectType', 'flow');
                    }}
                  >
                    Control component by the flow
                  </li>
                  <li
                    className={`connect-modal-main-tab-two ${
                      formik.values.connectType === 'url' ? 'active' : ''
                    }`}
                    onClick={() => {
                      formik.setFieldValue('connectType', 'url');
                    }}
                  >
                    Control component by a URL
                  </li>
                </ul>
                <div
                  className={`modal-main-content-one ${
                    formik.values.connectType === 'flow' ? '' : 'd-none'
                  }`}
                >
                  <ConnectModalMainInputSection
                    formik={formik}
                    departments={departments}
                    agents={agents}
                  />
                  <ConnectDepartment
                    show={formik.values.callToType.type === 'department'}
                    categoriesList={categoriesList}
                    files={voiceLibraryList}
                    formik={formik}
                    active={active}
                    setActive={setActive}
                    callRecordingTypeList={callRecordingTypeList}
                    setVoiceLibraryList={setVoiceLibraryList}
                    loading={loading}
                    setLoading={setLoading}
                    togglePlay={togglePlay}
                    selectedVoice={selectedVoice}
                    onPause={onPause}
                    apiLibraries={apiLibraries}
                    setShowModal={setShowModal}
                    showModal={showModal}
                  />
                  <ConnectAgent
                    show={formik.values.callToType.type === 'agent'}
                    categoriesList={categoriesList}
                    files={voiceLibraryList}
                    formik={formik}
                    active={active}
                    setActive={setActive}
                    callRecordingTypeList={callRecordingTypeList}
                    setVoiceLibraryList={setVoiceLibraryList}
                    loading={loading}
                    setLoading={setLoading}
                    togglePlay={togglePlay}
                    selectedVoice={selectedVoice}
                    onPause={onPause}
                    allAvailableVoices={allAvailableVoices}
                    apiLibraries={apiLibraries}
                  />
                  <ConnectNumber
                    show={formik.values.callToType.type === 'number'}
                    categoriesList={categoriesList}
                    files={voiceLibraryList}
                    formik={formik}
                    active={active}
                    setActive={setActive}
                    callRecordingTypeList={callRecordingTypeList}
                    setVoiceLibraryList={setVoiceLibraryList}
                    loading={loading}
                    setLoading={setLoading}
                    togglePlay={togglePlay}
                    selectedVoice={selectedVoice}
                    onPause={onPause}
                    apiLibraries={apiLibraries}
                  />
                  <ConnectFetchNumber
                    show={formik.values.callToType.type === 'number-from-url'}
                    categoriesList={categoriesList}
                    files={voiceLibraryList}
                    formik={formik}
                    active={active}
                    setActive={setActive}
                    callRecordingTypeList={callRecordingTypeList}
                    setVoiceLibraryList={setVoiceLibraryList}
                    loading={loading}
                    setLoading={setLoading}
                    togglePlay={togglePlay}
                    selectedVoice={selectedVoice}
                    onPause={onPause}
                    apiLibraries={apiLibraries}
                  />
                </div>
                <div
                  className="modal-main-content-two mt-4"
                  style={formik.values.connectType === 'url' ? {} : { display: 'none' }}
                >
                  <div className="container-fluid">
                    <div className="row p-4">
                      <div className="col-md-12">
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                          <h5 className="fs-13px text-primary m-0 mb-3">
                            Control component by providing URL
                          </h5>
                          <p className="text-primary fs-13px m-0 mb-2">Primary API</p>
                          <div className="form-group mt-3">
                            <select
                              name="apiId"
                              className="form-control form-select bg-white"
                              value={formik.values.apiId}
                              onChange={formik.handleChange}
                              style={
                                isFormFieldValid(formik, 'apiId') ? { border: '1px solid red' } : {}
                              }
                            >
                              <option value="" disabled>
                                Select
                              </option>

                              {PrimaryAPIList?.length > 0 &&
                                PrimaryAPIList?.map((option, index) => (
                                  <option key={index} value={option.id}>
                                    {option.name}
                                  </option>
                                ))}
                            </select>
                            {getFormErrorMessage(formik, 'apiId')}
                          </div>
                          <div className="fs-13pc color-blue-active mt-2 fw-500 text-end mb-3">
                            Configure API
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="timeslot-buttons mt-4 d-flex align-item-center gap-3">
                      <button
                        type="button"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                        // data-bs-dismiss="modal"
                        id="connect-save"
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
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
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

export default ConnectModal;
