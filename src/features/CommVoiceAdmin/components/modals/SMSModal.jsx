import React from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import SearchWithBorder from '../../../../common/components/common/SearchWithBorder';
import Modal from '../../../../common/components/modals/Modal';
import ModalClose from '../../../../common/components/modals/ModalClose';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function SMSModal({ isVisible, onSelect, templates, SMSSenderIDs, isDataSubmiting }) {
  const { show, setShow } = useStore();

  let details = {};

  const validate = (data) => {
    const errors = {};
    if (data.type === 'flow') {
      data.messages?.map((e, index) => {
        if (e === '') {
          errors[`messages-${index}`] = 'required';
        }
        return null;
      });

      if (data.senderId === 'select') {
        errors.senderId = 'required';
      }
    } else if (data.senderId === 'select') {
      errors.senderId = 'required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      type: 'flow',
      senderId: 'select',
      messages: [''],
      apiId: '',
    },
    validate,
    onSubmit: () => {
      if (formik.values.type === 'flow') {
        details = {
          type: formik.values.type,
          senderId: formik.values.senderId,
          messages: formik.values.messages,
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
        type: 'sms',
        details,
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  const updateValue = (value, index) => {
    const updatedArray = [...formik.values.messages];

    if (value) {
      updatedArray[index] = value;
    } else {
      updatedArray[index] = '';
    }

    formik.setFieldValue('messages', updatedArray);
  };

  const addNewInput = () => {
    formik.setFieldValue('messages', [...formik.values.messages, '']);
  };

  const deleteValue = (indexToDelete) => {
    const updatedArray = [...formik.values.messages];
    updatedArray.splice(indexToDelete, 1);

    formik.setFieldValue('messages', updatedArray);
  };

  const characterLength = (message) => message.length;

  if (isVisible) {
    return (
      <>
        <Modal width="618px" id="smsModal" show={isVisible}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="fs-16px text-primary fw-medium fs-16px mb-2 d-flex gap-2 align-items-center">
              <img src="/assets/call-flows-hours/Envelope.svg" alt="" />
              <p className="mb-0 fw-medium">
                {' '}
                <span className="text-primary">SMS</span>{' '}
                <span className="text-secondary">(AutoResponder)</span>{' '}
              </p>
            </div>
            <ModalClose onClose={handleClose} />
          </div>
          <p className="fs-13px text-secondary mb-3">
            The SMS component is used to send an SMS back to the caller for an incoming call.
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
                  className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-new text-primary border-end-0 fw-medium rounded-start  ${
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
                  className={`w-100 px-2 py-12px nav-link nav-voice-tab btn-ext text-primary border-start-0 fw-medium rounded-end ${
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
                className={`tab-pane fade ${
                  formik.values.type === 'flow' ? 'show' : ''
                } active mt-4`}
                id="pills-sms"
                role="tabpanel"
                aria-labelledby="pills-sms-tab"
                style={formik.values.type === 'flow' ? { display: 'block' } : { display: 'none' }}
              >
                <div className="mt-3">
                  <div className="form-group">
                    <div className="form-group mt-3">
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

                        {SMSSenderIDs?.length > 0 &&
                          SMSSenderIDs?.map((sender, index) => (
                            <option key={index} value={sender.id}>
                              {sender.label}
                            </option>
                          ))}
                      </select>
                      {getFormErrorMessage(formik, 'senderId')}
                    </div>
                  </div>

                  {formik.values.messages?.map((message, index) => {
                    if (index === 0) {
                      return (
                        <React.Fragment key={index}>
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
                                    {templates?.map((e) => (
                                      <li
                                        key={e.id}
                                        className="d-flex align-items-center gap-3 justify-content-between flex-wrap"
                                      >
                                        <div className="d-flex gap-3">
                                          <span>
                                            <img src="/assets/message-text.svg" alt="" />
                                          </span>
                                          <span>{e?.attributes?.name}</span>
                                        </div>
                                        <p className="mb-0">({e.type})</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="sms-message-area">
                            <div
                              className="custom-border-shadow form-control p-3 bg-white rounded-2 mb-3"
                              style={
                                formik.errors[`messages-${index}`]
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                            >
                              <textarea
                                id="typeSms"
                                placeholder="Type sms"
                                className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                                onChange={(e) => {
                                  updateValue(e.target.value, index);
                                }}
                                value={message}
                                maxLength={1000}
                              />

                              <div className="text-end">
                                <span className="fs-12px text-secondary">
                                  {characterLength(message)}/1000, 1 SMS
                                </span>
                              </div>
                            </div>
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
                        </React.Fragment>
                      );
                    }
                    return (
                      <div className="addMessage add-sms-box" key={index}>
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
                                id="closeTemplate"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteValue(index);
                                }}
                              >
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
                                  {templates?.map((e) => (
                                    <li
                                      key={e.id}
                                      className="d-flex align-items-center gap-3 justify-content-between flex-wrap"
                                    >
                                      <div className="d-flex gap-3">
                                        <span>
                                          <img src="/assets/message-text.svg" alt="" />
                                        </span>
                                        <span>{e?.attributes?.name}</span>
                                      </div>
                                      <p className="mb-0">({e.type})</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="sms-message-area">
                          <div
                            className="custom-border-shadow form-control p-3 bg-white rounded-2 mb-3"
                            style={
                              formik.errors[`messages-${index}`] ? { border: '1px solid red' } : {}
                            }
                          >
                            <textarea
                              id="typeSms"
                              placeholder="Type sms"
                              className="editable scroll-custom custom-text-area form-control bg-white text-black border-0  rounded-0 text-start"
                              onChange={(e) => {
                                updateValue(e.target.value, index);
                              }}
                              value={message}
                              maxLength={1000}
                            />

                            <div className="text-end">
                              <span className="fs-12px text-secondary">
                                {characterLength(message)}/1000, 1 SMS
                              </span>
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
                    );
                  })}

                  <hr />

                  <p className="fs-13px text-primary mt-3">
                    Use “&#123;caller&#125;” symbol for get caller number and “&#123;number&#125;”
                    for get called number.
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <div
                      className="d-flex align-items-center gap-2 cursor-pointer add-sms-btn"
                      onClick={() => {
                        addNewInput();
                      }}
                    >
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
                      id="sms_feedback_save_btn"
                      data-bs-dismiss="modal"
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
                className={`tab-pane ${formik.values.type === 'url' ? 'show' : ''}`}
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
                          <label className="text-primary mb-1">SMS Sender ID</label>
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

                            {SMSSenderIDs?.length > 0 &&
                              SMSSenderIDs?.map((sender, index) => (
                                <option key={index} value={sender.id}>
                                  {sender.label}
                                </option>
                              ))}
                          </select>
                          {getFormErrorMessage(formik, 'senderId')}
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
                    id="smsAPISave"
                    data-bs-dismiss="modal"
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

export default SMSModal;
