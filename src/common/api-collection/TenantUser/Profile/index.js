import { handleGetMethod, handlePatchMethod } from '../../../api-config/methods';

export function GetUserProfile() {
  return handleGetMethod('/admin/profile/get', {});
}

export function UpdateUserProfile(data) {
  return handlePatchMethod('/admin/profile/update', { data });
}
