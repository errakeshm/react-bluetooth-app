import { STATUS_SET, STATUS_UNSET, CONTENT_LOAD_INPROGRESS, CONTENT_LOAD_NOTINPROGRESS } from '../constants/action.types';

const setStatus = (code, message) => {
    return { type : STATUS_SET, payload : { code, message, flag:true}}
}

const unsetStatus = () => {
    return { type : STATUS_UNSET, payload : false }
}

const contentLoadInProgress = () =>{
    return { type : CONTENT_LOAD_INPROGRESS }
}

const contentLoadNotInProgress = () =>{
    return { type : CONTENT_LOAD_NOTINPROGRESS }
}

export { setStatus, unsetStatus, contentLoadInProgress, contentLoadNotInProgress }