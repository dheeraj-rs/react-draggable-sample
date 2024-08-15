/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Department from './Department';

function DepartmentsList({ onActionSelect, departments, setSelectedDepartmentId, agentCount }) {
  // const [agentCount, setAgentCount] = useState(0);
  const [query, setQuery] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const filteredItems = departments?.filter((item) =>
      item.attributes.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDepartments(filteredItems);
  }, [query, departments]);

  useEffect(() => {
    setSelectedDepartmentId(selectedDepartment);
  }, [selectedDepartment]);

  return (
    <div className="col-lg-3 col-sm-12 right-sec-voice d-none d-lg-block">
      <div className="bg-tranparent rounded-top border-0 fs-12px p-3 p-xl-3 p-lg-3 p-md-2 p-sm-2 pb-3 mt-3 pe-xl-4 pb-xl-4 pe-2">
        <div className="border-0 shadow-6 rounded bg-white">
          <div className="inbox-telephony-wrapper scroll-custom">
            <div className="p-23px pb-0px gap-23px">
              {/* <div className="contact-content">
                <div className="hover-effect rounded d-flex align-items-center p-16px gap-13px active-company" onClick={() => setSelectedDepartment('')}>
                  <div className="d-flex flex-column">
                    <p className="fs-13px fw-semibold mb-0 text-primary group-name">All agents</p>
                    <p className="fs-12px mb-0 text-secondary">All departments</p>
                  </div>
                  <div className="ms-auto d-flex align-items-center me-3">
                    <div className="bg-lavender-mist d-flex me-3 align-items-center justify-content-center fs-11px p-2 rounded-pill fw-semibold">
                      <img src="/assets/user-three.svg" className="me-2" alt="" />
                      {agentCount}
                    </div>
                  </div>
                </div>
                <hr className="m-0 border-black o-16 mt-4" />
              </div> */}
              <div className="d-flex align-items-center mt-4">
                <div className="text-primary fw-medium fs-14px d-flex">
                  <a id="companyBack" className="pe-2 d-block d-lg-none" href="/#">
                    <img src="/assets/back-full-arrow.svg" alt="" />
                  </a>{' '}
                  Departments
                </div>
                <div className="ms-auto">
                  <div data-bs-toggle="tooltip" data-bs-title="Add Department">
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        onActionSelect(-1, 'addDepartment');
                      }}
                      // data-bs-toggle="offcanvas"
                      // data-bs-target="#offcanvasAddCompany"
                      className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
                    >
                      <img src="/assets/add-white-icon.svg" alt="# " />
                    </a>
                  </div>
                </div>
              </div>
              <div id="category-wrap" className="d-flex">
                <div className="rounded mt-4 w-100">
                  <SearchWithBorder
                    placeholderText="Search by name,number"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    clearBtn={() => {
                      setQuery('');
                    }}
                    searchTerm={query}
                  />
                </div>
              </div>
            </div>
            <div className="p-23px">
              <div className="contact-content">
                <div
                  className={`hover-effect d-flex align-items-center p-16px gap-13px rounded false${
                    selectedDepartment === '' ? '' : ''
                  }`}
                  onClick={() => setSelectedDepartment('')}
                >
                  <div className="d-flex flex-column">
                    <p className="fs-13px fw-semibold mb-0 text-primary group-name">All agents</p>
                    <p className="fs-12px mb-0 text-secondary">All departments</p>
                  </div>
                  <div className="ms-auto d-flex align-items-center me-3">
                    <div className="bg-lavender-mist d-flex me-3 align-items-center justify-content-center fs-11px p-2 rounded-pill fw-semibold">
                      <img src="/assets/user-three.svg" className="me-2" alt="" />
                      {agentCount}
                    </div>
                  </div>
                </div>
                {filteredDepartments?.map((department) => {
                  return (
                    <Department
                      key={department?.id} // Don't forget to provide a unique key prop
                      id={department?.id}
                      iconBgColor="indigo-100"
                      title={department?.attributes?.name}
                      subTitle={department?.attributes?.extension}
                      count={department?.attributes?.agents_count}
                      iconCountColor="lavender-mist"
                      onActionSelect={onActionSelect}
                      active={selectedDepartment === department?.id}
                      onClick={(id) => {
                        setSelectedDepartment(id);
                        // onCountrySelect(id);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentsList;
