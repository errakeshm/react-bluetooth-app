import { ADD_BLUETOOTH, CHECKED, LOAD_BLUETOOTH, REMOVE_BLUETOOTH, UNCHECKED } from '../constants/action.types';

const addBluetoothDevice = (payload) => {
        return { type : ADD_BLUETOOTH, payload };
}

const loadBluetoothDevice = () => {
        return { type : LOAD_BLUETOOTH };
}

const removeBluetoothDevice = () => {
        return { type : REMOVE_BLUETOOTH };
}

const turnOnBluetooth = () => {
        return { type : CHECKED };
}

const turnOffBluetooth = () => {
        return { type : UNCHECKED };
}


export { addBluetoothDevice, loadBluetoothDevice, removeBluetoothDevice, turnOnBluetooth, turnOffBluetooth };