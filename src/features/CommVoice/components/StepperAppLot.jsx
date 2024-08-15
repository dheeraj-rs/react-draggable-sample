/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import Input from '../../../common/components/forms/Input';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import CheckBoxCheck from '../../../common/components/common/CheckBoxCheck';
import TextArea from '../../../common/components/forms/TextArea';
import {
  getFormErrorMessage,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../common/helpers/utils';

function LotDetails({
  formik,
  unpaginatedBatches = [],
  unpaginatedLocalSwitches = [],
  unpaginatedNumberPlans = [],
  isAttachBatchDisabled,
}) {
  const params = useParams();

  const [searchKey, setSearchKey] = useState('');

  const [allAvilableLocalSwitch, setAllAvilableLocalSwitch] = useState([]);

  const [isAllSwitchSelected, setIsAllSwitchSelected] = useState(false);

  const [searchResult, setSearchResult] = useState([]);

  const toggleValue = (selectedId) => {
    const index = formik.values.localSwitch.findIndex((obj) => obj.id === selectedId);

    if (index === -1) {
      formik.setFieldValue('localSwitch', [
        ...formik.values.localSwitch,
        { type: 'telephony_vendor_local_switches', id: parseInt(selectedId, 10) },
      ]);
    } else {
      const newArray = [...formik.values.localSwitch];
      newArray.splice(index, 1);
      formik.setFieldValue('localSwitch', newArray);
    }
  };

  const removeItemFromLocalSwitch = (idToRemove) => {
    const updatedArray = formik.values.localSwitch.filter(
      (obj) => parseInt(obj.id, 10) !== idToRemove
    );
    formik.setFieldValue('localSwitch', updatedArray);
  };

  useEffect(() => {
    if (params?.id) {
      formik.setFieldValue('batchId', parseInt(params?.id, 10));
    }
  }, [params?.id]);

  useEffect(() => {
    if (params?.type === 'edit') {
      setIsAllSwitchSelected(
        formik.values.localSwitch?.length === unpaginatedLocalSwitches?.length
      );
    }
  }, [params?.type]);

  useEffect(() => {
    unpaginatedLocalSwitches?.map((localSwitch) => {
      setAllAvilableLocalSwitch((prevArray) => [
        ...prevArray,
        {
          type: 'telephony_vendor_local_switches',
          id: parseInt(localSwitch?.id, 10),
        },
      ]);
      return null;
    });
  }, [unpaginatedLocalSwitches]);

  useEffect(() => {
    if (searchKey) {
      const result = unpaginatedNumberPlans.filter((plan) => {
        return plan?.attributes?.name?.toLowerCase().includes(searchKey?.toLowerCase());
      });
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  }, [searchKey, unpaginatedNumberPlans]);
  return (
    <>
      <div className="row gx-5">
        <div className="col-lg-6 col-sm-6 mt-3">
          <Input
            label="Lot name"
            id="lotName"
            placeholder="-Enter Lot Name-"
            type="text"
            name="lotName"
            onChange={formik.handleChange}
            value={formik?.values?.lotName}
            style={isFormFieldValid(formik, 'lotName') ? { border: '1px solid red' } : {}}
          />
          {getFormErrorMessage(formik, 'lotName')}
        </div>
        <div className="col-lg-6 col-sm-6 mt-4">
          <div className="form-group mt-3">
            <label className="text-primary mb-1" htmlFor="batchId">
              Attach Batch
            </label>
            <select
              className="form-control  form-select bg-white"
              id="batchId"
              name="batchId"
              onChange={formik.handleChange}
              value={formik?.values?.batchId || 'select'}
              style={isFormFieldValid(formik, 'batchId') ? { border: '1px solid red' } : {}}
              disabled={isAttachBatchDisabled}
            >
              <option value="select" disabled>
                select
              </option>
              {unpaginatedBatches?.map((batch) => (
                <option value={batch?.id}>{batch?.attributes.name}</option>
              ))}
            </select>
            {getFormErrorMessage(formik, 'batchId')}
          </div>
        </div>
      </div>
      <div className="row gx-5">
        <div className="col-lg-6 mt-3">
          <div className="d-flex flex-column w-100">
            <p className="mb-0 text-secondary  fs-13px mb-1">DID/TF Plan</p>
            <div className="dropdown-center">
              <button
                className="form-control w-100 form-select text-start bg-white"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={isFormFieldValid(formik, 'plan') ? { border: '1px solid red' } : {}}
              >
                <div className="d-flex gap-2">
                  <span className="p-1">{formik?.values?.plan || '-Select Plan-'}</span>
                </div>
              </button>
              {getFormErrorMessage(formik, 'plan')}

              <ul className="dropdown-menu w-100 shadow-6 p-3">
                <div className="d-flex justify-content-between gap-3">
                  <div className="w-100">
                    <SearchWithBorder
                      placeholderText="Search plan"
                      onChange={(e) => {
                        setSearchKey(e.target.value);
                      }}
                      searchTerm={searchKey}
                      clearBtn={() => {
                        setSearchKey('');
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-end">
                    <div
                      role="button"
                      className="bg-black d-flex align-items-center justify-content-center h-5 w-5 rounded"
                    >
                      <img src="/assets/plus-icon.svg" alt="" />
                    </div>
                  </div>
                </div>

                <div className="scroll-custom scroll-custom-flow">
                  {(searchKey ? searchResult : unpaginatedNumberPlans)?.map((plan, index) => (
                    <li className="mt-2" key={index}>
                      <a
                        href="/#"
                        className="dropdown-item py-3 px-4"
                        onClick={(e) => {
                          e.preventDefault();
                          formik.setFieldValue('planId', parseInt(plan?.id, 10));
                          formik.setFieldValue('plan', plan?.attributes?.name);
                        }}
                      >
                        {plan?.attributes?.name}
                      </a>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="d-flex flex-column mt-3">
            <p className="mb-0 text-secondary  fs-13px mb-1">local Switch</p>
            <div className="dropdown-center">
              <button
                className="form-control w-100 form-select text-start bg-white"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={isFormFieldValid(formik, 'localSwitch') ? { border: '1px solid red' } : {}}
              >
                <div className="d-flex gap-2">
                  <span className="p-1">-Select Switch-</span>
                </div>
              </button>
              {getFormErrorMessage(formik, 'localSwitch')}

              <ul className="dropdown-menu w-100 shadow-6 p-3">
                <div className="scroll-custom scroll-custom-flow">
                  <li className="dropdown-item px-2 py-3 server-select">
                    <CheckBoxCheck
                      title="Select All"
                      id="all"
                      onClick={() => {
                        if (isAllSwitchSelected) {
                          formik.setFieldValue('localSwitch', []);
                        } else {
                          formik.setFieldValue('localSwitch', allAvilableLocalSwitch);
                        }
                        setIsAllSwitchSelected(!isAllSwitchSelected);
                      }}
                      checked={isAllSwitchSelected}
                    />
                  </li>

                  {unpaginatedLocalSwitches?.map((localSwitch, index) => (
                    <li className=" dropdown-item px-2 py-3 server-select" key={index}>
                      <CheckBoxCheck
                        title={localSwitch?.attributes?.name}
                        id="local"
                        onClick={() => {
                          toggleValue(localSwitch?.id);
                        }}
                        checked={formik.values.localSwitch.some(
                          (obj) => parseInt(obj.id, 10) === parseInt(localSwitch?.id, 10)
                        )}
                      />
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mt-3">
          <div className="w-100">
            <TextArea
              label="Lot Description"
              placeholder="Enter description"
              rowCount="4"
              name="description"
              onChange={formik.handleChange}
              value={formik?.values?.description}
              style={isFormFieldValid(formik, 'description') ? { border: '1px solid red' } : {}}
            />
            {getFormErrorMessage(formik, 'description')}

            <div>
              <div className="d-flex gap-2 align-items-center mt-3">
                <div className="d-flex align-items-center flex-row-reverse justify-content-between flex-wrap">
                  <p className="mb-0 ps-2 text-primary">Enable</p>
                </div>
                <div className="d-flex align-items-center flex-row-reverse justify-content-between flex-wrap">
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="activeId"
                      checked={formik?.values?.enable}
                      onChange={() => {}}
                    />
                    <span
                      className="slider round"
                      onClick={() => {
                        formik.setFieldValue('enable', !formik?.values?.enable);
                      }}
                    />
                  </label>
                  <span className="fw-normal text-primary check-title" />
                </div>
                <span className="fw-normal text-primary check-title" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div id="localServer" className="d-flex flex-column mt-3">
            {formik.values.localSwitch?.map((localSwitch) => (
              <div className="d-flex align-items-center gap-3 mt-3">
                <div>
                  <p className="mb-0 text-primary">Priority</p>
                  <input
                    type="text"
                    className="form-control bg-white"
                    id="priority1"
                    value="1"
                    onChange={() => {}}
                  />
                </div>
                <div className="w-100">
                  <p className="mb-0 text-primary">Server</p>
                  <div
                    className="alert  alert-dismissible bg-secondary-light-blue p-2 mt-1 mb-0 fade show d-flex justify-content-between"
                    role="alert"
                  >
                    {
                      unpaginatedLocalSwitches?.find(
                        (obj) => parseInt(obj.id, 10) === localSwitch?.id
                      )?.attributes?.name
                    }

                    <a
                      href="/#"
                      // data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={(e) => {
                        e.preventDefault();
                        removeItemFromLocalSwitch(localSwitch?.id);
                      }}
                    >
                      <img src="/assets/close-alert.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ChannelsMRC({ formik }) {
  return (
    <div className="rounded bg-light-blue2 p-4 mt-3">
      <p className="mb-0 fw-medium">MRC Details</p>
      <div className="row mt-3">
        <div className="col-12 col-md-4">
          <label htmlFor="inputMrc" className="col-form-label">
            No. of Channels
          </label>
          <input
            type="text"
            placeholder="Enter No. of Channels"
            className="form-control bg-white"
            id="inputMrc"
            name="numberOfChannels"
            onChange={formik.handleChange}
            value={formik?.values?.numberOfChannels}
            style={isFormFieldValid(formik, 'numberOfChannels') ? { border: '1px solid red' } : {}}
            onKeyPress={handleKeyPressForNumber}
          />
          {getFormErrorMessage(formik, 'numberOfChannels')}
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="inputMrcInc" className=" col-form-label">
            MRC
          </label>
          <input
            type="text"
            placeholder="MRC"
            className="form-control bg-white"
            id="inputMrcInc"
            name="mrc"
            onChange={formik.handleChange}
            value={formik?.values?.mrc}
            style={isFormFieldValid(formik, 'mrc') ? { border: '1px solid red' } : {}}
            onKeyPress={handleKeyPressForNumber}
          />
          {getFormErrorMessage(formik, 'mrc')}
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="inputMrcInc" className="col-form-label">
            MRC (Inc)
          </label>
          <input
            type="text"
            placeholder="Enter MRC (Inc)"
            className="form-control bg-white"
            id="inputMrcInc"
            name="mrcInc"
            onChange={formik.handleChange}
            value={formik?.values?.mrcInc}
            style={isFormFieldValid(formik, 'mrcInc') ? { border: '1px solid red' } : {}}
            onKeyPress={handleKeyPressForNumber}
          />
          {getFormErrorMessage(formik, 'mrcInc')}
        </div>
      </div>
      <div className="col-lg-6 mt-3">
        <label className="text-primary mb-2">Description</label>
        <textarea
          rows="4"
          className="form-control bg-white"
          name="mRCDescription"
          onChange={formik.handleChange}
          value={formik?.values?.mRCDescription}
          style={isFormFieldValid(formik, 'mRCDescription') ? { border: '1px solid red' } : {}}
        />
        {getFormErrorMessage(formik, 'mRCDescription')}
      </div>
    </div>
  );
}

function CustomStepper({ steps, activeStep }) {
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      activeColor="#645DF6"
      defaultColor="#8190B7"
      completeColor="#8190B7"
      activeTitleColor="#645DF6"
      completeTitleColor="#8190B7"
      defaultTitleColor="#8190B7"
      circleFontColor="#fff"
      completeBarColor="#645DF6"
    />
  );
}
function StepperApp({
  unpaginatedBatches = [],
  unpaginatedLocalSwitches = [],
  formik,
  activeStep,
  setActiveStep,
  dataSubmitting,
  unpaginatedNumberPlans,
}) {
  const navigate = useNavigate();

  const steps = [{ title: 'Lot Details' }, { title: 'MRC Details' }];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <LotDetails
            formik={formik}
            unpaginatedBatches={unpaginatedBatches}
            unpaginatedLocalSwitches={unpaginatedLocalSwitches}
            unpaginatedNumberPlans={unpaginatedNumberPlans}
          />
        );
      case 1:
        return <ChannelsMRC formik={formik} />;
      default:
        return null;
    }
  }

  return (
    <div className="custom-stepper">
      <CustomStepper steps={steps} activeStep={activeStep} />
      <div className="stepper-wrap pt-0 pt-md-2">
        {getSectionComponent()}
        <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-5">
          {activeStep !== 0 && (
            <div className="d-flex align-items-center gap-3 ">
              <button
                // href="/#"
                type="button"
                className="btn lot-btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px rounded "
                id="addLotButton"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={dataSubmitting}
              >
                {dataSubmitting ? 'Adding...' : 'Add Lot'}
              </button>
              <button
                type="button"
                className="blue-btn lot-btn d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-blue-active px-3 py-12px"
                onClick={() => {
                  setActiveStep(activeStep - 1);
                }}
              >
                Back
              </button>
              <a
                href="/#"
                className="btn lot-btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px rounded "
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </a>
            </div>
          )}
          {activeStep !== steps.length - 1 && (
            <div className="d-flex gap-3">
              {' '}
              <button
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px rounded"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Continue
              </button>
              <a
                href="/#"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepperApp;
