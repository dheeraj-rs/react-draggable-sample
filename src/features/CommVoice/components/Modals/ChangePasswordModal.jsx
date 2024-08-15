import React from 'react';
import ModalClose from '../../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../../ChatWidget/components/ButtonWhiteModalCancel';
import Modal from '../../../../common/components/modals/Modal';

function ChangePasswordModal() {
  return (
    <Modal width="450px" id="changePasswordModal">
      <div className="d-flex justify-content-between">
        <p className="fs-14px text-primary fw-500 mb-3">Change Password</p>
        <ModalClose />
      </div>
      <div className="form-group form-custom-group">
        <label className="mt-0" htmlFor="group">
          Current Password
        </label>
        <div className="input-group mb-3">
          <input
            className="form-control bg-white border-end-0"
            id="password"
            type="password"
            name="password"
          />
          <span className="input-group-text bg-transparent password-showhide">
            <i className="fa fa-eye-slash trigger-password pwd-toggle" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="form-group form-custom-group">
        <label className="mt-2" htmlFor="group">
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

      <div className="form-group form-custom-group">
        <label className="mt-2" htmlFor="group">
          Confirm New Password
        </label>
        <div className="input-group mb-3">
          <input
            className="form-control bg-white border-end-0"
            id=""
            type="password"
            name="password"
          />
          <span className="input-group-text bg-transparent confirm-password-showhide" />
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
        <button
          id="updatePasswordButton"
          data-bs-dismiss="modal"
          type="button"
          className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
        >
          Update Password
        </button>
        <ButtonWhiteModalCancel text="cancel" />
      </div>
    </Modal>
  );
}

export default ChangePasswordModal;
