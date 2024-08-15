/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../common/layout';
import CheckboxTickChat from '../../../common/components/forms/CheckboxTIckChat';
import Input from '../../../common/components/forms/Input';
import Select from '../../CommAdminCentre/components/common/Select';
import Select2 from '../../../common/components/forms/Select2';
import CustomRoleOffCanvas from '../components/OffCanvas/CustomRoleOffCanvas';
import NeedHelpOffCanvas from '../components/OffCanvas/NeedHelpOffCanvas';
import AgentType from '../components/AgentType';
import MomentaryFileUpload from '../../../common/api-collection/Common/MomentaryFileUpload';
import { CreateAgent } from '../../../common/api-collection/AgentManagemant';
import { getFormErrorMessage, isFormFieldValid } from '../../../common/helpers/utils';
import GetTimezones from '../../../common/api-collection/Common/Timezones';
import SearchSelect from '../components/SlelectWithSearch';
import { ListRoles } from '../../../common/api-collection/TenantAdmin/Roles';
import { ListDepartments } from '../../../common/api-collection/Department';
import ToastError from '../../../common/components/toast/ToastError';
import ToastSuccess from '../../../common/components/toast/ToastSucess';
import PhoneNumberInput from '../../../common/components/forms/PhoneInput';

function AddAgent() {
  const [selectedAgentType, setSelectedAgentType] = useState('Permanent Agent');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [timezones, setTimezones] = useState([]);
  const [roles, setRoles] = useState();
  const [selectedRoleName, setSelectedRoleName] = useState('Select Role');
  const [departments, setDepartments] = useState();
  const [selectedDepartments, setSelectedDepartments] = useState();
  const [toastAction, setToastAction] = useState({ isVisible: false, message: '', type: '' });
  const navigate = useNavigate();
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

    if (data.departments?.length == 0) {
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
      setIsProfileUpdating(true);
      const data = {
        type: 'users',
        attributes: {
          first_name: formik.values?.first_name,
          last_name: formik.values?.last_name,
          email: formik.values?.email,
          phone: formik.values?.phone,
          extension: formik.values?.extension,
          profile_photo: formik.values?.profile_photo,
          timezone: formik.values?.timezone
            .replace(/\([^()]*\)/g, '')
            .split(' ')[1]
            .trim(),
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
              ...ids.map((id) => ({
                type: 'departments',
                id,
              })),
            ],
          },
        },
      };

      CreateAgent(data)
        .then(() => {
          formik.resetForm();
          setToastAction({
            isVisible: true,
            type: 'success',
            message: 'Profile details saved successfully!',
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

  // Helper function to convert data URL to Blob object
  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
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
        let width = img.width;
        let height = img.height;
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
            // setStorageName(response?.data?.data?.attributes?.storage_name);
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
    GetTimezones().then((response) => {
      setTimezones(response.data.timezones);
    });
    listRoles();
    listDepartments();
  }, []);

  return (
    <Layout title="comm voice" headerTitle="Contacts" favIcon="/favicon-voice.svg">
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
                        className="d-flex justify-content-between"
                      >
                        <img src="/assets/leftback.svg" alt="" />
                      </a>
                    </div>
                    <div>
                      <h5 className="fs-16px fw-500">
                        <Link
                          to="/app/comm-telephony/agents-departments/"
                          className="d-block d-lg-none"
                        >
                          <img src="/assets/left-arrow-black.svg" className="me-2" alt="" />
                        </Link>{' '}
                        Add an agent
                      </h5>
                      <p>Manage agents based on their departments</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    to="/"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <img src="/assets/help-circle.svg" alt="" /> Need help
                  </Link>
                </div>
              </div>

              <div className="equal-pad scroll-wrap scroll-custom pb-3 agent-padding">
                <h6 className="fs-14px text-secondary-color mt-5">Agent license</h6>
                <div className="d-flex mt-3 gap-4" id="custom-input">
                  <div className="row">
                    <AgentType
                      title="Permanent Agent"
                      description=" Is a full-time agent who will login to the product console everyday and manages"
                      selection={selectedAgentType}
                      onClick={(type) => {
                        setSelectedAgentType(type);
                      }}
                    />
                    <AgentType
                      title="Temporary Agent"
                      description="Is a short time agent who can access the product console for a
                      limited period."
                      selection={selectedAgentType}
                      onClick={(type) => {
                        setSelectedAgentType(type);
                      }}
                    />
                  </div>
                </div>

                <h6 className="fs-14px text-secondary-color mt-4">License details</h6>

                <div className="col-lg-12 col-sm-12">
                  <div className="d-flex p-3 rounded mt-4 gap-4 align-items-center py-4 align-items-center justify-content-between px-4 bg-chat-blue">
                    <div className="d-flex align-items-center gap-4">
                      <div className="bg-white p-2 rounded">
                        <img src="/assets/license-svgrepo-com.svg" alt="" />
                      </div>

                      <div>
                        <p className="mb-1">Comm Voice</p>
                        <p className="mb-1 fs-14px">
                          Plan: <span className="fw-500">Enterprise</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-5 mb-3">
                  <h6 className="fs-14px text-secondary-color">Agent Profile</h6>

                  <div className="d-flex gap-3 align-items-center">
                    <p className="mb-0">
                      Active{' '}
                      <span>
                        <img src="/assets/Infogray.svg" alt="" />
                      </span>
                    </p>
                    <CheckboxTickChat checkid="activeId" title="" active onChange={() => {}} />
                  </div>
                </div>
                <div
                  className="row"
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
                        onClick={() => {
                          document.getElementById('file-input').click();
                        }}
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
                {getFormErrorMessage(formik, 'profile_photo')}
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
                  <div className="col-lg-6 col-sm-6 mt-4 align-items-start">
                    <PhoneNumberInput
                      label="Phone number*"
                      id="emailaddress"
                      placeholder="7898765423"
                      type="textbox"
                      disabled=""
                      name="phone"
                      onChange={(num) => {
                        formik.setFieldValue('phone', num);
                      }}
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
                      value={formik?.values?.timezone}
                      name="timezone"
                      options={timezones}
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
                        onClick={(e) => {
                          e.preventDefault();
                        }}
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
                        {/* <Link to="/">Clear All</Link> */}
                      </div>
                      <Select2
                        show
                        name="departments"
                        options={departments?.map((item) => item.attributes.name)}
                        onSelect={(name) => {
                          setSelectedDepartments(name);
                          formik.setFieldValue('departments', name);
                        }}
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
                  <button
                    type="button"
                    id="LicenceAgentDiscard"
                    disabled={isProfileUpdating}
                    className="btn bg-black d-flex align-items-center justify-content-center text-white px-4 py-12px"
                    onClick={(e) => {
                      e.preventDefault();
                      // getDepartmentIdsByName();
                      formik.handleSubmit();
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    disabled={isProfileUpdating}
                    id="LicenceAgentDiscard"
                    className="btn bg-white fw-medium text-dark border px-4 py-12px ms-3"
                    onClick={() => {
                      formik.resetForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- offcanvas custom role --> */}

      <CustomRoleOffCanvas />
      {/* <!-- custom role ends --> */}

      {/* <!-- need help canvas starts --> */}
      <NeedHelpOffCanvas />
      <ToastSuccess
        id="smsSendButtonMsg"
        onClose={() => {
          setToastAction({ isVisible: false });
          if (toastAction.type == 'success') {
            navigate('/comm-telephony/agents-departments/');
          }
        }}
        showToast={toastAction?.isVisible}
      >
        <span>{toastAction?.message}</span>
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

export default AddAgent;
