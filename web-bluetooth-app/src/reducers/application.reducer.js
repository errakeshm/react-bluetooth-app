import { STATUS_SET, STATUS_UNSET } from '../constants/action.types';

const initialState = {
    status : {
        code : null,
        message : null,
        flag : false
    }
}

export function applicationReducer(state = initialState, action) {
    switch(action.type){
        case STATUS_SET:
            return { ...state, status : action.payload }
        case STATUS_UNSET:
            const newStatus = Object.assign({}, state.status);
            newStatus.flag = false;
            return { ...state, status: newStatus}
        default:
            break;
    }
    return state;
}

export default applicationReducer;