import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import Input from '../../../common/components/forms/Input';
import Checkbox from '../../../common/components/forms/Checkbox';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import ToastSuccess from '../../../common/components/toast/ToastSucess';

function Payment() {
  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link
                    to="/comm-telephony/purchase-summary/"
                    className="d-flex justify-content-center"
                  >
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link to="/comm-telephony/purchase-summary/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Payment
                  </h5>
                  <p className="mb-0 text-secondary d-none d-lg-block d-sm-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum, magna
                    nec vestibulum molestie, lectus neque vehicula enim,.
                  </p>
                </div>
              </div>
              <div className="scroll-custom pb-3 scroll-payment mt-0 pt-3 mt-lg-4 mt-sm-4">
                <div className="d-flex row">
                  <div className="col-lg-3 col-sm-12 payment-tab-heading">
                    <div
                      className="nav flex-column nav-pills me-3 payment-wrap shadow-10 rounded"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        className="nav-link nav-link-payment active bg-light-gray-color-bg"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-2 col-12 d-flex align-items-center justify-content-center">
                            <img src="/assets/dollar-icon.svg" alt="" />
                          </div>
                          <div className="col-lg-7 d-none d-lg-block d-sm-none payment-option">
                            <h6>Credit Packs</h6>
                            <p>Balance: $ 5000</p>
                          </div>

                          <div className="col-lg-3 col-6 d-flex justify-content-end">
                            <div className="payment-active-btn">
                              <img src="/assets/export-black-round.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </button>
                      <button
                        className="nav-link nav-link-payment bg-light-gray-color-bg"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-2 col-12 d-flex align-items-center justify-content-center">
                            <img src="/assets/MasterCard.svg" alt="" />
                          </div>
                          <div className="col-lg-7 d-none d-lg-block d-sm-none payment-option">
                            <h6 className="mb-0">Credit/debit card</h6>
                          </div>

                          <div className="col-lg-3 col-6 d-flex justify-content-end">
                            <div className="payment-active-btn d-none">
                              <img src="/assets/export-black-round.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </button>
                      <button
                        className="nav-link nav-link-payment bg-light-gray-color-bg"
                        id="v-pills-messages-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-messages"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-messages"
                        aria-selected="false"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-2 col-12 d-flex align-items-center justify-content-center">
                            <img src="/assets/paypal.svg" alt="" />
                          </div>
                          <div className="col-lg-7 d-none d-lg-block d-sm-none payment-option">
                            <h6>PayPal</h6>
                            <p>Balance: $ 1000</p>
                          </div>

                          <div className="col-lg-3 col-6 d-flex justify-content-end">
                            <div className="payment-active-btn d-none">
                              <img src="/assets/export-black-round.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </button>
                      <button
                        className="nav-link nav-link-payment bg-light-gray-color-bg"
                        id="v-pills-settings-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings"
                        aria-selected="false"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-2 col-12 d-flex align-items-center justify-content-center">
                            <img src="/assets/upiicon.svg" alt="" />
                          </div>
                          <div className="col-lg-7 d-none d-lg-block d-sm-none payment-option">
                            <h6>UPI Payment</h6>
                            <p className="fs-13px">Available in India only</p>
                          </div>

                          <div className="col-lg-3 col-6 d-flex justify-content-end">
                            <div className="payment-active-btn d-none">
                              <img src="/assets/export-black-round.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        className="nav-link nav-link-payment bg-light-gray-color-bg"
                        id="netBanking"
                        data-bs-toggle="pill"
                        data-bs-target="#netBankingTab"
                        type="button"
                        role="tab"
                        aria-controls="netBankingTab"
                        aria-selected="false"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-2 col-12 d-flex align-items-center justify-content-center">
                            <img src="/assets/netbanking.svg" alt="" />
                          </div>
                          <div className="col-lg-7 d-none d-lg-block d-sm-none payment-option">
                            <h6 className="mb-0">Net Banking</h6>
                          </div>

                          <div className="col-lg-3 col-6 d-flex justify-content-end">
                            <div className="payment-active-btn d-none">
                              <img src="/assets/export-black-round.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        className="nav-link nav-link-payment bg-light-gray-color-bg"
                        id="cryptocurrencyTab"
                        data-bs-toggle="pill"
                        data-bs-target="#cryptocurrency"
                        type="button"
                        role="tab"
                        aria-controls="cryptocurrencyTab"
                        aria-selected="false"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-2 col-12 d-flex align-items-center justify-content-center">
                            <img src="/assets/crypto.svg" alt="" />
                          </div>
                          <div className="col-lg-7 d-none d-lg-block d-sm-none payment-option">
                            <h6>Cryptocurrency</h6>
                            <p>Available: USDT</p>
                          </div>

                          <div className="col-lg-3 col-6 d-flex justify-content-end">
                            <div className="payment-active-btn d-none">
                              <img src="/assets/export-black-round.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-9 col-sm-12 px-lg-3 px-3 px-sm-1">
                    <div className="shadow-10 rounded py-3 pt-4 tab-content-payment">
                      <div className="tab-content credit-pack" id="v-pills-tabContent">
                        {/* <!-- Credit packs start --> */}
                        <div
                          className="tab-pane fade show active"
                          id="v-pills-home"
                          role="tabpanel"
                          aria-labelledby="v-pills-home-tab"
                        >
                          <h5 className="fs-15px text-primary mb-3">Credit Packs</h5>
                          <div className="bg-light-pale-orange p-4 rounded d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="fs-14px">Credit Pack Balance</h5>
                              <p className="mb-0 text-secondary">
                                Last updated: <span className="fw-500">1 month ago</span>
                              </p>
                            </div>

                            <div>
                              <h4 className="fs-21px">$ 5000</h4>
                              <p className="mb-0 text-secondary">(5000 Credits)</p>
                            </div>
                          </div>

                          <div className="coupon-section p-4 rounded mt-3 mb-4">
                            <div className="row">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Gross amount</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px fw-500">₹ 1,966</h5>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Service Charge</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px">₹ 0.00</h5>
                              </div>
                            </div>
                            <div className="row mt-3 bg-thin-green rounded p-3">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Total Amount Payable</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-19px fw-500">₹ 1,966</h5>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex bg-orange-light p-4 rounded mb-4 gap-3">
                            <div>
                              <img src="/assets/exportred.svg" alt="" />
                            </div>
                            <div>
                              <h6 className="text-primary">Insufficient Credit Pack Balance</h6>
                              <p className="mb-0 text-secondary">
                                Sorry you don’t have sufficient credit pack balance to purchase.
                                please Choose any other payment method to proceed.
                              </p>
                            </div>
                          </div>

                          <div className="d-flex">
                            <div className="check-box">
                              <input type="checkbox" id="termsConditions" />
                              <label className="text-primary mb-0" htmlFor="termsConditions" />
                            </div>
                            <p>
                              I Agree <a href="/#">terms and conditions</a> of CommVoice and
                              <a href="/#">Terms of regulatory department</a>
                            </p>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                            <Link
                              to="/comm-telephony/payment/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  disabled"
                              id="proceed"
                            >
                              Pay Now
                            </Link>
                            <a
                              href="/#"
                              className="d-flex align-items-center fw-medium fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>

                        {/* <!-- Credit packs end --> */}

                        {/* <!-- Credit card start --> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-pills-profile-tab"
                        >
                          <h5 className="fs-15px text-primary mb-3">Credit/debit card</h5>
                          <div className="coupon-section p-4 rounded mt-3 mb-4">
                            <div className="row">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Gross amount</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px">₹ 1,966</h5>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Service Charge</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-16px">₹ 0.00</h5>
                              </div>
                            </div>
                            <div className="row mt-3 bg-thin-green rounded p-3">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Total Amount Payable</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-19px mb-0">₹ 1,966</h5>
                              </div>
                            </div>
                          </div>
                          <label className="mt-2 mb-1">Card number</label>
                          <div className="input-group mb-4">
                            <input
                              type="text"
                              className="form-control bg-white border-end-0"
                              aria-label="Text input with checkbox"
                              placeholder="XXXX   XXXX   XXXX   XXXX"
                            />
                            <div className="input-group-text border-start-0 bg-white">
                              <img src="/assets/visa-icon.svg" alt="" />
                            </div>
                          </div>

                          <Input
                            label="Name on the card"
                            id="couponCode"
                            placeholder=""
                            type="textbox"
                            disabled=""
                            value="Enter the name on the card"
                          />
                          <div className="row mt-3">
                            <div className="col-lg-6">
                              <div className="form-group w-100 mt-3">
                                <label className="text-primary mb-1" htmlFor="couponCode">
                                  Expired on
                                </label>
                                <input
                                  type="text"
                                  className="form-control bg-white"
                                  aria-label=""
                                  placeholder="MM/YYYY"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <Input
                                label="CVV"
                                id="couponCode"
                                placeholder="Enter CVV number"
                                type="textbox"
                                disabled=""
                                value=""
                              />
                              <p className="mb-0 mt-2">We don’t save your CVV</p>
                            </div>
                          </div>
                          <div className="d-flex mt-4">
                            <Checkbox id="cardBox" title="" />
                            <p>
                              I Agree <a href="/#">terms and conditions</a> of CommVoice and
                              <a href="/#">Terms of regulatory department</a>
                            </p>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                            <Link
                              to="/comm-telephony/payment/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                              id="proceed"
                            >
                              Pay Now
                            </Link>
                            <a
                              href="/#"
                              className="d-flex align-items-center fw-medium fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>

                        {/* <!-- Credit card end --> */}

                        {/* <!-- paypal --> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-messages"
                          role="tabpanel"
                          aria-labelledby="v-pills-messages-tab"
                        >
                          <h5 className="fs-15px text-primary mb-3">PayPal</h5>
                          <p>With a PayPal account, you can do the payment</p>
                          <div className="coupon-section p-4 rounded mt-3 mb-4">
                            <div className="row">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Gross amount</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px">₹ 1,966</h5>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Service Charge</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-16px">₹ 0.00</h5>
                              </div>
                            </div>
                            <div className="row mt-3 bg-thin-green rounded p-3">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Total Amount Payable</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-19px mb-0">₹ 1,966</h5>
                              </div>
                            </div>
                          </div>

                          <Input
                            label="Email or Mobile number"
                            id="couponCode"
                            placeholder=""
                            type="textbox"
                            disabled=""
                            value="name@example.com"
                          />
                          <div className="form-group form-custom-group reset-pwd-box mt-3">
                            <label className="mt-2" htmlFor="group">
                              New Password
                            </label>
                            <div className="input-group mb-3">
                              <input
                                className="form-control bg-white border-end-0"
                                id="confirmPassword"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                              />
                              <span className="input-group-text bg-transparent confirm-password-showhide">
                                <i
                                  className="fa fa-eye-slash trigger-password pwd-toggle"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </div>

                          <div className="d-flex mt-4">
                            <a href="/#">Forgot Password</a>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                            <Link
                              to="/comm-telephony/payment/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                              id="login"
                            >
                              Login
                            </Link>
                            <a
                              href="/#"
                              className="d-flex align-items-center fw-medium fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>

                        {/* <!-- paypal end --> */}

                        {/* <!-- UPI payment --> */}
                        <div
                          className="tab-pane fade"
                          id="v-pills-settings"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab"
                        >
                          <h5 className="fs-15px text-primary mb-3">UPI Payment</h5>

                          <label className="mt-2 mb-2">UPI ID</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control bg-white border-end-0"
                              aria-label="Text"
                              placeholder="2456789463@ybl"
                            />
                            <div className="input-group-text border-start-0 bg-white">
                              {/* <!-- @ybl --> */}
                            </div>
                          </div>
                          <div className="mt-4">
                            <h6 className="fs-13px text-secondary bg-teal-green p-3 rounded">
                              <img src="/assets/codetick.svg" alt="" /> UPI ID verified
                              <b>Mahin Sharma</b>
                              <img src="/assets/phonepe.svg" alt="" />
                            </h6>
                          </div>

                          <div className="coupon-section p-4 rounded mt-3 mb-4">
                            <div className="row">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Gross amount</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px">₹ 1,966</h5>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Service Charge</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-16px">₹ 0.00</h5>
                              </div>
                            </div>
                            <div className="row mt-3 bg-thin-green rounded p-3">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Total Amount Payable</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-19px mb-0">₹ 1,966</h5>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-4">
                            <Checkbox id="" title="" />
                            <p>
                              I Agree <a href="/#">terms and conditions</a> of CommVoice and
                              <a href="/#">Terms of regulatory department</a>
                            </p>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                            <Link
                              to="/comm-telephony/payment/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                              id="proceed"
                            >
                              Pay Now
                            </Link>
                            <a
                              href="/#"
                              className="d-flex align-items-center fw-medium fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>

                        {/* <!-- UPI payment end --> */}

                        {/* <!-- netbanking --> */}

                        <div
                          className="tab-pane fade"
                          id="netBankingTab"
                          role="tabpanel"
                          aria-labelledby="netBanking"
                        >
                          <h5 className="fs-15px text-primary mb-3">Net Banking</h5>

                          <label className="mt-2 mb-2">Select bank</label>
                          <select className="form-select bg-white" aria-label="Select bank">
                            <option selected>Select bank</option>
                            <option value="1">SBI</option>
                            <option value="2">Axis</option>
                            <option value="3">Kodak</option>
                          </select>

                          <p className="mt-3 mb-3">
                            <span className="fw-500">Note:</span> We will redirect you to the bank
                            you have chosen above. Once the bank verifies your net banking
                            credentials, we will proceed with your payment.
                          </p>
                          <div className="coupon-section p-4 rounded mt-3 mb-4">
                            <div className="row">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Gross amount</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px">₹ 1,966</h5>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Service Charge</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-16px">₹ 0.00</h5>
                              </div>
                            </div>
                            <div className="row mt-3 bg-thin-green rounded p-3">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Total Amount Payable</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-19px mb-0">₹ 1,966</h5>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-4">
                            <Checkbox id="" title="" />
                            <p>
                              I Agree <a href="/#">terms and conditions</a> of CommVoice and
                              <a href="/#">Terms of regulatory department</a>
                            </p>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                            <Link
                              to="/comm-telephony/payment/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                              id="proceed"
                            >
                              Pay Now
                            </Link>
                            <a
                              href="/#"
                              className="d-flex align-items-center fw-medium fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>

                        {/* <!-- end --> */}

                        {/* <!-- Cryptocurrency --> */}

                        <div
                          className="tab-pane fade"
                          id="cryptocurrency"
                          role="tabpanel"
                          aria-labelledby="cryptocurrencyTab"
                        >
                          <h5 className="fs-15px text-primary mb-3">Cryptocurrency (USDT)</h5>
                          <div className="coupon-section p-4 rounded mt-3 mb-4">
                            <div className="row">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Gross amount</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-15px">₹ 1,966</h5>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Service Charge</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-16px">₹ 0.00</h5>
                              </div>
                            </div>
                            <div className="row mt-3 bg-thin-green rounded p-3">
                              <div className="col-lg-8 col-sm-8 text-end col-8">
                                <p className="mb-0 fs-13px">Total Amount Payable</p>
                              </div>

                              <div className="col-lg-4 col-sm-4 col-4">
                                <h5 className="fs-19px mb-0">₹ 1,966</h5>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex flex-column align-items-center">
                            <div className="mt-3 mb-3">
                              <img src="/assets/crypto-img.svg" alt="" />
                            </div>
                            <div className="d-flex mt-4 align-item-center gap-3 mb-5">
                              <img src="/assets/loading-icon.svg" alt="" />
                              <p className="mb-0">Detecting Transaction</p>
                            </div>
                          </div>

                          <div className="d-flex mt-4">
                            <Checkbox id="" title="" />
                            <p>
                              I Agree <a href="/#">terms and conditions</a> of CommVoice and
                              <a href="/#">Terms of regulatory department</a>
                            </p>
                          </div>

                          <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                            <Link
                              to="/comm-telephony/payment/"
                              className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                              id="proceed"
                            >
                              Pay Now
                            </Link>
                            <a
                              href="/#"
                              className="d-flex align-items-center fw-medium fs-14px justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                          {/* <!-- Cryptocurrency --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- delete modal starts--> */}

              <Modal width="450px" id="deleteRoleModal">
                <div className="d-flex justify-content-between">
                  <p className="fs-16px text-primary fw-medium mb-24px">Delete Role</p>
                  <ModalClose />
                </div>
                <p className="fs-13px text-primary mb-3">
                  This action will <span className="text-primary fw-medium">Delete</span> the role
                  <span className="fw-medium"> Custom role 1.</span>from the system .
                </p>

                <Input
                  label="To confirm this action please type “Delete”"
                  id="delete"
                  placeholder="Type “Delete”"
                  type="textbox"
                  disabled={false}
                />

                <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
                  <button
                    type="button"
                    id="deleteToast"
                    className="btn bg-faded-red text-white px-4 py-12px"
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                  <ButtonWhiteModalCancel text="Cancel" />
                </div>
              </Modal>
              {/* <!-- delete modal ends --> */}
              {/* <!-- Delete group toast --> */}
              <ToastSuccess id="deleteToastMsg">
                <span>
                  <span className="fw-bolder">Role deleted :</span> you have successfully deleted
                  role Custom role 1
                </span>
              </ToastSuccess>
              {/* <!-- clear group toast --> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
