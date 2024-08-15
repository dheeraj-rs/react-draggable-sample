import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../../common/components/forms/Input';
import Select from '../../../CommAdminCentre/components/common/Select';
import RadioButtonCircle from '../../../../common/components/forms/RadioButtonCircle';

function CompanyDetailsAccordion() {
  return (
    <div className="accordion accordion-custom-right mt-4" id="accordionCompany">
      <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
        <div className="accordion-header bg-white" id="headingUpdate">
          <Link
            to="/"
            className="accordion-button collapsed head d-flex align-items-center bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseCompany"
            aria-expanded="false"
            aria-controls="collapseCompany"
          >
            <div className="d-flex align-items-center">
              <span className="text-primary d-block fs-13px fw-500">Company Details</span>
            </div>
          </Link>
        </div>
        <div
          id="collapseCompany"
          className="accordion-collapse collapse show"
          aria-labelledby="headingUpdate"
          data-bs-parent="#accordionCompany"
        >
          <div className="accordion-body acc-card-content pt-0">
            <div className="row">
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="companyName"
                  label="Company name"
                  placeholder="Pixlei Technologies"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="brand"
                  label="Company brand name"
                  placeholder="Pixlei Inc"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="companyPan"
                  label="Company PAN"
                  placeholder="RFGSTB342Q"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="companyTan"
                  label="Company TAN"
                  placeholder="TFGSTB342Q"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="mt-3">GST Status</label>
                <div className="d-flex gap-3 mt-3">
                  <RadioButtonCircle id="registered" name="Registered" title="Registered" />
                  <RadioButtonCircle id="unRegistered" name="Registered" title="Unregistered" />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="gst"
                  label="GST Number"
                  placeholder="07AAGFF2194N1Z1"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Select
                  label="Business Type"
                  id="businessType"
                  value="Individual"
                  onchange={() => {}}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="businessEmail"
                  label="Business Email"
                  placeholder="companyname@domain.com"
                  disabled={false}
                />
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <Input
                  type="text"
                  id="country"
                  label="Country registered"
                  placeholder="India"
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

export default CompanyDetailsAccordion;
