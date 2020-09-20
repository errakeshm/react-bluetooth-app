import { STATUS_SET, STATUS_UNSET, CONTENT_LOAD_INPROGRESS, CONTENT_LOAD_NOTINPROGRESS, YTVIDEO_FORWARD, YTVIDEO_PAUSE, YTVIDEO_PLAY, YTVIDEO_VOL_INCR, YTVIDEO_VOL_DECR } from '../constants/action.types';

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

const ytVideoPlayed = ()=>{
    return { type : YTVIDEO_PLAY }
}

const ytVideoPaused = ()=>{
    return { type : YTVIDEO_PAUSE }
}

const ytVideoForward = (skip)=>{
    return { type : YTVIDEO_FORWARD, payload : skip}
}

const ytVideoIncrVolume = (volume)=>{
    return { type : YTVIDEO_VOL_INCR, payload : volume}
}

const ytVideoDecrVolume = (volume)=>{
    return { type : YTVIDEO_VOL_DECR, payload : volume}
}

export { setStatus, unsetStatus, contentLoadInProgress, contentLoadNotInProgress , ytVideoForward, ytVideoPaused, ytVideoPlayed, ytVideoIncrVolume, ytVideoDecrVolume}