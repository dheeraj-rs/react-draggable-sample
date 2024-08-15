import { handleGetMethod, handlePatchMethod, handlePostMethod } from '../../api-config/methods';

const handleLogin = (data) => handlePostMethod('/auth/login', data);

const handleLoginWithGoogle = (data) => {
  return handleGetMethod('/auth/google/login', {
    params: data,
  });
};

const loginWithSecureLogin = (email) => {
  const data = {
    data: {
      type: 'users',
      attributes: {
        email,
      },
    },
  };
  return handlePostMethod('/auth/secure-login-link/generate', data);
};

const Enable2FAForUser = () => {
  return handlePostMethod('/admin/profile/google-2fa/enable', {});
};

const Disable2FAForUser = () => {
  return handlePostMethod('/admin/profile/google-2fa/disable', {});
};

const Verify2FAForUser = (otp) => {
  const data = {
    type: 'users',
    attributes: {
      otp,
    },
  };

  return handlePatchMethod('/admin/profile/google-2fa/verify', { data });
};

const ChangeProfilePassword = (passwordDetails) => {
  const data = {
    type: 'users',
    attributes: {
      current_password: passwordDetails?.currentPassword,
      new_password: passwordDetails?.newPassword,
      confirm_password: passwordDetails?.retypePassword,
    },
  };

  return handlePatchMethod('/admin/profile/change-password', { data });
};

export {
  handleLogin,
  handleLoginWithGoogle,
  loginWithSecureLogin,
  Enable2FAForUser,
  Verify2FAForUser,
  ChangeProfilePassword,
  Disable2FAForUser,
};
