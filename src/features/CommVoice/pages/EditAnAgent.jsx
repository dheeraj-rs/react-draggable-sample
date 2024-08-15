/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable no-restricted-syntax */

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../../common/layout';
import Input from '../../../common/components/forms/Input';
import Select from '../../CommAdminCentre/components/common/Select';
import Select2 from '../../../common/components/forms/Select2';
import ButtonToast from '../../../common/components/toast/ButtonToast';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import AgentBadge from '../components/AgentBadge';
import { GetAgent, UpdateAgent } from '../../../common/api-collection/AgentManagemant';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import SearchSelect from '../components/SlelectWithSearch';
import { ListRoles } from '../../../common/api-collection/RolesAndPermissions';
import { ListDepartments } from '../../../common/api-collection/Department';
import { GetActiveLoginPolicy } from '../../../common/api-collection/TenantAdmin/LoginPolicies';
import GetTimezones from '../../../common/api-collection/Common/Timezones';
import ToastError from '../../../common/components/toast/ToastError';

function EditAnAgent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [agentId, setAgentId] = useState();
  const [agent, setAgent] = useState();
  const [includes, setIncludes] = useState();
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [timezones, setTimezones] = useState([]);
  const [roles, setRoles] = useState();
  const [selectedRoleName, setSelectedRoleName] = useState('Select Role');
  const [departments, setDepartments] = useState();
  const [activeLoginPolicy, setActiveLoginPolicy] = useState();
  const [selectedDepartments, setSelectedDepartments] = useState();
  const [storageName, setStorageName] = useState(null);
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });

  useEffect(() => {
    setAgentId(id);
  }, [id]);

  useEffect(() => {
    GetAgent(id).then((response) => {
      setAgent(response.data);
      setIncludes(response.included);
    });
  }, [agentId]);

  const validate = (data) => {
    const errors = {};

    if (!data.first_name) {
      errors.first_name = 'name is required';
    }

    if (!data.extension) {
      errors.extension = 'extension is required';
    }

    if (!data.last_name) {
      errors.last_name = 'last name is required';
    }

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.phone) {
      errors.phone = 'phone number is required';
    } else if (!/^\+\d{1,15}$/.test(data.phone)) {
      errors.phone = 'Phone is invalid';
    }

    if (!data.profile_photo) {
      errors.profile_photo = 'Photo is required';
    }

    if (!data.timezone) {
      errors.timezone = 'Choose a timezone';
    }

    if (!data.role) {
      errors.role = 'select role required';
    }

    if (data.departments?.length === 0) {
      errors.departments = 'select department required';
    }
    return errors;
  };
  const getDepartmentIdsByName = () => {
    const departmentIds = [];
    for (const department of departments) {
      if (selectedDepartments?.includes(department.attributes.name)) {
        departmentIds.push(parseInt(department.id, Number));
      }
    }
    return departmentIds;
  };
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      extension: '',
      profile_photo: '',
      timezone: '',
      departments: [],
      role: '',
    },

    validate,
    onSubmit: () => {
      const ids = getDepartmentIdsByName();
      const data = {
        type: 'users',
        id: parseInt(id, Number),
        attributes: {
          first_name: formik.values?.first_name,
          last_name: formik.values?.last_name,
          email: formik.values?.email,
          phone: formik.values?.phone,
          extension: formik.values?.extension,
          profile_photo: formik.values?.profile_photo?.startsWith('http')
            ? undefined
            : formik.values?.profile_photo,
          timezone: formik.values?.timezone.replace(/\([^()]*\)/g, '').trim(),
          language_id: 1,
        },
        relationships: {
          role: {
            data: {
              type: 'acl_roles',
              id: parseInt(formik.values?.role, Number),
            },
          },
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
      setIsProfileUpdating(true);

      UpdateAgent(data, id)
        .then(() => {
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Profile details updated successfully!',
          });
        })
        .catch((error) => {
          setToastAction({
            isVisible: true,
            type: 'failed',
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : 'Error while updating Profile details!',
          });
        })
        .finally(() => {
          setIsProfileUpdating(false);
        });
    },
  });

  const listRoles = () => {
    ListRoles().then((response) => {
      setRoles(response.data);
    });
  };

  const listDepartments = () => {
    ListDepartments().then((response) => {
      setDepartments(response.data);
    });
  };

  useEffect(() => {
    GetActiveLoginPolicy().then((response) => {
      setActiveLoginPolicy(response);
    });
  }, []);

  useEffect(() => {
    GetTimezones().then((response) => {
      setTimezones(response.data.timezones);
    });
    listRoles();
    listDepartments();
  }, []);

  // Helper function to convert data URL to Blob object
  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions
        let { width } = img;
        let { height } = img;
        if (width > height) {
          height = (height / width) * 100;
          width = 100;
        } else {
          width = (width / height) * 100;
          height = 100;
        }

        let x = 0;
        let y = 0;
        if (width > height) {
          height = (height / width) * 100;
          width = 100;
          y = (100 - height) / 2; // Calculate vertical centering
        } else {
          width = (width / height) * 100;
          height = 100;
          x = (100 - width) / 2; // Calculate horizontal centering
        }
        // Set canvas dimensions
        canvas.width = 100;
        canvas.height = 100;

        // Draw image onto canvas with new dimensions
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, width, height);

        // Convert canvas content to base64 data URL
        const resizedImage = canvas.toDataURL('image/jpeg');
        document.getElementById('profilePic').src = resizedImage;
        // Create a Blob object from the data URL
        const blob = dataURLToBlob(resizedImage);

        // Create a new File object from the Blob
        const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
        // Continue with your logic for uploading or processing the resized file
        const formData = new FormData();
        formData.append('upload_file', resizedFile);
        MomentaryFileUpload(formData)
          .then((response) => {
            setStorageName(response?.data?.data?.attributes?.storage_name);
            formik.setFieldValue('profile_photo', response?.data?.data?.attributes?.storage_name);
          })
          .catch(() => {});
      };

      // Load the selected file into the image object
      img.src = e.target.result;
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    formik.setFieldValue('first_name', agent?.attributes?.first_name);
    formik.setFieldValue('last_name', agent?.attributes?.last_name);
    formik.setFieldValue('email', agent?.attributes?.email);
    formik.setFieldValue('phone', agent?.attributes?.phone);
    formik.setFieldValue('extension', agent?.attributes?.extension);
    formik.setFieldValue('profile_photo', agent?.attributes?.profile_photo);
    formik.setFieldValue('timezone', agent?.attributes?.timezone);
    formik.setFieldValue('departments', agent?.relationships?.departments?.data);
    formik.setFieldValue('role', agent?.relationships?.roles?.data[0]?.id);
    formik.setFieldValue('profile_photo', agent?.attributes?.profile_photo_url);
    document.getElementById('profilePic').src = agent?.attributes?.profile_photo_url;
    setSelectedRoleName(
      roles?.find((option) => option.id === formik.values?.role)?.attributes.name
    );

    setSelectedDepartments(agent?.relationships?.departments?.data?.map((item) => item.id));
    setSelectedDepartments(
      includes
        ?.filter((item) => item.type === 'departments')
        .map((department) => department.attributes.name)
    );
  }, [agent]);

  return (
    <Layout title="comm voice" headerTitle="Settings" favIcon="/favicon-voice.svg">
      <div className="wrapper">
        <div className="bg-gray-bright w-100">
          <div className="gap-3 p-16px p-md-19px mt-66px ms-md-0 ms-lg-65px h-fit">
            <div className="bg-white shadow-1 rounded pt-28px pb-20px ps-23px pe-25px scrollbox-content h-100">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="d-flex gap-2 left-mob">
                    <div className="bg-dark-gray-color left-widget d-none d-lg-block">
                      <a
                        href="/app/comm-telephony/agents-departments/"
                        className="d-flex justify-content-center"
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </a>
                    </div>
                    <div>
                      <h5 className="fs-16px fw-500 d-flex gap-3">
                        <a href="/comm-telephony/agents-departments/" className="d-block d-lg-none">
                          <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                        </a>{' '}
                        Edit an agent
                      </h5>
                      <p className="text-secondary">Manage agents based on their departments</p>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="/"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    className="d-flex gap-2"
                  >
                    <img src="/assets/help-circle.svg" alt="" />{' '}
                    <span className="d-lg-block d-none">Need help</span>
                  </a>
                </div>
              </div>

              <div className="equal-pad scroll-wrap-agent scroll-custom pb-5 agent-padding">
                <div className="d-flex justify-content-between mt-3 mb-3">
                  <h6 className="fs-14px text-secondary-color">Agent Profile</h6>

                  <div className="d-flex gap-2 align-items-center">
                    <CheckboxTickChat
                      checkid="activeId"
                      title=""
                      active={agent?.attributes?.is_active}
                      onChange={(val) => {
                        alert(val);
                      }}
                    />
                    <p className="mb-0">
                      Active{' '}
                      <span>
                        <img src="/assets/Infogray.svg" alt="" />
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className="row gx-5"
                  style={
                    isFormFieldValid(formik, 'profile_photo') ? { border: '1px solid red' } : {}
                  }
                >
                  <div className="col-lg-6 col-sm-12">
                    <div className="upload-logo d-flex gap-3 rounded align-items-center">
                      <label htmlFor="file-input">
                        <img
                          className="rounded"
                          id="profilePic"
                          src="/assets/topic-upload.svg"
                          alt=""
                        />
                      </label>

                      <input
                        className="d-none"
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />

                      <div className="d-flex flex-column gap-2">
                        <div className="text-primary fw-medium">Profile picture</div>
                        {selectedFile ? (
                          <div className="text-secondary">{`${selectedFile?.name}`}</div>
                        ) : (
                          <div className="text-secondary">
                            Upload image resolution 100X100 and 1:1 aspect ratio
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-sm-6 mt-4">
                    <Input
                      label="First name*"
                      id="Firstname"
                      placeholder=""
                      type="textbox"
                      disabled=""
                      name="first_name"
                      onChange={formik.handleChange}
                      value={formik?.values?.first_name}
                      style={
                        isFormFieldValid(formik, 'first_name') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'first_name')}
                  </div>
                  <div className="col-lg-6 col-sm-6 mt-4">
                    <Input
                      label="Last name"
                      id="Lastname"
                      placeholder=""
                      type="textbox"
                      disabled=""
                      name="last_name"
                      onChange={formik.handleChange}
                      value={formik?.values?.last_name}
                      style={
                        isFormFieldValid(formik, 'last_name') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'last_name')}
                  </div>
                  <div className="col-lg-6 col-sm-6 mt-4">
                    <Input
                      label="Email address*"
                      id="emailaddress"
                      placeholder=""
                      type="textbox"
                      disabled=""
                      name="email"
                      onChange={formik.handleChange}
                      value={formik?.values?.email}
                      style={isFormFieldValid(formik, 'email') ? { border: '1px solid red' } : {}}
                    />
                    {getFormErrorMessage(formik, 'email')}
                  </div>
                  <div className="col-lg-6 col-sm-6 mt-4">
                    <Input
                      label="Phone number*"
                      id="emailaddress"
                      placeholder="7898765423"
                      type="textbox"
                      disabled=""
                      name="phone"
                      onChange={formik.handleChange}
                      value={formik?.values?.phone}
                      style={isFormFieldValid(formik, 'phone') ? { border: '1px solid red' } : {}}
                    />
                    {getFormErrorMessage(formik, 'phone')}
                  </div>
                  <div className="col-lg-6 col-sm-6 mt-4">
                    <Input
                      label="Agent Extension*"
                      id="emailaddress"
                      placeholder=""
                      type="textbox"
                      disabled=""
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      name="extension"
                      onChange={formik.handleChange}
                      value={formik?.values?.extension}
                      style={
                        isFormFieldValid(formik, 'extension') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'extension')}
                  </div>
                  <div className="col-lg-6 col-sm-6 mt-4">
                    <Select
                      label="Time zone *"
                      id="country"
                      value={`${
                        timezones?.find((option) =>
                          option.timezone
                            .toLowerCase()
                            .includes(formik?.values?.timezone?.toLowerCase())
                        )?.offset
                      } ${
                        timezones?.find((option) =>
                          option.timezone
                            .toLowerCase()
                            .includes(formik?.values?.timezone?.toLowerCase())
                        )?.timezone
                      }`}
                      name="timezone"
                      options={[...timezones]}
                      onChange={(timezone) => {
                        formik.setFieldValue('timezone', timezone);
                      }}
                      style={
                        isFormFieldValid(formik, 'timezone') ? { border: '1px solid red' } : {}
                      }
                    />
                    {getFormErrorMessage(formik, 'timezone')}
                  </div>

                  <div className="col-lg-6 col-sm-6 mt-5">
                    <h6 className="fs-14px text-secondary-color">Role management</h6>

                    <label className="mb-1 mt-2">Select Role*</label>
                    <div className="dropdown">
                      <Link
                        to="/"
                        id="userRole"
                        className="text-primary form-select bg-white select-role"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedRoleName}
                      </Link>

                      <SearchSelect
                        contents={roles?.map((item) => item.attributes.name)}
                        name="role"
                        onSelect={(roleName) => {
                          setSelectedRoleName(roleName);
                          formik.setFieldValue(
                            'role',
                            roles.find((role) => role.attributes.name === roleName)?.id || null
                          );
                        }}
                        style={isFormFieldValid(formik, 'role') ? { border: '1px solid red' } : {}}
                      />
                      {getFormErrorMessage(formik, 'role')}
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12 mt-5">
                    <h6 className="fs-14px">Department</h6>
                    <div className="form-group mt-3">
                      <div className="d-flex justify-content-between">
                        <label className="mb-1">Select Departments*</label>
                        <Link to="/">Clear All</Link>
                      </div>
                      <Select2
                        show
                        name="departments"
                        options={departments?.map((item) => item.attributes.name)}
                        onSelect={(name) => {
                          setSelectedDepartments(name);
                          formik.setFieldValue('departments', name);
                        }}
                        selectedOptions={selectedDepartments}
                        onRemove={(name) => {
                          formik.setFieldValue('departments', name);
                          setSelectedDepartments(name);
                        }}
                        style={
                          isFormFieldValid(formik, 'departments') ? { border: '1px solid red' } : {}
                        }
                      />
                      {getFormErrorMessage(formik, 'departments')}
                    </div>
                  </div>
                </div>
                <div className="setting-buttons d-flex align-items-end mt-5">
                  <ButtonToast
                    text="Save"
                    btnID="LicenceAgentAdd"
                    onClick={(e) => {
                      e.preventDefault();
                      // getDepartmentIdsByName();
                      formik.handleSubmit();
                    }}
                  />
                  <a
                    href="/app/comm-telephony/agent-departments"
                    type="button"
                    id="LicenceAgentDiscard"
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

      {/* <!-- offcanvas custom role --> */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRightCustomRole"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header pb-2 px-4 pt-4">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Policy details
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body pt-0 px-4">
          <div className="d-flex align-items-center justify-content-between mt-3 mb-4">
            <img src="/assets/role1.svg" alt="" />
            <div>
              <img src="/assets/PencilSimpleLine.svg" alt="" />
            </div>
          </div>
          <p className="mb-1">Policy name</p>
          <h6 className="mb-4">Custom Policy 1</h6>

          <h6>Policy URL</h6>
          <div className="bg-darkboxgray p-4 rounded mb-4 mt-3">
            <p className="mb-0">
              https://fgs1-560866132687548503-23456789087654-.gsoftcomm.net/login/auth/
            </p>
          </div>

          <div className="shadow-6 p-3 rounded mb-4">
            <p className="mb-1">Account</p>
            <a href="/">abcinternational.comm.com</a>
          </div>
          <h6>Login Methods</h6>

          <div className="bg-light-pale-gray p-4 mt-3 mb-4 rounded">
            <img src="/assets/admin-logo.svg" alt="" />
            <h6 className="mt-3">Comm login</h6>
            <p>Login with users gsoftcomm account</p>
            <div className="d-flex gap-5">
              <div>
                <p className="mb-1">Password policy</p>
                <p>Low</p>
              </div>
              <div>
                <p className="mb-1">2FA Policy</p>
                <AgentBadge bgColor="sandwisp" color="ash-gray-bg" title="DISABLED" size="13px" />
              </div>
            </div>
          </div>

          <div className="bg-light-pale-gray p-4 mb-4 rounded">
            <img src="/assets/google-icon.svg" alt="" />
            <h6 className="mt-3">Google login</h6>
            <p>Login with users google account</p>
          </div>

          <div className="modal-footer d-flex justify-content-start align-items-center gap-3 border-0 ps-0 mt-3">
            <ButtonToast
              text="Save"
              onClick={(e) => {
                e.preventDefault();
                // getDepartmentIdsByName();
                formik.handleSubmit();
              }}
              btnID="LicenceAgentAdd"
            />
            <button
              type="button"
              id="LicenceAgentDiscard"
              className="btn bg-white fw-medium text-dark border px-4 py-12px ms-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* <!-- custom role ends --> */}

      {/* <!-- need help canvas starts --> */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header px-4 pt-4">
          <h5 id="offcanvasRightLabel" className="text-primary fw-medium fs-16px mb-0">
            <img src="/assets/need-help-black.svg" alt="" /> Need help
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body px-4">
          <h6 className="fs-14px fw-500">Permanant Agent</h6>
          <p>
            Phasellus vitae orci placerat, volutpat lorem non, consectetur sem. Cras tempus odio id
            viverra eleifend. Proin malesuada pretium lectus, vitae scelerisque tortor maximus
            tristique. Sed auctor eget metus nec consequat.{' '}
          </p>
          <h6 className="fs-14px fw-500">Temporary Agent</h6>
          <p>
            Phasellus vitae orci placerat, volutpat lorem non, consectetur sem. Cras tempus odio id
            viverra eleifend. Proin malesuada pretium lectus, vitae scelerisque tortor maximus
            tristique. Sed auctor eget metus nec consequat.{' '}
          </p>
        </div>
      </div>
      <ToastSuccess id="LicenceAgentAddmsg">
        <span> Agent details updated successfully</span>
      </ToastSuccess>
      <ToastSuccess id="LicenceAgentDiscardmsg">
        <span>
          Agent details <span className="fw-bolder">discarded</span> successfully
        </span>
      </ToastSuccess>
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

export default EditAnAgent;
