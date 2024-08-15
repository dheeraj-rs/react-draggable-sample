import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedTemplates(
  search = '',
  pageNumber = 1,
  is_enabled = '',
  callflowId = ''
) {
  return handleGetMethod('/telephony/admin/vendor-templates', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[is_enabled]': is_enabled,
      'filter[call_flow_id]': callflowId,
    },
  });
}

export function CreateTemplates(data) {
  return handlePostMethod('/telephony/admin/vendor-templates', { data });
}

export function DeleteTemplates(templateId) {
  return handleDeleteMethod(`/telephony/admin/vendor-templates/${templateId}`);
}

export function UpdateTemplates(data) {
  return handlePatchMethod(`/telephony/admin/vendor-templates/${data?.id}`, { data });
}

export function EnableTemplates(id) {
  const data = {
    type: 'telephony_vendor_templates',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-templates/${id}/actions/enable`, { data });
}

export function DisableTemplates(id) {
  const data = {
    type: 'telephony_vendor_templates',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-templates/${id}/actions/disable`, { data });
}

export function PublishAllTemplates(arr) {
  const data = arr;
  return handlePatchMethod(`/telephony/admin/vendor-templates/actions/publish-all`, { data });
}

export function ListAllTemplates() {
  return handleGetMethod(`/telephony/admin/vendor-templates/queries/all`);
}
export function PublishTemplates(id) {
  const data = {
    type: 'telephony_vendor_lots',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-templates/${id}/actions/publish`, { data });
}
export function UnPublishTemplates(id) {
  const data = {
    type: 'telephony_vendor_lots',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-templates/${id}/actions/unpublish`, { data });
}
