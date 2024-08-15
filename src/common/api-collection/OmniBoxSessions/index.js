import { handlePostMethod } from '../../api-config/methods';

export function ReplyToWidget(data) {
  return handlePostMethod('/chat/omni-box/chat-entries/actions/reply', { data });
}

export function ReplyToWidgetWithMultipleAttachments(data) {
  return handlePostMethod('/chat/omni-box/chat-entries/actions/multiple-attachments', { data });
}
