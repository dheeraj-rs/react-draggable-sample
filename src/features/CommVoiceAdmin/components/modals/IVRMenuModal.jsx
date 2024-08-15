import React, { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import useStore from '../../../Test/store';
import '../../../../styles/scss/components/ivrModal.scss';
import CustomIVR from '../ivr/CustomIVR';
import {
  getFormErrorMessage,
  getNodeDetails,
  getVoiceFileDetails,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function IVRMenuModal({
  isVisible,
  onSelect,
  onUpdate,
  onClose,
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
  resetAudio,
  isDataSubmiting = false,
  allAvailableVoices = [],
  setShowModal,
  showModal,
}) {
  const { show, setShow, flowNodes } = useStore();

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '#', '*'];

  const validate = (data) => {
    const errors = {};

    if (data.keys?.length === 0) {
      errors.keys = 'select atleast one key';
    }
    if (data.startingIVRName === 'Select IVR') {
      errors.startingIVRName = 'required';
    }
    if (data.playIVRName1 === 'Select IVR') {
      errors.playIVRName1 = 'required';
    }
    if (data.playIVRName2 === 'Select IVR') {
      errors.playIVRName2 = 'required';
    }
    if (!data.userResponseTimeout) {
      errors.userResponseTimeout = 'required';
    }
    if (!data.initialVoiceRepeatCount) {
      errors.initialVoiceRepeatCount = 'required';
    }
    if (!data.wrongResponseVoiceRepeatCount) {
      errors.wrongResponseVoiceRepeatCount = 'required';
    }

    return errors;
  };

  const sortNumbers = (numbers = []) => {
    const customOrder = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '#', '*'];

    function customSort(a, b) {
      return customOrder.indexOf(a) - customOrder.indexOf(b);
    }

    // Sort the array using the custom comparison function
    numbers.sort(customSort);

    return numbers;
  };

  const formik = useFormik({
    initialValues: {
      keys: [],
      userResponseTimeout: 1,
      initialVoiceRepeatCount: 1,
      noResponseVoiceRepeatCount: 1,
      wrongResponseVoiceRepeatCount: 1,
      //
      startingIVRName: 'Select IVR',
      startingIVRId: '',
      //
      playIVRName1: 'Select IVR',
      playIVRId1: '',
      //
      playIVRName2: 'Select IVR',
      playIVRId2: '',
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            initialVoiceId: formik.values.startingIVRId,
            noResponseVoiceId: formik.values.playIVRId1,
            wrongResponseVoiceId: formik.values.playIVRId2,
            keys: sortNumbers(formik.values.keys),

            userResponseTimeout: formik.values.userResponseTimeout,
            initialVoiceRepeatCount: formik.values.initialVoiceRepeatCount,
            noResponseVoiceRepeatCount: formik.values.noResponseVoiceRepeatCount,
            wrongResponseVoiceRepeatCount: formik.values.wrongResponseVoiceRepeatCount,
          },
        });
      } else {
        // Generate a UUID
        const uuid = uuidv4();

        // Extract the first 4 characters from the UUID
        const uniqueId = uuid.substr(0, 4);

        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'ivr-menu',
          details: {
            initialVoiceId: formik.values.startingIVRId,
            noResponseVoiceId: formik.values.playIVRId1,
            wrongResponseVoiceId: formik.values.playIVRId2,
            keys: sortNumbers(formik.values.keys),

            userResponseTimeout: formik.values.userResponseTimeout,
            initialVoiceRepeatCount: formik.values.initialVoiceRepeatCount,
            noResponseVoiceRepeatCount: formik.values.noResponseVoiceRepeatCount,
            wrongResponseVoiceRepeatCount: formik.values.wrongResponseVoiceRepeatCount,
          },
          name: `IVR Menu-${uniqueId}`,
        });
      }
    },
  });

  const toggleIVRKey = (newIVRKey) => {
    const isValuePresent = formik.values.keys.includes(newIVRKey);
    if (isValuePresent) {
      const updatedArray = formik.values.keys.filter((key) => key !== newIVRKey);
      formik.setFieldValue('keys', updatedArray);
    } else {
      const updatedArray = [...formik.values.keys, newIVRKey];
      formik.setFieldValue('keys', updatedArray);
    }
  };

  const handleClose = () => {
    onClose();
    setVoiceLibraryList([]);
    setActive({ state: false, type: '' });
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  const isKeyActive = useMemo(
    () => (IvrKey) => formik.values.keys.includes(String(IvrKey)),
    [formik.values.keys]
  );

  useEffect(() => {
    if (
      show?.actionType === 'edit-node' &&
      show?.nodeId &&
      show?.type === 'IVR menu' &&
      allAvailableVoices?.length > 0
    ) {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('keys', nodeDetails?.details?.keys);
      formik.setFieldValue('userResponseTimeout', nodeDetails?.details?.userResponseTimeout);
      formik.setFieldValue(
        'initialVoiceRepeatCount',
        nodeDetails?.details?.initialVoiceRepeatCount
      );
      formik.setFieldValue(
        'noResponseVoiceRepeatCount',
        nodeDetails?.details?.noResponseVoiceRepeatCount
      );
      formik.setFieldValue(
        'wrongResponseVoiceRepeatCount',
        nodeDetails?.details?.wrongResponseVoiceRepeatCount
      );
      formik.setFieldValue(
        'startingIVRName',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.initialVoiceId)?.attributes
          ?.name
      );
      formik.setFieldValue('startingIVRId', nodeDetails?.details?.initialVoiceId);
      formik.setFieldValue(
        'playIVRName1',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.noResponseVoiceId)?.attributes
          ?.name
      );
      formik.setFieldValue('playIVRId1', nodeDetails?.details?.noResponseVoiceId);
      formik.setFieldValue(
        'playIVRName2',
        getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.wrongResponseVoiceId)
          ?.attributes?.name
      );
      formik.setFieldValue('playIVRId2', nodeDetails?.details?.wrongResponseVoiceId);
      // setActive({ ...active, categoryId: '', fileId: '' });
    }
  }, [show?.actionType, show?.nodeId, flowNodes, allAvailableVoices]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog ivr-modal-outer modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-body ivr-modal">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/ivr.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0 mb-2">
                      IVR Menu - <span className="text-secondary">A1</span>
                    </h5>
                  </div>
                  <span
                    className="cursor-pointer"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  An IVR menu provides interactive options and ask the user to &quot; respond &quot;
                  and hence making the decision
                </p>
                <h5 className="fs-13px mb-2 fw-normal">Starting IVR</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <CustomIVR
                        categoriesList={categoriesList}
                        files={voiceLibraryList}
                        setVoiceLibraryList={setVoiceLibraryList}
                        value={formik?.values?.startingIVRName}
                        type="starting-ivr"
                        active={active}
                        setActive={setActive}
                        onSelect={(data) => {
                          resetAudio();
                          formik.setFieldValue('startingIVRName', data.name);
                          formik.setFieldValue('startingIVRId', data.id);
                        }}
                        loading={loading}
                        setLoading={setLoading}
                        togglePlay={togglePlay}
                        selectedVoice={selectedVoice}
                        onPause={onPause}
                        categoryId={
                          getVoiceFileDetails(allAvailableVoices, formik?.values?.startingIVRId)
                            ?.attributes?.category_id
                        }
                        fileId={formik?.values?.startingIVRId}
                        isInvalid={isFormFieldValid(formik, 'startingIVRName')}
                        setShowModal={setShowModal}
                        showModal={showModal}
                      />
                      {/* {getFormErrorMessage(formik, 'startingIVRName')} */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="fs-13px text-primary fw-normal">Select the keys</p>
                    <div className="ivr-keys-outer mb-3">
                      <div className="ivr-keys-wrap gap-3 flex-wrap d-flex">
                        {keys?.map((e, index) => (
                          <div
                            key={index}
                            className={`ivr-item position-relative ${
                              isKeyActive(e) ? 'active' : ''
                            }`}
                            onClick={() => {
                              toggleIVRKey(e);
                            }}
                          >
                            <span>{e}</span>
                            <input type="checkbox" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {getFormErrorMessage(formik, 'keys')}
                  </div>

                  <div className="col-md-12">
                    <div className="ivr-repeat-outer d-flex align-items-center gap-3 mt-4 flex-wrap">
                      <p className="fs-13px text-primary m-0">If no input is given, Repeat IVR</p>
                      <input
                        type="text"
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
                      <p className="fs-13px text-primary m-0">Sec, Play IVR</p>
                      <div style={{ width: '288px' }}>
                        <CustomIVR
                          categoriesList={categoriesList}
                          files={voiceLibraryList}
                          setVoiceLibraryList={setVoiceLibraryList}
                          value={formik?.values?.playIVRName1}
                          type="play-ivr-1"
                          active={active}
                          setActive={setActive}
                          onSelect={(data) => {
                            formik.setFieldValue('playIVRName1', data.name);
                            formik.setFieldValue('playIVRId1', data.id);
                          }}
                          loading={loading}
                          setLoading={setLoading}
                          togglePlay={togglePlay}
                          selectedVoice={selectedVoice}
                          onPause={onPause}
                          categoryId={
                            getVoiceFileDetails(allAvailableVoices, formik?.values?.playIVRId1)
                              ?.attributes?.category_id
                          }
                          fileId={formik?.values?.playIVRId1}
                          isInvalid={isFormFieldValid(formik, 'playIVRName1')}
                          setShowModal={setShowModal}
                          showModal={showModal}
                        />
                        {/* {getFormErrorMessage(formik, 'playIVRName1')} */}
                      </div>
                      <p className="fs-13px text-primary m-0">and repeat the main menu</p>
                      <input
                        type="text"
                        name="initialVoiceRepeatCount"
                        onKeyPress={handleKeyPressForNumber}
                        onChange={formik.handleChange}
                        value={formik.values.initialVoiceRepeatCount}
                        maxLength={1}
                        style={
                          isFormFieldValid(formik, 'initialVoiceRepeatCount')
                            ? { border: '1px solid red' }
                            : {}
                        }
                      />
                      <p className="fs-13px text-primary m-0">times</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="ivr-repeat-outer d-flex align-items-center gap-3 flex-wrap"
                      style={{ marginTop: '-1px' }}
                    >
                      <p className="fs-13px text-primary m-0">
                        If invalid response from the customer, Play IVR
                      </p>
                      <div style={{ width: '288px' }}>
                        <CustomIVR
                          categoriesList={categoriesList}
                          files={voiceLibraryList}
                          setVoiceLibraryList={setVoiceLibraryList}
                          value={formik?.values?.playIVRName2}
                          type="play-ivr-2"
                          active={active}
                          setActive={setActive}
                          onSelect={(data) => {
                            formik.setFieldValue('playIVRName2', data.name);
                            formik.setFieldValue('playIVRId2', data.id);
                          }}
                          loading={loading}
                          setLoading={setLoading}
                          togglePlay={togglePlay}
                          selectedVoice={selectedVoice}
                          onPause={onPause}
                          categoryId={
                            getVoiceFileDetails(allAvailableVoices, formik?.values?.playIVRId2)
                              ?.attributes?.category_id
                          }
                          fileId={formik?.values?.playIVRId2}
                          isInvalid={isFormFieldValid(formik, 'playIVRName2')}
                          setShowModal={setShowModal}
                          showModal={showModal}
                        />
                        {/* {getFormErrorMessage(formik, 'playIVRName2')} */}
                      </div>
                      <p className="fs-13px text-primary m-0">and repeat the main menu</p>
                      <input
                        type="text"
                        name="wrongResponseVoiceRepeatCount"
                        onKeyPress={handleKeyPressForNumber}
                        onChange={formik.handleChange}
                        value={formik.values.wrongResponseVoiceRepeatCount}
                        maxLength={1}
                        style={
                          isFormFieldValid(formik, 'wrongResponseVoiceRepeatCount')
                            ? { border: '1px solid red' }
                            : {}
                        }
                      />{' '}
                      <p className="fs-13px text-primary m-0">times</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="timeslot-buttons mt-4 d-flex align-item-center">
                      <button
                        type="button"
                        className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                        // data-bs-dismiss="modal"
                        id="ivr-save"
                        onClick={() => {
                          formik.handleSubmit();
                        }}
                        disabled={isDataSubmiting}
                      >
                        {isDataSubmiting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-2"
                        data-bs-dismiss="modal"
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
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default IVRMenuModal;
