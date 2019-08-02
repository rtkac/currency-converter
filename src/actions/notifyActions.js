import { NOTIFY_USER } from '../constants/action-types';

export function notifyUser(payload) {
  return {
    type: NOTIFY_USER,
    messageType: payload.messageType,
    message: payload.message
  }
}