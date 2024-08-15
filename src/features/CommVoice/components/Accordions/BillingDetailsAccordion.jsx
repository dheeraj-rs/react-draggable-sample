import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../../common/components/forms/Input';
import Select from '../../../CommAdminCentre/components/common/Select';

function BillingDetailsAccordion() {
  return (
    <div className="accordion accordion-custom-right mt-4" id="accordionBilling">
      <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
        <div className="accordion-header bg-white" id="headingUpdate">
          <Link
            to="/"
            className="accordion-button collapsed head d-flex align-items-center bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseBilling"
            aria-expanded="false"
            aria-controls="collapseBilling"
          >
            <div className="d-flex align-items-center">
              <span className="text-primary d-block fs-13px fw-500">Billing Details</span>
            </div>
          </Link>
        </div>
        <div
          id="collapseBilling"
          className="accordion-collapse collapse show"
          aria-labelledby="headingUpdate"
          data-bs-parent="#accordionBilling"
        >
          <div className="accordion-body acc-card-content pt-0">
            <div className="row">
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="building"
                  label="Building/Flat No."
                  placeholder="Pixlei Inc, Floor 2"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="premises"
                  label="Premises Name"
                  placeholder="Pixlei Inc"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="Street"
                  label="Street"
                  placeholder="Ernakulam"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="Locality"
                  label="Locality"
                  placeholder="Ernakulam"
                  disabled={false}
                />
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <Input type="text" id="city" label="City" placeholder="Kochi" disabled={false} />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input type="text" id="state" label="state" placeholder="Kerala" disabled={false} />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Select label="Country" id="country" value="India" onchange={() => {}} />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="pincode"
                  label="Pincode"
                  placeholder="123456"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="billingEmail"
                  label="Billing Email Address"
                  placeholder="Billing Email Address"
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingDetailsAccordion;
