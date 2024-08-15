import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../api-config/methods';

export function CreateCompanyContact(data) {
  return handlePostMethod('/telephony/contact-companies', { data });
}

export function ListContactCompanies() {
  return handleGetMethod('/telephony/contact-companies');
}

export function ListCountries() {
  return handleGetMethod('/admin/countries');
}

export function DeleteCompanyContact(data) {
  return handleDeleteMethod(`/telephony/contact-companies/${data}`);
}

export function GetCompanyContact(data) {
  return handleGetMethod(`/telephony/contact-companies/${data}`);
}

export function GetCompany(id) {
  return handleGetMethod(`/telephony/contact-companies/${id}`);
}

export function UpdateCompanyContact(id, data) {
  return handlePatchMethod(`/telephony/contact-companies/${id}`, { data });
}
