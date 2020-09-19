import { STATUS_SET, STATUS_UNSET, CONTENT_LOAD_INPROGRESS, CONTENT_LOAD_NOTINPROGRESS } from '../constants/action.types';

const initialState = {
    status : {
        code : null,
        message : null,
        flag : false
    },
    contentLoadInProgress: false
}

export function applicationReducer(state = initialState, action) {
    switch(action.type){
        case STATUS_SET:
            return { ...state, status : action.payload }
        case STATUS_UNSET:
            const newStatus = Object.assign({}, state.status);
            newStatus.flag = false;
            return { ...state, status: newStatus}
        case CONTENT_LOAD_INPROGRESS:
            return { ...state, contentLoadInProgress: true }
        case CONTENT_LOAD_NOTINPROGRESS:
            return { ...state, contentLoadInProgress: false }
        default:
            break;
    }
    return state;
}

export default applicationReducer;