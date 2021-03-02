import {USER_LOADING,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT, AUTH_ERROR,REGISTER_SUCCESS,REGISTER_FAIL} from '../types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:false,
    user:null
}

const authReducer = (state=initialState,action) => {

    const {type, payload} = action;

    switch(type) {
        case USER_LOADING:
            return {
                ...state,
                loading:true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
                return {
                    ...state,
                    isAuthenticated:true,
                    loading:false,
                    token:payload
                }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        default:
            return state;
    }
}

export default authReducer;