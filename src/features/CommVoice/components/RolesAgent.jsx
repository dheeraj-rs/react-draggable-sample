import React from 'react';
import { Link } from 'react-router-dom';

function RolesAgent() {
  return (
    <div className="label-accordion mb-3">
      <div className="accordion accordion-custom-right shadow-6 p-4  rounded" id="accordionAgent">
        <div className="accordion-item acc-card bg-white border-0 fs-13px position-relative">
          <div className="accordion-header bg-white d-flex align-items-center" id="headingUpdate">
            <div className="w-100">
              <input id="customerSupport5" className="radio-tick" name="radio-label" type="radio" />
              <label htmlFor="customerSupport5" className="radio-tick-label text-primary">
                <img className="px-3" src="/assets/supervisor-gray.svg" alt="" />
                Product agent
              </label>
            </div>
            <Link
              to="/"
              className="accordion-button collapsed head d-flex align-items-center bg-white p-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#product-agent"
              aria-expanded="false"
              aria-controls="product-agent"
            />
          </div>
          <div
            id="product-agent"
            className="accordion-collapse collapse"
            aria-labelledby="headingUpdate"
            data-bs-parent="#accordionAgent"
          >
            <div className="accordion-body acc-card-content pt-0 pb-0 ps-5 pe-0">
              <div className="d-flex align-item-center p-12px  rounded mb-3">
                <p className="mb-0 text-secondary">
                  A support agent is a person who works for a company and provides support to the
                  customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesAgent;
