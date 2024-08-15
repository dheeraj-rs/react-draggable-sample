import React from 'react';
import moment from 'moment';

import CarrierPlanList from './CarrierPlanList';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';
import Pagination from './pagination/Pagination';
import NoMatchingRecords from '../../../common/components/NoMatchingRecords';

function VendorCarrierPlanIncoming({
  paginatedCarrierIncomingData,
  handlePaginationFunctionIncoming,
  isFilterAppliedIncoming,
  setIsFilterAppliedIncoming,
  setShow,
  setSearchKeyIncoming,
  searchKeyIncoming,
  normalizedCarrierIncomingData,
  handleBulkSelection,
  selectedItemsForBulkDelete,
  handleBulkExport,
}) {
  return (
    <div
      className="tab-pane fade active show"
      id="tab-did"
      role="tabpanel"
      aria-labelledby="did-tab"
    >
      <div className="d-flex justify-content-between align-items-center mt-lg-4 mt-3 mt-sm-4 mb-4 row">
        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
          <SearchWithBorder
            placeholderText="Search plan"
            onChange={(e) => {
              setSearchKeyIncoming(e.target.value);
            }}
            clearBtn={() => {
              setSearchKeyIncoming('');
            }}
            searchTerm={searchKeyIncoming}
          />
        </div>
        <div className="col-lg-4 col-sm-3 col-md-2 col-2 filter-col">
          <div id="roleSelection" className={isFilterAppliedIncoming ? 'd-none' : ''}>
            <a
              href="/#"
              className="filter-btn p-10px fw-medium rounded border role-selection"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="filter-text">Filter</span>
              <img className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3" src="/assets/black-filter.svg" alt="" />
            </a>

            <ul className="dropdown-menu p-4">
              <div className="d-flex flex-column">
                <p className="mb-0">Type</p>
                <select
                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                  aria-label="Default select example"
                  value="select"
                  onChange={() => {}}
                >
                  <option value="select">All</option>
                  <option value="1">Organization admin</option>
                  <option value="2">Product admin</option>
                  <option value="3">Agent</option>
                  <option value="4">Supervisor</option>
                </select>
              </div>
              <div className="d-flex flex-column mt-3">
                <p className="mb-0">Enabled/disabled</p>
                <select
                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                  aria-label="Default select example"
                  value="select"
                  onChange={() => {}}
                >
                  <option value="select">All</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>

                <div className="setting-buttons d-flex align-items-end mt-4">
                  <button
                    id="applyBtn"
                    type="button"
                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                    onClick={() => {
                      setIsFilterAppliedIncoming(true);
                    }}
                  >
                    Apply
                  </button>
                  <a
                    href="/#"
                    type="button"
                    id="roleCancel"
                    className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                  >
                    Clear
                  </a>
                </div>
              </div>
            </ul>
          </div>
          <div id="selectedRole" className={isFilterAppliedIncoming ? '' : 'd-none'}>
            <a
              href="/#"
              className="p-10px rounded text-blue-active border border-blue-active position-relative"
              onClick={(e) => {
                e.preventDefault();
                setIsFilterAppliedIncoming(false);
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
        <div className="col-lg-4 col-sm-4 col-12 mt-4 mt-lg-0 mt-sm-0 gap-3 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-lg-end">
          <a
            href="/#"
            className="btn bg-black fw-medium fs-14px text-white px-4 py-12px plan-btn-mob"
            onClick={(e) => {
              e.preventDefault();
              setShow({ isVisible: true, type: 'add-carrier-plan' });
            }}
          >
            Add Carrer Plan
          </a>
          <div className="dropdown">
            <a href="/#" data-bs-toggle="dropdown">
              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                <img src="/assets/dot-menu-black.svg" alt="# " />
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
              <a href="/#" data-bs-toggle="dropdown">
                {' '}
              </a>
              <li>
                <a
                  href="/#"
                  className="dropdown-item py-2 px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBulkExport(selectedItemsForBulkDelete, 'csv');
                  }}
                >
                  <img className="me-2" src="/assets/export-black.svg" alt="" />
                  Export
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="dropdown-item py-2 px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow({ isVisible: true, type: 'bulk-delete-carrier-plans' });
                  }}
                >
                  <img src="/assets/Trash-img.svg" alt="" />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'center' }}
        className={paginatedCarrierIncomingData?.isLoading ? '' : 'd-none'}
      >
        <SpinningLoader />
      </div>

      {paginatedCarrierIncomingData?.data?.length > 0 &&
        paginatedCarrierIncomingData?.data?.map((plan, index) => (
          <CarrierPlanList
            key={index}
            carrierPlan={plan?.attributes?.name}
            planGroup={
              normalizedCarrierIncomingData?.carrierGroup?.[plan?.attributes?.carrier_group_id]
                ?.attributes?.name
            }
            planDate={
              plan?.attributes?.updated_at &&
              moment(plan?.attributes?.updated_at)?.format('DD/MM/YYYY ')
            }
            setShow={setShow}
            isEnabled={plan?.attributes?.is_enabled}
            carrierGroupId={plan?.attributes?.carrier_group_id}
            id={plan?.id}
            handleBulkSelection={handleBulkSelection}
            selectedItemsForBulkDelete={selectedItemsForBulkDelete}
          />
        ))}
      {paginatedCarrierIncomingData?.data?.length === 0 && <NoMatchingRecords />}
      {paginatedCarrierIncomingData?.meta?.pagination?.total > 0 && (
        <Pagination
          handlePagination={handlePaginationFunctionIncoming}
          currentPage={paginatedCarrierIncomingData?.meta?.pagination?.current_page}
          totalPages={paginatedCarrierIncomingData?.meta?.pagination?.total_pages}
          count={paginatedCarrierIncomingData?.meta?.pagination?.per_page}
        />
      )}
    </div>
  );
}

export default VendorCarrierPlanIncoming;
