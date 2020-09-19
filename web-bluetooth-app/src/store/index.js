import { combineReducers } from 'redux';
import { bluetoothReducer } from '../reducers/bluetooth.reducer';

const rootReducer = combineReducers({
    bluetoothReducer: bluetoothReducer
})

export default rootReducer;