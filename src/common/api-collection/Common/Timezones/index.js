import { handleGetMethod } from '../../../api-config/methods';

export default function GetTimezones() {
  return handleGetMethod('/admin/timezones', {});
}
