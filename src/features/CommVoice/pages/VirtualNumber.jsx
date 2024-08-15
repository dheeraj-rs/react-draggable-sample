/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../../common/layout';
import Input from '../../../common/components/forms/Input';
import Modal from '../../../common/components/modals/Modal';
import ModalClose from '../../../common/components/modals/ModalClose';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import VirtualNumberList from '../components/VirtualNumberList';
import ButtonWhiteModalCancel from '../../ChatWidget/components/ButtonWhiteModalCancel';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import Pagination from '../components/pagination/Pagination';

function VirtualNumber() {
  const [paginatedNumberPlanRecords, setPaginatedNumberPlanRecords] = useState({
    data: {},
    links: {},
    meta: {
      pagination: {
        total: 10,
        count: 0,
        per_page: 20,
        current_page: 1,
        total_pages: 1,
      },
    },
    isLoading: false,
  });

  const [page, setPage] = useState();

  const handlePaginationFunction = (newPage) => {
    setPage(newPage);
  };

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-18px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-20px pb-20px ps-20px pe-20px scrollbox-content h-100 roles-mobile-padding">
              <div className="d-flex gap-2 left-mob mb-0 mb-lg-4 mb-sm-4 mb-md-4 mb-xl-4">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <Link to="/comm-telephony/" className="d-flex justify-content-center">
                    <img src="/assets/leftback.svg" alt="" />
                  </Link>
                </div>
                <div className="roles-top">
                  <h5 className="fs-16px fw-500 d-flex gap-2">
                    <Link to="/comm-telephony/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>
                    Virtual number
                  </h5>
                  <p className="mb-0 text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum, magna
                    nec vestibulum molestie, lectus neque
                  </p>
                </div>
              </div>
              <div className="equal-pad scroll-custom pb-3 scroll-roles-virtual mt-1">
                <div className="d-flex justify-content-between align-items-center mt-lg-2 mt-0 mt-sm-4 mb-4 row px-1">
                  <div className="col-lg-4 col-sm-4 col-10">
                    <SearchWithBorder
                      placeholderText="Search User"
                      onChange={() => {}}
                      clearBtn={() => {}}
                    />
                  </div>
                  <div className="col-lg-5 col-sm-5 col-2">
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
                        <div className="d-flex flex-column mt-3 filter-title">
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
                  <div className="col-lg-3 col-sm-3 col-12 mt-4 mt-lg-0 mt-sm-0 text-end">
                    <Link
                      to="/comm-telephony/buy-virtual-number/"
                      id="buyNumber"
                      className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                    >
                      Buy Number
                    </Link>
                  </div>
                  <div />
                </div>
                <div className="row number-table-top">
                  <div className="col-lg-4 col-sm-3">
                    <h6 className="fs-13px">Virtual number</h6>
                  </div>
                  <div className="col-lg-2 col-sm-2">
                    <h6 className="fs-13px">Type</h6>
                  </div>
                  <div className="col-lg-2 col-sm-2">
                    <h6 className="fs-13px">Voice/SMS</h6>
                  </div>
                  <div className="col-lg-3 col-sm-3">
                    <h6 className="fs-13px">Call flows</h6>
                  </div>
                </div>

                {[1, 2, 3, 4, 5]?.map((data, index) => (
                  <VirtualNumberList
                    key={index}
                    rolesIcon="/assets/dots-icon.svg"
                    telNumber="+91 456-234564"
                    countryName="India-Mumbai"
                    voiceType="Voice"
                    virtualType="Virtual number"
                    permissionsLink="#"
                  />
                ))}

                {paginatedNumberPlanRecords?.meta?.pagination?.total > 0 && (
                  <Pagination
                    handlePagination={handlePaginationFunction}
                    currentPage={paginatedNumberPlanRecords?.meta?.pagination?.current_page}
                    totalPages={paginatedNumberPlanRecords?.meta?.pagination?.total_pages}
                    count={paginatedNumberPlanRecords?.meta?.pagination?.per_page}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- delete modal starts--> */}

        <Modal width="450px" id="deleteRoleModal">
          <div className="d-flex justify-content-between">
            <p className="fs-16px text-primary fw-medium mb-24px">Delete Role</p>
            <ModalClose />
          </div>
          <p className="fs-13px text-primary mb-3">
            This action will <span className="text-primary fw-medium">Delete</span> the role
            <span className="fw-medium"> Custom role 1.</span>from the system .
          </p>

          <Input
            label="To confirm this action please type “Delete”"
            id="delete"
            placeholder="Type “Delete”"
            type="textbox"
            disabled={false}
          />

          <div className="modal-footer d-flex justify-content-center align-items-center border-0 p-0 mt-4">
            <button
              type="button"
              id="deleteToast"
              className="btn bg-faded-red text-white px-4 py-12px"
              data-bs-dismiss="modal"
            >
              Delete
            </button>
            <ButtonWhiteModalCancel text="Cancel" />
          </div>
        </Modal>
        {/* <!-- delete modal ends --> */}
        {/* <!-- Delete group toast --> */}
        <ToastSuccess id="deleteToastMsg">
          <span>
            <span className="fw-bolder">Role deleted :</span> you have successfully deleted role
            Custom role 1
          </span>
        </ToastSuccess>
        {/* <!-- clear group toast --> */}
      </div>
    </Layout>
  );
}

export default VirtualNumber;
