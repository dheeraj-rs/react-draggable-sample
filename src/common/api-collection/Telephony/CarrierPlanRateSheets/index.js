import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListPaginatedCarrierPlanRateSheets(
  search = '',
  pageNumber = 1,
  carrierPlanId = '',
  countryId = '',
  stateId = '',
  cityId = '',
  areaCode = '',
  isEnabled = ''
) {
  return handleGetMethod('/telephony/admin/vendor-carrier-plan-rate-sheets', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[sheets.carrier_plan_id]': carrierPlanId,
      'filter[sheets.country_id]': countryId,
      'filter[sheets.state_id]': stateId,
      'filter[sheets.city_id]': cityId,
      'filter[sheets.area_code]': areaCode,
      'filter[sheets.is_enabled]': isEnabled,
    },
  });
}

export function CreateCarrierPlanRateSheet(data) {
  return handlePostMethod('/telephony/admin/vendor-carrier-plan-rate-sheets', { data });
}

export function ListUpdatedDatesForRateSheets(year = '', month = '') {
  return handleGetMethod('/telephony/admin/vendor-carrier-plan-rate-sheets/queries/dates', {
    params: {
      year,
      month,
    },
  });
}

export function EnableCarrierPlanRateSheet(Id) {
  const data = {
    type: 'telephony_vendor_carrier_plan_rate_sheets',
    id: parseInt(Id, 10),
  };

  return handlePatchMethod(
    `/telephony/admin/vendor-carrier-plan-rate-sheets/${Id}/actions/enable`,
    { data }
  );
}

export function DisableCarrierPlanRateSheet(Id) {
  const data = {
    type: 'telephony_vendor_carrier_plan_rate_sheets',
    id: parseInt(Id, 10),
  };

  return handlePatchMethod(
    `/telephony/admin/vendor-carrier-plan-rate-sheets/${Id}/actions/disable`,
    { data }
  );
}

export function DeleteCarrierPlanRateSheet(Id) {
  return handleDeleteMethod(`/telephony/admin/vendor-carrier-plan-rate-sheets/${Id}`);
}

export function ExportCarrierPlanRateSheet(data, type) {
  return handlePostMethod(
    `/telephony/admin/vendor-carrier-plan-rate-sheets/actions/bulk-export?type=${type}`,
    data
  );
}

export function UpdateCarrierPlanRateSheet(data) {
  return handlePatchMethod(`/telephony/admin/vendor-carrier-plan-rate-sheets/${data?.id}`, {
    data,
  });
}
