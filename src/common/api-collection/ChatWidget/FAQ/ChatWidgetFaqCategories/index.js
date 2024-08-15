import { handleDeleteMethod, handleGetMethod } from '../../../../api-config/methods';

export function ListChatWidgetFaqCategories(id, searchTerm = '') {
  return handleGetMethod('/admin/chat-widget-faq-categories', {
    params: { 'filter[widget_id]': id, search: searchTerm },
  });
}

export function DeleteChatWidgetFaqCategory(id) {
  return handleDeleteMethod(`/admin/chat-widget-faq-categories/${id}`);
}
