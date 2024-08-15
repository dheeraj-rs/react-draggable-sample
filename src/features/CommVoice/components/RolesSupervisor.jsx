import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RolesSupervisor({ roles, onSelect, defaultSelected }) {
  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    setSelectedId(defaultSelected);
  }, [defaultSelected]);
  return roles?.map((role, index) => {
    const el = (
      <div className="label-accordion mb-3">
        <div
          className="accordion accordion-custom-right shadow-6 p-4  rounded"
          id="accordionResolve"
        >
          <div className="accordion-item acc-card bg-white border-0 fs-13px position-relative">
            <div className="accordion-header bg-white d-flex align-items-center" id="headingUpdate">
              <div className="w-100">
                <input
                  id={`customerSupport3${index}`}
                  className="radio-tick"
                  name="radio-role"
                  type="radio"
                  // eslint-disable-next-line eqeqeq
                  defaultChecked={role?.id == selectedId ? true : ''}
                  onClick={() => {
                    onSelect(role.id);
                    setSelectedId(role.id);
                  }}
                />
                <label
                  htmlFor={`customerSupport3${index}`}
                  className="radio-tick-label text-primary"
                >
                  <img className="px-3" src="/assets/supervisor-gray.svg" alt="" />
                  {role?.attributes?.name}
                </label>
              </div>
              <Link
                to="/"
                className="accordion-button collapsed head d-flex align-items-center bg-white p-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#Support3${index}`}
                aria-expanded="false"
                aria-controls="chat-resolve"
              />
            </div>
            <div
              id={`Support3${index}`}
              className="accordion-collapse collapse"
              aria-labelledby="headingUpdate"
              data-bs-parent="#accordionResolve"
            >
              <div className="accordion-body acc-card-content pt-0 pb-0 ps-5 pe-0">
                <div className="d-flex align-item-center p-12px  rounded mb-3">
                  <p className="mb-0 text-secondary">{role?.attributes?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return el;
  });
}

export default RolesSupervisor;
