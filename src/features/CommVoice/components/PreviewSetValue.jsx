import React, { useState } from 'react';
import moment from 'moment';

import ModalClose from '../../../common/components/modals/ModalClose';
import Modal from '../../../common/components/modals/Modal';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VendorDidPreviewList from './VendorDidPreviewList';
import Pagination from './pagination/Pagination';
import SpinningLoader from '../../../common/components/Loader/SpinningLoader';

function PreviewSetValue({
  show,
  onClose,
  setShow,
  formik,
  planName,
  paginatedDataForPreview,
  normalizedData,
  handlePaginationFunctionPreview,
}) {
  const [key, setKey] = useState('');

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <>
      <Modal width="1335px" id="previewModal" show={show}>
        <div className="d-flex justify-content-between">
          <p>
            <span className="text-primary fw-medium fs-16px">{planName} (Set Value Preview)</span>
          </p>
          <ModalClose
            onClose={() => {
              handleClose();
            }}
          />
        </div>
        <div className="d-flex align-items-center mt-2 mt-lg-2 mt-sm-4 mb-4 row">
          <div className="col-lg-4 col-sm-4 col-md-5 col-10">
            <SearchWithBorder
              placeholderText="Search "
              onChange={(e) => {
                setKey(e.target.value);
              }}
              clearBtn={() => {
                setKey('');
              }}
              searchTerm={key}
            />
          </div>
          <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col d-none">
            <div id="" className="roleSelection">
              <a
                href="/#"
                className="filter-btn p-10px fw-medium rounded-3 border role-selection"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="filter-text">Filter</span>
                <img
                  className="ps-0 ps-lg-3 ps-sm-3 ps-xl-3"
                  src="/assets/black-filter.svg"
                  alt=""
                />
              </a>

              <ul className="dropdown-menu p-4">
                <div className="d-flex flex-column">
                  <p className="mb-0">Type</p>
                  <select
                    className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                    aria-label="Default select example"
                  >
                    <option selected>All</option>
                    <option value="1">Organization admin</option>
                    <option value="2">Product admin</option>
                    <option value="3">Agent</option>
                    <option value="4">Supervisor</option>
                  </select>
                </div>
                <div className="d-flex flex-column mt-3 filter-title">
                  <p className="mb-0">Enabled/disabled</p>
                  <select
                    className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                    aria-label="Default select example"
                  >
                    <option selected>All</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </select>

                  <div className="setting-buttons d-flex align-items-end mt-4">
                    <button
                      id=""
                      type="button"
                      className="applyBtn btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
                    >
                      Apply
                    </button>
                    <a
                      href="/#"
                      type="button"
                      id=""
                      className="roleCancel d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px"
                    >
                      Clear
                    </a>
                  </div>
                </div>
              </ul>
            </div>
            <div id="" className="selectedRole d-none">
              <a
                href="/#"
                className="p-2 rounded text-blue-active border border-blue-active position-relative"
              >
                <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>
                <span className="filter-text">Filter</span>
                <img
                  id=""
                  className="clearFilter ps-0 ps-md-4"
                  src="/assets/close-blue.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-width-mobile">
            <thead>
              <tr>
                <th scope="col"> Number</th>
                <th scope="col">MRC</th>
                <th scope="col">Channels</th>
                <th scope="col">Country</th>
                <th scope="col">State</th>
                <th scope="col">City</th>

                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Data Table Loader start  */}
              {paginatedDataForPreview?.isLoading && (
                <tr>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <SpinningLoader />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                  <td>
                    <div className="check-box" />
                  </td>
                </tr>
              )}
              {/* Data Table Loader end  */}

              {paginatedDataForPreview?.data?.length > 0 &&
                paginatedDataForPreview?.data?.map((plan) => (
                  <VendorDidPreviewList
                    number={plan?.attributes?.number_international}
                    status="---"
                    carrierDate={moment(plan?.attributes?.created_at)?.format('DD-MM-YYYY')}
                    mrc={parseFloat(plan?.attributes?.monthly_recurring_cost, 10)?.toFixed(2)}
                    channel={plan?.attributes?.channels}
                    region={normalizedData?.country[plan?.attributes?.country_id]?.attributes?.name}
                    state={normalizedData?.state[plan?.attributes?.state_id]?.attributes?.name}
                    city={normalizedData?.city[plan?.attributes?.city_id]?.attributes?.name}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          handlePagination={handlePaginationFunctionPreview}
          currentPage={paginatedDataForPreview?.meta?.pagination?.current_page}
          totalPages={paginatedDataForPreview?.meta?.pagination?.total_pages}
          total={paginatedDataForPreview?.meta?.pagination?.per_page}
          count={paginatedDataForPreview?.meta?.pagination?.count}
        />
        <div className="mt-4 mt-sm-0 d-flex gap-2 justify-content-start align-items-center">
          <a
            href="/#"
            // data-bs-toggle="modal"
            // data-bs-target="#setValue"
            id="setRoleCanwas"
            className="newCarrier btn bg-black fw-medium fs-14px text-white px-3 py-12px"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              setShow({ isVisible: true, type: 'set-value-confirm' });
            }}
          >
            Save
          </a>

          <button
            type="button"
            // data-bs-dismiss="modal"
            className="newCarrier d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-3"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
      {show && <div className="offcanvas-backdrop fade show" />}
    </>
  );
}

export default PreviewSetValue;
