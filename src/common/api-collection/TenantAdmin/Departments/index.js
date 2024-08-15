import { handleGetMethod } from '../../../api-config/methods';

export function ListDepartments(module = '') {
  return handleGetMethod(`/${module}/departments`);
}
