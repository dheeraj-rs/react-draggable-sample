import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedCaller(
  search = '',
  pageNumber = 1,
  callerListId = '',
  countryId = ''
) {
  return handleGetMethod('/telephony/admin/vendor-caller', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[caller_list_id]': callerListId,
      // 'filter[country_id]': countryId,
    },
  });
}

export function CreateCaller(data) {
  return handlePostMethod('/telephony/admin/vendor-caller', { data });
}

export function DeleteCaller(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-caller/${id}`);
}

export function UpdateCaller(data) {
  return handlePatchMethod(`/telephony/admin/vendor-caller/${data?.id}`, { data });
}

export function MoveCaller(data) {
  return handlePatchMethod(`/telephony/admin/vendor-caller/${data?.id}`, { data });
}
