import { handlePatchMethod } from '../../../api-config/methods';

export function AssignChatSession(module = '', sessionsId = '', data = {}) {
  return handlePatchMethod(`${module}/omni-box/chat-sessions/${sessionsId}/actions/assign`, {
    data,
  });
}
