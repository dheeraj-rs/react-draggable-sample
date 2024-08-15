import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedVendorLots(
  search = '',
  pageNumber = 1,
  batchId = '',
  stateFilter = ''
) {
  return handleGetMethod('/telephony/admin/vendor-lots', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[batch_id]': batchId,
      'filter[is_enabled]': stateFilter,
    },
  });
}

export function ListPaginatedLots(search = '', batchId = '', isEnabled = '', pageNumber = 1) {
  return handleGetMethod('/telephony/admin/vendor-lots', {
    params: {
      search,
      'filter[batch_id]': batchId,
      'filter[is_enabled]': isEnabled,
      'page[number]': pageNumber,
    },
  });
}

export function ListAllLots() {
  return handleGetMethod('/telephony/admin/vendor-lots/queries/all');
}

export function GetLot(id) {
  return handleGetMethod(`/telephony/admin/vendor-lots/${id}`);
}

export function CreateLot(data) {
  return handlePostMethod('/telephony/admin/vendor-lots', { data });
}

export function UpdateLot(data) {
  return handlePatchMethod(`/telephony/admin/vendor-lots/${data?.id}`, { data });
}

export function EnableLot(id) {
  const data = {
    type: 'telephony_vendor_lots',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-lots/${id}/actions/enable`, { data });
}

export function DisableLot(id) {
  const data = {
    type: 'telephony_vendor_lots',
    id: parseInt(id, 10),
  };
  return handlePatchMethod(`/telephony/admin/vendor-lots/${id}/actions/disable`, { data });
}

export function DeleteLot(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-lots/${id}`);
}

export function BulkDeleteLots(data) {
  return handleDeleteMethod('/telephony/admin/vendor-lots/actions/bulk-delete', {
    data: {
      data,
    },
  });
}

export function CSVExportLots(data, type = 'csv') {
  return handlePostMethod(`/telephony/admin/vendor-lots/actions/bulk-export?type=${type}`, {
    data,
  });
}
