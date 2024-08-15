import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '../../../common/components/forms/Checkbox';
import { ListDepartments } from '../../../common/api-collection/Department';

function AgentUserListing({
  image,
  name,
  ext,
  email,
  mob,
  children,
  onActionSelect,
  id,
  isAllSelected,
  onSelect,
  isActive,
  reload,
  activateOrDeactivateAgent,
  organisationAdmin,
  selectedDepartments,
  onDepartmentUpdate,
}) {
  const [departments, setDepartments] = useState();
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(isAllSelected);
  }, [isAllSelected]);

  const listDepartments = () => {
    ListDepartments().then((response) => {
      setDepartments(response?.data);
    });
  };

  useEffect(() => {
    listDepartments();
  }, [reload]);
  return (
    <tr className="bg-white shadow-deep rounded mb-3 d-flex flex-column flex-lg-row justify-content-between align-items-center">
      <td>
        <div className="d-flex flex-row align-items-center gap-3 p-3">
          <div
            role="button"
            onClick={() => onSelect(id, !isAllSelected)}
            className="user-profile-icon bg-gray-blue d-flex flex-column align-items-center justify-content-center fs-11px h-5 w-5 rounded-circle fw-semibold"
          >
            {isSelected ? (
              <img src="/assets/selected-img.svg" alt="" />
            ) : (
              <>
                <img src={image} width={34} height={34} alt="" />
                <img src="/assets/selected-img.svg" alt="" style={{ display: 'none' }} />
              </>
            )}
          </div>
          <div className="d-flex flex-column justify-content-start">
            <div className="fw-medium">{name}</div>
            <div className="text-secondary">{ext}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex flex-column p-3">
          <div>
            <Link className="text-blue-active fw-normal" to="/">
              {email}
            </Link>
          </div>
          <div>
            <span className="text-secondary">{mob}</span>
          </div>
        </div>
      </td>
      <td>{children}</td>
      <td>
        <div>
          <Link
            data-bs-toggle="dropdown"
            className="position-relative d-flex"
            aria-expanded="false"
            to="/"
          >
            {' '}
            <div
              className="dropdown more agent-assign"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-original-title="Move/copy agents to departments"
              aria-label="Assignthisagent"
            >
              <img src="/assets/briefcase-img.svg" alt="" />
              <span className="position-absolute start-100 translate-middle-y badge border border-light rounded-circle bg-blue-active p-1">
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
          </Link>
          <ul className="dropdown-menu scroll-custom rounded shadow-6 p-4 drop-assign">
            <div className="form-group text-start">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <p className="mb-0">Departments</p>
                </div>
                <div className="d-flex">
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onActionSelect(-1, 'addDepartment');
                    }}
                  >
                    Add
                  </Link>
                </div>
              </div>
              {departments?.map((item) => (
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
            </div>
          </ul>
        </div>
      </td>
      <td className="d-flex gap-5 align-items-center">
        <div className="d-flex gap-2 align-items-center opacity-50">
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => {
                  // setIsActive(e.target.checked);
                  activateOrDeactivateAgent(e.target.checked ? 'activate' : 'deactivate', id);
                }}
              />
              <span className="slider num-check round" />
            </label>
          </div>
          <p className="mb-0">Active</p>
          <Link
            data-bs-toggle="tooltip"
            data-bs-title="Once you disable an agent, he will be unable to access the product but still have the license."
            to="/"
            onClick={(e) => e.preventDefault()}
          >
            <img className="ps-2" src="/assets/info-dark.svg" alt="" />
          </Link>
        </div>

        <div className="dropdown">
          <Link
            to="/"
            onClick={(e) => e.preventDefault()}
            className=""
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="/assets/vertical-dot.svg" alt="" />
          </Link>

          <ul className="dropdown-menu dropdown-menu-group p-3">
            <li>
              <Link
                to={`/comm-telephony/agent-profile?id=${id}`}
                className="dropdown-item py-3 px-3"
              >
                <img className="me-2" src="/assets/user-pic.svg" alt="" />
                Agent profile
              </Link>
            </li>
            <li>
              <Link
                to={`/comm-telephony/edit-an-agent?id=${id}`}
                // onClick={(e) => {
                //   e.preventDefault();
                //   onActionSelect(id, 'editAgent');
                // }}
                className="dropdown-item py-3 px-3"
              >
                <img className="me-2" src="/assets/NotePencil.svg" alt="" />
                Edit agent
              </Link>
            </li>
            {!organisationAdmin ? (
              <li>
                <Link
                  to="/"
                  // data-bs-toggle="modal"
                  // data-bs-target="#deleteContactModal"
                  onClick={(e) => {
                    e.preventDefault();
                    onActionSelect(id, 'deleteAgent');
                  }}
                  className="dropdown-item py-3 px-3"
                >
                  <img className="me-2" src="/assets/Trash.svg" alt="" />
                  Delete agent
                </Link>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </td>
    </tr>
  );
}

export default AgentUserListing;
