import React from 'react';
import ButtonToast from '../../../ChatWidget/components/ButtonToast';
import Select from '../../../CommAdminCentre/components/common/Select';
import ModalClose from '../../../../common/components/modals/ModalClose';
import ModalRight from '../../../../common/components/modals/ModalRight';

function ResetPasswordModal() {
  return (
    <ModalRight width="450px" id="passwordResetModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-medium mb-3">Reset Agent’s Password</p>
        <ModalClose />
      </div>
      <p className="fs-14px text-secondary mb-3">You can reset agents password.</p>
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
      <div className="bg-lavender p-4 rounded text-blue-active">
        New password will be send through agent’s registered Email address
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
        <ButtonToast text="Reset Password" btnID="PasswordReset" />
        <button
          type="button"
          className="btn bg-white fw-medium text-dark border px-4 py-12px"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
      </div>
    </ModalRight>
  );
}

export default ResetPasswordModal;
