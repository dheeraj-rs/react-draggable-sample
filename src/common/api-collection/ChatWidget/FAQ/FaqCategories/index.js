import { handleGetMethod, handlePostMethod } from '../../../../api-config/methods';

export function ListFaqCategories(id, searchTerm = '') {
  return handleGetMethod('/admin/faq-categories', {
    params: { search: searchTerm },
  });
}

export function GetFaqCategory(id) {
  return handleGetMethod(`/admin/faq-categories/${id}`);
}

export function CreateFaqCategory(data) {
  return handlePostMethod('/admin/chat-widget-faq-categories', { data });
}
