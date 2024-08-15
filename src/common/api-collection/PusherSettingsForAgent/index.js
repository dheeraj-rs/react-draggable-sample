import { handleGetMethod } from '../../api-config/methods';

export default function GetPusherSettings() {
  return handleGetMethod('/chat/pusher-settings');
}
