import React from 'react';
import Checkbox from '../../../../common/components/forms/Checkbox';
import CheckboxTick from '../../../../common/components/forms/CheckBoxTick';
import CustomIVR from '../ivr/CustomIVR';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function ConnectDepartment({
  show,
  categoriesList,
  files,
  formik,
  active,
  setActive,
  callRecordingTypeList,
  setVoiceLibraryList,
  loading,
  setLoading,
  togglePlay,
  selectedVoice,
  onPause,
  apiLibraries = [],
  setShowModal,
  showModal,
}) {
  return (
    <div id="connect-department-outer" className={show ? '' : 'd-none'}>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="lock-agent">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="fs-13px fw-600 m-0">Lock Agent</h6>
              <CheckboxTick
                onChange={() => {}}
                onClick={() => {
                  formik.setFieldValue('lockAgent', !formik.values.lockAgent);
                }}
                checked={formik.values.lockAgent}
              />
            </div>
            <p className="fs-13px text-secondary my-2">
              Connect to the last spoken agent with the customer.
            </p>
            <div className="d-flex align-items-center">
              <Checkbox
                onChange={() => {}}
                onClick={() => {
                  formik.setFieldValue(
                    'doNotTransferIfLockedAgentBusy',
                    !formik.values.doNotTransferIfLockedAgentBusy
                  );
                }}
                checked={formik.values.doNotTransferIfLockedAgentBusy}
              />
              <p className="fs-13px text-primary m-0">
                Do not transfer call if locked agent is busy{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="call-recording">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="fs-13px fw-600 m-0">Call Recording</h6>
              <CheckboxTick
                onChange={() => {}}
                checked={formik.values.callRecordingEnabled}
                onClick={() => {
                  formik.setFieldValue('callRecordingEnabled', !formik.values.callRecordingEnabled);
                }}
              />
            </div>
            <p className="fs-13px text-secondary my-2">
              Select which end do you want to enable record
            </p>
            <div className="call-recording-dropdown">
              <div className="dropdown position-relative">
                <button
                  className=""
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={
                    isFormFieldValid(formik, 'callRecordingType') ? { border: '1px solid red' } : {}
                  }
                >
                  <span>{formik.values.callRecordingType.name}</span>
                </button>
                <img
                  className="connect-dropdown-caret"
                  src="/assets/call-flows-hours/CaretDown.svg"
                  alt=""
                />
                <div className="dropdown-menu connect-component-flew-main-form-inner-dropdown-menu">
                  <ul>
                    {callRecordingTypeList?.map((e, index) => (
                      <li
                        key={index}
                        className={`department ${
                          formik.values.callRecordingType.type === e.type ? 'active' : ''
                        }`}
                        onClick={() => {
                          formik.setFieldValue('callRecordingType', { type: e.type, name: e.name });
                        }}
                      >
                        {e.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {getFormErrorMessage(formik, 'callRecordingType')}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="call-duration">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="fs-13px fw-600 m-0">Call Duration</h6>
              <CheckboxTick
                onChange={() => {}}
                onClick={() => {
                  formik.setFieldValue('duration', !formik.values.duration);
                }}
                checked={formik.values.duration}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="mb-2" htmlFor="">
                  Ring duration (s)
                </label>
                <input
                  type="text"
                  placeholder="0"
                  name="ringDuration"
                  value={formik.values.ringDuration}
                  onChange={formik.handleChange}
                  onKeyPress={handleKeyPressForNumber}
                  style={
                    isFormFieldValid(formik, 'ringDuration') ? { border: '1px solid red' } : {}
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="mb-2" htmlFor="">
                  Conversation duration (s)
                </label>
                <input
                  type="text"
                  placeholder="0"
                  name="conversationDuration"
                  value={formik.values.conversationDuration}
                  onChange={formik.handleChange}
                  onKeyPress={handleKeyPressForNumber}
                  style={
                    isFormFieldValid(formik, 'conversationDuration')
                      ? { border: '1px solid red' }
                      : {}
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="call-duration">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="fs-13px fw-600 m-0">Push Dialog</h6>
              <CheckboxTick
                onChange={() => {}}
                checked={formik.values.pushDialog}
                onClick={() => {
                  formik.setFieldValue('pushDialog', !formik.values.pushDialog);
                }}
              />
            </div>
            <p className="my-2 text-primary fs-13px">
              Create a popup in your CRM. Host below URL on your server.
            </p>
            <div className="form-group mt-3">
              <select
                name="popupApiId"
                className="form-control form-select bg-white"
                value={formik.values.popupApiId}
                onChange={formik.handleChange}
                style={isFormFieldValid(formik, 'popupApiId') ? { border: '1px solid red' } : {}}
              >
                <option value="" disabled>
                  Select
                </option>

                {apiLibraries?.length > 0 &&
                  apiLibraries?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.attributes?.name}
                    </option>
                  ))}
              </select>
              {getFormErrorMessage(formik, 'popupApiId')}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <p className="my-2 text-primary fs-13px">Play background music when call connecting</p>
          <CustomIVR
            categoriesList={categoriesList}
            files={files}
            setVoiceLibraryList={setVoiceLibraryList}
            value={formik?.values?.musicWhenCallConnecting}
            type="connecting-ivr"
            active={active}
            setActive={setActive}
            onSelect={(data) => {
              formik.setFieldValue('musicWhenCallConnecting', data.name);
              formik.setFieldValue('musicWhenCallConnectingId', data.id);
            }}
            loading={loading}
            setLoading={setLoading}
            togglePlay={togglePlay}
            selectedVoice={selectedVoice}
            onPause={onPause}
            isInvalid={isFormFieldValid(formik, 'musicWhenCallConnecting')}
            setShowModal={setShowModal}
            showModal={showModal}
          />
          {/* {getFormErrorMessage(formik, 'musicWhenCallConnecting')} */}
        </div>
        <div className="col-md-6">
          <p className="my-2 text-primary fs-13px">Play background music when call on Hold</p>
          <CustomIVR
            categoriesList={categoriesList}
            files={files}
            setVoiceLibraryList={setVoiceLibraryList}
            value={formik?.values?.musicWhenCallOnHold}
            type="hold-ivr"
            active={active}
            setActive={setActive}
            onSelect={(data) => {
              formik.setFieldValue('musicWhenCallOnHold', data.name);
              formik.setFieldValue('musicWhenCallOnHoldId', data.id);
            }}
            loading={loading}
            setLoading={setLoading}
            togglePlay={togglePlay}
            selectedVoice={selectedVoice}
            onPause={onPause}
            isInvalid={isFormFieldValid(formik, 'musicWhenCallOnHold')}
            setShowModal={setShowModal}
            showModal={showModal}
          />
          {/* {getFormErrorMessage(formik, 'musicWhenCallOnHold')} */}
        </div>
      </div>
    </div>
  );
}

export default ConnectDepartment;
