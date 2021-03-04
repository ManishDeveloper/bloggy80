import {POSTS_LOADED,POSTS_LOADING,POSTS_AUTH_LOADED,POST_ADD} from '../types';

const initialState = {
    posts:[],
    authPost:[],
    loading:true
}

const postReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case POSTS_LOADING:
            return {
                ...state,
                loading:true
            }
        case POSTS_AUTH_LOADED:
            return {
                ...state,
                authPost:payload
            }
        case POST_ADD:
            return {
                ...state,
                posts:[payload,...state.posts],
                authPost:[payload,...state.authPost]
            }
        case POSTS_LOADED:
            return {
                ...state,
                posts:payload,
                loading:false
            }
        default:
            return state;
    }
}

export default postReducer;