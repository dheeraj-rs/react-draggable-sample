/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import AgentBadge from './AgentBadge';
import AgentUserListing from './AgentUserListing';
import { ListRoles } from '../../../common/api-collection/TenantAdmin/Roles';
import {
  ActivateOrDeactivateAgent,
  ListActiveAgents,
  UpdateAgent,
} from '../../../common/api-collection/AgentManagemant';
import NoContactsFound from './NoContactsFound';
import Pagination from './pagination/Pagination';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';
import { GetDepartment } from '../../../common/api-collection/Department';

function AgentListing({ onActionSelect, reload, selectedDepartmentId, agentCount }) {
  const [roles, setRoles] = useState();
  const [agents, setAgents] = useState();
  const [agents2, setAgents2] = useState();
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDepartmentName, setDepartmentName] = useState('All agents');
  const [selectedIds, setSelectedIds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  const [page, setPage] = useState();

  const handlePaginationFunction = (data) => {
    setPage(data);
  };

  useEffect(() => {
    GetDepartment(selectedDepartmentId).then((res) => {
      setDepartmentName(res.data.attributes.name);
    });
    if (selectedDepartmentId === '') {
      setDepartmentName('All agents');
    }
  }, [selectedDepartmentId]);

  const listAgents = () => {
    ListActiveAgents(query, selectedDepartmentId, roleFilter, statusFilter).then((res) => {
      setAgents(res?.data);
      setAgents2(res);
      agentCount(res?.data?.length);
    });
  };

  const clearList = () => {
    ListActiveAgents(query, selectedDepartmentId, '', '').then((res) => {
      setAgents(res?.data);
      setAgents2(res);
    });
  };

  const activateOrDeactivateAgent = (action, id) => {
    const data = {
      type: 'users',
      id: parseInt(id, Number),
    };
    ActivateOrDeactivateAgent(id, action, data)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Agent Updated',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating Agent!',
        });
      })
      .finally(() => {
        listAgents();
      });
  };

  const listRoles = () => {
    ListRoles().then((response) => {
      setRoles(response?.data);
    });
  };

  useEffect(() => {
    listAgents();
    listRoles();
  }, [reload, selectedDepartmentId]);

  useEffect(() => {
    listAgents();
  }, [query]);

  const selectAllAgents = (e) => {
    setAllSelected(e);
  };

  const updateAgentDepartment = (ids, agentId) => {
    const data = {
      type: 'users',
      id: parseInt(agentId, Number),
      relationships: {
        departments: {
          data: [
            ...ids.map((departmentId) => ({
              type: 'departments',
              id: parseInt(departmentId, Number),
            })),
          ],
        },
      },
    };

    UpdateAgent(data, agentId)
      .then(() => {
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'updated successfully!',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while updating!',
        });
      })
      .finally(() => {
        listAgents();
      });
  };

  useEffect(() => {
    if (allSelected) {
      setSelectedIds(agents?.map((user) => user.id));
    } else {
      setSelectedIds([]);
    }
  }, [allSelected]);

  function downloadExcelFile(workbook, filename) {
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  function exportToExcel(data, ids) {
    const selectedAgents = data?.data.filter((agent) => ids.includes(agent.id));

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Agents');

    sheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Role', key: 'role', width: 20 },
      { header: 'Department', key: 'department', width: 20 },
    ];

    selectedAgents.forEach((agent) => {
      const agentName = agent.attributes.display_name;
      const agentEmail = agent.attributes.email;
      const agentPhone = agent.attributes.phone;
      const agentRole = agent.relationships.roles.data.length > 0 ? 'Role Present' : 'No Role';

      // Retrieve the department name from includes
      let departmentName = '';
      if (agent.relationships.departments && agent.relationships.departments.data.length > 0) {
        const departmentId = agent.relationships.departments.data[0].id;
        const department = data.included.find(
          (item) => item.type === 'departments' && item.id === departmentId
        );
        if (department) {
          departmentName = department.attributes.name;
        }
      }

      sheet.addRow({
        name: agentName,
        email: agentEmail,
        phone: agentPhone,
        role: agentRole,
        department: departmentName,
      });
    });

    downloadExcelFile(workbook, 'selected_agents.xlsx');
  }

  return (
    <div id="chat-expand" className="col-lg-9">
      <div className="panel-center bg-white rounded-bottom">
        <div className="p-23px pt-0 user-list-table scroll-custom">
          <div className="response-search">
            <div className="d-flex align-items-center">
              <div className="pe-3">
                <p className="text-primary fw-medium fs-14px mb-0">{selectedDepartmentName}</p>
              </div>
              <div>
                <p className="text-primary fs-12px mb-0 ms-4 ms-lg-0">
                  <span className="fw-medium">{agents?.length}</span> Agents available
                </p>
              </div>
            </div>
            <div className="row align-items-center mt-4 mb-4 justify-content-between">
              <div className="col-lg-3 col-sm-12">
                <div>
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

              <div className="col-lg-3 col-sm-3 col-7">
                <div className="check-box mt-3 mt-lg-0 mt-sm-0">
                  <input
                    type="checkbox"
                    id="selectAll"
                    onChange={(e) => selectAllAgents(e.target.checked)}
                  />
                  <label className="text-primary select-deselect mb-0" htmlFor="selectAll">
                    Select/deselect all
                  </label>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-5 mt-2 mt-lg-0">
                <div id="roleSelection" className="">
                  <a
                    href="/#"
                    className="filter-btn p-10px fw-medium rounded border role-selection"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filter
                    <img className="ps-3" src="/assets/black-filter.svg" alt="" />
                  </a>

                  <ul className="dropdown-menu p-4">
                    <div className="d-flex flex-column">
                      <p className="mb-0">Role</p>
                      <select
                        className="border-0 fw-medium role"
                        aria-label="Default select example"
                        value={roleFilter}
                        onChange={(e) => {
                          if (e.target.value === 'all') {
                            setRoleFilter('');
                          } else {
                            setRoleFilter(e.target.value);
                          }
                        }}
                      >
                        <option selected value="all">
                          All roles
                        </option>
                        {roles?.map((role) => (
                          <option value={role.id}>{role?.attributes?.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex flex-column mt-3">
                      <p className="mb-0">Status:</p>
                      <select
                        className="form-select select w-auto form-select-custom fw-medium role bg-transparent text-black"
                        aria-label="Default select example"
                        value={statusFilter}
                        onChange={(e) => {
                          if (e.target.value === '1') {
                            setStatusFilter(true);
                          } else {
                            setStatusFilter(false);
                          }
                        }}
                      >
                        <option selected="0">Both</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </select>

                      <div className="setting-buttons d-flex align-items-end mt-4">
                        <button
                          id="applyBtn"
                          type="button"
                          className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                          onClick={() => listAgents()}
                        >
                          Apply
                        </button>
                        <a
                          href="/"
                          type="button"
                          id="roleCancel"
                          onClick={(e) => {
                            e.preventDefault();
                            setRoleFilter('');
                            setStatusFilter('');
                            clearList();
                          }}
                          className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
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

              <div className="col-lg-3 col-sm-12">
                <div className="d-flex align-items-center gap-2 float-start float-lg-end mt-3 mt-lg-0">
                  {/* <!-- add button --> */}
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Add an agent"
                  >
                    <a
                      href="/app/comm-telephony/add-agent/"
                      className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
                    >
                      <img src="/assets/add-white-icon.svg" alt="# " />
                    </a>
                  </div>
                  {/* <!-- add button --> */}

                  {/* <!-- more button --> */}
                  <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Options">
                    <a
                      href="/fghjkl"
                      data-bs-toggle="dropdown"
                      className="bg-black d-flex align-items-center justify-content-center text-white h-5 w-5 rounded"
                    >
                      <img src="/assets/dot-menu-white.svg" alt="# " />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-group p-3">
                      {/* <li>
                        <a
                          href="/comm-telephony/contact-company-profile"
                          className="dropdown-item py-3 px-4"
                        >
                          <img className="me-2" src="/assets/user-pic.svg" alt="" />
                          profile
                        </a>
                      </li> */}
                      {/* <li>
                        <a
                          href="/#"
                          className="dropdown-item py-3 px-4"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasEditCompany"
                        >
                          <img className="me-2" src="/assets/download-icon.svg" alt="" />
                          Edit company
                        </a>
                      </li> */}
                      {selectedIds?.length !== 0 ? (
                        <li>
                          <button
                            className="dropdown-item py-3 px-4"
                            onClick={() => {
                              exportToExcel(agents2, selectedIds);
                            }}
                          >
                            <img className="me-2" src="/assets/csv-file.svg" alt="" />
                            Export to CSV
                          </button>
                        </li>
                      ) : (
                        ''
                      )}

                      {/* <li className="opacity-50">
                        <a
                          href="/#"
                          className="dropdown-item py-3 px-4"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteGroupModal"
                        >
                          <img className="me-2" src="/assets/delete.svg" alt="" />
                          Delete company
                        </a>
                      </li> */}
                      {/* <li className="opacity-50">
                        <a
                          href="/#"
                          className="dropdown-item py-3 px-4"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteGroupModal"
                        >
                          <img className="me-2" src="/assets/delete.svg" alt="" />
                          Delete Contacts
                        </a>
                      </li> */}
                      <li>
                        <a
                          href="/#"
                          className="dropdown-item py-3 px-4"
                          data-bs-toggle="modal"
                          data-bs-target="#clearGroupModal"
                        >
                          <img className="me-2" src="/assets/sms-send.svg" alt="" />
                          Send SMS <br />
                          <span className="ps-4 text-secondary fs-10px">(Max: 10 contacts)</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- table section starts --> */}
          {/* <!-- web view starts --> */}
          <div>
            {/* <!-- table row starts --> */}
            <div>
              <table className="table agent-table">
                <tbody>
                  {/* <!-- second row starts --> */}
                  {agents?.length === 0 ? (
                    <NoContactsFound />
                  ) : (
                    agents?.map((agent, index) => (
                      <AgentUserListing
                        reload={reload}
                        key={agent.id} // Add a unique key prop for each mapped element
                        id={agent.id}
                        isActive={agent.attributes.is_active}
                        selectedDepartments={agent.relationships.departments.data?.map(
                          (data) => data.id
                        )}
                        onDepartmentUpdate={(updatedIds) => {
                          updateAgentDepartment(updatedIds, agent.id);
                        }}
                        activateOrDeactivateAgent={(activate, id) => {
                          // eslint-disable-next-line no-param-reassign
                          if (activate === 'activate') {
                            activateOrDeactivateAgent(activate, id);
                            setAgents((prevAgents) =>
                              prevAgents.map((agentt, indexx) =>
                                indexx === index
                                  ? {
                                      ...agentt,
                                      attributes: { ...agentt.attributes, is_active: true },
                                    }
                                  : agentt
                              )
                            );
                          } else {
                            activateOrDeactivateAgent(activate, id);

                            setAgents((prevAgents) =>
                              prevAgents.map((agentt, indexx) =>
                                indexx === index
                                  ? {
                                      ...agentt,
                                      attributes: { ...agentt.attributes, is_active: false },
                                    }
                                  : agentt
                              )
                            );
                          }
                        }}
                        allSelected={allSelected}
                        image={agent?.attributes.profile_photo_url}
                        name={agent?.attributes.first_name}
                        ext={agent?.attributes.extension}
                        email={agent?.attributes.email}
                        mob={agent?.attributes.phone}
                        is_active={agent?.attributes.is_active}
                        onActionSelect={onActionSelect}
                        onSelect={(id, selected) => {
                          setSelectedIds((prevIds) => {
                            if (selected) {
                              return [...prevIds, id];
                            }
                            return prevIds.filter((selectedId) => selectedId !== id);
                          });
                        }}
                        organisationAdmin={agent?.attributes?.is_organization_admin}
                        // eslint-disable-next-line no-unneeded-ternary
                        isAllSelected={selectedIds?.includes(agent.id) ? true : false}
                      >
                        {agent?.attributes?.is_organization_admin && (
                          <AgentBadge
                            bgColor="sandwisp"
                            color="red-fox"
                            title="Organization admin"
                            size="13px"
                          />
                        )}

                        {agent?.relationships?.roles?.data[0] && (
                          <AgentBadge
                            bgColor="moonraker"
                            color="cerulean-blue"
                            title={
                              agents2.included?.find(
                                (include) =>
                                  // eslint-disable-next-line operator-linebreak
                                  include?.type === 'roles' &&
                                  include?.id === agent?.relationships?.roles?.data[0]?.id
                              )?.attributes?.name
                            }
                            size="12px"
                            medium="normal"
                          />
                        )}
                      </AgentUserListing>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            handlePagination={handlePaginationFunction}
            currentPage={agents2?.meta?.pagination.current_page}
            totalPages={agents2?.meta?.pagination.total_pages}
            total={agents2?.meta?.pagination.per_page}
            count={agents2?.meta?.pagination.count}
          />

          {/* <!-- table section ends --> */}
        </div>
      </div>
      {toastAction.type === 'success' ? (
        <ToastSuccess
          id="smsSendButtonMsg"
          onClose={() => {
            setToastAction({ isVisible: false });
          }}
          showToast={toastAction?.isVisible}
        >
          <span>{toastAction?.message}</span>
        </ToastSuccess>
      ) : (
        <ToastError
          id="RenameWidgetMsg"
          onClose={() => {
            setToastAction({ isVisible: false, message: '' });
          }}
          showToast={toastAction?.isVisible}
          isSuccess={false}
        >
          <span>{toastAction?.message}</span>
        </ToastError>
      )}
    </div>
  );
}

export default AgentListing;
