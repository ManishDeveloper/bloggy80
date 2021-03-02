import {USER_LOADING,REMOVE_ALERT, USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT, AUTH_ERROR, SET_ALERT,REGISTER_SUCCESS} from '../types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    try {

        if(localStorage.token){
            setAuthToken(localStorage.token);
        }

        const res = await axios.get('/api/users/auth');

        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

export const loginUser = (email,password) => async dispatch => {
    try {
        let body = {email, password}
        let res = await axios.post('/api/users/login',body);

        await dispatch({
            type:USER_LOADING,
        });

        setTimeout(async () => {
            await dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data.token
            });

            localStorage.setItem('token',res.data.token);

        await dispatch(loadUser());

        await dispatch({
            type:REMOVE_ALERT
        });
        }, 2000);


    } catch (error) {
        dispatch({
            type:SET_ALERT,
            payload:{type:'danger',msg:error.response.data.error}
        })
    }
}


export const registerUser = (name,email,password) => async dispatch => {
    try {
        let body = {name,email,password}

        let res = await axios.post('/api/users/register',body);

        await dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data.token
        });

        localStorage.setItem('token',res.data.token);

        await dispatch(loadUser());

        await dispatch({
            type:REMOVE_ALERT
        });

    } catch (error) {
        dispatch({
            type:SET_ALERT,
            payload:{type:'danger',msg:error.response.data.error}
        })
    }
}


export const logoutUser = () => async dispatch => {

    localStorage.removeItem('token');

    await dispatch({type:LOGOUT});
    
}