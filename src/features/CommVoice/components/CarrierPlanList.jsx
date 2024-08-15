import React from 'react';
import { Link } from 'react-router-dom';

import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function CarrierPlanList({
  carrierPlan = '',
  planGroup = '',
  planDate = '',
  setShow,
  isEnabled = false,
  carrierGroupId = '',
  id = '',
  handleBulkSelection,
  selectedItemsForBulkDelete,
}) {
  return (
    <div className="row bg-white align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3 shadow-6 roles-box cursor-pointer mx-1 flex-wrap border-transparent">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-lg-3 col-sm-4 col-12 mb-lg-0 mb-3 mb-sm-0">
        <div className="check-box">
          <input
            type="checkbox"
            checked={selectedItemsForBulkDelete?.some(
              (plan) => parseInt(plan?.id, 10) === parseInt(id, 10)
            )}
            onChange={() => {}}
          />
          <label
            className="text-primary mb-0"
            htmlFor="carrierName"
            onClick={() => {
              handleBulkSelection({ type: 'telephony_vendor_carrier_plans', id: parseInt(id, 10) });
            }}
          />
        </div>
        <div className="d-flex gap-3 align-items-center">
          <img src="/assets/carrier-plan-icon.svg" alt="" />
          <Link
            to={`/comm-telephony/vendor-carrier-add-plan/${id}`}
            className="fs-13px fw-500 mb-0 text-primary vendor-text"
          >
            {carrierPlan}
          </Link>
        </div>
      </div>
      <div className="col-lg-3 col-sm-3 col-12">
        <p className="mb-0">
          Group: <b>{planGroup}</b>
        </p>
      </div>

      <div className="col-lg-3 col-sm-3 col-12">
        <p className="mb-0 mt-2 mt-sm-0">
          Last updated on <b>{planDate || ''}</b>
        </p>
      </div>

      <div className="col-lg-3 col-sm-2 col-12 mt-3 mt-lg-0 mt-sm-0">
        <div className="d-flex align-items-center justify-content-sm-end gap-3 gap-lg-3 gap-sm-1 py-lg-3 py-sm-2">
          <CheckboxTickChat
            toolTipId="tooltip-plan-status"
            toolTipContent="Enable/Disable"
            checkid="activeId"
            title=""
            active={isEnabled}
            onChange={() => {}}
            onClick={() => {
              setShow({
                isVisible: true,
                type: `${isEnabled ? 'disable-carrier-plan' : 'enable-carrier-plan'}`,
                key: `${isEnabled ? 'Disable' : 'Enable'}`,
                id,
              });
            }}
          />
          <div className="border-start d-flex gap-3 ms-2 ps-3">
            <a
              href="/#"
              className=""
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'edit-carrier-plan',
                  data: {
                    id,
                    name: carrierPlan,
                    carrierGroupId,
                    isEnabled,
                  },
                });
              }}
            >
              <img className="ms-2" src="/assets/PencilSimpleLine.svg" alt="" />
            </a>
            <a
              href="/#"
              className=""
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'delete-carrier-plan',
                  carrierPlan: { name: carrierPlan, id },
                });
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

export default CarrierPlanList;
