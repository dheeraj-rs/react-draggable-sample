import { handleGetMethod } from '../../../api-config/methods';

export default function ListChatEntryTypes() {
  return handleGetMethod('/chat/chat-entry-types');
}
