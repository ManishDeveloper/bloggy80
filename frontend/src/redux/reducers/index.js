import {combineReducers} from 'redux';
import alertReducer from './alert';
import auth from './auth';

const rootReducer = combineReducers({
    auth,
    alertMsg:alertReducer
});

export default rootReducer;