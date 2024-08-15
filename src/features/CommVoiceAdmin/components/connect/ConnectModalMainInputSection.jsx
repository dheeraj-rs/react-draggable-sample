import React from 'react';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';

function ConnectModalMainInputSection({ formik, departments = [], agents = [] }) {
  const callToOptions = [
    { name: 'Department', type: 'department' },
    { name: 'Agent', type: 'agent' },
    { name: 'Number', type: 'number' },
    { name: 'Fetch phone from url', type: 'number-from-url' },
  ];

  const allocationMethods = [
    { name: 'Uniform', type: 'uniform' },
    { name: 'Round robin', type: 'round-robin' },
  ];
  return (
    <div className="connect-component-flew-main-form" id="department">
      <div className="connect-component-flew-main-form-inner">
        <label htmlFor="" className="mb-2">
          Make a call to
        </label>
        <div className="dropdown position-relative">
          <button className="" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span>{formik.values.callToType?.name}</span>
          </button>
          <img
            className="connect-dropdown-caret"
            src="/assets/call-flows-hours/CaretDown.svg"
            alt=""
          />
          <div className="dropdown-menu connect-component-flew-main-form-inner-dropdown-menu">
            <ul>
              {callToOptions.map((item, index) => (
                <li
                  className={item.name === formik.values.callToType?.name ? 'active' : ''}
                  key={index}
                  onClick={() => {
                    formik.setFieldValue('callToType', { name: item.name, type: item.type });
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {formik.values.callToType?.type === 'department' && (
        <>
          <div className="connect-component-flew-main-form-inner">
            <label htmlFor="" className="mb-2">
              Select department
            </label>
            <div className="dropdown position-relative">
              <button
                className=""
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={isFormFieldValid(formik, 'departmentId') ? { border: '1px solid red' } : {}}
              >
                <span>{formik?.values?.departmentName || 'Select department'}</span>
              </button>
              <img
                className="connect-dropdown-caret"
                src="/assets/call-flows-hours/CaretDown.svg"
                alt=""
              />
              <div className="dropdown-menu">
                <ul className="mt-3">
                  {departments?.map((e, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        formik.setFieldValue('departmentName', e?.attributes?.name);
                        formik.setFieldValue('departmentId', e.id);
                      }}
                      // className="d-flex align-items-center"
                      className={`d-flex align-items-center ${
                        formik.values.departmentId === e.id ? 'active' : ''
                      }`}
                    >
                      {e?.attributes?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {getFormErrorMessage(formik, 'department')}
          </div>
          <div className="connect-component-flew-main-form-inner">
            <label htmlFor="" className="mb-2">
              Call allocation method
            </label>
            <div className="dropdown position-relative">
              <button
                className="d-flex gap-3 align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>{formik.values.allocationMethod.name}</span>
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Assign the call to all members in the group equally regardless they appear."
                >
                  <img src="/assets/call-flows-hours/info.svg" alt="" />
                </span>
              </button>
              <img
                className="connect-dropdown-caret"
                src="/assets/call-flows-hours/CaretDown.svg"
                alt=""
              />
              <div className="dropdown-menu connect-component-flew-main-form-inner-dropdown-menu">
                <ul>
                  {allocationMethods.map((item, index) => (
                    <li
                      key={index}
                      className={`${
                        formik.values.allocationMethod.type === item.type ? 'active' : ''
                      }`}
                      onClick={() => {
                        formik.setFieldValue('allocationMethod', {
                          name: item.name,
                          type: item.type,
                        });
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {formik.values.callToType?.type === 'agent' && (
        <div className="connect-component-flew-main-form-inner">
          <label className="mb-2" htmlFor="">
            Select agent
          </label>
          <div className="dropdown position-relative">
            <button
              className=""
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={isFormFieldValid(formik, 'agentId') ? { border: '1px solid red' } : {}}
            >
              <span>{formik.values.agentName || 'Select agent'}</span>
            </button>
            <img
              className="connect-dropdown-caret"
              src="/assets/call-flows-hours/CaretDown.svg"
              alt=""
            />
            <div className="dropdown-menu">
              <ul className="mt-3">
                {agents?.map((e, index) => (
                  <li
                    key={index}
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
        </div>
      )}

      {formik.values.callToType?.type === 'number' && (
        <div className="connect-component-flew-main-form-inner">
          <label className="mb-2" htmlFor="">
            Enter number
          </label>
          <div className="dropdown">
            <button className="d-flex gap-3 align-items-center" type="button">
              {/* <span>91 9845324500</span> */}
              <input
                type="text"
                placeholder="91 xxxxxxxxxx"
                onKeyPress={handleKeyPressForNumber}
                style={{ border: 'transparent', height: '90%', width: '100%' }}
                maxLength="12"
                onChange={(e) => {
                  formik.setFieldValue('number', e.target.value);
                }}
                value={formik.values.number}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectModalMainInputSection;
