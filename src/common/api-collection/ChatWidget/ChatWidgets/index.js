import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function ListChatWidgets() {
  return handleGetMethod('/admin/chat-widgets', {});
}

export function CreateChatWidget(data) {
  return handlePostMethod('/admin/chat-widgets', { data });
}

export function UpdateChatTopic(data, id) {
  return handlePatchMethod(`/admin/chat-widgets/${id}`, { data });
}

export function DeleteChatWidget(id) {
  return handleDeleteMethod(`/admin/chat-widgets/${id}`);
}

export function GetChatWidgetDetails(id) {
  return handleGetMethod(`/admin/chat-widgets/${id}`, {});
}

export function SetAppearance(id, data) {
  return handlePostMethod(`/admin/chat-widgets/${id}/actions/set-appearance`, { data });
}
