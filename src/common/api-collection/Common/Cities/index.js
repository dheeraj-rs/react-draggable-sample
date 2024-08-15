import { handleGetMethod } from '../../../api-config/methods';

export default function GetCities(countryId = '', stateId = '') {
  return handleGetMethod('/admin/cities', {
    params: {
      'filter[country_id]': countryId,
      'filter[state_id]': stateId,
    },
  });
}
