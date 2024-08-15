import React from 'react';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function VendorPackageList({
  id,
  packageName,
  billingMode,
  lastUpdatedOn,
  enabled,
  setShow,
  billingConditions,
  billingSlabs,
}) {
  return (
    <div className="row justify-content-between border-transparent bg-white align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3 shadow-6 roles-box cursor-pointer mx-1 flex-wrap border">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-lg-4 col-sm-3 col-12 mb-lg-0 mb-3 mb-sm-0">
        <div className="d-flex gap-3 align-items-center">
          <img src="/assets/carrier-plan-icon.svg" alt="" />
          <a
            href="/#"
            // data-bs-toggle="modal"
            // data-bs-target="#slabBillingModal"
            onClick={(e) => {
              e.preventDefault();
              setShow({
                isVisible: true,
                type: 'carrier-package-details',
                data: {
                  id,
                  packageName,
                  billingMode,
                  isEnable: enabled,
                  billingConditions,
                  billingSlabs,
                },
              });
            }}
            className="fs-13px fw-500 mb-0 text-primary vendor-text"
          >
            {packageName}
          </a>
        </div>
      </div>
      <div className="col-lg-2 col-sm-2 col-12">
        <p className="mb-0">{billingMode}</p>
      </div>
      <div className="col-lg-3 col-sm-3 col-12">
        <p className="mb-0 text-secondary">
          Last updated on <b>{lastUpdatedOn}</b>
        </p>
      </div>

      <div className="col-lg-3 col-sm-4 col-12 mt-3 mt-lg-0 mt-sm-0">
        <div className="d-flex align-items-center px-lg-2 px-sm-3 justify-content-start justify-content-lg-end gap-3 gap-lg-3 gap-sm-1 py-lg-3 py-sm-2">
          <p className="mb-0 d-flex">Enable</p>
          <CheckboxTickChat
            checkid="activeId"
            title=""
            checked={enabled}
            onChange={() => {}}
            onClick={() => {
              setShow({
                isVisible: true,
                type: `${enabled ? 'disable-carrier-package' : 'enable-carrier-package'}`,
                key: `${enabled ? 'Disable' : 'Enable'}`,
                id,
                packageName,
                billingModeType: billingMode,
              });
            }}
            active={enabled}
          />
          <div className="border-start d-flex gap-3 ms-2 ps-3">
            <a
              href="/#"
              className=""
              // data-bs-toggle="modal"
              // data-bs-target="#slabEditModal"
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  id: id || null,
                  attributes: {
                    stage: 1,
                    isVisible: true,
                    billingModeType: billingMode,
                    actionType: 'edit-carrier-package',
                    packageName,
                  },
                });
              }}
            >
              <img className="ms-2" src="/assets/PencilSimpleLine.svg" alt="" />
            </a>
            <a
              href="/#"
              className=""
              // data-bs-toggle="modal"
              // data-bs-target="#deleteModal"
              onClick={(e) => {
                e.preventDefault();
                setShow({ id, isVisible: true, type: 'delete-carrier-package', packageName });
              }}
            >
              <img className="ms-2" src="/assets/Trash.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorPackageList;
