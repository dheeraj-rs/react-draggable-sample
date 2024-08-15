import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function CreateLocalSwitch(data) {
  return handlePostMethod('/telephony/admin/vendor-local-switches', { data });
}

export function ListPaginatedLocalSwitches(
  search = '',
  pageNumber = 1,
  carrierGroupId = '',
  carrierId = '',
  isEnabled = ''
) {
  return handleGetMethod('/telephony/admin/vendor-local-switches', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[carrier_group_id]': carrierGroupId,
      'filter[carrier_id]': carrierId,
      'filter[is_enabled]': isEnabled,
    },
  });
}

export function UpdateLocalSwitch(data) {
  return handlePatchMethod(`/telephony/admin/vendor-local-switches/${data?.id}`, { data });
}

export function DeleteSwitch(batchId) {
  return handleDeleteMethod(`/telephony/admin/vendor-local-switches/${batchId}`);
}

export function BulkDeleteSwitch(data) {
  return handleDeleteMethod('/telephony/admin/vendor-local-switches/actions/bulk-delete', {
    data: {
      data,
    },
  });
}

export function CSVExportLocalSwitchAll(data) {
  return handlePostMethod('/telephony/admin/vendor-batches/actions/bulk-export?type=csv', { data });
}

export function CSVExportLocalSwitchSelected(data) {
  return handlePostMethod('/telephony/admin/vendor-batches/actions/bulk-export?type=csv', { data });
}

export function EnableLocalSwitch(Id) {
  const data = {
    type: 'telephony_vendor_local_switches',
    id: parseInt(Id, 10),
  };

  return handlePatchMethod(`/telephony/admin/vendor-local-switches/${Id}/actions/enable`, { data });
}

export function DisableLocalSwitch(Id) {
  const data = {
    type: 'telephony_vendor_local_switches',
    id: parseInt(Id, 10),
  };

  return handlePatchMethod(`/telephony/admin/vendor-local-switches/${Id}/actions/disable`, {
    data,
  });
}

export function ListAllLocalSwitches() {
  return handleGetMethod('/telephony/admin/vendor-local-switches/queries/all');
}
