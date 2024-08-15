import { handleGetMethod, handlePostMethod } from '../../../api-config/methods';

export function ListPredefinedCustomViews() {
  return handleGetMethod('/chat/chat-custom-views/queries/predefined');
}

export function ListCustomViews(search = '') {
  return handleGetMethod('/chat/chat-custom-views', { params: { search } });
}

export function CreateChatCustomView(data) {
  return handlePostMethod('/chat/chat-custom-views', { data });
}
