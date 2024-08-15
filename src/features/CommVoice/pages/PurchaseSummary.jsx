/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import PuchaseNumberList from '../components/PuchaseNumberList';
import InputModal from '../../../common/components/common/InputModal';

function PurchaseSummary() {
  let total = parseFloat(0);

  const [totalEstimatedCostPerMonth, setTotalEstimatedCostPerMonth] = useState();

  const [selectedNumber, setSelectedNumber] = useState({});

  useEffect(() => {
    const temp =
      localStorage.getItem('selectedNumbers') !== null
        ? JSON.parse(localStorage.getItem('selectedNumbers'))
        : null;
    setSelectedNumber(temp);
  }, []);

  useEffect(() => {
    Object.keys(selectedNumber)?.map((key) => {
      total = parseFloat(selectedNumber[key]?.monthlyCost, 10) + parseFloat(total, 10);
    });

    setTotalEstimatedCostPerMonth(total);
  }, [selectedNumber]);

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding purchase-summury">
              <div className="d-flex gap-2 left-mob">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link
                    to="/comm-telephony/buy-virtual-number/"
                    className="d-flex justify-content-center"
                  >
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link to="/comm-telephony/buy-virtual-number/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Purchase Summary
                  </h5>
                  <p className="mb-0 text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum, magna
                    nec vestibulum molestie, lectus neque vehic
                  </p>
                </div>
              </div>
              <div className="row mt-2 mt-lg-4 mt-sm-4">
                <div className="col-lg-7 col-sm-12 scroll-custom pb-3 scroll-purchase px-3 ">
                  <div className="d-flex gap-3 bg-dark-bg-gray mb-3 justify-content-end align-items-center p-4 rounded mt-3 justify-content-between mx-1">
                    <p className="mb-0">
                      <b>12</b> Numbers Selected
                    </p>
                    <p className="mb-0">
                      Total estimated cost per month:{' '}
                      <span className="fs-16px">
                        ₹ {parseFloat(totalEstimatedCostPerMonth, 10)?.toFixed(2)}/
                      </span>
                      month
                    </p>
                  </div>

                  {Object.keys(selectedNumber)?.map((key, index) => (
                    <PuchaseNumberList
                      key={index}
                      rolesIcon="/assets/dots-icon.svg"
                      telNumber={selectedNumber[key]?.telNumber}
                      countryName={selectedNumber[key]?.countryName}
                      virtualType={`$ ${selectedNumber[key]?.monthlyCost}/month`}
                      serviceProvider="Region: Mumbai"
                      telNumberlink="tel:+91 456-234564"
                    />
                  ))}
                </div>
                <div className="col-lg-5 col-sm-12 mt-3 ps-3 scroll-custom pb-3 scroll-purchase ps-lg-5 ps-sm-0">
                  <div id="couponWrap" className="bg-dark-bg-gray p-4 rounded">
                    <label className="fw-medium fs-13px">Coupon Code</label>
                    <div className="coupon-code d-flex gap-2 align-items-center">
                      <div className="d-none">
                        <InputModal
                          label="Coupon Code"
                          id="couponCode"
                          placeholder="Please enter your coupon code"
                          type="textbox"
                          disabled=""
                        />
                      </div>

                      <div className="input-group py-12px">
                        <input
                          type="text"
                          className="form-control bg-white border-end-0 coupon-code-input"
                          aria-label="Text input with checkbox"
                          placeholder="Enter code"
                        />
                        <div className="input-group-text border-start-0 bg-white" />
                      </div>

                      <a
                        href="/#"
                        id="couponApply"
                        className="btn bg-black fw-medium fs-14px text-white px-4 py-2"
                      >
                        Apply
                      </a>
                    </div>

                    <div className="coupon-tick d-none">
                      <p className="text-dark-bg-green fw-medium mb-0 d-flex align-items-center gap-1">
                        <img src="/assets/codetick.svg" alt="" /> Coupon code applied
                      </p>
                    </div>
                  </div>

                  <div className="coupon-section p-4 rounded mt-4">
                    <div className="row gy-1">
                      <div className="col-lg-8 col-sm-8 text-end">
                        <p className="mb-0 fs-13px">Coupon applied</p>
                      </div>

                      <div className="col-lg-4 col-sm-4">
                        <h5 className="fs-16px fw-500">₹ 50</h5>
                      </div>

                      <div className="col-lg-8 col-sm-8 text-end">
                        <p className="mb-0 fs-13px">GST</p>
                      </div>

                      <div className="col-lg-4 col-sm-4">
                        <h5 className="fs-14px fw-normal">
                          <span className="fs-16px fw-500 ">₹ 216</span> (12%)
                        </h5>
                      </div>

                      <div className="col-lg-8 col-sm-8 text-end">
                        <p className="mb-0 fs-13px">Net cost per month</p>
                      </div>

                      <div className="col-lg-4 col-sm-4">
                        <h5 className="fs-14px fw-normal">
                          <span className="fs-16px fw-500 ">₹ 1,966/</span>month
                        </h5>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3">
                    Once confirm you will be charged $ 1.50 and monthly usage will be applicable to
                    the base amount
                  </p>
                  <div className="d-flex">
                    <div className="check-box">
                      <input type="checkbox" id="termsConditions" />
                      <label className="text-primary mb-0" htmlFor="termsConditions" />
                    </div>
                    <p>
                      I Agree <a href="/#">terms and conditions</a> of CommVoice and{' '}
                      <a href="/#">Terms of regulatory department</a>
                    </p>
                  </div>

                  <div className="setting-buttons d-flex align-items-end mb-4 mt-4">
                    <Link
                      to="/comm-telephony/payment/"
                      className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  disabled"
                      id="proceed"
                    >
                      Proceed
                    </Link>
                    <a
                      href="/#"
                      className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PurchaseSummary;
