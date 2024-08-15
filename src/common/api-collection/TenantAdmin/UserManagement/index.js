import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListUsers(page, activeTab, searchTerm) {
  return handleGetMethod('/admin/users', {
    params: {
      page,
      ...(activeTab === 'active' && { 'filter[is_active]': true }),
      ...(activeTab === 'inactive' && { 'filter[is_active]': false }),
      ...(activeTab === 'deleted' && { 'filter[is_deleted]': true }),
      search: searchTerm,
    },
  });
}

export function CreateUser(values, organizationProfilPhotoPath) {
  const data = {
    data: {
      type: 'users',
      attributes: {
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        phone: `${values?.countryCode}${values?.phone}`,
        ...(organizationProfilPhotoPath && { profile_photo: organizationProfilPhotoPath }),
        timezone: values?.timeZone,
        language_id: 1,
      },
    },
  };

  return handlePostMethod('/admin/users', data);
}

export function DeleteUser(userId) {
  return handleDeleteMethod(`/admin/users/${userId}`);
}

export function GetUserDetails(userId) {
  return handleGetMethod(`/admin/users/${userId}`);
}

export function UpdateUser(values, organizationProfilPhotoPath, userId) {
  const data = {
    data: {
      type: 'users',
      attributes: {
        id: parseInt(userId, 10),
        first_name: values?.firstName,
        last_name: values?.lastName,
        email: values?.email,
        phone: `${values?.countryCode}${values?.phone}`,
        ...(organizationProfilPhotoPath && { profile_photo: organizationProfilPhotoPath }),
        timezone: values?.timeZone,
        language_id: 1,
      },
    },
  };

  return handlePatchMethod(`/admin/users/${userId}`, data);
}

export function ActivateUser(userId) {
  const data = {
    data: {
      type: 'users',
      attributes: {
        id: parseInt(userId, 10),
      },
    },
  };

  return handlePatchMethod(`/admin/users/${userId}/actions/activate`, data);
}

export function DeactivateUser(userId) {
  const data = {
    data: {
      type: 'users',
      attributes: {
        id: parseInt(userId, 10),
      },
    },
  };

  return handlePatchMethod(`/admin/users/${userId}/actions/deactivate`, data);
}
