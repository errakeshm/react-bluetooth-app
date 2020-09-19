import { ADD_BLUETOOTH, CHECKED, LOAD_BLUETOOTH, REMOVE_BLUETOOTH, UNCHECKED } from '../constants/action.types';

const initialState = {
    device : null,
    bluetoothStatus:false
}

export function bluetoothReducer( state = initialState, action) {
    switch(action.type){
        case ADD_BLUETOOTH:
            return { ...state, device : action.payload }
        case LOAD_BLUETOOTH:
            return state.device;
        case REMOVE_BLUETOOTH:
            return { ...state, device : null}
        case CHECKED:
            return { ...state, bluetoothStatus : true}
        case UNCHECKED:
            return { ...state, bluetoothStatus : false}
        default:
            break;
    }
    return state;
}

export default bluetoothReducer;