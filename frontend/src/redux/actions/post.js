import {POSTS_LOADING,POSTS_LOADAD} from '../types';
import axios from 'axios';

export const getPosts = () => async dispatch => {

    try {
        await dispatch({
            type:POSTS_LOADING
        })

        let res = await axios.get('/api/posts/');

        await dispatch({
            type:POSTS_LOADAD,
            payload:res.data
        });
        
    } catch (error) {
        console.log(error);
    }
}