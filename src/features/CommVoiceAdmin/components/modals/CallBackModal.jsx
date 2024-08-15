import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import CustomIVR from '../ivr/CustomIVR';
import Input from '../../../../common/components/forms/Input';
import {
  getNodeDetails,
  getVoiceFileDetails,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function CallBackModal({
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
  allAvailableVoices = [],
  setShowModal,
  showModal,
}) {
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [isToggleActiveAccept, setIsToggleActiveAccept] = useState(false);

  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (!data.initialVoiceId) {
      errors.initialVoiceId = ' required';
    }
    // if (!data.acceptKey ===) {
    //   errors.acceptKey = 'required';
    // }
    // if (!data.declineKey) {
    //   errors.declineKey = 'required';
    // }
    if (!data.userResponseTimeout) {
      errors.userResponseTimeout = 'required';
    }
    if (!data.confirmationVoiceId) {
      errors.confirmationVoiceId = 'required';
    }
    if (!data.declineVoiceId) {
      errors.declineVoiceId = 'required';
    }
    if (!data.timeoutVoiceId) {
      errors.timeoutVoiceId = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      initialVoiceId: '',
      initialVoiceName: 'Select IVR',
      //
      acceptKey: 1,
      declineKey: 2,
      userResponseTimeout: '',
      //
      confirmationVoiceId: '',
      confirmationVoiceName: 'Select IVR',
      //
      declineVoiceId: '',
      declineVoiceName: 'Select IVR',
      //
      timeoutVoiceId: '',
      timeoutVoiceName: 'Select IVR',
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            initialVoiceId: formik.values.initialVoiceId,
            acceptKey: formik.values.acceptKey,
            declineKey: formik.values.declineKey,
            userResponseTimeout: formik.values.userResponseTimeout,
            confirmationVoiceId: formik.values.confirmationVoiceId,
            declineVoiceId: formik.values.declineVoiceId,
            timeoutVoiceId: formik.values.timeoutVoiceId,
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'callBack',
          details: {
            initialVoiceId: formik.values.initialVoiceId,
            acceptKey: formik.values.acceptKey,
            declineKey: formik.values.declineKey,
            userResponseTimeout: formik.values.userResponseTimeout,
            confirmationVoiceId: formik.values.confirmationVoiceId,
            declineVoiceId: formik.values.declineVoiceId,
            timeoutVoiceId: formik.values.timeoutVoiceId,
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
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'Callback') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('initialVoiceId', nodeDetails?.details?.initialVoiceId);
      formik.setFieldValue(
        'initialVoiceName',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.initialVoiceId)?.attributes
          ?.name
      );

      formik.setFieldValue('acceptKey', nodeDetails?.details?.acceptKey);
      formik.setFieldValue('declineKey', nodeDetails?.details?.declineKey);
      formik.setFieldValue('userResponseTimeout', nodeDetails?.details?.userResponseTimeout);

      formik.setFieldValue('confirmationVoiceId', nodeDetails?.details?.confirmationVoiceId);
      formik.setFieldValue(
        'confirmationVoiceName',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.confirmationVoiceId)
          ?.attributes?.name
      );

      formik.setFieldValue('declineVoiceId', nodeDetails?.details?.declineVoiceId);
      formik.setFieldValue(
        'declineVoiceName',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.declineVoiceId)?.attributes
          ?.name
      );

      formik.setFieldValue('timeoutVoiceId', nodeDetails?.details?.timeoutVoiceId);
      formik.setFieldValue(
        'timeoutVoiceName',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.timeoutVoiceId)?.attributes
          ?.name
      );
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          id="callBackModal"
          tabIndex="-1"
          aria-labelledby="callBackModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog sms-feedback-modal-outer">
            <div className="modal-content">
              <div className="modal-body sms-feedback-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/callBack-new.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Callback</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  This component helps you to get a callback from the agent.
                </p>

                <div>
                  <h6 className="text-secondary fw-normal">Play callback IVR to the customer</h6>
                  <CustomIVR
                    addVoice={false}
                    categoriesList={categoriesList}
                    files={voiceLibraryList}
                    setVoiceLibraryList={setVoiceLibraryList}
                    value={formik?.values?.initialVoiceName}
                    type="ivr-1"
                    active={active}
                    setActive={setActive}
                    onSelect={(data) => {
                      formik.setFieldValue('initialVoiceName', data.name);
                      formik.setFieldValue('initialVoiceId', data.id);
                    }}
                    loading={loading}
                    setLoading={setLoading}
                    togglePlay={togglePlay}
                    selectedVoice={selectedVoice}
                    onPause={onPause}
                    categoryId={
                      getVoiceFileDetails(allAvailableVoices, formik?.values?.initialVoiceId)
                        ?.attributes?.category_id
                    }
                    fileId={formik?.values?.initialVoiceId}
                    isInvalid={isFormFieldValid(formik, 'initialVoiceId')}
                    setShowModal={setShowModal}
                    showModal={showModal}
                  />
                  {/* {getFormErrorMessage(formik, 'initialVoiceId')} */}
                </div>

                <div className="row mt-3">
                  <div className="col-lg-6 col-sm-6">
                    <div className="mt-2">
                      <label className="text-primary mb-2">Accept call back if press key</label>
                      <div className="select bg-white">
                        <div
                          className="selectBtn"
                          data-type="firstOption"
                          onClick={() => {
                            setIsToggleActiveAccept(!isToggleActiveAccept);
                          }}
                        >
                          {formik.values.acceptKey}
                        </div>
                        <div className={`selectDropdown ${isToggleActiveAccept ? 'toggle' : ''}`}>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((e, index) => {
                            if (formik.values.acceptKey !== e) {
                              return (
                                <div
                                  key={index}
                                  id="showSms"
                                  className="option"
                                  data-type="firstOption"
                                  onClick={() => {
                                    setIsToggleActiveAccept(false);
                                    formik.setFieldValue('acceptKey', e);
                                  }}
                                >
                                  {e}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="mt-2">
                      <label className="text-primary mb-2">Decline call back if press key</label>
                      <div className="select bg-white">
                        <div
                          className="selectBtn"
                          data-type="firstOption"
                          onClick={() => {
                            setIsToggleActive(!isToggleActive);
                          }}
                        >
                          {formik.values.declineKey}
                        </div>
                        <div className={`selectDropdown ${isToggleActive ? 'toggle' : ''}`}>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((e, index) => {
                            if (formik.values.declineKey !== e) {
                              return (
                                <div
                                  key={index}
                                  id="showSms"
                                  className="option"
                                  data-type="firstOption"
                                  onClick={() => {
                                    formik.setFieldValue('declineKey', e);
                                    setIsToggleActive(false);
                                  }}
                                >
                                  {e}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-n2">
                    <Input
                      label="Max. Delay for getting an input from the customer(Sec)"
                      id="bannerMsg"
                      placeholder="15"
                      type="textbox"
                      name="userResponseTimeout"
                      value={formik.values.userResponseTimeout}
                      onChange={formik.handleChange}
                      style={
                        isFormFieldValid(formik, 'userResponseTimeout')
                          ? { border: '1px solid red' }
                          : {}
                      }
                      onKeyPress={handleKeyPressForNumber}
                    />
                    {/* {getFormErrorMessage(formik, 'userResponseTimeout')} */}
                  </div>

                  {/*  callback confirmation IVR */}
                  <div className="mt-4">
                    <h6 className="text-secondary fw-500">
                      Play callback confirmation IVR to the customer if accept
                    </h6>
                    <CustomIVR
                      addVoice={false}
                      categoriesList={categoriesList}
                      files={voiceLibraryList}
                      setVoiceLibraryList={setVoiceLibraryList}
                      value={formik?.values?.confirmationVoiceName}
                      type="ivr-2"
                      active={active}
                      setActive={setActive}
                      onSelect={(data) => {
                        formik.setFieldValue('confirmationVoiceName', data.name);
                        formik.setFieldValue('confirmationVoiceId', data.id);
                      }}
                      loading={loading}
                      setLoading={setLoading}
                      togglePlay={togglePlay}
                      selectedVoice={selectedVoice}
                      onPause={onPause}
                      categoryId={
                        getVoiceFileDetails(allAvailableVoices, formik?.values?.confirmationVoiceId)
                          ?.attributes?.category_id
                      }
                      fileId={formik?.values?.confirmationVoiceId}
                      isInvalid={isFormFieldValid(formik, 'confirmationVoiceId')}
                      setShowModal={setShowModal}
                      showModal={showModal}
                    />
                    {/* {getFormErrorMessage(formik, 'confirmationVoiceId')} */}
                  </div>

                  {/* customer decline IVR */}
                  <div className="mt-4">
                    <h6 className="text-secondary fw-500">
                      Play IVR, if customer decline callback
                    </h6>
                    <CustomIVR
                      addVoice={false}
                      categoriesList={categoriesList}
                      files={voiceLibraryList}
                      setVoiceLibraryList={setVoiceLibraryList}
                      value={formik?.values?.declineVoiceName}
                      type="ivr-2"
                      active={active}
                      setActive={setActive}
                      onSelect={(data) => {
                        formik.setFieldValue('declineVoiceName', data.name);
                        formik.setFieldValue('declineVoiceId', data.id);
                      }}
                      loading={loading}
                      setLoading={setLoading}
                      togglePlay={togglePlay}
                      selectedVoice={selectedVoice}
                      onPause={onPause}
                      categoryId={
                        getVoiceFileDetails(allAvailableVoices, formik?.values?.declineVoiceId)
                          ?.attributes?.category_id
                      }
                      fileId={formik?.values?.declineVoiceId}
                      isInvalid={isFormFieldValid(formik, 'declineVoiceId')}
                      setShowModal={setShowModal}
                      showModal={showModal}
                    />
                    {/* {getFormErrorMessage(formik, 'declineVoiceId')} */}
                  </div>

                  {/* customer timeout IVR */}
                  <div className="mt-4">
                    <h6 className="text-secondary fw-500">
                      Play IVR, if customer callback timeout
                    </h6>
                    <CustomIVR
                      addVoice={false}
                      categoriesList={categoriesList}
                      files={voiceLibraryList}
                      setVoiceLibraryList={setVoiceLibraryList}
                      value={formik?.values?.timeoutVoiceName}
                      type="ivr-2"
                      active={active}
                      setActive={setActive}
                      onSelect={(data) => {
                        formik.setFieldValue('timeoutVoiceName', data.name);
                        formik.setFieldValue('timeoutVoiceId', data.id);
                      }}
                      loading={loading}
                      setLoading={setLoading}
                      togglePlay={togglePlay}
                      selectedVoice={selectedVoice}
                      onPause={onPause}
                      categoryId={
                        getVoiceFileDetails(allAvailableVoices, formik?.values?.timeoutVoiceId)
                          ?.attributes?.category_id
                      }
                      fileId={formik?.values?.timeoutVoiceId}
                      isInvalid={isFormFieldValid(formik, 'timeoutVoiceId')}
                      setShowModal={setShowModal}
                      showModal={showModal}
                    />
                    {/* {getFormErrorMessage(formik, 'timeoutVoiceId')} */}
                  </div>

                  <div className="timeslot-buttons mt-4 d-flex align-item-center gap-3">
                    <button
                      type="button"
                      className="save"
                      id="callback_modal_save"
                      data-bs-dismiss="modal"
                      onClick={formik.handleSubmit}
                      disabled={isDataSubmiting}
                    >
                      {isDataSubmiting ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="cancel"
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
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default CallBackModal;
