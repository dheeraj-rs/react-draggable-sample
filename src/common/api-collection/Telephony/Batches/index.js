import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedVendorBatches(search = '', pageNumber = 1, carrierId = '') {
  return handleGetMethod('/telephony/admin/vendor-batches', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[carrier_id]': carrierId,
    },
  });
}

export function ListAllBatches() {
  return handleGetMethod('/telephony/admin/vendor-batches/queries/all');
}

export function ListAllDetachedBatches(carrierId = '') {
  return handleGetMethod('/telephony/admin/vendor-batches/queries/all', {
    params: {
      'filter[carrier_id][is_null]=true': carrierId,
    },
  });
}

export function GetBatch(batchId = '') {
  return handleGetMethod(`/telephony/admin/vendor-batches/${batchId}`);
}

export function CreateBatch(data) {
  return handlePostMethod('/telephony/admin/vendor-batches', { data });
}

export function UpdateBatch(data) {
  return handlePatchMethod(`/telephony/admin/vendor-batches/${data?.id}`, { data });
}

export function DeleteBatch(Id) {
  return handleDeleteMethod(`/telephony/admin/vendor-batches/${Id}`);
}

export function BulkDeleteBatch(data) {
  return handleDeleteMethod('/telephony/admin/vendor-batches/actions/bulk-delete', {
    data: {
      data,
    },
  });
}

export function CSVExportBatchesAll(data) {
  return handlePostMethod('/telephony/admin/vendor-batches/actions/bulk-export?type=csv', { data });
}

export function CSVExportBatchesSelected(data) {
  return handlePostMethod('/telephony/admin/vendor-batches/actions/bulk-export?type=csv', { data });
}
