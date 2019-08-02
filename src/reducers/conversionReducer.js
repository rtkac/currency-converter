import { ADD_CONVERSION } from '../constants/action-types';

const initialState = {
  conversions: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_CONVERSION:
      return Object.assign({}, state, {
        conversions: state.conversions.concat(action.payload)
      });
    default:
      return state;
  }
}