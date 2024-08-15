import React from 'react';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';

function VirtualNumberList({ rolesIcon, telNumber, countryName, virtualType, voiceType }) {
  return (
    <div className="row justify-content-between align-items-center p-2 p-lg-3 p-sm-2 py-4 rounded mt-3 shadow-6 roles-box cursor-pointer mx-1 flex-wrap border">
      <div className="d-flex gap-3 align-items-center roles-list col-lg-4 col-sm-3 col-12 mb-lg-0 mb-3 mb-sm-0">
        <div>
          <img src={rolesIcon} alt="" />
        </div>
        <div className="d-flex gap-4 align-items-center">
          <h6 className="fs-13px fw-500 mb-0 text-primary phone-number-virtual">{telNumber}</h6>
          <p className="mb-0">{countryName}</p>
        </div>
      </div>

      <div className="col-lg-2 col-sm-2 col-6">
        <p className="mb-0">{virtualType}</p>
      </div>

      <div className="col-lg-2 col-sm-2 col-6 voice-mob">
        <button
          type="button"
          className="btn bg-tropical-blue text-blueberry fs-10px p-1 fw-bolder btn-voice"
        >
          {voiceType}
        </button>
      </div>
      <div className="col-lg-2 col-sm-3 col-6">
        <p className="mb-0">
          <img
            src="/assets/TreeStructureblue.svg"
            className="bg-white rounded-circle p-2 me-1 abc-icon"
            alt=""
          />
          ABCsampleflow
        </p>
      </div>

      <div className="d-flex gap-2 align-items-center col-lg-2 col-sm-2 col-6 mt-lg-0 mt-sm-0 mt-md-0 mt-3 justify-content-end">
        <p className="mb-0 d-flex gap-1"> </p>
        <CheckboxTickChat checkid="activeId" title="" />
        <a href="/#" className="" data-bs-toggle="modal" data-bs-target="#deleteRoleModal">
          <img className="ms-2" src="/assets/Trash.svg" alt="" />
        </a>
      </div>
    </div>
  );
}

export default VirtualNumberList;
