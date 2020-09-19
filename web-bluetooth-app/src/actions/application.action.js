import { STATUS_SET, STATUS_UNSET } from '../constants/action.types';

const setStatus = (code, message) => {
    return { type : STATUS_SET, payload : { code, message, flag:true}}
}

const unsetStatus = () => {
    return { type : STATUS_UNSET, payload : false }
}

export { setStatus, unsetStatus }