import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';
import {
  getAgentDetails,
  getDepartmentDetails,
  getNodeDetails,
  getVoiceFileDetails,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';
import CustomIVR from '../ivr/CustomIVR';

function VoiceMailModal({
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
  departments,
  agents,
  isDataSubmiting,
  allAvailableVoices = [],
  setShowModal,
  showModal,
}) {
  const voicemailTransferTo = [
    { name: 'Department', type: 'department' },
    { name: 'Agent', type: 'agent' },
  ];

  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};
    if (data.voiceId === '') {
      errors.voiceId = 'required';
    }

    if (data.voiceMailTarget === 'department' && data.departmentId === '') {
      errors.departmentId = 'required';
    }
    if (data.voiceMailTarget === 'agent' && data.agentId === '') {
      errors.agentId = 'required';
    }
    if (data.endKey === '') {
      errors.endKey = 'required';
    }
    if (data.duration === '') {
      errors.duration = 'required';
    }
    if (data.endOnSilenceDuration === '') {
      errors.endOnSilenceDuration = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      voiceName: 'Select IVR',
      voiceId: '',
      //
      voiceMailTargetName: 'Department',
      voiceMailTarget: 'department',
      //
      departmentName: 'Select',
      departmentId: '',
      //
      agentName: 'Select',
      agentId: '',
      //
      endKey: '#',
      duration: '10',
      endOnSilenceDuration: '10',
    },

    validate,
    onSubmit: () => {
      const { values } = formik;
      // setShow({ isVisible: false, type: '' });

      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            voiceId: values.voiceId,
            voiceMailTarget: values.voiceMailTarget,
            departmentId: values.departmentId,
            agentId: values.agentId,
            endKey: values.endKey,
            duration: values.duration,
            endOnSilenceDuration: values.endOnSilenceDuration,
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'voicemail',
          details: {
            voiceId: values.voiceId,
            voiceMailTarget: values.voiceMailTarget,
            departmentId: values.departmentId,
            agentId: values.agentId,
            endKey: values.endKey,
            duration: values.duration,
            endOnSilenceDuration: values.endOnSilenceDuration,
          },
        });
      }
    },
  });

  const handleClose = () => {
    setActive({ state: false, type: '' });
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  useEffect(() => {
    if (
      show?.actionType === 'edit-node' &&
      show?.nodeId &&
      allAvailableVoices?.length > 0 &&
      show?.type === 'Voicemail'
    ) {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);

      formik.setFieldValue(
        'voiceName',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.voiceId)?.attributes?.name
      );
      formik.setFieldValue('voiceId', nodeDetails?.details?.voiceId);

      formik.setFieldValue('voiceMailTargetName', nodeDetails?.details?.voiceMailTarget);
      formik.setFieldValue('voiceMailTarget', nodeDetails?.details?.voiceMailTarget);

      if (nodeDetails?.details?.voiceMailTarget === 'agent') {
        formik.setFieldValue('agentId', nodeDetails?.details?.agentId);
        formik.setFieldValue(
          'agentName',
          getAgentDetails(agents, nodeDetails?.details?.agentId)?.attributes?.display_name
        );
      }

      if (nodeDetails?.details?.voiceMailTarget === 'department') {
        formik.setFieldValue(
          'departmentName',
          getDepartmentDetails(departments, nodeDetails?.details?.departmentId)?.attributes?.name
        );
        formik.setFieldValue('departmentId', nodeDetails?.details?.departmentId);
      }

      formik.setFieldValue('endKey', nodeDetails?.details?.endKey);
      formik.setFieldValue('duration', nodeDetails?.details?.duration);
      formik.setFieldValue('endOnSilenceDuration', nodeDetails?.details?.endOnSilenceDuration);
    }
  }, [show?.actionType, show?.nodeId, flowNodes, allAvailableVoices]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="voiceMailModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog voice-mail-modal-outer">
            <div className="modal-content">
              <div className="modal-body voice-mail-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/voicemail.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Voicemail</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The voicemail component allows users to leave a voicemail that can be traced into
                  your system.
                </p>
                <h5 className="fs-13px mb-2 fw-normal">Voicemail IVR</h5>

                <CustomIVR
                  addVoice={false}
                  categoriesList={categoriesList}
                  files={voiceLibraryList}
                  setVoiceLibraryList={setVoiceLibraryList}
                  value={formik?.values?.voiceName}
                  type="connecting-ivr"
                  active={active}
                  setActive={setActive}
                  onSelect={(data) => {
                    formik.setFieldValue('voiceName', data.name);
                    formik.setFieldValue('voiceId', data.id);
                  }}
                  loading={loading}
                  setLoading={setLoading}
                  togglePlay={togglePlay}
                  selectedVoice={selectedVoice}
                  onPause={onPause}
                  categoryId={
                    getVoiceFileDetails(allAvailableVoices, formik?.values?.voiceId)?.attributes
                      ?.category_id
                  }
                  fileId={formik?.values?.voiceId}
                  isInvalid={isFormFieldValid(formik, 'voiceId')}
                  setShowModal={setShowModal}
                  showModal={showModal}
                />
                {/* {getFormErrorMessage(formik, 'voiceId')} */}
                <div className="row mt-4">
                  <div className="col-md-5">
                    <div>
                      <label className="fs-13px text-primary mb-2" htmlFor="">
                        Voicemail transfer to
                      </label>
                      <div className="dropdown position-relative sms-sender-id-dropdown">
                        <button
                          className=""
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'voiceMailTarget')
                              ? { border: '1px solid red' }
                              : {}
                          }
                        >
                          <span>{formik.values.voiceMailTargetName}</span>
                        </button>
                        <img
                          className="connect-dropdown-caret"
                          src="/assets/call-flows-hours/CaretDown.svg"
                          alt=""
                        />
                        <div className="dropdown-menu">
                          <ul>
                            {voicemailTransferTo?.map((e, index) => (
                              <li
                                key={index}
                                value={e?.type}
                                onClick={() => {
                                  formik.setFieldValue('voiceMailTargetName', e.name);
                                  formik.setFieldValue('voiceMailTarget', e.type);
                                  if (e.type === 'agent') {
                                    formik.setFieldValue('departmentName', 'Select');
                                    formik.setFieldValue('departmentId', '');
                                  } else if (e.type === 'department') {
                                    formik.setFieldValue('agentName', 'Select');
                                    formik.setFieldValue('agentId', '');
                                  }
                                }}
                                className={e.type === formik.values.voiceMailTarget ? 'active' : ''}
                              >
                                {e?.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* {getFormErrorMessage(formik, 'voiceMailTarget')} */}
                    </div>
                  </div>
                  <div
                    className="col-md-7"
                    style={
                      formik.values.voiceMailTarget === 'department' ? {} : { display: 'none' }
                    }
                  >
                    <div>
                      <label className="fs-13px text-primary mb-2 mt-3 mt-sm-0" htmlFor="">
                        Select Department
                      </label>
                      <div className="dropdown position-relative sms-sender-id-dropdown">
                        <button
                          className=""
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'departmentId')
                              ? { border: '1px solid red' }
                              : {}
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
                            {departments?.map((e) => (
                              <li
                                onClick={() => {
                                  formik.setFieldValue('departmentName', e?.attributes?.name);
                                  formik.setFieldValue('departmentId', e.id);
                                }}
                                className={
                                  String(formik.values.departmentId) === String(e.id)
                                    ? 'active'
                                    : ''
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
                  </div>

                  <div
                    className="col-md-7"
                    style={formik.values.voiceMailTarget === 'agent' ? {} : { display: 'none' }}
                  >
                    <div>
                      <label className="fs-13px text-primary mb-2 mt-3 mt-sm-0" htmlFor="">
                        Select Agent
                      </label>
                      <div className="dropdown position-relative sms-sender-id-dropdown">
                        <button
                          className=""
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={
                            isFormFieldValid(formik, 'agentId') ? { border: '1px solid red' } : {}
                          }
                        >
                          <span>{formik.values.agentName}</span>
                        </button>
                        <img
                          className="connect-dropdown-caret"
                          src="/assets/call-flows-hours/CaretDown.svg"
                          alt=""
                        />
                        <div className="dropdown-menu">
                          <ul>
                            {agents?.map((e) => (
                              <li
                                onClick={() => {
                                  formik.setFieldValue('agentName', e?.attributes?.display_name);
                                  formik.setFieldValue('agentId', e.id);
                                }}
                                className={formik.values.agentId === e.id ? 'active' : ''}
                              >
                                {e?.attributes?.display_name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* {getFormErrorMessage(formik, 'agentId')} */}
                    </div>
                  </div>
                </div>

                <div className="bg-seaShell rounded-2 p-4 mt-4">
                  <div className="d-flex gap-3 align-items-center voice-mail-shortcut-wrap mb-2 flex-wrap">
                    <p className="text-primary fs-13px m-0">End voicemail by pressing the key</p>
                    <input
                      type="text"
                      placeholder="#"
                      className="text-primary"
                      maxLength={1}
                      name="endKey"
                      value={formik.values.endKey}
                      onChange={formik.handleChange}
                      style={isFormFieldValid(formik, 'endKey') ? { border: '1px solid red' } : {}}
                    />
                    {/* {getFormErrorMessage(formik, 'endKey')} */}
                  </div>
                  <div className="d-flex gap-3 align-items-center voice-mail-shortcut-wrap mb-2 flex-wrap">
                    <p className="text-primary fs-13px m-0">Voicemail duration(In sec.)</p>
                    <input
                      type="text"
                      placeholder="-"
                      className="text-primary"
                      name="duration"
                      value={formik.values.duration}
                      onChange={formik.handleChange}
                      style={
                        isFormFieldValid(formik, 'duration') ? { border: '1px solid red' } : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {/* {getFormErrorMessage(formik, 'duration')} */}
                    <p className="text-primary fs-13px m-0">Max. Unlimited.</p>
                  </div>
                  <div className="d-flex gap-3 align-items-center voice-mail-shortcut-wrap flex-wrap">
                    <p className="text-primary fs-13px m-0">
                      Voicemail stops if there is silence for
                    </p>
                    <input
                      type="text"
                      placeholder="10"
                      className="text-primary"
                      name="endOnSilenceDuration"
                      value={formik.values.endOnSilenceDuration}
                      onChange={formik.handleChange}
                      style={
                        isFormFieldValid(formik, 'endOnSilenceDuration')
                          ? { border: '1px solid red' }
                          : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {/* {getFormErrorMessage(formik, 'endOnSilenceDuration')} */}
                    <p className="text-primary fs-13px m-0">Sec.</p>
                  </div>
                </div>

                <div className="timeslot-buttons mt-4 d-flex align-item-center gap-3 flex-wrap">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                    data-bs-dismiss="modal"
                    id="voiceMail-save"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    disabled={isDataSubmiting}
                  >
                    {isDataSubmiting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="custom-backdrop-close d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px "
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

export default VoiceMailModal;
