import { handleDeleteMethod, handleGetMethod, handlePostMethod } from '../../../api-config/methods';

export function ListPaginatedCarrierGroupsUsage(
  search = '',
  pageNumber = 1,
  type = '',
  isEnabled = '',
  carrierGroupId = ''
) {
  return handleGetMethod('/telephony/admin/vendor-carrier-group-usages', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[type]': type,
      'filter[carriers.is_enabled]': isEnabled,
    },
  });
}
export function DeleteCarrierGroupUsage(id) {
  return handleDeleteMethod(`/telephony/admin/vendor-carrier-group-usages/${id}`);
}
export function CreateCarrierGroupUsage(data) {
  return handlePostMethod('/telephony/admin/vendor-carrier-group-usages', { data });
}

export function ListPaginatedCarrierGroups(page, search = '') {
  return handleGetMethod('/telephony/admin/vendor-carrier-group-usages', {
    params: {
      search,
      'page[number]': page,
      'filter[carriers.is_enabled]': page,
      '[type]': 'charge',
    },
  });
}
export function ListAllCarrierGroupUsages() {
  return handleGetMethod('/telephony/admin/vendor-carrier-group-usages');
}

export function CSVExportCarrierGroupUsage(data = []) {
  return handlePostMethod(
    '/telephony/admin/vendor-carrier-group-usages/actions/bulk-export?type=csv',
    {
      data,
    }
  );
}

export function ListAllLotMrc() {
  return handleGetMethod('/telephony/admin/vendor-lot-monthly-recurring-cost');
}
export function ListPaginatedLotMrc(page, search = '') {
  return handleGetMethod('/telephony/admin/vendor-lot-monthly-recurring-cost', {
    params: {
      search,
      'page[number]': page,
    },
  });
}

export function CsvExportLotMrc(data = []) {
  return handlePostMethod(
    '/telephony/admin/vendor-lot-monthly-recurring-cost/actions/bulk-export?type=csv',
    {
      data,
    }
  );
}
