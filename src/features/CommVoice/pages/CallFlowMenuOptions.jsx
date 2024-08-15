/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import SideNavFlow from '../components/SideNavFlow';
import CheckBoxCheck from '../components/CheckboxCheck';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';

function CallFlowMenuOptions() {
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [show, setShow] = useState({ isVisible: false, type: '' });

  function validate(data) {
    const errors = {};
    if (data.optionType === 'contact-save') {
      if (data.callToType === '') {
        errors.callToType = ' please select at least one option';
      }
      if (data.callAllocationType === '') {
        errors.callAllocationType = 'please select at least one option';
      }
      if (data.callRecordingType === '') {
        errors.callRecordingType = 'please select at least one option';
      }
      if (data.callAllocationType === 'uniform') {
        if (!data.uniformText) {
          errors.uniformText = 'please enter a value for uniform';
        }
      } else if (data.callAllocationType === 'roundRobin') {
        if (!data.roundRobinText) {
          errors.roundRobinText = 'please enter a value for round robin';
        }
      }
    } else if (data.optionType === 'sms-save') {
      if (data.dltType === '') {
        errors.dltType = 'please select at least one option';
      }
      if (data.dltType === 'serviceImplicit') {
        if (!data.serviceImplicitInput) {
          errors.serviceImplicitInput = 'please enter a value for service implicit ';
        }
        if (!data.serviceImplicitTextArea) {
          errors.serviceImplicitTextArea = 'please enter a value for  service implicit description';
        }
      }
      if (data.dltType === 'transactional') {
        if (!data.transactionalInput) {
          errors.transactionalInput = 'please enter a value for transactional';
        }
        if (!data.transactionalTextArea) {
          errors.transactionalTextArea = 'please enter a value for  transactional description';
        }
      }
      if (data.dltType === 'serviceExplicit') {
        if (!data.serviceExplicitInput) {
          errors.serviceExplicitInput = 'please enter a value for service explicit ';
        }
        if (!data.serviceExplicitTextArea) {
          errors.serviceExplicitTextArea = 'please enter a value for  service explicit description';
        }
      }
      if (data.dltType === 'promotional') {
        if (!data.promotionalInput) {
          errors.promotionalInput = 'please enter a value for promotional';
        }
        if (!data.promotionalTextArea) {
          errors.promotionalTextArea = 'please enter a value for  promotional description';
        }
      }
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      optionType: '',
      callToType: '',
      promotionalInput: '',
      promotionalTextArea: '',
      serviceImplicitTextArea: '',
      serviceImplicitInput: '',
      transactionalTextArea: '',
      transactionalInput: '',
      serviceExplicitTextArea: '',
      serviceExplicitInput: '',
      callAllocationType: '',
      callRecordingType: '',
      dltType: '',
      uniformText: '',
      roundRobinText: '',
    },
    validate,

    onSubmit: async () => {
      if (formik.values.optionType === 'contact-save') {
        setToastAction({
          isVisible: true,
          message: 'Connect Options has been saved successfully.',
          type: 'success',
        });
        if (formik.values.optionType === 'contact-save') {
          formik.setFieldValue('callToType', '');
          formik.setFieldValue('callRecordingType', '');
          formik.setFieldValue('callAllocationType', '');
          formik.setFieldValue('uniformText', '');
          formik.setFieldValue('roundRobinText', '');
          await clearErrors();
        }
        setShow({ isVisible: false, type: '' });
      }
      if (formik.values.optionType === 'sms-save') {
        setToastAction({
          isVisible: true,
          message: 'SMS Options has been saved successfully.',
          type: 'success',
        });
        if (formik.values.optionType === 'sms-save') {
          formik.setFieldValue('dltType', '');
          formik.setFieldValue('serviceImplicitInput', '');
          formik.setFieldValue('serviceImplicitTextArea', '');
          formik.setFieldValue('transactionalInput', '');
          formik.setFieldValue('transactionalTextArea', '');
          formik.setFieldValue('serviceExplicitInput', '');
          formik.setFieldValue('serviceExplicitTextArea', '');
          formik.setFieldValue('promotionalInput', '');
          formik.setFieldValue('promotionalTextArea', '');
          await clearErrors();
        }
        setShow({ isVisible: false, type: '' });
      }
    },
  });
  const clearErrors = async () => {
    if (formik.values.optionType === 'contact-save') {
      formik.setFieldError('callToType', '');
      formik.setFieldError('callRecordingType', '');
      formik.setFieldError('callAllocationType', '');
      formik.setFieldError('uniformText', '');
      formik.setFieldError('roundRobinText', '');
      formik.setFieldValue('optionType', '');
    }
    if (formik.values.optionType === 'sms-save') {
      formik.setFieldError('dltType', '');
      formik.setFieldError('serviceImplicitInput', '');
      formik.setFieldError('serviceImplicitTextArea', '');
      formik.setFieldError('transactionalInput', '');
      formik.setFieldError('transactionalTextArea', '');
      formik.setFieldError('serviceExplicitInput', '');
      formik.setFieldError('serviceExplicitTextArea', '');
      formik.setFieldError('promotionalInput', '');
      formik.setFieldError('promotionalTextArea', '');
      formik.setFieldValue('optionType', '');
    }
  };

  return (
    <Layout
      title="comm voice"
      headerTitle="Settings"
      favIcon="/assets/favIcons/favicon-voice.ico"
      sideNavIcon="/assets/sidenav/comm-voice-logo.svg"
    >
      <div className="wrapper d-flex flex-column flex-lg-row gap-0 gap-lg-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
        <div className="col-lg-12 ps-lg-0">
          <div className="row h-100">
            <div className="col-12">
              <div className="row gx-0 bg-white rounded content-area">
                <div id="headerVoice" className="d-none d-lg-block">
                  <div className="col-lg-12">
                    <div className="bg-white rounded p-3 w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link to="/comm-voice-admin/call-flows" className="d-block d-lg-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-voice-admin/call-flows"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Flows Settings</h4>
                              <div className="text-secondary fs-13px mb-0">
                                Configure call flow components and related settings
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="headerVoiceMob" className="d-block d-lg-none">
                  <div className="col-lg-12">
                    <div className="bg-white rounded px-3 pt-4 w-100">
                      <div className="row align-items-center">
                        <div className="col-lg-12 col-sm-12">
                          <div className="d-flex gap-2 align-items-start">
                            <Link
                              id="voiceHeaderMainMob"
                              to="/comm-telephony/call-flow-admin/call-flow-admin-mobile/"
                            >
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <Link to="/#" id="voiceHeaderMob" className="d-none">
                              <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                            </Link>
                            <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                              <Link
                                to="/comm-telephony/call-flow-admin/call-flow-admin-mobile/"
                                className="d-flex justify-content-center"
                              >
                                <img src="/assets/leftback.svg" alt="" />
                              </Link>
                            </div>
                            <div className="d-flex flex-column">
                              <h4 className="fs-16px text-black fw-medium">Menu Options</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-12 right-sec-voice d-lg-block d-none">
                  <div className="bg-tranparent rounded-top border-0 fs-12px p-3  pe-2">
                    <div className="border-0 shadow-6 rounded bg-white">
                      <div className="scroll-custom scroll-admin-left">
                        <div>
                          <SideNavFlow active={2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="voice-expand" className="col-lg-9 col-sm-12">
                  <div className="scroll-custom scroll-carrier carrier-pad">
                    <div className="shadow-6  rounded mt-3 mb-2 p-3">
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row mb-lg-0">
                        <div className="col-sm-6">
                          <div className="d-flex gap-1 flex-column">
                            <h6 className="mb-0">Menu Options</h6>
                            <p className="mb-0 text-secondary">
                              <span className="fw-medium text-primary fs-12px ">17</span> Components
                              available
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-md-end gap-3">
                          <a
                            href="/#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            // data-bs-toggle="modal"
                            // data-bs-target="#PublishTemplate"
                            aria-controls="PublishTemplate"
                            id="PublishTemplateId"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                          >
                            Publish
                          </a>
                        </div>
                      </div>
                      <div className="con">
                        <div className="connect-component bg-cyan-blue p-4 rounded mt-3">
                          <h6>Connect Component</h6>
                          <p className="">
                            Choose menu options for connect component configurations.
                          </p>

                          <div className="row mt-4">
                            <div className="col-lg-4">
                              <h6 className="mb-3">Make a Call To</h6>
                              <div className="mb-3">
                                <CheckBoxCheck
                                  title="Department"
                                  id="department"
                                  checked={formik.values.callToType === 'department'}
                                  onClick={() => {
                                    formik.setFieldValue('callToType', 'department');
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <CheckBoxCheck
                                  title="Agent"
                                  id="agent"
                                  checked={formik.values.callToType === 'agent'}
                                  onClick={() => {
                                    formik.setFieldValue('callToType', 'agent');
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <CheckBoxCheck
                                  title="Number"
                                  id="number"
                                  checked={formik.values.callToType === 'number'}
                                  onClick={() => {
                                    formik.setFieldValue('callToType', 'number');
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <CheckBoxCheck
                                  title="Fetch phone number from URL"
                                  id="fetchPhone"
                                  checked={formik.values.callToType === 'fetchPhone'}
                                  onClick={() => {
                                    formik.setFieldValue('callToType', 'fetchPhone');
                                  }}
                                />
                              </div>
                              <span style={{ color: 'red' }}>
                                {getFormErrorMessage(formik, 'callToType')}
                              </span>
                            </div>
                            <div className="col-lg-5">
                              <h6 className="mb-3">Call Allocation Method</h6>

                              <div className="mb-3">
                                <CheckBoxCheck
                                  title="Uniform"
                                  id="uniform"
                                  checked={formik.values.callAllocationType === 'uniform'}
                                  onClick={() => {
                                    formik.setFieldValue('callAllocationType', 'uniform');
                                  }}
                                />
                              </div>

                              <textarea
                                id="uniformText"
                                rows="3"
                                cols="50"
                                className="uniform-textara"
                                value={formik.values.uniformText}
                                onChange={formik.handleChange}
                                name="uniformText"
                                style={
                                  isFormFieldValid(formik, 'uniformText')
                                    ? { border: '1px solid red', borderRadius: '8px' }
                                    : { border: '' }
                                }
                                placeholder="Assign the call to all members in the group, But the agent take in round robin manner."
                              >
                                Assign the call to all members in the group, But the agent takes it
                                in a round-robin manner.
                              </textarea>
                              <span style={{ color: 'red' }}>
                                {' '}
                                {getFormErrorMessage(formik, 'uniformText')}
                              </span>

                              <div className="mb-3 mt-3">
                                <CheckBoxCheck
                                  title="Round Robin"
                                  id="roundRobin"
                                  checked={formik.values.callAllocationType === 'roundRobin'}
                                  onClick={() => {
                                    formik.setFieldValue('callAllocationType', 'roundRobin');
                                  }}
                                />
                              </div>

                              <textarea
                                id="roundRobinText"
                                rows="3"
                                cols="50"
                                className="uniform-textara"
                                value={formik.values.roundRobinText}
                                onChange={formik.handleChange}
                                name="roundRobinText"
                                style={
                                  isFormFieldValid(formik, 'roundRobinText')
                                    ? { border: '1px solid red', borderRadius: '8px' }
                                    : { border: '' }
                                }
                                placeholder=" Assign the call to all members in the group, But the agent take in
                                round robin manner."
                              >
                                Assign the call to all members in the group, But the agent take in
                                round robin manner.
                              </textarea>
                              <span style={{ color: 'red' }}>
                                {getFormErrorMessage(formik, 'callAllocationType')}
                                {getFormErrorMessage(formik, 'roundRobinText')}
                              </span>
                            </div>
                            <div className="col-lg-3">
                              <h6 className="mb-3">Call Recording</h6>

                              <div className="mb-3">
                                <CheckBoxCheck
                                  checked={formik.values.callRecordingType === 'customerSide'}
                                  onClick={() => {
                                    formik.setFieldValue('callRecordingType', 'customerSide');
                                  }}
                                  title="Customer side"
                                  id="customerSide"
                                />
                              </div>
                              <div className="mb-3">
                                <CheckBoxCheck
                                  checked={formik.values.callRecordingType === 'agentSide'}
                                  onClick={() => {
                                    formik.setFieldValue('callRecordingType', 'agentSide');
                                  }}
                                  title="Agent side"
                                  id="agentSide"
                                />
                              </div>
                              <div className="mb-3">
                                <CheckBoxCheck
                                  checked={formik.values.callRecordingType === 'bothSide'}
                                  onClick={() => {
                                    formik.setFieldValue('callRecordingType', 'bothSide');
                                  }}
                                  title="Both side"
                                  id="bothSide"
                                />
                              </div>
                              <span style={{ color: 'red' }}>
                                {getFormErrorMessage(formik, 'callRecordingType')}
                              </span>
                            </div>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mt-5 ">
                            <button
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                              id="saveConnectbtn"
                              type="button"
                              onClick={async () => {
                                await formik.setFieldValue('optionType', 'contact-save');

                                formik.handleSubmit();
                              }}
                            >
                              Save
                            </button>
                            <button
                              // to="/chat-widget/new-widget/"
                              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                              type="button"
                              onClick={async () => {
                                formik.setFieldValue('callToType', '');
                                formik.setFieldValue('callRecordingType', '');
                                formik.setFieldValue('callAllocationType', '');
                                formik.setFieldValue('uniformText', '');
                                formik.setFieldValue('roundRobinText', '');
                                if (formik.values.optionType === 'contact-save') {
                                  await clearErrors();
                                }
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>

                        <div className="connect-component bg-cyan-blue p-4 rounded mt-3 mb-3">
                          <h6 className="text-primary">SMS</h6>
                          <p className="text-secondary">
                            Choose menu options for SMS component configurations.
                          </p>

                          <div className="row mt-4">
                            <h6 className="mb-3">DLT Template Type options</h6>
                            <div className="col-lg-6">
                              <div className="d-flex gap-2 align-items-start mb-4">
                                <div className="mb-3">
                                  <CheckBoxCheck
                                    title=""
                                    id="serviceImplicit"
                                    checked={formik.values.dltType === 'serviceImplicit'}
                                    onClick={() => {
                                      formik.setFieldValue('dltType', 'serviceImplicit');
                                    }}
                                  />
                                </div>

                                <div className="d-flex flex-column gap-3">
                                  <input
                                    type="text"
                                    id="serviceImplicitInput"
                                    className="form-control bg-white"
                                    value={formik.values.serviceImplicitInput}
                                    onChange={formik.handleChange}
                                    name="serviceImplicitInput"
                                    style={
                                      isFormFieldValid(formik, 'serviceImplicitInput')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Service Implicit - Transactional"
                                  />
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'serviceImplicitInput')}
                                  </span>

                                  <textarea
                                    id="serviceImplicitTextArea"
                                    rows="3"
                                    cols="50"
                                    className="uniform-textara"
                                    value={formik.values.serviceImplicitTextArea}
                                    onChange={formik.handleChange}
                                    name="serviceImplicitTextArea"
                                    style={
                                      isFormFieldValid(formik, 'serviceImplicitTextArea')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Use for send OTP, information message booking and order alerts.
                                    Not for marketing"
                                  >
                                    Use for send OTP, information message booking and order alerts.
                                    Not for marketing
                                  </textarea>
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'serviceImplicitTextArea')}
                                  </span>
                                </div>
                              </div>

                              <div className="d-flex gap-2 align-items-start">
                                <div className="mb-3">
                                  <CheckBoxCheck
                                    title=""
                                    id="transactional"
                                    checked={formik.values.dltType === 'transactional'}
                                    onClick={() => {
                                      formik.setFieldValue('dltType', 'transactional');
                                    }}
                                  />
                                </div>

                                <div className="d-flex flex-column gap-3">
                                  <input
                                    type="text"
                                    className="form-control bg-white"
                                    id="transactionalInput"
                                    value={formik.values.transactionalInput}
                                    onChange={formik.handleChange}
                                    name="transactionalInput"
                                    style={
                                      isFormFieldValid(formik, 'transactionalInput')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Transactional (For banking OTP) - Transactional"
                                  />
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'transactionalInput')}
                                  </span>

                                  <textarea
                                    id="transactionalTextArea"
                                    rows="3"
                                    cols="50"
                                    className="uniform-textara"
                                    value={formik.values.transactionalTextArea}
                                    onChange={formik.handleChange}
                                    name="transactionalTextArea"
                                    style={
                                      isFormFieldValid(formik, 'transactionalTextArea')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Use for send OTPs from the banks for any transactions"
                                  >
                                    Use for send OTPs from the banks for any transactions
                                  </textarea>
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'transactionalTextArea')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="d-flex gap-2 align-items-start mb-4">
                                <div className="mb-3">
                                  <CheckBoxCheck
                                    title=""
                                    id="serviceExplicit"
                                    checked={formik.values.dltType === 'serviceExplicit'}
                                    onClick={() => {
                                      formik.setFieldValue('dltType', 'serviceExplicit');
                                    }}
                                  />
                                </div>

                                <div className="d-flex flex-column gap-3">
                                  <input
                                    type="text"
                                    id="serviceExplicitInput"
                                    className="form-control bg-white"
                                    value={formik.values.serviceExplicitInput}
                                    onChange={formik.handleChange}
                                    name="serviceExplicitInput"
                                    style={
                                      isFormFieldValid(formik, 'serviceExplicitInput')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Service Explicit -  Transactional Opt-In"
                                  />
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'serviceExplicitInput')}
                                  </span>

                                  <textarea
                                    id="serviceExplicitTextArea"
                                    rows="3"
                                    cols="50"
                                    className="uniform-textara"
                                    value={formik.values.serviceExplicitTextArea}
                                    onChange={formik.handleChange}
                                    name="serviceExplicitTextArea"
                                    style={
                                      isFormFieldValid(formik, 'serviceExplicitTextArea')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder=" Use for send offers and updates on the services which customer
                                    using"
                                  >
                                    Use for send offers and updates on the services which customer
                                    using
                                  </textarea>
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'serviceExplicitTextArea')}
                                  </span>
                                </div>
                              </div>

                              <div className="d-flex gap-2 align-items-start">
                                <div className="mb-3">
                                  <CheckBoxCheck
                                    title=""
                                    id="promotional"
                                    checked={formik.values.dltType === 'promotional'}
                                    onClick={() => {
                                      formik.setFieldValue('dltType', 'promotional');
                                    }}
                                  />
                                </div>

                                <div className="d-flex flex-column gap-3">
                                  <input
                                    type="text"
                                    id="promotionalInput"
                                    className="form-control bg-white"
                                    value={formik.values.promotionalInput}
                                    onChange={formik.handleChange}
                                    name="promotionalInput"
                                    style={
                                      isFormFieldValid(formik, 'promotionalInput')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Promotional - Promotional"
                                  />
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'promotionalInput')}
                                  </span>

                                  <textarea
                                    id="promotionalTextArea"
                                    rows="3"
                                    cols="50"
                                    className="uniform-textara"
                                    value={formik.values.promotionalTextArea}
                                    onChange={formik.handleChange}
                                    name="promotionalTextArea"
                                    style={
                                      isFormFieldValid(formik, 'promotionalTextArea')
                                        ? { border: '1px solid red', borderRadius: '8px' }
                                        : { border: '' }
                                    }
                                    placeholder="Use for send offers, discounts and promotions. May or may not validate any response."
                                  >
                                    Use for send offers, discounts and promotions. May or may not
                                    validate any response.
                                  </textarea>
                                  <span style={{ color: 'red' }}>
                                    {getFormErrorMessage(formik, 'promotionalTextArea')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span style={{ color: 'red' }}>
                              {getFormErrorMessage(formik, 'dltType')}
                            </span>

                            <div className="setting-buttons d-flex align-items-end mt-5 ">
                              <button
                                className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                                id="saveSmsBtn"
                                type="button"
                                onClick={async () => {
                                  await formik.setFieldValue('optionType', 'sms-save');

                                  formik.handleSubmit();
                                }}
                              >
                                Save
                              </button>
                              <button
                                to="/chat-widget/new-widget/"
                                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                                type="button"
                                onClick={async () => {
                                  // formik.resetForm();
                                  formik.setFieldValue('dltType', '');
                                  formik.setFieldValue('serviceImplicitInput', '');
                                  formik.setFieldValue('serviceImplicitTextArea', '');
                                  formik.setFieldValue('transactionalInput', '');
                                  formik.setFieldValue('transactionalTextArea', '');
                                  formik.setFieldValue('serviceExplicitInput', '');
                                  formik.setFieldValue('serviceExplicitTextArea', '');
                                  formik.setFieldValue('promotionalInput', '');
                                  formik.setFieldValue('promotionalTextArea', '');
                                  if (formik.values.optionType === 'sms-save') {
                                    await clearErrors();
                                  }
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
              </div>
            </div>
          </div>

          {toastAction.type === 'success' ? (
            <ToastSuccess
              id="publishToastMsg"
              onClose={() => {
                setToastAction({ isVisible: false, message: '' });
              }}
              showToast={toastAction?.isVisible}
            >
              <span>{toastAction?.message}</span>
            </ToastSuccess>
          ) : (
            <ToastError
              id="publishToastMsg"
              onClose={() => {
                setToastAction({ isVisible: false, message: '' });
              }}
              showToast={toastAction?.isVisible}
              isSuccess={false}
            >
              <span>{toastAction?.message}</span>
            </ToastError>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CallFlowMenuOptions;
