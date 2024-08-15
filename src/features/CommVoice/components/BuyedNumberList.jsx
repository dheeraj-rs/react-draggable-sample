/* eslint-disable arrow-body-style */
import React from 'react';

function BuyedNumberList({
  planId,
  rolesIcon,
  telNumber,
  countryName,
  virtualType,
  voiceType,
  monthlyCost,
  handleNumberSelection,
  selectedNumbers,
}) {
  const isSelected = (selectedNumberId) => {
    return selectedNumbers.some((item) => item.id === selectedNumberId);
  };
  return (
    <div className="virtual-table-row border-transparent row justify-content-between align-items-center p-2 py-4 py-sm-3 px-lg-2 p-lg-3 p-sm-2 p-md-2 rounded mt-3 shadow-6 roles-box cursor-pointer mx-1 flex-wrap border">
      <div className="d-flex gap-3 align-items-center roles-list col-lg-4 col-sm-3 col-12 mb-lg-0 mb-3 mb-sm-0">
        <div>
          <img src={rolesIcon} alt="" />
        </div>
        <div className="d-flex gap-4 align-items-center">
          <h6 className="fs-13px fw-500 mb-0 text-primary phone-number-virtual">{telNumber}</h6>
          <p className="mb-0">{countryName}</p>
        </div>
      </div>

      <div className="col-lg-2 col-sm-2 col-5">
        <p className="mb-0">{virtualType}</p>
      </div>

      <div className="col-lg-2 col-sm-2 col-4">
        <button
          type="button"
          className="btn bg-tropical-blue text-blueberry voice-btn btn-voice fs-10px fw-bolder"
        >
          {voiceType}
        </button>
      </div>
      <div className="col-lg-2 col-sm-2 col-3 cost">
        <p className="mb-0">${monthlyCost}</p>
      </div>

      <div className="virtual-Selection d-flex gap-2 align-items-center col-lg-2 col-sm-3 col-12 mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-start justify-content-lg-end justify-content-sm-end">
        <button
          type="button"
          className={
            isSelected(planId)
              ? 'd-none'
              : 'btn bg-white text-black rounded selectNumber btn-virtual-sel py-2 px-4'
          }
          onClick={() => {
            handleNumberSelection({
              id: planId,
              type: 'number',
              telNumber,
              countryName,
              monthlyCost,
            });
          }}
        >
          Select number
        </button>
        <button
          type="button"
          className={
            isSelected(planId)
              ? 'btn bg-blue-active text-white rounded  btn-virtual-sel py-2 px-4'
              : 'd-none'
          }
          onClick={() => {
            handleNumberSelection({ id: planId, type: 'number' });
          }}
        >
          <img className="pe-2" src="/assets/selected-tick.svg" alt="" /> Selected
        </button>
      </div>
    </div>
  );
}

export default BuyedNumberList;
