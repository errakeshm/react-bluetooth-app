import { ADD_BLUETOOTH, CHECKED, LOAD_BLUETOOTH, REMOVE_BLUETOOTH, UNCHECKED } from '../constants/action.types';

const addBluetoothDevice = (payload) => {
        return { type : ADD_BLUETOOTH, payload };
}

const loadBluetoothDevice = (payload) => {
        return { type : LOAD_BLUETOOTH };
}

const removeBluetoothDevice = (payload) => {
        return { type : REMOVE_BLUETOOTH };
}

const turnOnBluetooth = (payload) => {
        return { type : CHECKED };
}

const turnOffBluetooth = (payload) => {
        return { type : UNCHECKED };
}
