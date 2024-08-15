import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedCarrierGroups(search = '', pageNumber = 1) {
  return handleGetMethod('/telephony/admin/vendor-carrier-groups', {
    params: {
      search,
      'page[number]': pageNumber,
    },
  });
}

export function ListAllCarrierGroups() {
  return handleGetMethod('/telephony/admin/vendor-carrier-groups/queries/all');
}

export function GetCarrierGroup(groupId) {
  return handleGetMethod(`/telephony/admin/vendor-carrier-groups/${groupId}`);
}

export function CreateCarrierGroup(data) {
  return handlePostMethod('/telephony/admin/vendor-carrier-groups', { data });
}

export function UpdateCarrierGroup(data, groupId) {
  return handlePatchMethod(`/telephony/admin/vendor-carrier-groups/${groupId}`, { data });
}

export function DeleteCarrierGroup(groupId) {
  return handleDeleteMethod(`/telephony/admin/vendor-carrier-groups/${groupId}`);
}

export function BulkDeleteCarrierGroup(data) {
  return handleDeleteMethod('/telephony/admin/vendor-carrier-groups/actions/bulk-delete', {
    data: {
      data,
    },
  });
}

export function ExportCarrierGroups(data, type) {
  return handlePostMethod(
    `/telephony/admin/vendor-carrier-groups/actions/bulk-export?type=${type}`,
    {
      data,
    }
  );
}

export function ExportCarriers(data, type) {
  return handlePostMethod(
    `/telephony/admin/vendor-carriers/actions/bulk-export?type=${type}`,
    {
      data,
    }
  );
}
