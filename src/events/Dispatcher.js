import EVENT from "./EVENT";
import MODE from "./MODE";

/**
 * ノーマルモード時のイベントリスナー
 * 
 * @param {KeyboardEvent} e 
 */
export function dispatchNormalModeEvent(e) {
    switch (e.keyCode) {
        case 73: // i
            App.mode = MODE.INSERT;
            window.dispatchEvent(EVENT.SWITCH_MODE);
            break;
        case 72: // h
            if (e.shiftKey) {
                // TODO: goto first line on screen
            } else {
                window.dispatchEvent(EVENT.FOCUS_PREV_LIST);
            }
            break;
        case 74: // j
            window.dispatchEvent(EVENT.FOCUS_NEXT_TODO);
            break;
        case 75: // k
            window.dispatchEvent(EVENT.FOCUS_PREV_TODO);
            break;
        case 76: // l
            if (e.shiftKey) {
                // TODO: goto last line on screen
            } else {
                window.dispatchEvent(EVENT.FOCUS_NEXT_LIST);
            }
            break;
        case 71: // g
            if (e.shiftKey) {
                window.dispatchEvent(EVENT.GOTO_END);
            } else {
                window.dispatchEvent(EVENT.GOTO_TOP);
            }
            break;
        case 77: // m
            if (e.shiftKey) {
                // TODO: goto middle line on screen
            } else {
                window.dispatchEvent(EVENT.SELECT_TODO);
            }
            break;
        case 79: // o
            if (e.shiftKey) {
                // TODO: create todo above
            } else {
                // TODO: create todo below
            }
            break;
        case 68: // d
            if (e.shiftKey) {
                // TODO: delete todo
            } else {
                // TODO: discard todo
            }
            break;
        case 89: // y
            // TODO: copy todo
            break;
        case 90: // z
            // TODO: position current todo
            break;
        default:
            break;
    }
}