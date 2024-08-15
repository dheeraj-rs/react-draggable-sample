import { handleDeleteMethod, handleGetMethod, handlePostMethod } from '../../../api-config/methods';

export function DeleteChatWidgetTopic(id) {
  return handleDeleteMethod(`/admin/chat-widget-topics/${id}`);
}

export function ListChatWidgetTopics(id = '', searchTerm = '') {
  return handleGetMethod('/admin/chat-widget-topics', {
    params: { 'filter[widget_id]': id, search: searchTerm },
  });
}

export function CreateChatWidgetTopic(data) {
  return handlePostMethod('/admin/chat-widget-topics', { data });
}

export function UpdateChatWidgetTopic(id, data) {
  return handlePostMethod(`/admin/chat-widget-topics/${id}`, { data });
}
