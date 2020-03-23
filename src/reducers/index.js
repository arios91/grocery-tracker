import { combineReducers } from'redux';
import alert from './alert';
import store from './store';
import item from './item'

export default combineReducers({
    alert,
    store,
    item
});