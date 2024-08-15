import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import useStore from '../../../Test/store';
import ModalClose from '../../../../common/components/modals/ModalClose';
import CustomIVR from '../ivr/CustomIVR';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import {
  getNodeDetails,
  getVoiceFileDetails,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function GetValueModalNew({
  isVisible,
  onSelect,
  onUpdate,
  categoriesList,
  voiceLibraryList,
  setVoiceLibraryList,
  active,
  setActive,
  setLoading,
  togglePlay,
  selectedVoice,
  onPause,
  apiLibraries = [],
  isDataSubmiting,
  loading = false,
  allAvailableVoices = [],
  setShowModal,
  showModal,
}) {
  let details = {};

  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (data.type === 'flow') {
      if (!data.initialVoiceId) {
        errors.initialVoiceId = 'required';
      }
      if (!data.completionKey) {
        errors.completionKey = 'required';
      }
      if (!data.maxDigitsAllowed) {
        errors.maxDigitsAllowed = 'required';
      }
      if (!data.timeInterval) {
        errors.timeInterval = 'required';
      }
      if (!data.timeIntervalVoiceId) {
        errors.timeIntervalVoiceId = 'required';
      }
      if (!data.repeatCount) {
        errors.repeatCount = 'required';
      }
      if (!data.repeatVoiceId) {
        errors.repeatVoiceId = 'required';
      }
      if (!data.userResponseTimeout) {
        errors.userResponseTimeout = 'required';
      }
      if (!data.noResponseVoiceId) {
        errors.noResponseVoiceId = 'required';
      }
    }
    if (data.type === 'url') {
      if (data.apiId === '') {
        errors.apiId = 'required';
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      type: 'flow',
      initialVoiceName: 'Select IVR',
      initialVoiceId: '',
      //
      completionKey: '#',
      maxDigitsAllowed: 127,
      timeInterval: 5,
      timeIntervalVoiceId: '',
      timeIntervalVoiceName: 'Select IVR',
      repeatCount: 5,
      repeatVoiceId: '',
      repeatVoiceName: 'Select IVR',
      userResponseTimeout: 15,
      noResponseVoiceId: '',
      noResponseVoiceName: 'Select IVR',
      apiId: '',
      fallbackURL: 'select',
      primaryURL: 'select',
    },
    validate,
    onSubmit: () => {
      if (formik.values.type === 'flow') {
        details = {
          type: formik.values.type,
          initialVoiceId: formik.values.initialVoiceId,
          completionKey: formik.values.completionKey,
          maxDigitsAllowed: formik.values.maxDigitsAllowed,
          timeInterval: formik.values.timeInterval,
          timeIntervalVoiceId: formik.values.timeIntervalVoiceId,
          repeatCount: formik.values.repeatCount,
          repeatVoiceId: formik.values.repeatVoiceId,
          userResponseTimeout: formik.values.userResponseTimeout,
          noResponseVoiceId: formik.values.noResponseVoiceId,
        };
      } else {
        details = { type: formik.values.type, apiId: formik.values.apiId };
      }

      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details,
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'get-value',
          details,
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
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'get-value') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('type', nodeDetails?.details?.type);
      if (nodeDetails?.details?.type === 'flow') {
        formik.setFieldValue(
          'initialVoiceName',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.initialVoiceId)?.attributes
            ?.name || 'Select IVR'
        );
        formik.setFieldValue('initialVoiceId', nodeDetails?.details?.initialVoiceId);

        formik.setFieldValue('completionKey', nodeDetails?.details?.completionKey);
        formik.setFieldValue('maxDigitsAllowed', nodeDetails?.details?.maxDigitsAllowed);
        formik.setFieldValue('timeInterval', nodeDetails?.details?.timeInterval);
        formik.setFieldValue('timeIntervalVoiceId', nodeDetails?.details?.timeIntervalVoiceId);
        formik.setFieldValue(
          'timeIntervalVoiceName',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.timeIntervalVoiceId)
            ?.attributes?.name || 'Select IVR'
        );
        formik.setFieldValue('repeatCount', nodeDetails?.details?.repeatCount);

        formik.setFieldValue('repeatVoiceId', nodeDetails?.details?.repeatVoiceId);
        formik.setFieldValue(
          'repeatVoiceName',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.repeatVoiceId)?.attributes
            ?.name || 'Select IVR'
        );

        formik.setFieldValue('userResponseTimeout', nodeDetails?.details?.userResponseTimeout);

        formik.setFieldValue('noResponseVoiceId', nodeDetails?.details?.noResponseVoiceId);
        formik.setFieldValue(
          'noResponseVoiceName',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.noResponseVoiceId)
            ?.attributes?.name || 'Select IVR'
        );
      }
      if (nodeDetails?.details?.type === 'url') {
        formik.setFieldValue('apiId', parseInt(nodeDetails?.details?.apiId, 10));
      }
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          width="941px"
          // id="getValueModal"
          className="modal fade show"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog ivr-modal-outer modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body ivr-modal">
                <div className="d-flex justify-content-between">
                  <p className="fs-16px text-primary fw-medium fs-16px mb-2">
                    <img className="pe-2" src="/call-flows-hours/getValue.svg" alt="" />
                    Get Value
                  </p>
                  <ModalClose onClose={handleClose} />
                </div>
                <p className="fs-13px text-secondary mb-3">
                  The Get Value component allows you to take numeric information from the user when
                  they are pressing something on their keypads.{' '}
                </p>

                {/* <!-- tab starts --> */}
                <div className="tab-ticket resolve-modal mt-1">
                  <ul
                    className="nav nav-pills mb-3 d-flex align-items-center rounded get-value-tab"
                    id="pills-tab-feedback"
                    role="tablist"
                  >
                    <li
                      className="nav-item new-ticket-mb border-end bg-titan-water border-transparent rounded-start"
                      role="presentation"
                      style={{ width: '50%' }}
                    >
                      <button
                        className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start ${
                          formik.values.type === 'flow' ? 'active ' : ''
                        }`}
                        id="pills-flow-tab"
                        type="button"
                        role="tab"
                        onClick={() => {
                          formik.setFieldValue('type', 'flow');
                        }}
                      >
                        <span> Control component by the flow</span>
                      </button>
                    </li>

                    <li
                      className="nav-item new-ticket-mb bg-titan-water border-transparent rounded-end"
                      role="presentation"
                      style={{ width: '50%' }}
                    >
                      <button
                        className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-ext text-primary border-start-0 fw-medium rounded-end ${
                          formik.values.type === 'url' ? 'active ' : ''
                        }`}
                        id="pills-url-comp-tab"
                        type="button"
                        role="tab"
                        onClick={() => {
                          formik.setFieldValue('type', 'url');
                        }}
                      >
                        <span className="d-flex align-items-center justify-content-center">
                          Control component by a URL
                        </span>
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active mt-4"
                      // id="pills-flow"
                      // role="tabpanel"
                      // aria-labelledby="pills-flow-tab"
                      style={
                        formik.values.type === 'flow' ? { display: 'block' } : { display: 'none' }
                      }
                    >
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <p className="my-2 text-primary fs-13px">
                            Play this IVR before entering in to the queue
                          </p>
                          <CustomIVR
                            categoriesList={categoriesList}
                            files={voiceLibraryList}
                            setVoiceLibraryList={setVoiceLibraryList}
                            value={formik?.values?.initialVoiceName}
                            type="initial-voic-ivr"
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
                            isInvalid={isFormFieldValid(formik, 'initialVoiceId')}
                            setShowModal={setShowModal}
                            showModal={showModal}
                          />
                          {/* {getFormErrorMessage(formik, 'initialVoiceId')} */}
                        </div>
                        <div className="rounded bg-seaShell p-3 mt-4">
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-6 mb-lg-0 mb-3">
                              <div className="row align-items-center">
                                <label
                                  htmlFor="complete"
                                  className="col-sm-10 col-form-label text-primary "
                                >
                                  Complete the user entry followed by the below key{' '}
                                </label>

                                <div className="col-sm-2">
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    id="complete"
                                    name="completionKey"
                                    onChange={formik.handleChange}
                                    value={formik.values.completionKey}
                                    style={
                                      isFormFieldValid(formik, 'completionKey')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  />
                                  {/* {getFormErrorMessage(formik, 'completionKey')} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="row align-items-center">
                                <label
                                  htmlFor="maxDigit"
                                  className="col-sm-9 col-form-label text-primary "
                                >
                                  Maximum number digits allowed
                                </label>

                                <div className="col-sm-2">
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    id="maxDigit"
                                    name="maxDigitsAllowed"
                                    value={formik.values.maxDigitsAllowed}
                                    onChange={formik.handleChange}
                                    style={
                                      isFormFieldValid(formik, 'maxDigitsAllowed')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                    onKeyPress={handleKeyPressForNumber}
                                  />
                                  {/* {getFormErrorMessage(formik, 'maxDigitsAllowed')} */}
                                </div>
                                <div className="col-sm-1 align-middle">
                                  <a
                                    href="/#"
                                    data-bs-toggle="tooltip"
                                    data-bs-title="Gsoft will stop collecting new digits as soon as it reaches the number of digits specified or # is pressed"
                                  >
                                    <img src="/assets/Info-blue.svg" alt="information" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 rounded shadow-deep p-3">
                          <div className="row gx-4 mt-4 align-items-center">
                            <div className="col-lg-6">
                              <div className="mb-3 row align-items-center">
                                <label
                                  htmlFor="size"
                                  className="col-sm-10 col-form-label text-primary py-0"
                                >
                                  Time interval between each digit entry should be (Sec)
                                </label>

                                <div className="col-sm-2">
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    id="digit"
                                    name="timeInterval"
                                    onKeyPress={handleKeyPressForNumber}
                                    onChange={formik.handleChange}
                                    value={formik.values.timeInterval}
                                    maxLength={1}
                                    style={
                                      isFormFieldValid(formik, 'timeInterval')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  />
                                  {/* {getFormErrorMessage(formik, 'timeInterval')} */}
                                </div>
                              </div>
                              <div className="mb-3 row align-items-center">
                                <label
                                  htmlFor="time"
                                  className="col-sm-10 col-form-label text-primary py-0"
                                >
                                  How many times will repeat this menu to the user if no input has
                                  given
                                </label>

                                <div className="col-sm-2">
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    id="repeat"
                                    name="repeatCount"
                                    onKeyPress={handleKeyPressForNumber}
                                    onChange={formik.handleChange}
                                    value={formik.values.repeatCount}
                                    maxLength={1}
                                    style={
                                      isFormFieldValid(formik, 'repeatCount')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  />
                                  {/* {getFormErrorMessage(formik, 'repeatCount')} */}
                                </div>
                              </div>
                              <div className="mb-3 row align-items-center">
                                <label
                                  htmlFor="time"
                                  className="col-sm-10 col-form-label text-primary py-0"
                                >
                                  Total inactivity time(Sec){' '}
                                </label>

                                <div className="col-sm-2">
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    id="inactivity"
                                    name="userResponseTimeout"
                                    onKeyPress={handleKeyPressForNumber}
                                    onChange={formik.handleChange}
                                    value={formik.values.userResponseTimeout}
                                    maxLength={1}
                                    style={
                                      isFormFieldValid(formik, 'userResponseTimeout')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  />
                                  {/* {getFormErrorMessage(formik, 'userResponseTimeout')} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3 d-flex align-items-center justify-content-between ">
                                <label htmlFor="play" className="text-primary">
                                  Play IVR
                                </label>

                                <div className="play-ivr-queue-component">
                                  <CustomIVR
                                    categoriesList={categoriesList}
                                    files={voiceLibraryList}
                                    setVoiceLibraryList={setVoiceLibraryList}
                                    value={formik?.values?.timeIntervalVoiceName}
                                    type="timeInterval-ivr"
                                    active={active}
                                    setActive={setActive}
                                    onSelect={(data) => {
                                      formik.setFieldValue('timeIntervalVoiceName', data.name);
                                      formik.setFieldValue('timeIntervalVoiceId', data.id);
                                    }}
                                    loading={loading}
                                    setLoading={setLoading}
                                    togglePlay={togglePlay}
                                    selectedVoice={selectedVoice}
                                    onPause={onPause}
                                    isInvalid={isFormFieldValid(formik, 'timeIntervalVoiceId')}
                                    setShowModal={setShowModal}
                                    showModal={showModal}
                                  />
                                  {/* {getFormErrorMessage(formik, 'timeIntervalVoiceId')} */}
                                </div>
                              </div>
                              <div className="mb-3 d-flex align-items-center justify-content-between ">
                                <label htmlFor="play" className="text-primary">
                                  Play IVR
                                </label>

                                <div className="play-ivr-queue-component">
                                  <CustomIVR
                                    categoriesList={categoriesList}
                                    files={voiceLibraryList}
                                    setVoiceLibraryList={setVoiceLibraryList}
                                    value={formik?.values?.repeatVoiceName}
                                    type="repeat-ivr"
                                    active={active}
                                    setActive={setActive}
                                    onSelect={(data) => {
                                      formik.setFieldValue('repeatVoiceName', data.name);
                                      formik.setFieldValue('repeatVoiceId', data.id);
                                    }}
                                    loading={loading}
                                    setLoading={setLoading}
                                    togglePlay={togglePlay}
                                    selectedVoice={selectedVoice}
                                    onPause={onPause}
                                    isInvalid={isFormFieldValid(formik, 'repeatVoiceId')}
                                    setShowModal={setShowModal}
                                    showModal={showModal}
                                  />
                                  {/* {getFormErrorMessage(formik, 'repeatVoiceId')}{' '} */}
                                </div>
                              </div>
                              <div className="mb-3 d-flex align-items-center justify-content-between ">
                                <label htmlFor="play" className="text-primary ">
                                  Play IVR
                                </label>

                                <div className="play-ivr-queue-component">
                                  <CustomIVR
                                    categoriesList={categoriesList}
                                    files={voiceLibraryList}
                                    setVoiceLibraryList={setVoiceLibraryList}
                                    value={formik?.values?.noResponseVoiceName}
                                    type="noResponse-ivr"
                                    active={active}
                                    setActive={setActive}
                                    onSelect={(data) => {
                                      formik.setFieldValue('noResponseVoiceName', data.name);
                                      formik.setFieldValue('noResponseVoiceId', data.id);
                                    }}
                                    loading={loading}
                                    setLoading={setLoading}
                                    togglePlay={togglePlay}
                                    selectedVoice={selectedVoice}
                                    onPause={onPause}
                                    isInvalid={isFormFieldValid(formik, 'noResponseVoiceId')}
                                    setShowModal={setShowModal}
                                    showModal={showModal}
                                  />
                                  {/* {getFormErrorMessage(formik, 'noResponseVoiceId')}{' '} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" d-flex justify-content-start align-items-center border-0 mt-4">
                        <button
                          id="addValueBtn"
                          data-bs-dismiss="modal"
                          type="button"
                          className="addValueBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                          onClick={() => {
                            formik.handleSubmit();
                          }}
                          disabled={isDataSubmiting}
                        >
                          {isDataSubmiting ? 'Saving...' : 'Save'}
                        </button>
                        <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
                      </div>
                    </div>

                    <div
                      className="tab-pane active mt-4"
                      id="pills-url-comp"
                      role="tabpanel"
                      aria-labelledby="pills-url-comp"
                      style={
                        formik.values.type === 'url' ? { display: 'block' } : { display: 'none' }
                      }
                    >
                      <div>
                        <div
                          className="mt-4 rounded shadow-deep p-4"
                          style={formik.values.type === 'url' ? {} : { display: 'none' }}
                        >
                          <div className="row gx-4">
                            <p className="fw-medium mb-0">Control component by providing URL</p>
                            <div className="col-lg-6">
                              <label className="text-primary mb-1" htmlFor="url">
                                Primary URL
                              </label>
                              <select
                                name="apiId"
                                className="form-control form-select bg-white"
                                value={formik.values.apiId}
                                onChange={formik.handleChange}
                                style={
                                  isFormFieldValid(formik, 'apiId')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              >
                                <option value="" disabled>
                                  Select
                                </option>

                                {apiLibraries?.length > 0 &&
                                  apiLibraries?.map((option, index) => (
                                    <option
                                      key={index}
                                      value={option.id}
                                      className={formik.values.apiId === option.id ? 'active' : ''}
                                    >
                                      {option?.attributes?.name}
                                    </option>
                                  ))}
                              </select>
                              {/* {getFormErrorMessage(formik, 'apiId')} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" d-flex justify-content-start align-items-center border-0  mt-4">
                        <button
                          id=""
                          data-bs-dismiss="modal"
                          type="button"
                          className="addValueBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                          onClick={() => {
                            formik.handleSubmit();
                          }}
                          disabled={isDataSubmiting}
                        >
                          {isDataSubmiting ? 'Saving...' : 'Save'}
                        </button>
                        <ButtonWhiteModalCancel
                          text="Cancel"
                          onClick={() => {
                            handleClose();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- tab ends --> */}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default GetValueModalNew;
