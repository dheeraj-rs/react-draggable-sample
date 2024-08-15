/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { ListDepartments } from '../../../common/api-collection/Department';
import Checkbox from '../../../common/components/forms/Checkbox';

function AgentDepartments({ selectedDepartments, onDepartmentUpdate }) {
  const [departments, setDepartments] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    ListDepartments().then((response) => {
      setDepartments(response?.data);
    });
  }, []);

  const filteredDepartments = departments?.filter((item) =>
    item?.attributes?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <a
        data-bs-toggle="dropdown"
        aria-expanded="false"
        href="/#"
        className="agent-prof-btn d-flex align-items-center px-sm-5 px-10px px-lg-4 py-12px rounded justify-content-center"
      >
        <i className="me-2">
          <span>
            <img src="/assets/briefcase-img.svg" alt="# " />
          </span>
        </i>
        <span>Departments -</span>
        <span className="fw-medium">{selectedDepartments?.length}</span>
      </a>

      <ul className="dropdown-menu scroll-custom rounded shadow-6 p-4 drop-assign drop-department">
        <div className="d-flex gap-2 align-items-center mb-4">
          <div className="input-group search-input-group border-0 custom-search-sidebar-border rounded">
            <span className="input-group-text border-0 bg-white  h-6" id="basic-addon1">
              <img src="/assets/search-form.svg" alt="" />
            </span>
            <input
              maxLength="38"
              type="search"
              className="form-control border-0 px-0 bg-white  search-input pe-3 h-6"
              placeholder="Search department"
              aria-label="search"
              aria-describedby="basic-addon1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
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
            onClick={() => {
              setSearchQuery('');
            }}
          >
            <img src="/assets/clos-x.svg" alt="" />
          </div>
        </div>
        <div className="form-group text-start">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <a href="/#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddCompany">
                <img className="pe-1" src="/assets/plus-circle-add.svg" alt="add department" />
                Add department
              </a>
            </div>
          </div>
          {filteredDepartments?.map((item) => (
            <div className="d-flex mb-3">
              <div>
                <Checkbox
                  id="forerun-group"
                  title=""
                  checked={selectedDepartments?.includes(item.id)}
                  onClick={() => {
                    if (selectedDepartments?.includes(item.id)) {
                      // If the department ID is already in the selectedDepartments, remove it
                      onDepartmentUpdate(
                        selectedDepartments.filter((departId) => departId !== item.id)
                      );
                    } else {
                      // If the department ID is not in the selectedDepartments, add it
                      onDepartmentUpdate([...selectedDepartments, item.id]);
                    }
                  }}
                />
              </div>
              <div className="d-flex align-items-center">
                <h6 className="mb-0 ms-1">{item?.attributes.name}</h6>
              </div>
            </div>
          ))}
          {/* <div>
            <div className="mt-3">
              <div className="d-flex mb-3">
                <div>
                  <div className="check-box">
                    <input type="checkbox" id="account" checked />
                    <label className="text-primary mb-0" htmlFor="account" />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Accounts</h6>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div>
                  <div className="check-box">
                    <input type="checkbox" id="customer-support" checked />
                    <label className="text-primary mb-0" htmlFor="customer-support" />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Marketing</h6>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div>
                  <div className="check-box">
                    <input type="checkbox" id="escalations" checked />
                    <label className="text-primary mb-0" htmlFor="escalations" />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Sales</h6>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div>
                  <div className="check-box">
                    <input type="checkbox" id="forerun-group" checked />
                    <label className="text-primary mb-0" htmlFor="forerun-group" />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="mb-0 ms-1">Customer Support</h6>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </ul>
    </div>
  );
}

export default AgentDepartments;
