import {POSTS_LOADAD,POSTS_LOADING} from '../types';

const initialState = {
    posts:[],
    loading:false
}

const postReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case POSTS_LOADING:
            return {
                ...state,
                loading:true
            }
        case POSTS_LOADAD:
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