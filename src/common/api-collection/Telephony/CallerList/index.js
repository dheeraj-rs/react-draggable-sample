import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListCallerList(search = '', pageNumber = 1) {
  return handleGetMethod('telephony/admin/vendor-caller-list', {
    params: {
      search,
      'page[number]': pageNumber,
    },
  });
}

export function ListCategorieCount(search = '', callerListId = '') {
  return handleGetMethod('/telephony/admin/vendor-caller', {
    params: {
      search,
      'filter[caller_list_id]': callerListId,
    },
  });
}
export function CreateCallerlist(data) {
  return handlePostMethod('/telephony/admin/vendor-caller-list', { data });
}

export function DeleteCallerList(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-caller-list/${id}`);
}

export function UpdateCallerList(data) {
  return handlePatchMethod(`/telephony/admin/vendor-caller-list/${data?.id}`, { data });
}

export function ClearCallerList(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-caller-list/clear/${id}`);
}

export function BulkDeleteCallerList(data) {
  return handleDeleteMethod('/telephony/admin/vendor-caller/actions/bulk-delete', {
    data: {
      data,
    },
  });
}
