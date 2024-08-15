/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import VendorLotMRCList from '../components/VendorLotMRCList';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import SideMenu from '../components/common/SideMenu';
import Pagination from '../components/pagination/Pagination';

function vendorLotMrcDetails() {
  const [paginatedMrcDetails, setPaginatedMrcDetails] = useState({
    data: {},
    links: {},
    meta: {},
    isLoading: false,
  });

  const [page, setPage] = useState();

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };
  return (
    <Layout title="Gsoft admin" headerTitle="Gsoft admin" favIcon="/assets/admin-logos.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob vendor-left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4 align-items-center">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a href="/comm-telephony/vendor-batch" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2 mb-0">
                    <Link
                      to="/comm-telephony/vendor-plans-and-packges-mobile/"
                      className="d-block d-lg-none"
                    >
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Vendor Operations
                  </h5>
                </div>
              </div>
              <div className="pb-3 mt-1">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 d-none d-lg-block ">
                    <div className="h-100 shadow-6 rounded">
                      <div className="scroll-custom scroll-carrier pt-2">
                        <SideMenu active={3} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="scroll-custom scroll-carrier carrier-pad">
                      <div className="d-flex gap-4 align-items-center mb-3">
                        <h5 className="mb-0 fs-15px fw-500">
                          <a href="/comm-telephony/vendor-lot/">lot -</a> Lot_bth_Bnglore0 / MRC
                          Details
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-2 row">
                        <div className="col-lg-4 col-sm-4 col-md-6 col-10">
                          <SearchWithBorder
                            placeholderText="Search"
                            onChange={() => {}}
                            clearBtn={() => {}}
                          />
                        </div>
                        <div className="col-lg-4 col-sm-4 col-md-2 col-2 filter-col">
                          <div id="roleSelection" className="filter-wrap">
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
                                <p className="mb-0">Region</p>
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
                              <div className="d-flex flex-column">
                                <p className="mb-0">carrier group</p>
                                <select
                                  className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                                  aria-label="Default select example"
                                >
                                  <option selected>All</option>
                                  <option value="1">Active</option>
                                  <option value="2">Inactive</option>
                                </select>
                              </div>
                              <div className="d-flex flex-column mt-2">
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
                                    id="applyBtn"
                                    type="button"
                                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-3 py-12px"
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
                          <div id="selectedRole" className="d-none">
                            <a
                              href="/#"
                              className="p-10px rounded text-blue-active border border-blue-active position-relative"
                            >
                              <span className="position-absolute top-0 start-100 translate-middle p-5px bg-blue-active border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                              </span>
                              <span className="filter-text">Filter</span>
                              <img
                                id="clearFilter"
                                className="ps-0 ps-md-4"
                                src="/assets/close-blue.svg"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12 gap-3 mt-4 mt-sm-0 text-end d-flex align-items-center justify-content-start justify-content-sm-between justify-content-lg-end">
                          <a
                            href="/#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#addEntry"
                            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  plan-btn-mob"
                          >
                            Add Entry
                          </a>
                          <div className="dropdown">
                            <a href="/#" data-bs-toggle="dropdown">
                              <span className="export-btn d-flex align-items-center justify-content-center text-white h-6 w-6 rounded">
                                <img src="/assets/dot-menu-black.svg" alt="# " />
                              </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-group p-3">
                              <a href="/#" data-bs-toggle="dropdown" />
                              <li>
                                <a href="/#" className="dropdown-item py-3 px-4">
                                  <img className="me-2" src="/assets/export-black.svg" alt="" />
                                  Export
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mb-0 d-flex p-3 rounded align-items-center bg-pattens-blue justify-content-between">
                        <div>
                          <p className="mb-0">
                            <span className="text-secondary">Total Lot MRC/MRC(Inc):</span>
                            <span className="fw-medium text-primary">5000/3500</span>
                          </p>
                        </div>
                        <div>
                          <p className="mb-0">
                            <span className="text-secondary">Last updated on:</span>
                            <span className="fw-medium text-primary">05/05/2023</span>
                          </p>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-width-mobile">
                          <thead>
                            <tr>
                              <th scope="col">MRC</th>
                              <th scope="col">MRC(Inc)</th>
                              <th scope="col">Type</th>
                              <th scope="col">No.of Channels</th>
                              <th scope="col">Date</th>
                              <th className="text-center" scope="col">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <VendorLotMRCList
                              mrc="1000"
                              mrcInc="2000"
                              type="DID"
                              channel="3000"
                              date="12/05/2023"
                              title="description"
                            />
                            <VendorLotMRCList
                              mrc="1000"
                              mrcInc="2000"
                              type="Channel"
                              channel="2000"
                              date="12/05/2023"
                              title="description"
                            />
                          </tbody>
                        </table>
                      </div>

                      {paginatedMrcDetails?.meta?.pagination && (
                        <Pagination
                          handlePagination={handlePaginationFunction}
                          currentPage={paginatedMrcDetails?.meta?.pagination?.current_page}
                          totalPages={paginatedMrcDetails?.meta?.pagination?.total_pages}
                          count={paginatedMrcDetails?.meta?.pagination?.per_page}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default vendorLotMrcDetails;
