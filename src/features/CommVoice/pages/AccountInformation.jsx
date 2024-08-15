import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import Input from '../../../common/components/forms/Input';
import ModalButton from '../../../common/components/modals/ModalButton';
import BillingDetailsAccordion from '../components/Accordions/BillingDetailsAccordion';
import CompanyDetailsAccordion from '../components/Accordions/CompanyDetailsAccordion';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function AccountInformation() {
  return (
    <Layout title="comm chat" headerTitle="Settings">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px h-100">
              <div className="d-flex gap-2 left-mob">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link to="/support-widget/" className="d-flex justify-content-between">
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div>
                  <h5 className="fs-16px fw-500">
                    <Link to="/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    Account Information
                  </h5>
                  <p>Company basic info, address, KYC and billing address etc.</p>
                </div>
              </div>
              <hr />
              <div className="equal-pad scroll-wrap scroll-custom">
                <div className="d-flex justify-content-between bg-chat-blue align-items-center p-4 rounded mt-4">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="bg-white rounded p-3 px-3 shadow-1 position-relative">
                      <div className="rounded-circle bg-blue-light h-7px w-7px false position-absolute top-0 end-0" />
                      <img src="/assets/KYC-icon.svg" alt="" />
                    </div>
                    <div>
                      <h5>
                        KYC Documents{' '}
                        <span>
                          <p className="bg-light-orange-color rounded text-pale-orange text-uppercase fs-10px fw-bolder my-0 px-2 py-2 d-inline-flex">
                            INCOMPLETE
                          </p>
                        </span>
                      </h5>
                      <p className="mb-0">Manage and configure chat related settings</p>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      id="#"
                      className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                    >
                      Complete your KYC
                    </button>
                  </div>
                </div>

                <div className="bg-white shadow-6 rounded p-4 mt-4">
                  <div className="d-flex">
                    <div className="text-primary fw-medium fs-13px">Personal Details</div>
                  </div>
                  <div className="row">
                    <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-end gap-5">
                      <div className="col-lg-6 col-sm-12">
                        <Input
                          type="text"
                          id="email"
                          label="Email Address"
                          placeholder="useryname@example.com"
                          disabled={false}
                        />
                      </div>
                      <div className="col-lg-5 col-sm-12">
                        <ModalButton
                          className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                          id="changePasswordModal"
                        >
                          <span className="ws-nowrap">Change Password</span>
                        </ModalButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- company details accordion start --> */}
                <CompanyDetailsAccordion />

                {/* <!-- company details accordion ends --> */}

                {/* <!-- Billing details accordion start --> */}
                <BillingDetailsAccordion />

                {/* <!-- Billing details accordion ends --> */}

                {/* <!-- point of contact section starts --> */}
                <div className="bg-white shadow-6 rounded p-4 mt-4">
                  <div className="d-flex">
                    <div className="text-primary fw-medium fs-13px">Point of Contact</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <Input
                        type="text"
                        id="email"
                        label="Email Address"
                        placeholder="useryname@example.com"
                        disabled={false}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <Input
                        type="text"
                        id="number"
                        label="Phone Number"
                        placeholder="+12345678907"
                        disabled={false}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- point of contact section ends --> */}
                {/* <!-- portal  section starts --> */}
                <div className="bg-white shadow-6 rounded p-4 mt-4">
                  <div className="d-flex">
                    <div className="text-primary fw-medium fs-13px">Portal Authority</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <Input
                        type="text"
                        id="authority"
                        label="Authority Name"
                        placeholder="Steven Paul"
                        disabled={false}
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <Input
                        type="text"
                        id="email3"
                        label="Email Address"
                        placeholder="useryname@example.com"
                        disabled={false}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- portal section ends --> */}
                {/* <!-- call price  section starts --> */}
                <div className="bg-white shadow-6 rounded p-4 mt-4">
                  <div className="d-flex">
                    <div className="text-primary fw-medium fs-13px">Call Price</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <Input
                        type="text"
                        id="price"
                        label="Price Per Call (In $)"
                        placeholder="100"
                        disabled={false}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- call price section ends --> */}
                <div className="d-flex mt-4">
                  <button
                    type="button"
                    id="accountInformationSave"
                    className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="accountInformationCancel"
                    className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                  >
                    Cancel
                  </button>
                  {/* <!-- <ButtonBlack onClick="" text="Save" />
                <ButtonWhite onClick="" text="cancel" /> --> */}
                  <div className="ms-auto">
                    <button
                      type="button"
                      id="deleteAccount"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteAccountModal"
                      className="btn bg-white border border-1 border-border-red text-black ms-3 text-red"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- change password  Modal modal  --> */}

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
            <span className="input-group-text bg-transparent confirm-password-showhide">
              {/* <!-- <i
            className="fa fa-eye-slash trigger-password pwd-toggle"
            aria-hidden="true"></i> --> */}
            </span>
          </div>
        </div>

        <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
          <button
            id="updatePasswordButton"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
          >
            Update Password{' '}
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </Modal>
      {/* <!--  delete account modal starts--> */}
      <Modal width="429px" id="deleteAccountModal">
        <div className="d-flex justify-content-between">
          <p className="fs-14px text-primary fw-medium mb-24px">Delete contacts</p>
          <ModalClose />
        </div>
        <p className="fs-12px text-primary mb-0">
          This action will <span className="text-primary fw-medium">Delete</span>the{' '}
          <span className="fw-medium">Account details</span> permanently.
        </p>
        <Input
          label="To confirm this action please type Delete"
          id="delete"
          placeholder="Type “Delete”"
          type="textbox"
          disabled={false}
        />

        <div className="d-flex justify-content-center gap-3 mt-5">
          <button
            type="button"
            id="deleteAccountBtn"
            className="btn bg-faded-red text-white px-4  py-12px"
            data-bs-dismiss="modal"
          >
            Delete Contact
          </button>
          <ButtonWhiteModalCancel text="cancel" />
        </div>
      </Modal>

      {/* <!-- delete account modal ends --> */}

      {/* <!-- toast password update --> */}
      <ToastSuccess id="updatePasswordToastMsg">
        <span>
          {' '}
          Password <span className="fw-bolder">updated </span> successfully
        </span>
      </ToastSuccess>
      {/* <!-- toast save account info --> */}
      <ToastSuccess id="accountSaveToastMsg">
        <span>
          {' '}
          Account infortmation details <span className="fw-bolder">saved </span> successfully
        </span>
      </ToastSuccess>
      {/* <!-- toast cancel account info --> */}
      <ToastSuccess id="accountCancelToastMsg">
        <span>
          {' '}
          Account infortmation changes <span className="fw-bolder">discarded </span> successfully
        </span>
      </ToastSuccess>
      {/* <!-- toast deleted account info --> */}
      <ToastSuccess id="accountdeleteToastMsg">
        <span>
          {' '}
          Account <span className="fw-bolder">deleted </span> successfully
        </span>
      </ToastSuccess>
    </Layout>
  );
}

export default AccountInformation;
