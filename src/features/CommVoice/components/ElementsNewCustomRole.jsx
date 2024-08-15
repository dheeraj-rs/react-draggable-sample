import React from 'react';
import ChangePasswordModal from './Modals/ChangePasswordModal';
import DeleteAccountModal from './Modals/DeleteAccountModal';
import CustomRoleOffCanvas from './OffCanvas/CustomRoleOffCanvas';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function ElementsNewCustomRole() {
  return (
    <>
      <ChangePasswordModal />
      <DeleteAccountModal />
      <CustomRoleOffCanvas />
      <ToastSuccess id="updatePasswordToastMsg">
        <span>
          Password <span className="fw-bolder">updated</span> successfully
        </span>
      </ToastSuccess>
      <ToastSuccess id="accountSaveToastMsg">
        <span>
          Account infortmation details <span className="fw-bolder">saved</span> successfully
        </span>
      </ToastSuccess>
      <ToastSuccess id="accountCancelToastMsg">
        <span>
          Account infortmation changes <span className="fw-bolder">discarded</span> successfully
        </span>
      </ToastSuccess>
      <ToastSuccess id="accountdeleteToastMsg">
        <span>
          {' '}
          Account <span className="fw-bolder">deleted</span> successfully
        </span>
      </ToastSuccess>
    </>
  );
}

export default ElementsNewCustomRole;
