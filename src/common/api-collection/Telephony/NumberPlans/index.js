import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedNumberPlans(
  search = '',
  pageNumber = 1,
  numberType = '',
  isEnabled = ''
) {
  return handleGetMethod('/telephony/admin/vendor-number-plans', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[number_type]': numberType,
      'filter[is_enabled]': isEnabled,
    },
  });
}

export function GetNumberPlans(planId) {
  return handleGetMethod(`/telephony/admin/vendor-number-plans/${planId}`);
}

export function CreateNumberPlan(data) {
  return handlePostMethod('/telephony/admin/vendor-number-plans', {
    data,
  });
}

export function DeleteNumberPaln(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-number-plans/${id}`);
}

export function UpdateNumberPlan(data) {
  return handlePatchMethod(`/telephony/admin/vendor-number-plans/${data?.id}`, { data });
}
