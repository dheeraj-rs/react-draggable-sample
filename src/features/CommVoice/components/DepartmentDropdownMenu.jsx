import React from 'react';
import { Link } from 'react-router-dom';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Checkbox from '../../../common/components/forms/Checkbox';

function DepartmentDropDownMenu() {
  return (
    <div>
      <div>
        <Link
          data-bs-toggle="dropdown"
          aria-expanded="false"
          to="/"
          className="d-flex align-items-center text-primary bg-white px-sm-5 px-10px px-lg-4 py-12px rounded"
        >
          <i className="me-2">
            <span>
              <img src="/assets/briefcase-small.svg" alt="# " />
            </span>
          </i>
          <span>Departments -</span>
          <span className="fw-medium">3</span>
        </Link>
      </div>
      <ul className="dropdown-menu scroll-custom rounded shadow-6 p-4 drop-assign show">
        <div className="d-flex gap-2 align-items-center mb-4">
          <SearchWithBorder
            placeholderText="Search department"
            onChange={() => {}}
            clearBtn={() => {}}
          />
          <div
            role="button"
            className="text-center text-uppercase bg-dark rounded close-btn-img d-flex p-2"
          >
            <img src="/assets/tick-small.svg" alt="" />
          </div>

          <div
            role="button"
            className="ms-2 text-center popover-border text-uppercase bg-white rounded close-group tick-btn-img d-flex p-2"
            id="close-group"
          >
            <img src="/assets/clos-x.svg" alt="" />
          </div>
        </div>
        <div className="form-group text-start">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <Link to="/">
                <img className="pe-1" src="/assets/plus-circle-add.svg" alt="" /> Add department
              </Link>
            </div>
          </div>

          <div>
            <div className="mt-3">
              <div className="d-flex mb-3">
                <div>
                  <Checkbox id="account" title="" />
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Accounts</h6>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div>
                  <Checkbox id="customer-support" title="" />
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Marketing</h6>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div>
                  <Checkbox id="escalations" title="" />
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Sales</h6>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div>
                  <Checkbox id="forerun-group" title="" />
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Customer SUpport</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default DepartmentDropDownMenu();
