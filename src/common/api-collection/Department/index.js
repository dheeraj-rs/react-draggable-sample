import { handleDeleteMethod, handleGetMethod, handlePatchMethod, handlePostMethod } from '../../api-config/methods';

export function ListDepartments() {
  return handleGetMethod('/telephony/departments', {});
}

export function GetDepartment(id) {
  return handleGetMethod(`/telephony/departments/${id}`, {});
}

export function DeleteDepartment(id) {
  return handleDeleteMethod(`/telephony/departments/${id}`, {});
}

export function AddDepartment(data) {
  return handlePostMethod('/telephony/departments', { data });
}

export function UpdateDepartment(data, id) {
  return handlePatchMethod(`/telephony/departments/${id}`, { data });
}
