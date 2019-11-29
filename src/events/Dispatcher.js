import EVENT from "./EVENT";

export function dispatchNormalEvent(e) {
    switch (e.keyCode) {
        case 72: // h
            window.dispatchEvent(EVENT.FOCUS_PREV_LIST);
            break;
        case 74: // j
            window.dispatchEvent(EVENT.FOCUS_NEXT_TODO);
            break;
        case 75: // k
            window.dispatchEvent(EVENT.FOCUS_PREV_TODO);
            break;
        case 76: // l
            window.dispatchEvent(EVENT.FOCUS_NEXT_LIST);
            break;
        case 77: // m
            window.dispatchEvent(EVENT.SELECT_TODO);
            break;
        case 67:
        case 68:
        case 71:
        case 89:
        case 90:
            App.mode = MODE.WAIT;
            break;
        default:
            break;
    }
}