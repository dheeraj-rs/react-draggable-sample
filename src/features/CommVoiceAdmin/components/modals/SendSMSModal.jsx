import React, { useMemo } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import Checkbox from '../../../../common/components/forms/Checkbox';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function SendSMSModal({
  isVisible,
  onSelect,
  SMSSenderIDs,
  departments,
  agents,
  callersList,
  apiLibraries,
  isDataSubmiting,
}) {
  const { show, setShow } = useStore();
  let details = {};

  const SendTo = [
    { name: 'Department', type: 'department' },
    { name: 'Agent', type: 'agent' },
    { name: 'Caller list', type: 'caller-list' },
  ];

  const validate = (data) => {
    const errors = {};
    if (data.type === 'flow') {
      if (data.senderId === 'select') {
        errors.senderId = 'required';
      }

      if (data.type1 === 'department' && data.departmentIdList.length === 0) {
        errors.departmentIdList = 'required';
      }
      if (data.type1 === 'agent' && data.agentIdList.length === 0) {
        errors.agentIdList = 'required';
      }
      if (data.type1 === 'caller-list' && data.callerListIdList.length === 0) {
        errors.callerListIdList = 'required';
      }
      if (!data.message) {
        errors.message = 'required';
      }
    } else if (!data.apiId) {
      errors.apiId = 'required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      type: 'flow',
      senderId: 'select',
      type1: 'department',
      departmentIdList: [],
      agentIdList: [],
      callerListIdList: [],
      message: '',
      apiId: '',
    },
    validate,
    onSubmit: () => {
      if (formik.values.type === 'flow') {
        details = {
          type: formik.values.type,
          senderId: formik.values.senderId,
          type1: formik.values.type1,
          ...(formik.values.type1 === 'department' && {
            departmentIdList: formik.values.departmentIdList,
          }),
          ...(formik.values.type1 === 'agent' && {
            agentIdList: formik.values.agentIdList,
          }),
          ...(formik.values.type1 === 'caller-list' && {
            callerListIdList: formik.values.callerListIdList,
          }),

          message: formik.values.message,
        };
      } else {
        details = {
          type: formik.values.type,
          apiId: formik.values.apiId,
        };
      }
      // setShow({ isVisible: false, type: '' });
      onSelect({
        formik,
        prevHandleId: show?.prevHandleId,
        prevNodeId: show?.prevNodeId,
        type: 'send-sms',
        details,
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  const isKeyActive = useMemo(
    () => (name, id) => formik.values[name].includes(id),
    [formik.values]
  );

  const toggleIVRKey = (name, newId) => {
    const isValuePresent = formik.values[name].includes(newId);
    if (isValuePresent) {
      const updatedArray = formik.values[name].filter((key) => key !== newId);
      formik.setFieldValue(name, updatedArray);
    } else {
      const updatedArray = [...formik.values[name], newId];
      formik.setFieldValue(name, updatedArray);
    }
  };

  if (isVisible) {
    return (
      <>
        <Modal width="618px" id="sendSmsModal" show={isVisible}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="fs-16px text-primary fw-medium fs-16px mb-2 d-flex gap-2 align-items-center">
              <img src="/assets/call-flows-hours/Envelope.svg" alt="" />
              <p className="mb-0 fw-medium">
                <span className="text-primary">Bulk SMS</span>{' '}
              </p>
            </div>
            <ModalClose onClose={handleClose} />
          </div>
          <p className="fs-13px text-secondary mb-3">
            This component is used to send sms to agents, departments or a list of callers.
          </p>

          {/* <!-- tab starts --> */}
          <div className="tab-ticket resolve-modal mt-1">
            <ul
              className="nav nav-pills mb-3 d-flex align-items-center rounded get-value-tab w-100"
              id="pills-tab-sms"
              role="tablist"
            >
              <li
                className="nav-item new-ticket-mb border-end bg-titan-water border-transparent rounded-start"
                role="presentation"
                style={{ width: '50%' }}
              >
                <button
                  className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start ${
                    formik.values.type === 'flow' ? 'active' : ''
                  }`}
                  id="pills-sms-tab"
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
                  className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start ${
                    formik.values.type === 'url' ? 'active' : ''
                  }`}
                  id="pills-url-sms-tab"
                  type="button"
                  role="tab"
                  onClick={() => {
                    formik.setFieldValue('type', 'url');
                  }}
                >
                  <span className="d-flex align-items-center justify-content-center">
                    Control component by a API
                  </span>
                </button>
              </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active mt-4"
                id="pills-sms"
                role="tabpanel"
                aria-labelledby="pills-sms-tab"
                style={formik.values.type === 'flow' ? { display: 'block' } : { display: 'none' }}
              >
                <div className="mt-3">
                  <div className="form-group">
                    <label className="text-primary mb-1">SMS Sender ID</label>
                    <select
                      name="senderId"
                      className="form-control form-select bg-white"
                      value={formik.values.senderId}
                      onChange={formik.handleChange}
                      style={
                        isFormFieldValid(formik, 'senderId') ? { border: '1px solid red' } : {}
                      }
                    >
                      <option value="select" disabled>
                        Select
                      </option>
                      {SMSSenderIDs?.map((option, index) => (
                        <option key={index} value={option?.id}>
                          {option?.label}
                        </option>
                      ))}
                    </select>{' '}
                    {getFormErrorMessage(formik, 'senderId')}
                  </div>

                  <div className=" rounded">
                    <div className="row d-flex mt-4 mb-3 p-3 px-0 align-items-center justify-content-between ">
                      <div className="col-lg-6">
                        <label htmlFor="" className="mb-2">
                          Send to
                        </label>
                        <div className="form-group ">
                          <select
                            name="type1"
                            className="form-control form-select bg-white"
                            value={formik.values.type1}
                            onChange={formik.handleChange}
                          >
                            {SendTo?.map((option, index) => (
                              <option key={index} value={option?.type}>
                                {option?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div
                        className="col-lg-6"
                        style={
                          formik.values.type1 === 'department'
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <div className="department-dropdown">
                          <div className="select-department-content ">
                            <label className="text-primary mb-2">Select department</label>
                            <div className="dropdown input-custom select-hour-dropdown">
                              <button
                                className="select-time-slot input-custom d-flex align-items-center justify-content-between"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={
                                  isFormFieldValid(formik, 'departmentIdList')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              >
                                <p className="m-0">Department</p>
                                <img src="/assets/call-flows-hours/CaretDown.svg" alt="" />
                              </button>
                              <div className="dropdown-menu">
                                <div className="d-flex gap-3">
                                  <SearchWithBorder
                                    placeholderText="Search department"
                                    onChange={() => {}}
                                    clearBtn={() => {}}
                                  />
                                </div>
                                <ul
                                  className="w-100 mt-3"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="scroll-custom scroll-custom-flow">
                                    {departments?.map((e, index) => (
                                      <div className="mb-3" key={index}>
                                        <Checkbox
                                          title={e?.attributes?.name}
                                          id="jpg"
                                          checked={isKeyActive('departmentIdList', e.id)}
                                          onClick={() => {
                                            toggleIVRKey('departmentIdList', e.id);
                                          }}
                                          onChange={() => {}}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </ul>
                              </div>
                            </div>
                            {getFormErrorMessage(formik, 'departmentIdList')}
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-6"
                        style={
                          formik.values.type1 === 'agent'
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <div className="department-dropdown">
                          <div className="select-department-content ">
                            <label className="text-primary mb-2">Select Agent</label>
                            <div className="dropdown input-custom select-hour-dropdown">
                              <button
                                className="select-time-slot input-custom d-flex align-items-center justify-content-between"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={
                                  isFormFieldValid(formik, 'agentIdList')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              >
                                <p className="m-0">Agents</p>
                                <img src="/assets/call-flows-hours/CaretDown.svg" alt="" />
                              </button>
                              <div className="dropdown-menu">
                                <div className="d-flex gap-3">
                                  <SearchWithBorder
                                    placeholderText="Search department"
                                    onChange={() => {}}
                                    clearBtn={() => {}}
                                  />
                                </div>
                                <ul
                                  className="w-100 mt-3"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="scroll-custom scroll-custom-flow">
                                    {agents?.map((e, index) => (
                                      <div className="mb-3" key={index}>
                                        <Checkbox
                                          title={e?.attributes?.display_name}
                                          id="jpg"
                                          checked={isKeyActive('agentIdList', e.id)}
                                          onClick={() => {
                                            toggleIVRKey('agentIdList', e.id);
                                          }}
                                          onChange={() => {}}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </ul>
                              </div>
                            </div>{' '}
                            {getFormErrorMessage(formik, 'agentIdList')}
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-6"
                        style={
                          formik.values.type1 === 'caller-list'
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        <div className="department-dropdown">
                          <div className="select-department-content ">
                            <label className="text-primary mb-2">Select Caller list</label>
                            <div className="dropdown input-custom select-hour-dropdown">
                              <button
                                className="select-time-slot input-custom d-flex align-items-center justify-content-between"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={
                                  isFormFieldValid(formik, 'callerListIdList')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              >
                                <p className="m-0">Caller list</p>
                                <img src="/assets/call-flows-hours/CaretDown.svg" alt="" />
                              </button>
                              <div className="dropdown-menu">
                                <div className="d-flex gap-3">
                                  <SearchWithBorder
                                    placeholderText="Search department"
                                    onChange={() => {}}
                                    clearBtn={() => {}}
                                  />
                                </div>
                                <ul
                                  className="w-100 mt-3"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <div className="scroll-custom scroll-custom-flow">
                                    {callersList?.map((e, index) => (
                                      <div className="mb-3" key={index}>
                                        <Checkbox
                                          title={e.name}
                                          id="jpg"
                                          checked={isKeyActive('callerListIdList', e.id)}
                                          onClick={() => {
                                            toggleIVRKey('callerListIdList', e.id);
                                          }}
                                          onChange={() => {}}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </ul>
                              </div>
                            </div>
                            {getFormErrorMessage(formik, 'callerListIdList')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 d-flex alihn-items-center justify-content-between">
                    <label className="fw-medium">Message</label>
                    <div className="dropdown select-hour-dropdown ">
                      <div className="mb-2 d-flex gap-2 align-items-center flex-wrap">
                        <a
                          href="/#"
                          className="d-flex gap-2 align-items-center"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <span>
                            <img src="/assets/call-flows-hours/email-template.svg" alt="" />
                          </span>
                          <span className="color-blue-active">Choose SMS template</span>
                        </a>

                        <div className="dropdown-menu" style={{ width: '320px' }}>
                          <div className="d-flex gap-3">
                            <SearchWithBorder
                              placeholderText="Search template"
                              onChange={() => {}}
                              clearBtn={() => {}}
                            />
                            <div className="d-flex align-item-center search-actions gap-3">
                              <a
                                href="/#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add template"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <img
                                  data-bs-toggle="modal"
                                  data-bs-target="#SMSTemplate"
                                  src="/assets/call-flows-hours/add.svg"
                                  alt=""
                                />
                              </a>
                              <a
                                href="/comm-voice-admin/sms-settings/"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Manage hours"
                              >
                                <img src="/assets/book-temp.svg" alt="" />
                              </a>
                            </div>
                          </div>
                          <ul className="timeslot-list scroll-custom">
                            <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                              <div className="d-flex gap-3">
                                <span>
                                  <img src="/assets/message-text.svg" alt="" />
                                </span>
                                <span>SMS template_001</span>
                              </div>
                              <p className="mb-0">(Transactional)</p>
                            </li>
                            <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                              <div className="d-flex gap-3">
                                <span>
                                  <img src="/assets/message-text.svg" alt="" />
                                </span>
                                <span>SMS template_002</span>
                              </div>
                              <p className="mb-0">(Transactional)</p>
                            </li>
                            <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                              <div className="d-flex gap-3">
                                <span>
                                  <img src="/assets/message-text.svg" alt="" />
                                </span>
                                <span>SMS template_003</span>
                              </div>
                              <p className="mb-0">(Promotional)</p>
                            </li>
                            <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                              <div className="d-flex gap-3">
                                <span>
                                  <img src="/assets/message-text.svg" alt="" />
                                </span>
                                <span>SMS template_004</span>
                              </div>
                              <p className="mb-0">(Transactional)</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sms-message-area">
                    <div
                      className="custom-border-shadow form-control p-3 bg-white rounded-2 mb-3"
                      style={isFormFieldValid(formik, 'message') ? { border: '1px solid red' } : {}}
                    >
                      <textarea
                        id="typeSms"
                        placeholder="Type sms x"
                        className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                        name="message"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                      />

                      <div className="text-end">
                        <span className="fs-12px text-secondary">0/1000, 1 SMS</span>
                      </div>
                    </div>
                    {getFormErrorMessage(formik, 'message')}
                    <div className="d-flex gap-3 align-items-center flex-md-nowrap flex-wrap">
                      <button
                        type="button"
                        className=" add-sms-btn d-flex align-items-center justify-content-center btn bg-black text-white   border fw-medium  px-3 py-12px"
                      >
                        DLT Check
                      </button>
                      <p className=" text-chilli-pepper p-2 rounded mb-0 dlt-validation ">
                        SMS not match with any of the approved templates.
                      </p>
                    </div>
                  </div>

                  <hr />

                  <div className="addMessage add-sms-box d-none">
                    <div className="mt-3 d-flex align-items-center justify-content-between">
                      <label className="fw-medium">Message</label>
                      <div className="dropdown select-hour-dropdown ">
                        <div className="mb-2 d-flex gap-2 align-items-center flex-wrap">
                          <a
                            href="/#"
                            className="d-flex gap-2 align-items-center"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <span>
                              <img src="/assets/call-flows-hours/email-template.svg" alt="" />
                            </span>
                            <span className="color-blue-active">Choose SMS template</span>
                          </a>
                          <a
                            href="/#"
                            id="closeTemplate2"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            {' '}
                            <img src="/assets/close-black.svg" alt="" />
                          </a>
                          <div className="dropdown-menu" style={{ width: '320px' }}>
                            <div className="d-flex gap-3">
                              <SearchWithBorder
                                placeholderText="Search template"
                                onChange={() => {}}
                                clearBtn={() => {}}
                              />
                              <div className="d-flex align-item-center search-actions gap-3">
                                <a
                                  href="/#"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title="Add template"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  <img
                                    data-bs-toggle="modal"
                                    data-bs-target="#SMSTemplate"
                                    src="/assets/call-flows-hours/add.svg"
                                    alt=""
                                  />
                                </a>
                                <a
                                  href="/comm-voice-admin/sms-settings/"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title="Manage hours"
                                >
                                  <img src="/assets/book-temp.svg" alt="" />
                                </a>
                              </div>
                            </div>
                            <ul className="timeslot-list scroll-custom">
                              <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                                <div className="d-flex gap-3">
                                  <span>
                                    <img src="/assets/message-text.svg" alt="" />
                                  </span>
                                  <span>SMS template_001</span>
                                </div>
                                <p className="mb-0">(Transactional)</p>
                              </li>
                              <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                                <div className="d-flex gap-3">
                                  <span>
                                    <img src="/assets/message-text.svg" alt="" />
                                  </span>
                                  <span>SMS template_002</span>
                                </div>
                                <p className="mb-0">(Transactional)</p>
                              </li>
                              <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                                <div className="d-flex gap-3">
                                  <span>
                                    <img src="/assets/message-text.svg" alt="" />
                                  </span>
                                  <span>SMS template_003</span>
                                </div>
                                <p className="mb-0">(Promotional)</p>
                              </li>
                              <li className="d-flex align-items-center gap-3 justify-content-between flex-wrap">
                                <div className="d-flex gap-3">
                                  <span>
                                    <img src="/assets/message-text.svg" alt="" />
                                  </span>
                                  <span>SMS template_004</span>
                                </div>
                                <p className="mb-0">(Transactional)</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sms-message-area">
                      <div className="custom-border-shadow form-control p-3 bg-white rounded-2 mb-3">
                        <div
                          id="typeSms"
                          contentEditable="true"
                          data-placeholder="Type sms y"
                          className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                        />

                        <div className="text-end">
                          <span className="fs-12px text-secondary">0/1000, 1 SMS</span>
                        </div>
                      </div>
                      <div className="d-flex gap-3 align-items-center flex-md-nowrap flex-wrap">
                        <button
                          type="button"
                          className=" d-flex align-items-center justify-content-center btn bg-black text-white   border fw-medium  px-3 py-12px"
                        >
                          DLT Check
                        </button>
                        <p className=" text-chilli-pepper p-2 rounded mb-0 dlt-validation ">
                          SMS not match with any of the approved templates.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="fs-13px text-primary mt-3">
                    Use “&#123;caller&#125;” symbol for get caller number and “&#123;number&#125;”
                    for get called number.
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-3 d-none">
                    <div className="d-flex align-items-center gap-2 cursor-pointer add-sms-btn">
                      <span className="color-blue-active">
                        <img src="/assets/call-flows-hours/blue-plus.svg" alt="" />
                      </span>
                      <span className="color-blue-active">Add SMS</span>
                    </div>
                    <a
                      href="/comm-voice-admin/sms-settings/"
                      className="d-flex align-items-center gap-2 cursor-pointer"
                    >
                      <span className="color-blue-active">
                        <img src="/assets/call-flows-hours/tasks-open.svg" alt="" />
                      </span>
                      <span className="color-blue-active">Manage SMS Template</span>
                    </a>
                  </div>
                  <div className="timeslot-buttons mt-4 d-flex align-item-center gap-1">
                    <button
                      id="smsSndSave"
                      type="button"
                      className="btn bg-black d-flex align-items-center text-white px-4 py-12px"
                      onClick={formik.handleSubmit}
                      disabled={isDataSubmiting}
                    >
                      {isDataSubmiting ? 'Saving...' : 'Save'}
                    </button>
                    <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade show"
                id="pills-url-sms"
                role="tabpanel"
                aria-labelledby="pills-url-sms"
                style={formik.values.type === 'url' ? { display: 'block' } : { display: 'none' }}
              >
                <div>
                  <div className="mt-4 rounded shadow-deep p-4">
                    <div className="row gx-4">
                      <p className="fw-medium mb-0">Control component by providing API</p>
                      <div className="col-lg-12">
                        <div className="form-group mt-3">
                          <label className="text-primary mb-1">API Name</label>
                          <select
                            className="form-control form-select bg-white"
                            name="apiId"
                            value={formik.values.apiId}
                            onChange={formik.handleChange}
                            style={
                              isFormFieldValid(formik, 'apiId') ? { border: '1px solid red' } : {}
                            }
                          >
                            <option value="select" disabled>
                              Select
                            </option>

                            {apiLibraries?.length > 0 &&
                              apiLibraries?.map((option, index) => (
                                <option
                                  key={index}
                                  value={option?.id}
                                  className={formik.values.apiId === option.id ? 'active' : ''}
                                >
                                  {option?.attributes?.name}
                                </option>
                              ))}
                          </select>
                          {getFormErrorMessage(formik, 'apiId')}
                        </div>
                      </div>
                      <div className="col-lg-12 mt-2">
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Configure API
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" d-flex justify-content-start align-items-center border-0  mt-4">
                  <button
                    id="smsSndSave"
                    type="button"
                    className="addValueBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                    onClick={formik.handleSubmit}
                    disabled={isDataSubmiting}
                  >
                    {isDataSubmiting ? 'Saving...' : 'Save'}
                  </button>
                  <ButtonWhiteModalCancel text="Cancel" onClick={handleClose} />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- tab ends --> */}
        </Modal>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default SendSMSModal;
