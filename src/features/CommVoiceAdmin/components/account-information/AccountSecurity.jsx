import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Layout from '../../../../common/layout';
import CheckboxSlider from '../../../../common/components/forms/CheckboxSlider';
import Input from '../../../../common/components/forms/Input';
import StatusBadge from '../../../../common/components/badges/StatusBadge';
import ToastSuccess from '../../../../common/components/toast/ToastSucess';
import ToastError from '../../../../common/components/toast/ToastError';
import { getFormErrorMessage, isFormFieldValid } from '../../../../common/helpers/utils';

function AccountSecurity() {
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] = useState(false);

  const validate = (data) => {
    const errors = {};

    if (data.twoFactorEnable) {
      if (!data.verificationCode.trim()) {
        errors.verificationCode = 'verificationCode is required';
      }
      if (data.verificationCode.trim() && data.verificationCode.length !== 6) {
        errors.verificationCode = '6 digit  is required';
      }
    }

    if (data.twoFactorActive || !data.twoFactorEnable) {
      if (!data.currentPassword.trim()) {
        errors.currentPassword = 'current password is required';
      } else if (data.currentPassword.length < 8) {
        errors.currentPassword = 'Password must be at least 8 characters';
      }

      if (!data.newPassword.trim()) {
        errors.newPassword = 'new password is required';
      } else if (data.newPassword.length < 8) {
        errors.newPassword = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(data.newPassword)) {
        errors.newPassword = 'Password must include at least one uppercase letter';
      } else if (!/\d/.test(data.newPassword)) {
        errors.newPassword = 'Password must include at least one number';
      } else if (!/[!@#$%&*]/.test(data.newPassword)) {
        errors.newPassword = 'Password must include at least one special character (!@#$%&*)';
      }

      if (data.newPassword !== data.retypeNewPassword) {
        errors.retypeNewPassword = 'retype password not same';
      }

      if (!data.retypeNewPassword.trim()) {
        errors.retypeNewPassword = 'retype new password is required';
      } else if (data.retypeNewPassword.length < 8) {
        errors.retypeNewPassword = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(data.retypeNewPassword)) {
        errors.retypeNewPassword = 'Password must include at least one uppercase letter';
      } else if (!/\d/.test(data.retypeNewPassword)) {
        errors.retypeNewPassword = 'Password must include at least one number';
      } else if (!/[!@#$%&*]/.test(data.retypeNewPassword)) {
        errors.retypeNewPassword = 'Password must include at least one special character (!@#$%&*)';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      twoFactorEnable: false,
      twoFactorActive: false,
      verificationCode: '',
      currentPassword: '',
      newPassword: '',
      retypeNewPassword: '',
    },
    validate,
    onSubmit: () => {
      if (formik.values.twoFactorEnable) {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Verified : You have successfully Verified',
        });
        formik.setFieldValue('twoFactorActive', true);
      }

      if (formik.values.twoFactorActive || !formik.values.twoFactorEnable) {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'You have successfully updated the new password.',
        });
      }
    },
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    const truncatedValue = inputValue.slice(0, 6);
    formik.setFieldValue('verificationCode', truncatedValue);
  };

  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/assets/favIcons/favicon-voice.ico">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 scroll-custom">
              <div className="col-lg-12 col-sm-12 pe-0 campaign-landing">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                    <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                      <Link
                        to="/comm-voice-admin/account-information/"
                        className="d-flex justify-content-center"
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </Link>
                    </div>
                    <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                      <a
                        href="/comm-voice-admin/account-information/"
                        className="d-block d-lg-none"
                      >
                        <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                      </a>{' '}
                      Account Security
                    </h5>
                  </div>
                </div>
                <div className="campaign-new-contact mt-3 mt-sm-0">
                  <p>
                    To review and adjust your security settings and get recommendations to help you
                    keep your account secure.
                  </p>
                  <div className="bg-input-gray p-4 rounded">
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <h6 className="mb-0 fs-14px fw-bolder text-primary">
                        Two Factor Authentication
                      </h6>
                      <StatusBadge title="DISABLED" />
                    </div>
                    <p className="text-secondary mb-sm-5">
                      Digital identity paired with 2FA is a more secure authentication method. Get
                      Start configuring.
                    </p>
                    <div className="d-flex gap-lg-5 align-items-start flex-sm-row flex-column gap-3 mb-3">
                      <div className="d-flex gap-2 align-items-center">
                        <p className="mb-0">Enable</p>
                        <CheckboxSlider
                          checked={formik.values.twoFactorEnable}
                          id="twoFactor"
                          onClick={(e) => {
                            e.preventDefault();
                            formik.setFieldValue('twoFactorEnable', !formik.values.twoFactorEnable);
                          }}
                        />
                      </div>
                      <div
                        className={`d-flex gap-lg-5 flex-sm-row flex-column gap-3 two-factor-wrap ${
                          formik.values.twoFactorEnable ? '' : 'd-none'
                        }`}
                      >
                        <div>
                          <img src="/assets/qrcode.svg" alt="" />
                        </div>
                        <div>
                          <p className="mb-0">
                            Scan this QR code using any authenticator app installed in your mobile
                            and Enter the 6 digit code below
                          </p>
                          <div className="d-flex gap-3 align-items-end flex-sm-row flex-column col-lg-8">
                            <Input
                              label="Verification code"
                              id="Verification"
                              placeholder="X X X X X X"
                              type="number"
                              name="verificationCode"
                              value={formik.values.verificationCode}
                              onChange={handleInputChange}
                              style={
                                isFormFieldValid(formik, 'verificationCode')
                                  ? { border: '1px solid red' }
                                  : {}
                              }
                            />
                            <a
                              href="#/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px black-btn-mobile verify-btn"
                              onClick={formik.handleSubmit}
                            >
                              Verify and Proceed
                            </a>
                          </div>
                          {getFormErrorMessage(formik, 'verificationCode')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Change Password --> */}
                  <div className="accordion accordion-custom-right mt-3" id="accordionCompany">
                    <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-sm-2 pt-2 fs-13px position-relative">
                      <div className="accordion-header bg-white" id="headingUpdate">
                        <a
                          href="#/"
                          className="accordion-button collapsed head d-flex align-items-center bg-white"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseCompany"
                          aria-expanded="false"
                          aria-controls="collapseCompany"
                        >
                          <div className="">
                            <h6 className="text-primary fs-14px fw-bolder">Change Password</h6>
                            <p className="mb-0 text-secondary">
                              Regularly updating your passwords to secure your account and data.
                            </p>
                          </div>
                        </a>
                      </div>
                      <div
                        id="collapseCompany"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingUpdate"
                        data-bs-parent="#accordionCompany"
                      >
                        <div className="accordion-body acc-card-content pt-0">
                          <div className="row">
                            <div className="col-sm-5">
                              <label htmlFor="inputPassword5" className="form-label">
                                Current Password
                              </label>
                              <div className="input-group mb-2">
                                <input
                                  type="password"
                                  id="inputPassword5"
                                  className="form-control bg-white"
                                  aria-describedby="passwordHelpBlock"
                                  name="currentPassword"
                                  value={formik.values.currentPassword}
                                  onChange={formik.handleChange}
                                  style={
                                    isFormFieldValid(formik, 'currentPassword')
                                      ? { border: '1px solid red' }
                                      : {}
                                  }
                                />
                              </div>
                              {getFormErrorMessage(formik, 'currentPassword')}

                              <div className="form-group form-custom-group reset-pwd-box">
                                <label className="mt-2 mb-1" htmlFor="group">
                                  New Password
                                </label>
                                <div className="input-group mb-2">
                                  <input
                                    className="form-control bg-white border-end-0"
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    style={
                                      isFormFieldValid(formik, 'newPassword')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  />
                                  <span
                                    className="input-group-text bg-transparent confirm-password-showhide"
                                    onClick={() => {
                                      setShowNewPassword(!showNewPassword);
                                    }}
                                    style={
                                      isFormFieldValid(formik, 'newPassword')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  >
                                    <i
                                      className={`fa  trigger-password pwd-toggle ${
                                        showNewPassword ? 'fa-eye' : 'fa-eye-slash'
                                      }`}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                {getFormErrorMessage(formik, 'newPassword')}
                              </div>

                              <div className="form-group form-custom-group reset-pwd-box">
                                <label className="mt-2 mb-1" htmlFor="group">
                                  Retype New Password
                                </label>
                                <div className="input-group mb-2">
                                  <input
                                    className="form-control bg-white border-end-0"
                                    id="confirmPassword"
                                    type={showRetypeNewPassword ? 'text' : 'password'}
                                    name="retypeNewPassword"
                                    value={formik.values.retypeNewPassword}
                                    onChange={formik.handleChange}
                                    style={
                                      isFormFieldValid(formik, 'retypeNewPassword')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  />
                                  <span
                                    className="input-group-text bg-transparent confirm-password-showhide"
                                    onClick={() => {
                                      setShowRetypeNewPassword(!showRetypeNewPassword);
                                    }}
                                    style={
                                      isFormFieldValid(formik, 'retypeNewPassword')
                                        ? { border: '1px solid red' }
                                        : {}
                                    }
                                  >
                                    <i
                                      className={`fa  trigger-password pwd-toggle ${
                                        showRetypeNewPassword ? 'fa-eye' : 'fa-eye-slash'
                                      }`}
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                {getFormErrorMessage(formik, 'retypeNewPassword')}
                              </div>
                            </div>
                            <div className="col-sm-7">
                              <ul className="password-cryteria mt-sm-4 ms-md-5">
                                <li>
                                  <img src="/assets/green-tick-rounded.svg" alt="" /> At least 8
                                  characters
                                </li>
                                <li>
                                  <img src="/assets/green-tick-rounded.svg" alt="" /> Include at
                                  least one uppercase letter
                                </li>
                                <li>
                                  <img src="/assets/green-tick-rounded.svg" alt="" /> Include at
                                  least one number
                                </li>
                                <li>
                                  <img src="/assets/green-tick-rounded.svg" alt="" /> Include
                                  special character (!@#$%&*)
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="setting-buttons d-flex align-items-start align-items-lg-end flex--row gap-3 mt-4">
                            <button
                              type="button"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                              onClick={formik.handleSubmit}
                            >
                              Save
                            </button>
                            <Link
                              to="/comm-voice-admin/account-information/"
                              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                              onClick={formik.resetForm}
                            >
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </Layout>
  );
}

export default AccountSecurity;
