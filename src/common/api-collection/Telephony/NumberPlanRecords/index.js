import { handleGetMethod, handlePostMethod } from '../../../api-config/methods';

export function ListPaginatedTelephonyVendorNumberPlanRecords(search = '', pageNumber = 1, planId = '') {
  return handleGetMethod('/telephony/admin/vendor-number-plan-records', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[country_id]': '',
      'filter[state_id]': '',
      'filter[city_id]': '',
      'filter[monthly_recurring_cost]': '',
      'filter[channels]': '',
      'filter[number_plan_id]': planId
    },
  });
}

export function GetTelephonyVendorNumberPlanRecord(planId) {
  return handleGetMethod(`/telephony/admin/vendor-number-plan-records/${planId}`);
}

export function ListUpdatedDatesNumberPlanRecords() {
  return handleGetMethod('/telephony/admin/vendor-number-plan-records/queries/dates', {
    params: {
      year: '',
      month: '',
    },
  });
}

export function CreateTelephonyVendorNumberPlanRecord(data) {
  return handlePostMethod('/telephony/admin/vendor-number-plan-records', {
    data,
  });
}

export function SetValuePreviewVendorNumberPlanRecordCopy(data) {
  return handlePostMethod('/telephony/admin/vendor-number-plan-records/actions/set-value', {
    data,
  });
}

export function CustomersideListPaginatedTelephonyVendorNumberPlanRecords(
  search = '',
  pageNumber = 1,
  countryId = '',
  stateId = '',
  cityId = '',
  mrc = '',
  channels = '',
  numberType = '',
  number = ''
) {
  return handleGetMethod('/telephony/admin/customer/vendor-number-plan-records', {
    params: {
      search,
      'page[number]': pageNumber,
      'filter[country_id]': countryId,
      'filter[state_id]': stateId,
      'filter[city_id]': cityId,
      'filter[monthly_recurring_cost]': mrc,
      'filter[channels]': channels,
      'filter[number_plans.number_type]': numberType,
      'filter[number]': number,
    },
  });
}

export function ListAllTelephonyVendorNumberPlanRecords() {
  return handleGetMethod('/telephony/admin/vendor-number-plan-records/queries/all');
}
