import React from 'react';
import { Link } from 'react-router-dom';

import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function DidPlanList({
  id,
  numberPaln,
  planNumber,
  planDate,
  isEnabled,
  setShow,
  numberType,
  formik,
}) {
  return (
    <div className="row bg-white border-transparent shadow-6 align-items-center p-2 p-lg-4 p-sm-2 py-4 py-lg-2 rounded mt-3 roles-box cursor-pointer mx-1 flex-wrap">
      <div className="d-flex gap-3 gap-sm-2 gap-lg-3 align-items-center roles-list col-lg-4 col-sm-3 col-12 mb-lg-0 mb-3 mb-sm-0">
        <Link to={`/comm-telephony/vendor-did/${id}`}>
          <div className="d-flex gap-3 align-items-center">
            <img src="/assets/carrier-plan-icon.svg" alt="" />
            <h6 className="fs-13px fw-500 mb-0 text-primary vendor-text">{numberPaln}</h6>
          </div>
        </Link>
      </div>

      <div className="col-lg-2 col-sm-3 col-12">
        <p className="mb-0">
          Numbers <b>{planNumber}</b>
        </p>
      </div>
      <div className="col-lg-3 col-sm-3 col-12">
        <p className="mb-0 mt-2 mt-sm-0">
          Last updated on <b>{planDate}</b>
        </p>
      </div>

      <div className="col-lg-3 col-sm-3 col-12 mt-3 mt-lg-0 mt-sm-0">
        <div className="d-flex align-items-center justify-content-sm-end gap-3 gap-lg-3 gap-sm-1 py-lg-3 py-sm-2">
          <CheckboxTickChat checkid="activeId" title="" active={isEnabled} onChange={() => {}} />
          <div className="border-start d-flex gap-3 ms-2 ps-3">
            <a
              href="/#"
              className=""
              onClick={(e) => {
                e.preventDefault();
                setShow({
                  isVisible: true,
                  type: 'edit-numbering-plan',
                  planDetails: { name: numberPaln, numberType, enable: isEnabled, id },
                });
                formik.setFieldValue('planName', numberPaln);
                formik.setFieldValue('numberType', numberType);
                formik.setFieldValue('enable', isEnabled);
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
                  type: 'delete-numbering-plan',
                  numberPlan: { name: numberPaln, id },
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

export default DidPlanList;
