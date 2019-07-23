import { combineReducers } from 'redux';
import loginReducer from './LoginReducers';

export default combineReducers({
    login: loginReducer,
});
