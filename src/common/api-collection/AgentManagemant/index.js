import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../api-config/methods';

export function CreateAgent(data) {
  return handlePostMethod('/telephony/agents', { data });
}

export function ResendVerificationMail(id, data) {
  return handlePostMethod(`/admin/users/${id}/actions/resend-otp`, { data });
}

export function UpdateAgent(data, id) {
  return handlePatchMethod(`/telephony/agents/${id}`, { data });
}

export function GetAgent(id) {
  return handleGetMethod(`/telephony/agents/${id}`);
}

export function ListCountries() {
  return handleGetMethod('/admin/countries');
}

export function ListActiveAgents(query, departmentId, roleFilter, statusFilter) {
  return handleGetMethod(
    `telephony/agents?filter[is_active]=${statusFilter}&search=${
      query ? query : ''
    }&filter[role_id]=${roleFilter || ''}&filter[department_id]=${departmentId || ''}`
  );
}

export function ActivateOrDeactivateAgent(id, action, data) {
  return handlePatchMethod(`/telephony/agents/${id}/actions/${action}`, { data });
}

export function UpdateAgentRole(id, data) {
  return handlePatchMethod(`/telephony/agents/${id}`, { data });
}

export function DeleteAgent(id) {
  return handleDeleteMethod(`/telephony/agents/${id}`);
}

export function GetCompanyContact(data) {
  return handleGetMethod(`/telephony/contact-companies/${data}`);
}

export function UpdateCompanyContact(id, data) {
  return handlePatchMethod(`/telephony/contact-companies/${id}`, { data });
}
