import { handleGetMethod, handlePatchMethod } from '../../../api-config/methods';

export function ListPaginatedComponents(search = '', pageNumber = 1, is_enabled = '') {
  return handleGetMethod('/telephony/admin/vendor-components', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[is_enabled]': is_enabled,
    },
  });
}
export function ListAllComponents(search = '') {
  return handleGetMethod('/telephony/admin/vendor-components/queries/all', {
    params: {
      search,
    },
  });
}
export function UpdateComponent(data) {
  return handlePatchMethod(`/telephony/admin/vendor-components/${data?.id}`, { data });
}
export function EnableComponent(id) {
  const data = {
    type: 'telephony_vendor_lots',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-components/${id}/actions/enable`, { data });
}
export function DisableComponent(id) {
  const data = {
    type: 'telephony_vendor_lots',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-components/${id}/actions/disable`, { data });
}
export function PublishAllComponents(arr) {
  const data = arr;
  return handlePatchMethod(`/telephony/admin/vendor-components/actions/publish-all`, { data });
}
