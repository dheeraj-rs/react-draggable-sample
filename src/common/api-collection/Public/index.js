import { handleGetMethod } from '../../api-config/methods';

export default function GetPublicLoginPolicy() {
  return handleGetMethod('/auth/login-policies/queries/current-policy', {});
}
