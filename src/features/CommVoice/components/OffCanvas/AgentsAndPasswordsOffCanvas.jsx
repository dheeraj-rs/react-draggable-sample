import React from 'react';
import Select from '../../../CommAdminCentre/components/common/Select';
import ButtonToast from '../../../../common/components/toast/ButtonToast';

function AgentsAndPasswordsOffCanvas() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRightPassword"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header pb-2 px-4 pt-4">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Reset Agent’s Password
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>

      <div className="offcanvas-body pt-0 px-4">
        <p className="pb-3">You can reset agents password.</p>

        <div className="form-group">
          <Select id="agent" label="Select Agent" value="Steven Paul" onchange={() => {}} />
        </div>

        <div className="form-group">
          <label className="mt-3" htmlFor="group">
            New Password
          </label>
          <div className="input-group mb-3">
            <input
              className="form-control bg-white border-end-0"
              // id="confirmPassword"
              type="password"
              name="password"
            />
            <span className="input-group-text bg-transparent confirm-password-showhide">
              <i className="fa fa-eye-slash trigger-password pwd-toggle" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="group">Confirm New Password</label>
          <div className="input-group mb-3">
            <input
              className="form-control bg-white border-end-0"
              id=""
              type="password"
              name="password"
            />
            <span className="input-group-text bg-transparent confirm-password-showhide">
              <i className="fa fa-eye-slash trigger-password pwd-toggle" aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="bg-darkboxgray p-4 rounded mb-4 mt-4 d-flex gap-2">
          <div>
            <img src="/assets/mark_sign_icon.svg" alt="" />
          </div>
          <p className="mb-0">
            {' '}
            New password will be send through agent’s registered Email address
          </p>
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
          <ButtonToast text="Reset Password" btnID="PasswordReset" />
          <button
            type="button"
            className="btn bg-white fw-medium text-dark border px-4 py-12px"
            data-bs-dismiss="offcanvas"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentsAndPasswordsOffCanvas;
