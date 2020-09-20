import { STATUS_SET, STATUS_UNSET, CONTENT_LOAD_INPROGRESS, CONTENT_LOAD_NOTINPROGRESS, YTVIDEO_PAUSE, YTVIDEO_PLAY, YTVIDEO_FORWARD, YTVIDEO_VOL_INCR, YTVIDEO_VOL_DECR } from '../constants/action.types';

const initialState = {
    status: {
        code: null,
        message: null,
        flag: false
    },
    contentLoadInProgress: false,
    ytVideo: {
        playVideo: false,
        forward: 0,
        volume : 0
    }
}

export function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case STATUS_SET:
            return { ...state, status: action.payload }
        case STATUS_UNSET:
            const newStatus = Object.assign({}, state.status);
            newStatus.flag = false;
            return { ...state, status: newStatus }
        case CONTENT_LOAD_INPROGRESS:
            return { ...state, contentLoadInProgress: true }
        case CONTENT_LOAD_NOTINPROGRESS:
            return { ...state, contentLoadInProgress: false }
        case YTVIDEO_PLAY:
            const newYtVideo = Object.assign({}, state.ytVideo);
            newYtVideo.playVideo = true;
            return { ...state, ytVideo: newYtVideo }
        case YTVIDEO_PAUSE:
            const newYtVideo1 = Object.assign({}, state.ytVideo);
            newYtVideo1.playVideo = false;
            return { ...state, ytVideo: newYtVideo1 }
        case YTVIDEO_FORWARD:
            const newYtVideo2 = Object.assign({}, state.ytVideo);
            newYtVideo2.forward = action.payload;
            return { ...state, ytVideo: newYtVideo2 }
        case YTVIDEO_VOL_INCR:
            const newYtVideo3 = Object.assign({}, state.ytVideo);
            newYtVideo3.volume = newYtVideo3.volume + action.payload;
            return { ...state, ytVideo: newYtVideo3 }

        case YTVIDEO_VOL_DECR:
            const newYtVideo4 = Object.assign({}, state.ytVideo);
            newYtVideo4.volume = newYtVideo4.volume - action.payload;
            return { ...state, ytVideo: newYtVideo4 };

        default:
            break;
    }
    return state;
}

export default applicationReducer;