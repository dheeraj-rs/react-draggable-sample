import { handleGetMethod } from '../../../api-config/methods';

export default function GetStates(countryId) {
  return handleGetMethod('/admin/states', {
    params: {
      'filter[country_id]': countryId,
    },
  });
}
