import {combineReducers} from 'redux';
import alertReducer from './alert';
import postReducer from './post';
import auth from './auth';

const rootReducer = combineReducers({
    auth,
    alertMsg:alertReducer,
    posts:postReducer
});

export default rootReducer;