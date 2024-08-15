import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedCarriers(
  search = '',
  pageNumber = 1,
  isEnabled = '',
  region = '',
  carrierGroupId = ''
) {
  return handleGetMethod('/telephony/admin/vendor-carriers', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[region]': region,
      'filter[is_enabled]': isEnabled,
      'filter[carrier_group_id]': carrierGroupId,
    },
  });
}

export function ListPaginatedLocalSwitch(
  search = '',
  pageNumber = 1,
  isEnabled = '',
  carrierId = '',
  carrierGroupId = ''
) {
  return handleGetMethod('/telephony/admin/vendor-local-switches', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[is_enabled]': isEnabled,
      'filter[carrier_id]': carrierId,
      'filter[carrier_group_id]': carrierGroupId,
    },
  });
}

export function ListAllCarriers() {
  return handleGetMethod('/telephony/admin/vendor-carriers/queries/all');
}

export function GetCarrier(carrierId) {
  return handleGetMethod(`/telephony/admin/vendor-carriers/${carrierId}`);
}

export function CreateCarrier(data) {
  return handlePostMethod('/telephony/admin/vendor-carriers', { data });
}

export function CreateLocalSwitch(data) {
  return handlePostMethod('/telephony/admin/vendor-local-switches', { data });
}

export function UpdateCarrier(data, carrierId) {
  return handlePatchMethod(`/telephony/admin/vendor-carriers/${carrierId}`, { data });
}

export function DeleteCarrier(carrierId) {
  return handleDeleteMethod(`/telephony/admin/vendor-carriers/${carrierId}`);
}

export function BulkDeleteCarriers(data) {
  return handleDeleteMethod('/telephony/admin/vendor-carriers/actions/bulk-delete', {
    data: {
      data,
    },
  });
}

export function GetCarrierGroupDetails(carrierId, isEnabled, activeCountry, search) {
  function checkEnabled() {
    if (isEnabled === 'enabled') {
      return true;
    }
    if (isEnabled === 'disabled') {
      return false;
    }
    return '';
  }
  return handleGetMethod(
    `/telephony/admin/vendor-carriers?search=${search}&filter[region]=${
      !activeCountry ? '' : activeCountry
    }&filter[is_enabled]=${checkEnabled()}&filter[carrier_group_id]=${carrierId}`
  );
}

export function ListCountries() {
  return handleGetMethod('/admin/countries');
}

export function AddExistingCarriersToGroup(groupId, data) {
  return handlePatchMethod(`/telephony/admin/vendor-carrier-groups/${parseInt(groupId, 10)}`, {
    data: {
      type: 'telephony_vendor_carrier_groups',
      id: parseInt(groupId, 10),
      relationships: {
        carriers: {
          data,
        },
      },
    },
  });
}

export function ExportLocalSwitch(data, type) {
  return handlePostMethod(
    `/telephony/admin/vendor-local-switches/actions/bulk-export?type=${type}`,
    {
      data,
    }
  );
}

export function DeleteLocalSwitch(localSwitchId) {
  return handleDeleteMethod(`/telephony/admin/vendor-local-switches/${localSwitchId}`);
}

export function GetPaginatedBatches(search = '', carrierId = '') {
  return handleGetMethod('/telephony/admin/vendor-batches', {
    params: {
      search,
      'filter[carrier_id]': carrierId,
    },
  });
}

export function AddBatch(data) {
  return handlePostMethod('/telephony/admin/vendor-batches', { data });
}

export function GetAllCarrierPlans() {
  return handleGetMethod('/telephony/admin/vendor-carrier-plans/queries/all');
}

export function DeleteBatch(batchId) {
  return handleDeleteMethod(`/telephony/admin/vendor-batches/${batchId}`);
}

export function GetCarrierPlans(type) {
  return handleGetMethod(
    `/telephony/admin/vendor-carrier-plans/queries/all?filter[call_type]=${type}`
  );
}

export function ExportBatch(data, type) {
  return handlePostMethod(
    `/telephony/admin/vendor-carrier-plans/actions/bulk-export?type=${type}`,
    {
      data,
    }
  );
}
