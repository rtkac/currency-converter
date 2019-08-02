import { createStore, combineReducers } from 'redux';
import conversionReducer from '../reducers/conversionReducer';
import notifyReducer from '../reducers/notifyReducer';

const rootReducer = combineReducers({
  conversions: conversionReducer,
  notify: notifyReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;