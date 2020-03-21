import { combineReducers } from'redux';
import alert from './alert';
import store from './store';
import data from './data'

export default combineReducers({
    alert,
    store,
    data
});