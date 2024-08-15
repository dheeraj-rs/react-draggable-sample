import { handleGetMethod } from '../../../api-config/methods';

export function ListRoles() {
  return handleGetMethod('/telephony/roles', {});
}

export function ListRoles1() {}
