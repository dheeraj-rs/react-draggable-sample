import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedCarrierPlans(search = '', pageNumber = 1, callType = '') {
  return handleGetMethod('/telephony/admin/vendor-carrier-plans', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[call_type]': callType,
    },
  });
}

export function ListAllCarrierPlans(callType = '', search = '') {
  return handleGetMethod('/telephony/admin/vendor-carrier-plans/queries/all', {
    params: {
      search,
      'filter[call_type]': callType,
    },
  });
}

export function GetCarrierPlan(id) {
  return handleGetMethod(`/telephony/admin/vendor-carrier-plans/${id}`);
}

export function CreateCarrierPlan(data) {
  return handlePostMethod('/telephony/admin/vendor-carrier-plans', { data });
}

export function UpdateCarrierPlan(data, Id) {
  return handlePatchMethod(`/telephony/admin/vendor-carrier-plans/${Id}`, { data });
}

export function EnableCarrierPlan(Id) {
  const data = {
    type: 'telephony_vendor_carrier_plans',
    id: parseInt(Id, 10),
  };

  return handlePatchMethod(`/telephony/admin/vendor-carrier-plans/${Id}/actions/enable`, { data });
}

export function DisableCarrierPlan(Id) {
  const data = {
    type: 'telephony_vendor_carrier_plans',
    id: parseInt(Id, 10),
  };

  return handlePatchMethod('/telephony/admin/vendor-carrier-plans/:id/actions/disable', { data });
}

export function DeleteCarrierPlan(Id) {
  return handleDeleteMethod(`/telephony/admin/vendor-carrier-plans/${Id}`);
}

export function bulkDeleteCarrierPlan(data) {
  return handleDeleteMethod('/telephony/admin/vendor-carrier-plans/actions/bulk-delete', {
    data: {
      data,
    },
  });
}

export function CSVExportCarrierPlan(data, type = 'csv') {
  return handlePostMethod(
    `/telephony/admin/vendor-carrier-plans/actions/bulk-export?type=${type}`,
    {
      data,
    }
  );
}
