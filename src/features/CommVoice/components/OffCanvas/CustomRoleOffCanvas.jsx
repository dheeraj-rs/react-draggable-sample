import React from 'react';
import { Link } from 'react-router-dom';
import AgentBadge from '../AgentBadge';
import ButtonToast from '../../../../common/components/toast/ButtonToast';

function CustomRoleOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRightCustomRole"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header pb-2 px-4 pt-4">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Policy details
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body pt-0 px-4">
        <div className="d-flex align-items-center justify-content-between mt-3 mb-4">
          <img src="/assets/role1.svg" alt="" />
          <div>
            <img src="/assets/PencilSimpleLine.svg" alt="" />
          </div>
        </div>
        <p className="mb-1">Policy name</p>
        <h6 className="mb-4">Custom Policy 1</h6>

        <h6>Policy URL</h6>
        <div className="bg-darkboxgray p-4 rounded mb-4 mt-3">
          <p className="mb-0">
            https://fgs1-560866132687548503-23456789087654-.gsoftcomm.net/login/auth/
          </p>
        </div>

        <div className="shadow-6 p-3 rounded mb-4">
          <p className="mb-1">Account</p>
          <Link to="/">abcinternational.comm.com</Link>
        </div>
        <h6>Login Methods</h6>

        <div className="bg-light-pale-gray p-4 mt-3 mb-4 rounded">
          <img alt="" src="/assets/admin-logo.svg" />
          <h6 className="mt-3">Comm login</h6>
          <p>Login with users gsoftcomm account</p>
          <div className="d-flex gap-5">
            <div>
              <p className="mb-1">Password policy</p>
              <p>Low</p>
            </div>
            <div>
              <p className="mb-1">2FA Policy</p>
              <AgentBadge bgColor="sandwisp" color="ash-gray-bg" title="DISABLED" size="13px" />
            </div>
          </div>
        </div>

        <div className="bg-light-pale-gray p-4 mb-4 rounded">
          <img src="/assets/google-icon.svg" alt="" />
          <h6 className="mt-3">Google login</h6>
          <p>Login with users google account</p>
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
          <ButtonToast text="Save" btnID="LicenceAgentAdd" />
          <button
            type="button"
            id="LicenceAgentDiscard"
            className="btn bg-white fw-medium text-dark border px-4 py-12px ms-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomRoleOffCanvas;
