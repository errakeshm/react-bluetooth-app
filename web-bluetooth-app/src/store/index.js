import { combineReducers } from 'redux';
import applicationReducer from '../reducers/application.reducer';
import { bluetoothReducer } from '../reducers/bluetooth.reducer';

const rootReducer = combineReducers({
    bluetoothReducer: bluetoothReducer,
    applicationReducer: applicationReducer
})

export default rootReducer;