/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Checkbox from '../../../common/components/forms/Checkbox';

function PuchaseNumberList(Props) {
  return (
    <div className="row justify-content-between align-items-center p-2 p-lg-4 p-sm-2 py-4 py-sm-3 rounded mb-2 roles-box cursor-pointer mx-1 flex-wrap border">
      <div className="d-flex gap-3 align-items-center roles-list col-lg-4 col-sm-4 col-12 mb-lg-0 mb-3 mb-sm-0">
        <div>
          <img src={Props.rolesIcon} alt="" />
        </div>
        <div>
          <a href={Props.telNumberlink} className="fs-13px fw-500 mb-1">
            {Props.telNumber}
          </a>
        </div>
      </div>

      <div className="col-lg-3 col-sm-2 col-5">
        <p className="mb-0">{Props.virtualType}</p>
      </div>

      <div className="col-lg-3 col-sm-3 col-3">
        <p className="mb-0">{Props.serviceProvider}</p>
      </div>

      <div className="d-flex gap-2 align-items-center col-lg-2 col-sm-2 col-1 justify-content-start justify-content-lg-end justify-content-sm-end mx-lg-0 mx-1">
        <Checkbox title="" id="purchaseSummary" checked />
      </div>
    </div>
  );
}

export default PuchaseNumberList;
