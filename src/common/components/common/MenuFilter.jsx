import React from 'react';
import Checkbox from '../forms/Checkbox';

function MenuFilter({ filterTypes, setFilterTypes }) {
  return (
    <div className="position-relative">
      <div
        data-bs-toggle="collapse"
        href="#dropdown-menu-filter"
        role="button"
        aria-expanded="false"
        aria-controls="dropdown-menu-filter"
      >
        <a
          data-bs-toggle="tooltip"
          data-bs-title="Filter"
          className="d-flex align-items-center justify-content-center flex-direction-column rounded-circle text-center h-5 w-5 filter-round"
          href="/#"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src="/assets/filter-black.svg" alt="" />
        </a>
      </div>
      <div>
        <div
          id="dropdown-menu-filter"
          className="collapse  p-4 mt-4 ms-3 rounded dropdown-filter  collapse-filter"
        >
          <div className="form-group">
            <div className="d-flex flex-column gap-4">
              <Checkbox
                title="First Response"
                id="first-response"
                onClick={() => {
                  setFilterTypes({
                    // ...filterTypes,
                    isFirstResponseOnly: !filterTypes.isFirstResponseOnly,
                    isResponseDueOnly: false,
                    isNoResponseDueOnly: false,
                  });
                }}
                checked={filterTypes?.isFirstResponseOnly === true}
                onChange={() => {}}
              />
              <Checkbox
                title="Response Due"
                id="Response Due"
                onClick={() => {
                  setFilterTypes({
                    // ...filterTypes,
                    isFirstResponseOnly: false,
                    isResponseDueOnly: !filterTypes.isResponseDueOnly,
                    isNoResponseDueOnly: false,
                  });
                }}
                checked={filterTypes?.isResponseDueOnly === true}
                onChange={() => {}}
              />
              <Checkbox
                title="No Response Due"
                id="No Response Due"
                onClick={() => {
                  setFilterTypes({
                    // ...filterTypes,
                    isFirstResponseOnly: false,
                    isResponseDueOnly: false,
                    isNoResponseDueOnly: !filterTypes.isNoResponseDueOnly,
                  });
                }}
                checked={filterTypes?.isNoResponseDueOnly === true}
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuFilter;
