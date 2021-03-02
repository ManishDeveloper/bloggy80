import {SET_ALERT,REMOVE_ALERT} from '../types';


const initialState = {
    alertType: null,
    msg:null
}

const alertReducer = (state = initialState, action) => {
    let {type,payload} = action;

    switch(type) {
        case SET_ALERT:
            return {
                ...state,
                alertType:payload.type,
                msg:payload.msg
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alertType:null,
                msg:null
            }
        default:
            return state;
    }
}

export default alertReducer;