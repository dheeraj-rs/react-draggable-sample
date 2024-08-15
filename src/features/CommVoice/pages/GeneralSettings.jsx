import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import Select from '../../CommAdminCentre/components/common/Select';
import GeneralSettingsTab from '../components/GeneralSettingsTab';
import RequestSmsTemplateModal from '../components/Modals/RequestSmsTemplateModal';
import ResetPasswordModal from '../components/Modals/ResetPasswordModal';
import SenderOffCanvas from '../components/OffCanvas/SenderOffCanvas';
import SmsTemplateIdOffCanvas from '../components/OffCanvas/SmsTemplateIdOffCanvas';
import SmsModal from '../components/Modals/SmsModal';
import ButtonToast from '../../../common/components/toast/ButtonToast';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function GeneralSettings() {
  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px h-100">
              <div className="d-flex gap-2 left-mob">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a href="/support-widget/" className="d-flex justify-content-between">
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div>
                  <h5 className="fs-16px fw-500">
                    <Link to="/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    General Settings
                  </h5>
                  <p>Customize the applications with advanced settings.</p>
                </div>
              </div>
              <hr />
              <div className="equal-pad scroll-wrap scroll-custom">
                <div className="bg-white rounded">
                  {/* <!-- tab starts --> */}
                  <GeneralSettingsTab />

                  {/* <!-- tab ends --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Request SMS template  Modal starts  --> */}

      <RequestSmsTemplateModal />
      {/* <!-- Request SMS template  Modal ends  --> */}
      {/* <!-- reset password  Modal starts  --> */}

      <ResetPasswordModal />

      {/* <!-- offcanvas sender id --> */}

      <SenderOffCanvas />

      {/* <!--
sender ofcanvas end --> */}

      {/* <!-- offcanvas SMS tempalte id --> */}

      <SmsTemplateIdOffCanvas />

      {/* <!--
SMS template ofcanvas end --> */}

      {/* <!-- sms  modal --> */}

      <SmsModal />
      {/* <!-- end --> */}

      {/* <!-- offcanvas agents and password --> */}

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
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* <!--
SMS template ofcanvas end --> */}
      {/* <!-- toast save account info --> */}
      <ToastSuccess id="generalaccountSubmitToastMsg">
        <span>
          Account infortmation details <span className="fw-bolder">Submit</span> successfully
        </span>
      </ToastSuccess>
      {/* <!-- toast cancel account info --> */}
      <ToastSuccess id="generalaccountCancelToastMsg">
        <span>
          Account infortmation changes <span className="fw-bolder">discarded</span> successfully
        </span>
      </ToastSuccess>

      {/* <!-- Template request --> */}
      <ToastSuccess id="TempalteRequstmsg">
        <span>
          Template Request <span className="fw-bolder">Submited</span> successfully
        </span>
      </ToastSuccess>

      {/* <!-- toast password reset  --> */}
      <ToastSuccess id="PasswordResetmsg">
        <span>
          Password <span className="fw-bolder">Reseted</span> successfully
        </span>
      </ToastSuccess>

      {/* <!-- toast save account info --> */}
      <ToastSuccess id="AgentDeparmentSavemsg">
        <span>
          Account infortmation details <span className="fw-bolder">saved</span> successfully
        </span>
      </ToastSuccess>
      {/* <!-- toast cancel account info --> */}
      <ToastSuccess id="AgentDeparmentToastMsg">
        <span>
          Account infortmation changes <span className="fw-bolder">discarded</span> successfully
        </span>
      </ToastSuccess>
    </Layout>
  );
}

export default GeneralSettings;
