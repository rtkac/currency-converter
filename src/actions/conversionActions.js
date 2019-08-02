import { ADD_CONVERSION } from '../constants/action-types';

export function addConversion(payload) {
  return {
    type: ADD_CONVERSION,
    payload
  }
}