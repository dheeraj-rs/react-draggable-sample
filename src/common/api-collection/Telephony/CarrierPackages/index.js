import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedCarrierPackages(
  search = '',
  pageNumber = 1,
  type = '',
  isEnabled = ''
) {
  return handleGetMethod('/telephony/admin/vendor-carrier-packages', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[type]': type,
      'filter[is_enabled]': isEnabled,
    },
  });
}

export function CreateCarrierPackage(data) {
  return handlePostMethod('/telephony/admin/vendor-carrier-packages', { data });
}

export function UpdateCarrierPackage(data) {
  return handlePatchMethod(`/telephony/admin/vendor-carrier-packages/${data?.id}`, { data });
}

export function DeleteCarrierPackage(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-carrier-packages/${id}`);
}

export function GetCarrierPackages(id = '') {
  return handleGetMethod(`/telephony/admin/vendor-carrier-packages/${id}`);
}
