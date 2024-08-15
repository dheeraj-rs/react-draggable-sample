import { handleGetMethod } from '../../../api-config/methods';

export default function GetCountries() {
  return handleGetMethod('/admin/countries', {});
}
