/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import Permission from '../components/Permission';
import {
  GetRole,
  ListPermissions,
  UpdateRole,
} from '../../../common/api-collection/RolesAndPermissions';

function Agent() {
  const [permissions, setPermissions] = useState();
  const [rawPermissions, setRawPermissions] = useState();

  const [role, setRole] = useState();
  const [query, setQuery] = useState('');
  const [filteredPermissions, setFilteredPermissions] = useState();
  const [selectAll, setSelectAll] = useState({
    state: 'default',
    id: '',
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleId = queryParams.get('role');
  const title = queryParams.get('title');
  const description = queryParams.get('description');

  function rearrangeBySubgroup(data) {
    const result = {};

    data.forEach((item) => {
      const { subgroup } = item.attributes;

      if (!result[subgroup]) {
        result[subgroup] = [];
      }

      result[subgroup].push(item);
    });

    return result;
  }

  function convertIdsToInteger(obj) {
    return JSON.parse(JSON.stringify(obj), (key, value) => {
      if (/^(id|account_id|module_id)$/.test(key)) {
        return parseInt(value, 10);
      }
      return value;
    });
  }

  const listPermissions = () => {
    ListPermissions().then((res) => {
      setRawPermissions(res.data);
      setPermissions(rearrangeBySubgroup(res.data));
    });
  };

  function filterPermissionsBySubgroup() {
    const filteredPermison = {};

    Object.keys(permissions || '').forEach((subgroup) => {
      const permissionsArray = permissions[subgroup];
      const filteredArray = permissionsArray.filter(() => {
        const subgroupLowerCase = subgroup.toLowerCase();
        const searchQueryLowerCase = query.toLowerCase();
        return subgroupLowerCase.includes(searchQueryLowerCase);
      });

      if (filteredArray.length > 0) {
        filteredPermison[subgroup] = filteredArray;
      }
    });

    return filteredPermison;
  }

  useEffect(() => {
    setFilteredPermissions(filterPermissionsBySubgroup);
  }, [query, permissions]);

  const getRole = () => {
    GetRole(roleId).then((res) => {
      setRole(convertIdsToInteger(res.data));
    });
  };

  const updateRole = (data) => {
    UpdateRole(data, roleId).then(() => {});
  };

  useEffect(() => {
    listPermissions();
    getRole();
  }, []);

  return (
    <Layout title="comm chat" headerTitle="Settings">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px pb-lg-0">
            <div className="product-admin shadow-1 rounded pt-28px pb-20px ps-23px pe-25px position-relative">
              <Link
                to="/comm-telephony/roles-and-permissions"
                className="bg-white p-2 rounded position-absolute"
              >
                <img src="/assets/ArrowLeft.svg" alt="" />
              </Link>
              <div className="equal-pad">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="p-3 bg-white rounded">
                      <img src="/assets/ChalkboardTeacherBlue.svg" alt="" />
                    </div>
                    <div>
                      <h5>{title}</h5>
                      <p className="mb-0">{description}</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0 mt-2">
                      Read:{' '}
                      <b>
                        {rawPermissions?.reduce((count, permission) => {
                          if (permission.attributes.is_for_read) {
                            return count + 1;
                          }
                          return count;
                        }, 0)}
                      </b>{' '}
                      | Write:{' '}
                      <b>
                        {' '}
                        {rawPermissions?.reduce((count, permission) => {
                          if (permission.attributes.is_for_write) {
                            return count + 1;
                          }
                          return count;
                        }, 0)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-3 p-16px p-md-19px ms-md-0 ms-lg-65px h-fit h-fit-role">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100">
              <div className="equal-pad scroll-wrap-role scroll-custom pb-3">
                <h5 className="mt-3">Permissions</h5>
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                  <div className="col-lg-4 col-sm-12">
                    <SearchWithBorder
                      searchTerm={query}
                      onChange={(q) => {
                        setQuery(q.target.value);
                      }}
                      clearBtn={() => {
                        setQuery('');
                      }}
                      placeholderText="Search Permissions"
                    />
                  </div>
                </div>

                {/* <!-- permissions starts --> */}
                <div className="row">
                  <div className="col-lg-5">
                    <p>Permissions</p>
                  </div>
                  <div className="col-lg-7">
                    <p>Read/write</p>
                  </div>
                </div>

                {/* <!-- Manage calls --> */}

                {Object.keys(filteredPermissions || '')?.map((item, idx) => {
                  return (
                    <div className="accordion accordion-custom-right" id="accordionCompany">
                      <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
                        <div className="accordion-header bg-white" id="headingUpdate">
                          <Link
                            to="/"
                            className="accordion-button collapsed head d-flex align-items-center bg-white"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseCompany${idx}`}
                            aria-expanded="false"
                            aria-controls={`collapseCompany${idx}`}
                          >
                            <div className="d-flex align-items-center">
                              <span className="text-primary d-block fs-13px fw-500">
                                {filteredPermissions[item][0].attributes.group}
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div
                          id={`collapseCompany${idx}`}
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingUpdate"
                          data-bs-parent="#accordionCompany"
                        >
                          <div className="accordion-body acc-card-content pt-0">
                            <div className="d-flex mb-3 mt-3 gap-4">
                              <Link
                                to="/"
                                onClick={(e) => {
                                  e.preventDefault();

                                  setSelectAll({
                                    state: 'selectAll',
                                    id: item,
                                  });
                                }}
                              >
                                Select all
                              </Link>
                              <Link
                                to="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectAll({
                                    state: 'clearAll',
                                    id: item,
                                  });
                                }}
                              >
                                Clear all
                              </Link>
                            </div>

                            <Permission
                              title={item}
                              id={item}
                              selectAll={selectAll}
                              permissions={filteredPermissions[item]}
                              havePermissions={role?.relationships?.permissions.data.map(
                                (permissin) => permissin.id
                              )}
                              changePermission={(permissionId, check) => {
                                role.id = parseInt(roleId, Number);
                                role?.relationships?.permissions?.data?.forEach(
                                  (permission, index) => {
                                    if (permission.id === parseInt(permissionId, Number)) {
                                      if (!check) {
                                        role.relationships.permissions.data.splice(index, 1);
                                      }
                                    }
                                  }
                                );
                                if (check) {
                                  role.relationships.permissions.data.push({
                                    type: 'permissions',
                                    id: parseInt(permissionId, 10),
                                  });
                                }
                                updateRole(role);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  id="oragnizationCancel"
                  className="btn border border-gray-blue text-dark fw-500 px-3 fs-14px ms-0 mt-3 py-12px"
                >
                  {' '}
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Agent;
