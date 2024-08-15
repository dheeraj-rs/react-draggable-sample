import { handleGetMethod, handlePostMethod } from '../../../api-config/methods';

export function ListChatTopics(searchTerm) {
  return handleGetMethod('/admin/chat-topics', { params: { search: searchTerm } });
}

export function CreateChatTopic(data) {
  return handlePostMethod('/admin/chat-topics', { data });
}

export function GetChatTopic(id) {
  return handleGetMethod(`/admin/chat-topics/${id}`);
}
