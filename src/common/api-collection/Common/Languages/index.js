import { handleGetMethod } from '../../../api-config/methods';

export default function GetLanguages() {
  return handleGetMethod('/admin/languages', {});
}
