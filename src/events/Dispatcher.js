import EVENT from "./EVENT";
import MODE from "./MODE";

/**
 * ノーマルモード時のイベントリスナー
 * 
 * @param {KeyboardEvent} e 
 */
export function dispatchNormalModeEvent(e) {
    switch (e.key) {
        case 'i':
            window.dispatchEvent(EVENT.SWITCH_MODE(MODE.INSERT));
            e.preventDefault();
            break;
        case 'h':
            window.dispatchEvent(EVENT.FOCUS_PREV_LIST);
            break;
        case 'H':
            // TODO: goto first line on screen
            break;
        case 'j':
            window.dispatchEvent(EVENT.FOCUS_NEXT_TODO);
            break;
        case 'k':
            window.dispatchEvent(EVENT.FOCUS_PREV_TODO);
            break;
        case 'l':
            window.dispatchEvent(EVENT.FOCUS_NEXT_LIST);
            break;
        case 'L':
            // TODO: goto last line on screen
            break;
        case 'g':
            window.dispatchEvent(EVENT.GOTO_TOP);
            break;
        case 'G':
            window.dispatchEvent(EVENT.GOTO_END);
            break;
        case 'm':
            window.dispatchEvent(EVENT.SELECT_TODO);
            break;
        case 'M':
            // TODO: goto middle line on screen
            break;
        case 'o':
            // TODO: create todo below
            break;
        case 'O':
            // TODO: create todo above
            break;
        case 'd':
            // TODO: discard todo
            break;
        case 'D':
            break;
        case 'y':
            // TODO: copy todo
            break;
        case 'z':
            // TODO: position current todo
            break;
        default:
            break;
    }
}

/**
 * インサートモード時のイベントリスナー
 * 
 * @param e {KeyboardEvent}
 */
export function dispatchInsertModeEvent(e) {
    switch (e.key) {
        case '[':
            if (!e.ctrlKey) break;
        case 'Escape':
            window.dispatchEvent(EVENT.SWITCH_MODE(MODE.NORMAL));
            break;
        default:
            break;
    }
}