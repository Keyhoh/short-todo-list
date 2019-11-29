import EVENT from "./EVENT";
import MODE from "./MODE";

/**
 * ノーマルモード時のイベントリスナー
 * 
 * @param {KeyboardEvent} e 
 */
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
        case 67: // c
        case 68: // d
        case 71: // g
            if (e.shiftKey) {
                window.dispatchEvent(EVENT.GO_BOTTOM);
                break;
            }
        case 89: // y
        case 90: // z
            App.mode = MODE.WAIT;
            break;
        default:
            break;
    }
}

export function dispatchWaitEvent(e) {
    switch (e.keyCode) {
        case 67: // c
        case 68: // d
        case 71: // g
            window.dispatchEvent(EVENT.GO_TOP);
            break;
        case 89: // y
        case 90: // z
            break;
        default:
            break;
    }
    App.mode = MODE.NORMAL;
}