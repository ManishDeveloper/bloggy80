import {POSTS_LOADING,POSTS_LOADED,POSTS_AUTH_LOADED,POST_ADD,SET_ALERT} from '../types';
import axios from 'axios';

export const getPosts = () => async dispatch => {

    try {
        await dispatch({
            type:POSTS_LOADING
        })

        let res = await axios.get('/api/posts/');

        await dispatch({
            type:POSTS_LOADED,
            payload:res.data
        });
        
    } catch (error) {
        console.log(error);
    }
}

export const getLoginUserPost = () => async dispatch => {

    try {
        await dispatch({
            type:POSTS_LOADING
        })

        let res = await axios.get('/api/posts/user/user-post');

        await dispatch({
            type:POSTS_AUTH_LOADED,
            payload:res.data
        });
        
    } catch (error) {
        console.log(error);
    }
}

export const addPost = (postData) => async dispatch => {

    try {

        let res = await axios.post('/api/posts/create',postData);

        await dispatch({
            type:POST_ADD,
            payload:res.data
        })

        await dispatch({
            type:SET_ALERT,
            payload:{type:'success',msg:'Post Added!'}
        })
        
    } catch (error) {
        dispatch({
            type:SET_ALERT,
            payload:{type:'danger',msg:error.response.data.error}
        })
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/delete/${id}`);

        await dispatch(getLoginUserPost());
        
    } catch (error) {
        console.log(error);
    }
}