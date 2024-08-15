import React, { useState } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import CustomIVR from '../ivr/CustomIVR';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function QueueModal({
  isVisible,
  onSelect,
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
}) {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const { show, setShow } = useStore();

  const validate = (data) => {
    const errors = {};

    if (!data.initialVoiceId) {
      errors.initialVoiceId = 'required';
    }
    if (!data.size) {
      errors.size = 'required';
    }
    if (!data.inQueueVoiceId) {
      errors.inQueueVoiceId = 'required';
    }
    if (!data.maxWaitingTime) {
      errors.maxWaitingTime = 'required';
    }
    if (!data.canExitByKey) {
      errors.canExitByKey = 'required';
    }
    if (!data.exitKey) {
      errors.exitKey = 'required';
    }
    if (!data.playQueuePosition) {
      errors.playQueuePosition = 'required';
    }
    if (!data.waitingTimeoutVoiceId) {
      errors.waitingTimeoutVoiceId = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      initialVoiceName: 'Select IVR',
      initialVoiceId: '',
      //
      size: 10,
      inQueueVoiceName: 'Select IVR',
      inQueueVoiceId: '',
      //
      maxWaitingTime: 10,
      waitingTimeoutVoiceName: 'Select IVR',
      waitingTimeoutVoiceId: 9876,
      canExitByKey: true,
      exitKey: '*',
      playQueuePosition: true,
    },
    validate,
    onSubmit: () => {
      // setShow({ isVisible: false, type: '' });
      onSelect({
        formik,
        prevHandleId: show?.prevHandleId,
        prevNodeId: show?.prevNodeId,
        type: 'queue',
        details: {
          initialVoiceId: formik.values.initialVoiceId,
          size: formik.values.size,
          inQueueVoiceId: formik.values.inQueueVoiceId,
          maxWaitingTime: formik.values.maxWaitingTime,
          waitingTimeoutVoiceId: formik.values.waitingTimeoutVoiceId,
          canExitByKey: formik.values.canExitByKey,
          exitKey: formik.values.exitKey,
          playQueuePosition: formik.values.playQueuePosition,
        },
      });
    },
  });

  const handleClose = () => {
    setActive({ state: false, type: '' });
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  return (
    <Modal width="925px" id="queueModal" show={isVisible}>
      <div className="d-flex justify-content-between">
        <p className="fs-16px text-primary fw-medium fs-16px mb-2">
          <img className="pe-2" src="/assets/call-flows-hours/queue.svg" alt="" />
          Queue
        </p>
        <ModalClose onClose={handleClose} />
      </div>
      <p className="fs-13px text-primary mb-2">
        The Queue component used to put incoming calls into a temporary queue with a specified size.
      </p>

      <div className="row mt-3">
        <div className="col-md-6">
          <p className="my-2 text-primary fs-13px">Play this IVR before entering in to the queue</p>
          <CustomIVR
            categoriesList={categoriesList}
            files={voiceLibraryList}
            setVoiceLibraryList={setVoiceLibraryList}
            value={formik?.values?.initialVoiceName}
            type="initial-Voice-name-ivr"
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
          />
          {getFormErrorMessage(formik, 'initialVoiceId')}
        </div>
      </div>
      <div className="mt-4 rounded shadow-deep p-3">
        <div className="row gx-4 mt-2">
          <div className="col-md-6">
            <div className="mb-3 row">
              <label htmlFor="size" className="col-sm-9 col-form-label text-primary py-0">
                Queue size
                <span className="text-secondary d-block">
                  (Max. number of incoming calls in a queue)
                </span>
              </label>

              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="size"
                  name="size"
                  value={formik.values.size}
                  style={isFormFieldValid(formik, 'size') ? { border: '1px solid red' } : {}}
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage(formik, 'size')}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <label htmlFor="play" className="text-primary ">
                Play IVR
              </label>

              <div className="play-ivr-queue-component">
                <CustomIVR
                  categoriesList={categoriesList}
                  files={voiceLibraryList}
                  setVoiceLibraryList={setVoiceLibraryList}
                  value={formik?.values?.inQueueVoiceName}
                  type="inqueue-voice-id-ivr"
                  active={active}
                  setActive={setActive}
                  onSelect={(data) => {
                    formik.setFieldValue('inQueueVoiceName', data.name);
                    formik.setFieldValue('inQueueVoiceId', data.id);
                  }}
                  loading={loading}
                  setLoading={setLoading}
                  togglePlay={togglePlay}
                  selectedVoice={selectedVoice}
                  onPause={onPause}
                />
                {getFormErrorMessage(formik, 'inQueueVoiceId')}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 row">
              <label htmlFor="time" className="col-sm-9 col-form-label text-primary">
                Maximum waiting time in the queue(Min)
              </label>

              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control bg-white"
                  id="time"
                  name="maxWaitingTime"
                  value={formik.values.maxWaitingTime}
                  style={
                    isFormFieldValid(formik, 'maxWaitingTime') ? { border: '1px solid red' } : {}
                  }
                  onChange={formik.handleChange}
                />
                {getFormErrorMessage(formik, 'maxWaitingTime')}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <label htmlFor="play" className=" text-primary ">
                Play IVR
              </label>

              <div className="play-ivr-queue-component">
                <CustomIVR
                  categoriesList={categoriesList}
                  files={voiceLibraryList}
                  setVoiceLibraryList={setVoiceLibraryList}
                  value={formik?.values?.waitingTimeoutVoiceName}
                  type="waiting-timeout-voice-id-ivr"
                  active={active}
                  setActive={setActive}
                  onSelect={(data) => {
                    formik.setFieldValue('waitingTimeoutVoiceName', data.name);
                    formik.setFieldValue('waitingTimeoutVoiceId', data.id);
                  }}
                  loading={loading}
                  setLoading={setLoading}
                  togglePlay={togglePlay}
                  selectedVoice={selectedVoice}
                  onPause={onPause}
                />
                {getFormErrorMessage(formik, 'waitingTimeoutVoiceId')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded bg-seaShell p-4 mt-4">
        <div className="d-flex align-items-center gap-3">
          <div className="">
            <div className="fw-medium text-primary fs-12px">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => {}}
                  onClick={() => {
                    formik.setFieldValue('canExitByKey', !formik.values.canExitByKey);
                  }}
                  checked={formik.values.canExitByKey}
                />
                <span className="slider num-check round" />
              </label>
              <span className="ps-2 fw-normal fs-13px">
                User can exit from the queue if he press
              </span>
            </div>
          </div>
          <div className="" style={{ flexBasis: '50px' }}>
            <div className="">
              <div className="select bg-white mb-0">
                <div
                  className="selectBtn"
                  data-type="firstOption"
                  onClick={() => {
                    setIsDropDownActive(!isDropDownActive);
                  }}
                >
                  {formik.values.exitKey}
                </div>
                <div className={`selectDropdown ${isDropDownActive ? 'toggle' : ''}`}>
                  <div
                    className="option"
                    data-type="firstOption"
                    onClick={() => {
                      formik.setFieldValue('exitKey', '*');
                      setIsDropDownActive(false);
                    }}
                  >
                    *
                  </div>
                  <div
                    className="option"
                    data-type="secondOption"
                    onClick={() => {
                      formik.setFieldValue('exitKey', '.');
                      setIsDropDownActive(false);
                    }}
                  >
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">key</div>
        </div>
        <div className="row d-flex align-items-center mt-3">
          <div className="">
            <div className="fw-medium text-primary fs-12px">
              <label className="switch">
                <input
                  type="checkbox"
                  id="playCheck"
                  onChange={() => {}}
                  onClick={() => {
                    formik.setFieldValue('playQueuePosition', !formik.values.playQueuePosition);
                  }}
                  checked={formik.values.playQueuePosition}
                />
                <span className="slider num-check round" />
              </label>
              <span className="ps-2 text-primary fw-normal fs-13px">
                Play current queue positions to the customer
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
        <button
          id="addQueueBtn"
          data-bs-dismiss="modal"
          type="button"
          className="addQueueBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
          onClick={() => {
            formik.handleSubmit();
          }}
          disabled={isDataSubmiting}
        >
          {isDataSubmiting ? 'Saving...' : 'Save'}
        </button>
        <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
      </div>
    </Modal>
  );
}

export default QueueModal;
