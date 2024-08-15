import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListCallFlows(search = '', pageNumber = 1) {
  return handleGetMethod('telephony/admin/vendor-call-flow', {
    params: {
      search,
      'page[number]': pageNumber,
    },
  });
}

export function CreateCallFLow(data) {
  return handlePostMethod('/telephony/admin/vendor-call-flow', { data });
}

export function EnableCallFlow(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(
    `telephony/admin/vendor-call-flow/${id}/actions/enable`,
    { data }
  );
}

export function DisableCallFlow(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(
    `/telephony/admin/vendor-call-flow/${id}/actions/disable`,
    { data }
  );
}

export function UpdateCallFlow(data) {
  return handlePatchMethod(`/telephony/admin/vendor-call-flow/${data?.id}`, {
    data,
  });
}

export function GetCallFlow(id) {
  return handleGetMethod(`telephony/admin/vendor-call-flow/${id}`);
}

export function PublishCallFlow(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(
    `telephony/admin/vendor-call-flow/${id}/actions/publish`,
    { data }
  );
}

export function UnpublishCallFlow(id) {
  const data = {
    id: parseInt(id, 10),
  };
  return handlePatchMethod(
    `telephony/admin/vendor-call-flow/${id}/actions/unpublish`,
    { data }
  );
}

export function ListCallFlowsListWithoutPagination() {
  return handleGetMethod(
    'telephony/admin/vendor-call-flow/actions/listWithoutPaginaton'
  );
}

export function DeleteCallFlow(Id) {
  return handleDeleteMethod(`telephony/admin/vendor-call-flow/${Id}`);
}
