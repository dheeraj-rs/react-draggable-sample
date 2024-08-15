import { handleGetMethod, handlePatchMethod, handlePostMethod } from '../../api-config/methods';

export function CreateRole(data) {
  return handlePostMethod('/telephony/roles', { data });
}

export function UpdateRole(data, id) {
  return handlePatchMethod(`/telephony/roles/${id}`, { data });
}

export function ListRoles() {
  return handleGetMethod('/telephony/roles');
}

export function GetRole(id) {
  return handleGetMethod(`/telephony/roles/${id}`);
}

export function ListPermissions() {
  return handleGetMethod('/telephony/permissions');
}
