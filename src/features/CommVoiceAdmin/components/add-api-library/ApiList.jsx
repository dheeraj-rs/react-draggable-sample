import React from 'react';
import StatusBadge from '../../../../common/components/badges/StatusBadge';
import CheckboxSlider from '../../../../common/components/forms/CheckboxSlider';

function ApiList({
  name,
  type,
  selectId,
  primaryApi,
  fallbackApi,
  updatedat,
  setShow,
  isenabled,
  formik,
}) {
  const handleEditApiLibrary = () => {
    formik.setFieldValue('apiName', name);
    formik.setFieldValue('onSelected', type);
    formik.setFieldValue('primaryApi', primaryApi);
    formik.setFieldValue('fallbackApi', fallbackApi);
    formik.setFieldValue('isEnabled', isenabled);
    formik.setFieldValue('selectId', selectId);
    setShow({ isVisible: true, type: 'edit-api' });
  };

  const handleDeleteApiLibrary = () => {
    formik.setFieldValue('selectId', selectId);
    setShow({ isVisible: true, type: 'delete-api', name });
  };

  const handleEnableApi = () => {
    formik.setFieldValue('selectId', selectId);
    setShow({
      isVisible: true,
      type: `${isenabled ? 'disable-api' : 'enable-api'}`,
      name,
    });
  };

  return (
    <div className="row mx-0 d-flex justify-content-between shadow-11 px-3 py-3 rounded mb-3 mb-lg-0 align-items-sm-center">
      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-7">
        <div className="d-flex gap-3 align-items-center">
          <StatusBadge title="POST" />
          <h6 className="mb-0">{name}</h6>
        </div>
      </div>
      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-5">
        <p className="mb-0 fs-13px">
          Type: <span className="fw-500">{type}</span>
        </p>
      </div>

      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6 mt-3 mt-sm-0">
        <p className="mb-0 fs-13px">
          Updated on: <span className="fw-500">{updatedat}</span>
        </p>
      </div>
      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-6 d-flex align-items-center gap-4 justify-content-sm-end justify-content-end mt-3 mt-sm-0">
        <a href="#/">
          <div role="button">
            <CheckboxSlider
              setShow={setShow}
              checked={isenabled}
              title={name}
              onClick={handleEnableApi}
            />
          </div>{' '}
        </a>
        <a href="#/" className="">
          <img
            className=""
            src="/assets/PencilSimpleLine.svg"
            onClick={handleEditApiLibrary}
            alt=""
          />
        </a>
        <a href="#/" className="" onClick={handleDeleteApiLibrary}>
          <img alt="" className="ms-2" src="/assets/Trash.svg" />
        </a>
      </div>
    </div>
  );
}

export default ApiList;
