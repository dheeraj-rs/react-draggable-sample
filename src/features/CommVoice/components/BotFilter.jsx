import React from 'react';
import Selectbox from './Selectbox';

function BotFilter({ isFilterApplied, setIsFilterApplied }) {
  return (
    <div>
      <div id="roleSelection" className={isFilterApplied ? 'd-none' : ''}>
        <a
          href="/#"
          className="filter-btn p-10px fw-medium rounded-3 border role-selection"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          <span className="filter-text">Filter</span>
          <img className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3" src="/assets/black-filter.svg" alt="" />
        </a>

        <ul className="dropdown-menu p-4" style={{ width: '215px' }}>
          <div className="d-flex flex-column">
            <div className="mb-3">
              <Selectbox
                label="Bot Status"
                options={['All', 'Drafted', 'Published', 'Unpublished']}
                onSelect={() => {}}
              />
            </div>

            <div className="mb-3">
              <Selectbox
                label="Widget Type"
                options={['Live chat widget', 'Guided chat widget', 'Messaging channel']}
                onSelect={() => {}}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-end mt-2 mb-1">
              <button
                id="applyBtn"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                onClick={() => {
                  setIsFilterApplied(true);
                }}
              >
                Apply
              </button>
              <a
                href="/#"
                type="button"
                id="roleCancel"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
              >
                Clear
              </a>
            </div>
          </div>
        </ul>
      </div>

      <div id="selectedRole" className={isFilterApplied ? '' : 'd-none'}>
        <a
          href="/#"
          className="p-10px rounded text-blue-active border border-blue-active position-relative"
          onClick={(e) => {
            e.preventDefault();
            setIsFilterApplied(false);
          }}
        >
          <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
          <span className="filter-text">Filter</span>
          <img id="clearFilter" className="ps-0 ps-md-4" src="/assets/close-blue.svg" alt="" />
        </a>
      </div>
    </div>
  );
}

export default BotFilter;
