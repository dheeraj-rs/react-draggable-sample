import { handleGetMethod, handlePatchMethod } from '../../../../api-config/methods';

export function ListChatSessions(customView, filterTypes) {
  return handleGetMethod(
    `/chat/omni-box/chat-sessions?filter[custom_view]=${customView}&filter[is_first_response_only]=${filterTypes?.isFirstResponseOnly}&filter[is_response_due_only]=${filterTypes?.isResponseDueOnly}&filter[is_no_response_due_only]=${filterTypes?.isNoResponseDueOnly}`
  );
}

export function ResolveChatSession(module = '', sessionId = '', data = {}) {
  return handlePatchMethod(`/${module}/omni-box/chat-sessions/${sessionId}/actions/resolve`, {
    data,
  });
}

export function ReopenChatSession(module = '', sessionId = '', data = {}) {
  return handlePatchMethod(`/${module}/omni-box/chat-sessions/${sessionId}/actions/reopen`, {
    data,
  });
}
