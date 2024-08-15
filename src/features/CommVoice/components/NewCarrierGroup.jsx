import React from 'react';
import CheckBoxCheck from '../../../common/components/common/CheckBoxCheck';
import CheckboxTick from '../../../common/components/forms/CheckBoxTick';
import Checkbox from '../../../common/components/forms/Checkbox';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Input from '../../../common/components/forms/Input';

function NewCarrierGroup() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRightCarrierGroup"
      aria-labelledby="offcanvasRightCarrierGroupLabel"
    >
      <div className="offcanvas-header p-23px pb-10px justify-content-between align-items-center">
        <div>
          <p className="fs-16px text-primary fw-medium mb-0">New Carrier Group</p>
          <p className="mb-0">Organize the carriers with a carrier group</p>
        </div>
        <div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
      </div>
      <div className="offcanvas-body p-23px pt-0px">
        <div>
          <Input
            label="Carrier Group Name"
            id="property"
            placeholder="Contact details"
            type="text"
            disabled={false}
          />
        </div>

        <div>
          <div className="d-flex flex-column mt-3">
            <p className="mb-0 text-secondary fw-medium fs-13px mb-2">Carrier List</p>
            <div className="dropdown-center">
              <button
                className="form-control w-100 form-select text-start bg-white py-12px mb-4"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Choose carriers
              </button>

              <div id="selectedCarriers">
                <div>
                  <p className="text-primary">
                    <span className="fw-medium">4</span> Carriers selected
                  </p>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <div
                    className="alert alert-dismissible bg-secondary-light-blue p-1 fade show"
                    role="alert"
                  >
                    Virgin Banglore
                    <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                      <img src="/assets/close-alert.svg" alt="" />
                    </a>
                  </div>

                  <div
                    className="alert alert-dismissible bg-secondary-light-blue p-1 fade show"
                    role="alert"
                  >
                    Virgin Cochin
                    <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                      <img src="/assets/close-alert.svg" alt="" />
                    </a>
                  </div>
                  <div
                    className="alert alert-dismissible bg-secondary-light-blue p-1 fade show"
                    role="alert"
                  >
                    Virgin Mumbai
                    <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                      <img src="/assets/close-alert.svg" alt="" />
                    </a>
                  </div>
                  <div
                    className="alert alert-dismissible bg-secondary-light-blue p-1 fade show"
                    role="alert"
                  >
                    Virgin Hyderabad
                    <a href="/#" data-bs-dismiss="alert" aria-label="Close">
                      <img src="/assets/close-alert.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <ul className="dropdown-menu shadow-6 p-3 w-100">
                <div className="w-100 w-md-auto mt-3 mb-3">
                  <SearchWithBorder
                    placeholderText="Search carrier"
                    onChange={() => {}}
                    clearBtn={() => {}}
                  />
                </div>
                <div className="scroll-custom scroll-custom-flow">
                  <div className="mb-3">
                    <Checkbox title="Virgin Banglore" id="jpg" />
                  </div>

                  <div className="mb-3">
                    <CheckBoxCheck title="Virgin Cochin" id="jpeg" />
                  </div>
                  <div className="mb-3">
                    <Checkbox title="Virgin Mumbai" id="bmp" />
                  </div>
                  <div className="mb-3">
                    <CheckBoxCheck title="Reliance Chennai" id="docx" />
                  </div>
                  <div className="mb-3">
                    <CheckboxTick title="Virgin Hyderabad" id="xlsx" />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 border-0 ps-0 mt-3">
          <button
            id="addPropertyButton"
            data-bs-dismiss="modal"
            type="button"
            className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
          >
            Create group
          </button>
          <button
            type="button"
            className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
            data-bs-dismiss="offcanvas"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCarrierGroup;
