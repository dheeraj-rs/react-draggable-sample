import { handleGetMethod, handlePatchMethod } from '../../../api-config/methods';

export function GetOrganizationProfile() {
  return handleGetMethod('/admin/organizations/queries/profile', {});
}

export function UpdateOrganizationProfile(details) {
  const data = {
    type: 'organizations',
    attributes: details,
  };
  return handlePatchMethod('/admin/organizations/actions/update-profile', { data });
}
