import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListHolidays(search = '', agent_availability_id, month) {
  return handleGetMethod('/telephony/admin/vendor-holiday', {
    params: {
      search,
      'filter[agent_availability_id]': agent_availability_id,
      'filter[month]': month,
    },
  });
}

export function CreateHoliday(data) {
  return handlePostMethod('/telephony/admin/vendor-holiday', { data });
}

export function DeleteHoliday(holidayId) {
  return handleDeleteMethod(`/telephony/admin/vendor-holiday/${holidayId}`);
}

export function UpdateHoliday(data) {
  return handlePatchMethod(`/telephony/admin/vendor-holiday/${data?.id}`, { data });
}
