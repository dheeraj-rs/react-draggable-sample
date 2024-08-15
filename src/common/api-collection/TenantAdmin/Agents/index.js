import { handleGetMethod } from '../../../api-config/methods';

export function ListAgents(module = '', isActive = '', roleId = '', searchTerm = '') {
  return handleGetMethod(
    `/${module}/agents?filter[is_active]=${isActive}&filter[role_id]=${roleId}&search=${searchTerm}`
  );
}
