import { NOTIFY_USER } from '../constants/action-types';

const initialState = {
  messageType: null,
  message: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        messageType: action.messageType,
        message: action.message
      }
    default:
      return state;
  }
}