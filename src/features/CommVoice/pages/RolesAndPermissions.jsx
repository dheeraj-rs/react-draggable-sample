import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../common/layout';
import SearchWithBorder from '../../../common/components/common/SearchWithBorder';
import DefaultRolesList from '../components/DefalutRolesList';
import { ListRoles } from '../../../common/api-collection/RolesAndPermissions';

function RolesAndPermissions() {
  const [roles, setRoles] = useState();
  const [query, setQuery] = useState('');
  const [filteredRoles, setFilteredRoles] = useState();

  const listRoles = () => {
    ListRoles().then((res) => {
      setRoles(res.data);
    });
  };

  useEffect(() => {
    listRoles();
  }, []);

  function searchRolesByDescription(roleArray, searchTerm) {
    if (!roleArray) {
      return [];
    }
    const matchingRoles = roleArray.filter((role) => {
      const { name } = role.attributes;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return matchingRoles;
  }

  useEffect(() => {
    if (roles) {
      setFilteredRoles(searchRolesByDescription(roles, query));
    }
  }, [query, roles]);

  return (
    <Layout title="comm chat" headerTitle="Settings">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100">
              <div className="d-flex gap-2 left-mob">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a href="/support-widget/" className="d-flex justify-content-between">
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div>
                  <h5 className="fs-16px fw-500">
                    <Link to="/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    Roles Management
                  </h5>
                  <p>Manage Roles and create custom roles based on the fetaures</p>
                </div>
              </div>
              <hr />
              <div className="equal-pad scroll-wrap scroll-custom pb-3">
                <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                  <div className="col-lg-4 col-sm-12">
                    <SearchWithBorder
                      searchTerm={query}
                      onChange={(q) => {
                        setQuery(q.target.value);
                      }}
                      clearBtn={() => {
                        setQuery('');
                      }}
                      placeholderText="Search role"
                    />
                  </div>
                  <div className="col-lg-8 col-sm-5 col-12 mt-4 mt-lg-0 mt-sm-0 text-end">
                    <a
                      href="/app/comm-telephony/new-customer-role/"
                      id="newCustomRole"
                      className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                    >
                      New custom role
                    </a>
                  </div>
                  <div />
                </div>

                {/* <!-- tab starts --> */}
                <div className="mt-4">
                  <ul
                    className="nav nav-setting-tab nav-tabs d-flex flex-wrap mb-0 list-unstyled"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <Link
                        to="/"
                        className="nav-setting-link nav-link active"
                        id="sms-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#all-roles"
                        type="button"
                        role="tab"
                        aria-controls="all-roles"
                        aria-selected="true"
                      >
                        <span> All Roles</span>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        to="/"
                        className="nav-setting-link nav-link"
                        id="call-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#calltab"
                        type="button"
                        role="tab"
                        aria-controls="call"
                        aria-selected="false"
                      >
                        <span> Default Roles</span>
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        to="/"
                        className="nav-setting-link nav-link"
                        id="sms-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#sms"
                        type="button"
                        role="tab"
                        aria-controls="sms"
                        aria-selected="false"
                      >
                        <span> Custom Roles</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content nav-tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="calltab"
                      role="tabpanel"
                      aria-labelledby="call-tab"
                    >
                      {filteredRoles?.map((role) => {
                        if (role?.attributes?.is_system_defined) {
                          return (
                            <DefaultRolesList
                              id={role?.id}
                              rolesIcon="/assets/ChalkboardTeacher.svg"
                              title={role?.attributes?.name}
                              readCount={role?.attributes?.read_permissions_count}
                              writeCount={role?.attributes?.write_permissions_count}
                              permissionsLink={`/app/comm-telephony/agent?role=${role?.id}&title=${role?.attributes?.name}&discription=${role?.attributes?.description}`}
                            />
                          );
                        }
                        return '';
                      })}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="sms"
                      role="tabpanel"
                      aria-labelledby="sms-tab"
                    >
                      {filteredRoles?.map((role) => {
                        if (!role?.attributes?.is_system_defined) {
                          return (
                            <DefaultRolesList
                              id={role?.id}
                              rolesIcon="/assets/ChalkboardTeacher.svg"
                              title={role?.attributes?.name}
                              readCount={role?.attributes?.read_permissions_count}
                              writeCount={role?.attributes?.write_permissions_count}
                              permissionsLink={`/app/comm-telephony/agent?role=${role?.id}&title=${role?.attributes?.name}&discription=${role?.attributes?.description}`}
                            />
                          );
                        }
                        return '';
                      })}
                    </div>

                    <div
                      className="tab-pane fade show active"
                      id="all-roles"
                      role="tabpanel"
                      aria-labelledby="all-roles"
                    >
                      {filteredRoles?.map((role) => (
                        <DefaultRolesList
                          id={role?.id}
                          rolesIcon="/assets/ChalkboardTeacher.svg"
                          title={role?.attributes?.name}
                          readCount={role?.attributes?.read_permissions_count}
                          writeCount={role?.attributes?.write_permissions_count}
                          permissionsLink={`/app/comm-telephony/agent?role=${role?.id}&title=${role?.attributes?.name}&discription=${role?.attributes?.description}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* <!-- tab ends --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RolesAndPermissions;
