import React, { useEffect, useState } from 'react';

function Filter({ children, setSelectedName, setSelectedNumber }) {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const handleClear = () => {
    setSelectedName('All');
    setSelectedNumber('123');
    setIsFilterApplied(false);
  };

  const handleApply = () => {
    setIsFilterApplied(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('roleSelection');

      if (dropdown && !dropdown.contains(event.target)) {
        setIsFilterApplied(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div id="roleSelection" className={`filter-wrap ${isFilterApplied ? 'd-none' : ''}`}>
        <a
          href="/#"
          className={`filter-btn p-10px fw-medium rounded-3 border role-selection ${
            isFilterApplied ? 'd-none' : ''
          }`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          <img src="/assets/black-filter.svg" alt="" />
        </a>

        <ul className="dropdown-menu p-4" style={{ width: '215px' }}>
          <div className="d-flex flex-column">{children}</div>
          <div className="d-flex flex-column">
            <div className="setting-buttons d-flex align-items-center mt-2">
              <button
                id="applyBtn"
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                onMouseDown={handleApply}
              >
                Apply
              </button>
              <a
                href="#/"
                type="button"
                id="roleCancel"
                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
                onMouseDown={handleClear}
              >
                Clear
              </a>
            </div>
          </div>
        </ul>
      </div>
      <div id="selectedRole" className={`${isFilterApplied ? '' : 'd-none'}`}>
        <a
          href="#/"
          className="p-10px rounded text-blue-active border border-blue-active position-relative"
          onClick={() => setIsFilterApplied(false)}
        >
          <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>

          <img id="clearFilter" src="/assets/close-blue.svg" alt="" />
        </a>
      </div>
    </div>
  );
}

export default Filter;
