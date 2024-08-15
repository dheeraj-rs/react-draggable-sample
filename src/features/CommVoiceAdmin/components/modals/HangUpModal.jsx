import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import '../../../../styles/scss/components/hangupModal.scss';
import CustomIVR from '../ivr/CustomIVR';
import RadioButtonCircleUnchecked from '../../../../common/components/forms/RadioButtonCircleUnchecked';
import SmsTemplateModalWithPagination from './SmsTemplateModalWithPagination';
import {
  getFormErrorMessage,
  getNodeDetails,
  getVoiceFileDetails,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function HangUpModal({
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
  SMSSenderID,
  isDataSubmiting,
  allAvailableVoices = [],
  setShowModal,
  showModal,
}) {
  const [isSmsTemplateModalVisible, setSsSmsTemplateModalVisible] = useState(false);

  const [isSmsTemplateActive, setIsSmsTemplateActive] = useState(false);

  let details = {};

  const rating = {};

  const { show, setShow, flowNodes } = useStore();

  const characterLength = (message) => message.length;

  const validate = (data) => {
    const errors = {};

    if (data.feedbackRequired === true && data.feedbackType === 'sms') {
      // if (!data.voiceId) {
      //   errors.voiceId = 'required';
      // }
      if (!data.rating) {
        errors.rating = 'required';
      }
      if (!data.timeout) {
        errors.timeout = 'required';
      }
      if (data.senderId === 'select') {
        errors.senderId = 'required';
      }
      if (!data.message) {
        errors.message = 'required';
      }
    }

    if (data.feedbackRequired === true && data.feedbackType === 'feedback') {
      if (!data.voiceId) {
        errors.voiceId = 'required';
      }

      if (!data.timeout) {
        errors.timeout = 'required';
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      feedbackRequired: false,
      feedbackType: 'sms',
      senderName: '',
      senderId: 'select',
      message: '',
      voiceName: 'Select IVR',
      voiceId: '',
      rating: {},
      timeout: 10,
      keyList: [{ key: '', value: '' }],
    },
    validate,
    onSubmit: () => {
      formik.values.keyList?.map((e, index) => {
        rating[index] = e;
        return rating;
      });

      if (formik.values.feedbackRequired === false) {
        details = { feedbackRequired: false };
      }
      if (formik.values.feedbackRequired === true) {
        details = {
          feedbackRequired: true,
          feedbackType: formik.values.feedbackType,
          senderId: formik.values.senderId,
          message: formik.values.message,
          voiceName: formik.values.voiceName,
          voiceId: formik.values.voiceId,
          rating: formik.values.rating,
          timeout: formik.values.timeout,
          keyList: formik.values.keyList,
        };
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
          type: 'hang-up',
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

  const updateValue = (value, name, index) => {
    const updatedArray = [...formik.values.keyList];

    updatedArray[index][name] = value;

    formik.setFieldValue('keyList', updatedArray);
  };

  const addNewInput = () => {
    formik.setFieldValue('keyList', [...formik.values.keyList, { key: '', value: '' }]);
  };

  const deleteValue = (indexToDelete) => {
    const updatedArray = [...formik.values.keyList];
    updatedArray.splice(indexToDelete, 1);

    formik.setFieldValue('keyList', updatedArray);
  };
  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'hang-up') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);

      formik.setFieldValue('feedbackRequired', nodeDetails?.details?.feedbackRequired);
      if (nodeDetails?.details?.feedbackRequired === true) {
        formik.setFieldValue('feedbackType', nodeDetails?.details?.feedbackType);
        formik.setFieldValue(
          'voiceName',
          getVoiceFileDetails(allAvailableVoices, nodeDetails?.details?.voiceId)?.attributes
            ?.name || 'Select IVR'
        );
        formik.setFieldValue('voiceId', nodeDetails?.details?.voiceId);
        formik.setFieldValue('senderName', nodeDetails?.details?.acceptKey);
        formik.setFieldValue('senderId', nodeDetails?.details?.senderId);
        formik.setFieldValue('message', nodeDetails?.details?.message);

        formik.setFieldValue('rating', nodeDetails?.details?.rating);

        formik.setFieldValue('timeout', nodeDetails?.details?.timeout);
        formik.setFieldValue('keyList', nodeDetails?.details?.keyList);
      }
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

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
          <div className="modal-dialog hang-up-modal-outer">
            <div className="modal-content">
              <div className="modal-body hang-up-modal">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/hangUp.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Hang-Up</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The Hang-up component helps you to terminate a call flow or terminate with a
                  feedback at any point you want.
                </p>
                <div className="row mb-4">
                  <div className="col-md-6 mt-3 pe-md-0">
                    <div
                      className={`hang-up-radio-outer hang-up-radio-outer-one p-3 ${
                        formik.values.feedbackRequired === false ? 'active' : ''
                      }`}
                      onClick={() => {
                        formik.setFieldValue('feedbackRequired', false);
                      }}
                    >
                      <RadioButtonCircleUnchecked
                        id="hang-up-radio-one"
                        name="hang-up-radio"
                        title="Simple Hang-Up"
                        checked
                        onClick={() => {}}
                      />
                      <span className="d-block text-center">Simple Hang-Up </span>
                    </div>
                  </div>
                  <div className="col-md-6 mt-3 ps-md-0">
                    <div
                      className={`hang-up-radio-outer hang-up-radio-outer-two p-3 ${
                        formik.values.feedbackRequired === true ? 'active' : ''
                      }`}
                      onClick={() => {
                        formik.setFieldValue('feedbackRequired', true);
                      }}
                    >
                      <RadioButtonCircleUnchecked
                        id="hang-up-radio-two"
                        name="hang-up-radio"
                        title="Hang-Up with Feedback"
                        checked
                        onClick={() => {}}
                      />
                      <span
                        className="d-block text-center"
                        onClick={() => {
                          formik.setFieldValue('feedbackRequired', false);
                        }}
                      >
                        Hang-Up with Feedback
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    className={`hangup-text-1 mt-3 ${
                      formik.values.feedbackRequired === false ? '' : 'd-none'
                    }`}
                  >
                    Call will be terminate immediately.
                  </p>
                  <div
                    className={`hangup-text-2 mt-3 ${
                      formik.values.feedbackRequired === true ? '' : 'd-none'
                    }`}
                  >
                    <div className="d-flex align-items-center gap-4">
                      <div className="">
                        <div className="">
                          <input
                            id="sms-feedback"
                            className="gs-radio"
                            name="feedback-radio"
                            type="radio"
                            checked={formik.values.feedbackType === 'sms'}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor="sms-feedback"
                            className="radio-tick-label text-primary"
                            onClick={() => {
                              formik.setFieldValue('feedbackType', 'sms');
                            }}
                          >
                            SMS feedBack
                          </label>
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <input
                            id="ivr-feedback"
                            className="gs-radio"
                            name="feedback-radio"
                            type="radio"
                            checked={formik.values.feedbackType === 'feedback'}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor="ivr-feedback"
                            className="radio-tick-label text-primary"
                            onClick={() => {
                              formik.setFieldValue('feedbackType', 'feedback');
                            }}
                          >
                            IVR feedBack
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* ################### sms feedback ######################### */}
                    <div
                      className={`sms-feedback-contents mt-4 ${
                        formik.values.feedbackType === 'sms' ? '' : 'd-none'
                      }`}
                    >
                      <div>
                        <div className="form-group mt-3">
                          <label htmlFor="" className="mb-3">
                            SMS Sender ID
                          </label>
                          <select
                            name="senderId"
                            className="form-control form-select bg-white"
                            value={formik.values.senderId}
                            onChange={formik.handleChange}
                            style={
                              isFormFieldValid(formik, 'senderId')
                                ? { border: '1px solid red' }
                                : {}
                            }
                          >
                            <option value="select" disabled>
                              Select
                            </option>

                            {SMSSenderID?.length > 0 &&
                              SMSSenderID?.map((option, index) => (
                                <option key={index} value={option?.id}>
                                  {option?.label}
                                </option>
                              ))}
                          </select>{' '}
                          {getFormErrorMessage(formik, 'senderId')}
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`hangup-template-btn d-flex align-items-center justify-content-center gap-2 border-0 rounded w-100 bg-white bg-titan-water-hover py-2 mt-3 color-blue-active ${
                          isSmsTemplateActive ? 'd-none' : ''
                        }`}
                        style={{
                          boxShadow:
                            '0px 3px 3px 0px rgba(64, 78, 94, 0.10), 0px 1px 5px 0px rgba(0, 0, 0, 0.25)',
                        }}
                        onClick={() => {
                          setIsSmsTemplateActive(true);
                          setSsSmsTemplateModalVisible(true);
                        }}
                      >
                        <img src="/assets/call-flows-hours/email-template.svg" alt="" />
                        Choose SMS template
                      </button>
                      <div
                        className="selected-template mt-3 "
                        style={isSmsTemplateActive ? { display: 'block' } : { display: 'none' }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-2 cursor-pointer">
                          <span>SMS Body</span>
                          <span
                            className="d-flex align-items-center color-blue-active template-remove"
                            onClick={() => {
                              formik.setFieldValue('message', '');
                              setIsSmsTemplateActive(false);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                d="M12.5 4.16992L3.5 13.348"
                                stroke="#2D50C8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12.5 13.348L3.5 4.16992"
                                stroke="#2D50C8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Remove
                          </span>
                        </div>
                        <div className="rounded p-3" style={{ border: '1px solid #AFB5BF' }}>
                          <p>{formik.values.message}</p>
                          <div className="fw-500 text-end">
                            {characterLength(formik.values.message)}/1000, 1 SMS
                          </div>
                        </div>
                      </div>
                      {getFormErrorMessage(formik, 'message')}
                      <div className="d-flex align-items-center justify-content-between">
                        <span>Use “{}” symbol for get variable values.</span>
                        <span className="d-flex align-items-center gap-2 justify-content-end color-blue-active mt-3">
                          <img src="/assets/call-flows-hours/tasks-open.svg" alt="" />
                          Manage template
                        </span>
                      </div>
                    </div>
                    {/* ################### sms feedback ends ######################### */}

                    {/* ################### ivr feedback starts ######################### */}
                    <div
                      className={`ivr-template-content mt-3 ${
                        formik.values.feedbackType === 'feedback' ? '' : 'd-none'
                      }`}
                    >
                      <label htmlFor="" className="mb-2">
                        Play IVR
                      </label>
                      <CustomIVR
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
                        isInvalid={isFormFieldValid(formik, 'voiceId')}
                        setShowModal={setShowModal}
                        showModal={showModal}
                      />
                      {getFormErrorMessage(formik, 'voiceId')}

                      <div className="d-flex align-items-center mt-3">
                        <div style={{ flexBasis: '100px' }} className="pe-2">
                          Select Key
                        </div>
                        <div style={{ flexBasis: 'calc(100% - 128px)' }}>Feedback statement</div>
                        <div style={{ flexBasis: '28px' }} className="ps-2" />
                      </div>

                      {formik.values.keyList?.map((e, ind) => (
                        <div className="d-flex align-items-center mt-3" key={ind}>
                          <div style={{ flexBasis: '100px' }} className="pe-2">
                            <div className="form-group ">
                              <select
                                name=""
                                className="form-control form-select bg-white"
                                value={e.key || 'select'}
                                style={
                                  isFormFieldValid(formik, 'message')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                                onChange={(event) => {
                                  updateValue(event.target.value, 'key', ind);
                                }}
                              >
                                <option value="select" disabled>
                                  Select
                                </option>

                                {[1, 2, 3, 4, 5, 6, 7]?.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div style={{ flexBasis: 'calc(100% - 128px)' }}>
                            <input
                              type="text"
                              className="form-control bg-white"
                              placeholder="Type statement "
                              value={e.value}
                              onChange={(event) => {
                                updateValue(event.target.value, 'value', ind);
                              }}
                            />
                          </div>
                          <div style={{ flexBasis: '28px' }} className="ps-2">
                            <div
                              className="cursor-pointer d-flex align-items-center justify-content-center bg-black-hover"
                              style={{
                                background: '#8190B7',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                              }}
                              onClick={() => {
                                deleteValue(ind);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M2.5332 2.21484L7.5957 7.27707"
                                  stroke="white"
                                  strokeWidth="1.3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2.5332 7.27707L7.5957 2.21484"
                                  stroke="white"
                                  strokeWidth="1.3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="d-flex align-items-center mt-3">
                        <div style={{ flexBasis: '100px' }} className="pe-2">
                          <div
                            className="px-2 py-3 text-center rounded"
                            style={{ background: '#EBEFFF' }}
                          >
                            Invalid
                          </div>
                        </div>
                        <div style={{ flexBasis: 'calc(100% - 128px)' }}>
                          <div className="px-3 py-3 rounded" style={{ background: '#EBEFFF' }}>
                            Hang-Up automatically
                          </div>
                        </div>
                        <div style={{ flexBasis: '28px' }} className="ps-2" />
                      </div>

                      <div
                        className="add-key color-blue-active d-flex align-items-center gap-3 mt-3 cursor-pointer"
                        onClick={addNewInput}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="16"
                          viewBox="0 0 15 16"
                          fill="none"
                        >
                          <rect
                            x="0.5"
                            y="14.6016"
                            width="14"
                            height="14"
                            rx="7"
                            transform="rotate(-90 0.5 14.6016)"
                            stroke="#645DF6"
                          />
                          <path
                            d="M8.03571 3.85156V7.06585L11.25 7.06585V8.13728H8.03571V11.3516H6.96429V8.13728H3.75L3.75 7.06585H6.96429V3.85156H8.03571Z"
                            fill="#645DF6"
                          />
                        </svg>
                        Add Key
                      </div>

                      <div className="bg-seaShell p-4 rounded d-flex align-items-center gap-3 flex-wrap mt-3">
                        <p className="m-0">Time out if the caller doesn’t input any value in</p>
                        <div>
                          <input
                            type="text"
                            className="form-control bg-white"
                            name="timeout"
                            onChange={formik.handleChange}
                            value={formik.values.timeout}
                            style={
                              isFormFieldValid(formik, 'timeout')
                                ? { border: '1px solid red', width: '71px' }
                                : { width: '71px' }
                            }
                            onKeyPress={handleKeyPressForNumber}
                          />
                          {getFormErrorMessage(formik, 'timeout')}
                        </div>
                        <p className="m-0">Sec.</p>
                      </div>
                    </div>
                    {/* ################### ivr feedback ends ######################### */}
                  </div>
                </div>
                <div className="timeslot-buttons mt-5 d-flex align-item-center gap-2">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                    id="hangUp_save"
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
        <SmsTemplateModalWithPagination
          isVisible={isSmsTemplateModalVisible}
          setSsSmsTemplateModalVisible={setSsSmsTemplateModalVisible}
          formik={formik}
        />
      </>
    );
  }
}

export default HangUpModal;
