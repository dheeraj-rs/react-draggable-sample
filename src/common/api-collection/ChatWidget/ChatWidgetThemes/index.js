import {
  handleDeleteMethod,
  handleGetMethod,
  handlePatchMethod,
  handlePostMethod,
} from '../../../api-config/methods';

export function CreateChatWidgetTheme(data) {
  return handlePostMethod('/admin/chat-widget-themes', { data });
}

export function UpdateChatWidgetTheme(id, data) {
  return handlePatchMethod(`/admin/chat-widget-themes/${id}`, { data });
}

export function ListChatWidgetThemes() {
  return handleGetMethod('/admin/chat-widget-themes', {});
}

export function GetChatWidgetTheme(id) {
  return handleGetMethod(`/admin/chat-widget-themes/${id}`, {});
}

export function DeleteChatWidgetTheme(id) {
  return handleDeleteMethod(`/admin/chat-widget-themes/${id}`, {});
}
