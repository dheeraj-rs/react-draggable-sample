/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Layout from '../../../common/layout';
import Input from '../../../common/components/forms/Input';
import CheckboxTick from '../../../common/components/forms/CheckBoxTick';
import ElementsNewCustomRole from '../components/ElementsNewCustomRole';
import { CreateRole, ListPermissions } from '../../../common/api-collection/RolesAndPermissions';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import { GetActiveLoginPolicy } from '../../../common/api-collection/TenantAdmin/LoginPolicies';
import Permission from '../components/Permission';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import ToastError from '../../../common/components/toast/ToastError';

function NewCustomRole() {
  const [permissions, setPermissions] = useState();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const [activeLoginPolicy, setActiveLoginPolicy] = useState();
  const [selectAll, setSelectAll] = useState({
    state: 'default',
    id: '',
  });

  const btnRefOne = useRef(null);
  const btnRefTwo = useRef(null);
  const rolesTabRef = useRef(null);
  const permissionTabRef = useRef(null);

  useEffect(() => {}, [selectedPermissions]);
  function showPermission() {
    permissionTabRef.current.classList.add('show', 'active');
    rolesTabRef.current.classList.remove('show', 'active');
    btnRefOne.current.classList.remove('active');
    btnRefTwo.current.classList.add('active');
  }
  function showRoles() {
    permissionTabRef.current.classList.remove('show', 'active');
    rolesTabRef.current.classList.add('show', 'active');
    btnRefOne.current.classList.add('active');
    btnRefTwo.current.classList.remove('active');
  }

  const validate = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = 'name is required';
    }

    if (!data.description) {
      errors.description = 'extension is required';
    }

    // if (!data.is_enabled) {
    //   errors.is_enabled = 'last name is required';
    // }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      is_enabled: true,
    },

    validate,
    onSubmit: () => {
      showPermission();
    },
  });

  const createRole = () => {
    setIsProfileUpdating(true);
    const data = {
      type: 'acl_roles',
      attributes: {
        name: formik.values?.name,
        description: formik.values?.description,
        is_enabled: formik.values?.is_enabled,
      },
      relationships: {
        permissions: {
          data: selectedPermissions.map((id) => ({
            type: 'acl_permissions',
            id: parseInt(id, Number),
          })),
        },
      },
    };

    CreateRole(data)
      .then(() => {
        formik.setFieldValue('name', '');
        formik.setFieldValue('description', '');
        formik.setFieldValue('is_enabled', true);
        setSelectedPermissions([]);
        setToastAction({
          isVisible: true,
          type: 'success',
          message: 'Role details saved successfully!',
        });
      })
      .catch((error) => {
        setToastAction({
          isVisible: true,
          type: 'failed',
          message: error?.response?.data?.message
            ? error?.response?.data?.message
            : 'Error while creating Role!',
        });
      })
      .finally(() => {
        setIsProfileUpdating(false);
      });
  };
  useEffect(() => {
    GetActiveLoginPolicy().then((response) => {
      setActiveLoginPolicy(response);
    });
  }, []);

  function rearrangeBySubgroup(data) {
    const result = {};

    data.forEach((item) => {
      const subgroup = item.attributes.subgroup;

      if (!result[subgroup]) {
        result[subgroup] = [];
      }

      result[subgroup].push(item);
    });

    return result;
  }

  const listPermissions = () => {
    ListPermissions().then((res) => {
      setPermissions(rearrangeBySubgroup(res.data));
    });
  };
  useEffect(() => {
    listPermissions();
  }, []);

  return (
    <Layout title="comm chat" headerTitle="Settings">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px h-100">
              <div className="d-flex gap-2 left-mob">
                <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                  <a
                    href="/app/comm-telephony/roles-and-permissions"
                    className="d-flex justify-content-between"
                  >
                    <img src="/assets/leftback.svg" alt="" />
                  </a>
                </div>
                <div>
                  <h5 className="fs-16px fw-500">
                    <Link to="/" className="d-block d-lg-none">
                      <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                    </Link>{' '}
                    New custom role
                  </h5>
                  <p>Create custom role for managing specific permissions</p>
                </div>
              </div>
              <div className="step-padding mt-2 mt-sm-2 mt-lg-4">
                <div className="row align-items-start">
                  <div className="col-lg-2 col-12 col-sm-3">
                    <div
                      className="nav flex-column nav-pills me-3 gap-4 gap-lg-5"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        className="nav-link active p-0"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                        ref={btnRefOne}
                        onClick={() => {
                          showRoles();
                        }}
                      >
                        <div className="step">
                          <div className="d-flex align-items-center position-relative role-wrap">
                            <span className="bg-black d-flex step-num">1</span>
                            <div className="check-step fas fa-check">
                              <svg
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="13px"
                                height="13px"
                              >
                                <path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z" />
                              </svg>
                            </div>
                            <p className="fs-12px mb-0">Role details</p>
                          </div>
                        </div>
                      </button>
                      <button
                        className="nav-link p-0"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                        ref={btnRefTwo}
                        onClick={() => {
                          showPermission();
                        }}
                      >
                        <div className="step">
                          <div className="d-flex align-items-center position-relative role-wrap">
                            <span className="bg-gray-blue d-flex step-num">2</span>
                            <div className="check-step fas fa-check">
                              <svg
                                fill="#FFFFFF"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="13px"
                                height="13px"
                              >
                                <path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z" />
                              </svg>
                            </div>
                            <p className="fs-12px mb-0">Permissions</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-10 col-12 mt-lg-0 mt-sm-0 mt-4 col-sm-9">
                    <div className="tab-content" id="v-pills-tabContent">
                      <div
                        className="tab-pane fade show active roles-tab"
                        id="v-pills-home"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                        ref={rolesTabRef}
                      >
                        <div className="scroll-custome-role scroll-custom pb-3 p-1">
                          <div className="role-details">
                            <h5>Role details</h5>
                            <Input
                              type="text"
                              id="email"
                              label="Role name"
                              placeholder="Temporary Admin"
                              name="name"
                              onChange={formik.handleChange}
                              value={formik?.values?.name}
                              style={
                                isFormFieldValid(formik, 'name') ? { border: '1px solid red' } : {}
                              }
                            />
                            {getFormErrorMessage(formik, 'name')}
                            <div className="mt-4">
                              <label className="mb-1">Role description</label>
                              <textarea
                                className="form-control bg-white"
                                rows="6"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik?.values?.description}
                                style={
                                  isFormFieldValid(formik, 'description')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              />
                              {getFormErrorMessage(formik, 'description')}
                            </div>

                            <div className="bg-tropical-blue px-2 py-3 d-flex rounded w-25 mt-5">
                              <CheckboxTick
                                checkid="enableRole"
                                title="Enable role"
                                name="is_enabled"
                                onChange={
                                  (check) =>
                                    // eslint-disable-next-line implicit-arrow-linebreak
                                    formik.setFieldValue('is_enabled', check.target.checked)
                                  // eslint-disable-next-line react/jsx-curly-newline
                                }
                                checked={formik?.values?.is_enabled}
                                style={
                                  isFormFieldValid(formik, 'is_enabled')
                                    ? { border: '1px solid red' }
                                    : {}
                                }
                              />
                              {getFormErrorMessage(formik, 'is_enabled')}
                            </div>
                            <div className="setting-buttons d-flex align-items-end mt-5 mb-3">
                              <button
                                type="button"
                                className="btnNext next btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                                id="liveToastBtn"
                                onClick={() => {
                                  formik.handleSubmit();

                                  // showPermission();
                                }}
                              >
                                Next
                              </button>
                              <a
                                href="/app/comm-telephony/roles-and-permissions/"
                                className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade permission-tab"
                        id="v-pills-profile"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                        ref={permissionTabRef}
                      >
                        <div className="scroll-custome-role scroll-custom pb-3 p-1">
                          {/* <!-- permissions starts --> */}
                          <div className="row">
                            <div className="col-lg-5 col-6 col-sm-5">
                              <p>Permissions</p>
                            </div>
                            <div className="col-lg-7 col-6 col-sm-7">
                              <p>Read/write</p>
                            </div>
                          </div>

                          {Object.keys(permissions || '')?.map((item) => (
                            <div className="accordion accordion-custom-right" id="accordionCompany">
                              <div className="accordion-item acc-card shadow-6 bg-white border-0 rounded mb-3 p-2 fs-13px position-relative">
                                <div className="accordion-header bg-white" id="headingUpdate">
                                  <Link
                                    to="/"
                                    className="accordion-button collapsed head d-flex align-items-center bg-white"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseCompany"
                                    aria-expanded="false"
                                    aria-controls="collapseCompany"
                                  >
                                    <div className="d-flex align-items-center">
                                      <span className="text-primary d-block fs-13px fw-500">
                                        {permissions[item][0].attributes.group}
                                      </span>
                                    </div>
                                  </Link>
                                </div>
                                <div
                                  id="collapseCompany"
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
                                      selectAll={selectAll}
                                      permissions={permissions[item]}
                                      changePermission={(permissionId, check) => {
                                        setSelectedPermissions((prevPermissions) => {
                                          if (check) {
                                            return [...prevPermissions, permissionId];
                                            // eslint-disable-next-line no-else-return
                                          } else {
                                            return prevPermissions.filter(
                                              (id) => id !== permissionId
                                            );
                                          }
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {/* <!-- Admin Settings end --> */}

                          <div className="setting-buttons d-flex align-items-end mt-4 mb-3">
                            <button
                              type="button"
                              className="btn bg-black fw-medium fs-14px text-white px-4 py-12px"
                              id="liveToastBtn"
                              onClick={() => {
                                createRole();
                              }}
                            >
                              Save
                            </button>
                            <a
                              href="/comm-telephony/roles-and-permissions/"
                              className="d-flex align-items-center justify-content-center btn btn-outline-dark border fw-medium border-gray-blue px-4 py-12px ms-3"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ElementsNewCustomRole />
      {toastAction.type == 'success' ? (
        <ToastSuccess
          id="smsSendButtonMsg"
          onClose={() => {
            setToastAction({ isVisible: false });
          }}
          showToast
          isSuccess
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
    </Layout>
  );
}

export default NewCustomRole;
