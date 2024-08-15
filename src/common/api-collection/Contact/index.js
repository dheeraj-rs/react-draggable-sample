import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../api-config/methods';

export function CreateContact(data) {
  return handlePostMethod('/telephony/contacts', { data });
}

export function UpdateContact(data, id) {
  return handlePatchMethod(`/telephony/contacts/${id}`, { data });
}

export function ListContacts(query, companyId, page) {
  return handleGetMethod(
    `/telephony/contacts?filter[company_id]=${companyId}&search=${query}&page[number]=${page || ''}`
  );
}

export function ExportContacts(companyId) {
  return handleGetMethod(
    `/telephony/contacts/actions/bulk-export?filter[contacts.id]=${companyId}`
  );
}

export function GetContact(id) {
  return handleGetMethod(`/telephony/contacts/${id}`);
}

export function DeleteContact(id) {
  return handleDeleteMethod(`/telephony/contacts/${id}`);
}

export function DeleteContacts(data) {
  return handleDeleteMethod('/telephony/contacts', { data });
}

export function ListContactLabels(type) {
  return handleGetMethod(`/telephony/contact-labels?search=${type}`);
}

export function ChangePrimaryNumber(id, data) {
  return handlePostMethod(`/telephony/contacts/${id}/actions/change-primary-phonenumber`, { data });
}

export function ContactToCalling(data) {
  return handlePostMethod(`https://13.200.77.72/?q=make-call`, data);
}
