import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import useStore from '../../../Test/store';

import ButtonWhiteModalCancel from '../../../../common/components/buttons/ButtonWhiteModalCancel';
import ModalClose from '../../../../common/components/modals/ModalClose';
import Modal from '../../../../common/components/modals/Modal';
import CheckboxSlider from '../../../../common/components/forms/CheckboxSlider';
import { getApiDetails, getNodeDetails, isFormFieldValid } from '../../../../common/helpers/utils';

function PassThruModal({ isVisible, onSelect, onUpdate, apiLibraries, isDataSubmiting }) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    if (!data.apiId) {
      errors.apiId = ' required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      apiId: '',
      apiName: 'Select API',
      async: true,
    },
    validate,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          nodeId: show?.nodeId,
          details: {
            apiId: parseInt(formik.values.apiId, 10),
            async: formik.values.async,
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'passthru',
          details: {
            apiId: parseInt(formik.values.apiId, 10),
            async: formik.values.async,
          },
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'Passthru') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);

      formik.setFieldValue('apiId', nodeDetails?.details?.apiId);
      formik.setFieldValue(
        'apiName',
        getApiDetails(apiLibraries, nodeDetails?.details?.apiId)?.attributes?.name
      );
      formik.setFieldValue('async', nodeDetails?.details?.async);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  return (
    <>
      <Modal width="552px" id="passthroughModal" show={isVisible}>
        <div className="d-flex justify-content-between">
          <p className="fs-16px text-primary fw-medium fs-16px mb-2">
            <img className="pe-2" src="/assets/call-flows-hours/passValue.svg" alt="" />
            Passthru
          </p>
          <ModalClose onClose={handleClose} />
        </div>
        <p className="fs-13px text-secondary mb-4">
          The Passthru component allows easy passage of information into an HTTP: link hosted on
          your end, to provide all the information.
        </p>

        {/* <!-- tab starts --> */}
        <div className="tab-ticket resolve-modal">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade d-none active mt-4"
              id="pills-url"
              role="tabpanel"
              aria-labelledby="pills-url-tab"
            >
              <div className="mt-3">
                <p className="text-primary mb-0">Pass information through the below URL</p>
                <textarea
                  className="form-control mt-2 bg-white"
                  id="url"
                  name="url"
                  rows="4"
                  onChange={() => {}}
                  placeholder="https://www.test.com/dfgjhk5vbmn_1234567"
                />
              </div>
              <div className="rounded bg-titan-water p-3 mt-4">
                <div className="fw-medium text-primary fs-12px">
                  <label className="switch">
                    <input type="checkbox" className="passthru-checkbox" />
                    <span className="slider num-check round" />
                  </label>
                  <span className="ps-2 fw-normal">Make this component Async</span>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
                <button
                  data-bs-dismiss="modal"
                  type="button"
                  className="addURLBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px passthru-button"
                >
                  Save
                </button>
                <button
                  id="passthru-async"
                  data-bs-dismiss="modal"
                  type="button"
                  className="addURLBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px passthru-button d-none ms-0"
                >
                  Save
                </button>
                <ButtonWhiteModalCancel text="Cancel" />
              </div>
            </div>

            <div
              className="tab-pane show active fade"
              id="pills-app"
              role="tabpanel"
              aria-labelledby="pills-app"
            >
              {' '}
              <div>
                <p className="text-primary">
                  <b> Pass information through the below API</b>
                </p>
                <div className="">
                  <label className="mb-1 text-primary fs-13px">Select API</label>
                  <div className="select bg-white">
                    <div
                      className="selectBtn"
                      data-type="firstOption"
                      onClick={() => {
                        setIsDropDownVisible(!isDropDownVisible);
                      }}
                      style={isFormFieldValid(formik, 'apiId') ? { border: '1px solid red' } : {}}
                    >
                      {formik.values.apiName}
                    </div>
                    <div className={`selectDropdown ${isDropDownVisible ? 'toggle' : ''}`}>
                      {apiLibraries?.map((e, index) => (
                        <div
                          key={index}
                          data-type="firstOption"
                          onClick={() => {
                            setIsDropDownVisible(false);
                            formik.setFieldValue('apiName', e?.attributes?.name);
                            formik.setFieldValue('apiId', e.id);
                          }}
                          className={
                            String(formik.values.apiId) === String(e.id) ? 'd-none' : 'option'
                          }
                        >
                          {e?.attributes?.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* {getFormErrorMessage(formik, 'apiId')} */}
                </div>

                <div className="p-4 rounded" style={{ background: '#EBEFFF' }}>
                  <div className="d-flex align-items-center gap-3">
                    <CheckboxSlider
                      checked={formik.values.async}
                      onClick={() => {
                        formik.setFieldValue('async', !formik.values.async);
                      }}
                    />
                    <span>Make this component Async</span>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-start align-items-center border-0 p-0 mt-4">
                  <button
                    id="addURLBtn"
                    type="button"
                    className="addAppBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px "
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
        </div>
        {/* <!-- tab ends --> */}
      </Modal>
      {isVisible && <div className="modal-backdrop fade show" />}
    </>
  );
}

export default PassThruModal;
