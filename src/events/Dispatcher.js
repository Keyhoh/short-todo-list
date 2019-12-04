import EVENT from "./EVENT";
import MODE from "./MODE";
import CLASS_NAME from "../components/CLASS_NAME";

/**
 * @param {string} class
 * @returns {[HTMLElement]}
 */
const getElementsByClassName = className => [...document.getElementsByClassName(className)];

/**
 * @returns {HTMLElement}
 */
const getApp = () => getElementsByClassName(CLASS_NAME.APP)[0];

/**
 * @returns {[HTMLElement]}
 */
const getTodoList = () => getElementsByClassName(CLASS_NAME.TODO_LIST);

/**
 * @returns {[HTMLElement]}
 */
const getTodo = () => getElementsByClassName(CLASS_NAME.TODO);

export function dispatchSwitchMode(mode) {
    getTodoList().forEach(ele => ele.dispatchEvent(EVENT.SWITCH_MODE(mode)));
}

/**
 * ノーマルモード時のイベントリスナー
 * 
 * @param {KeyboardEvent} e 
 */
export function dispatchNormalModeEvent(e) {
    switch (e.key) {
        case ' ':
            getTodo().forEach(ele => ele.dispatchEvent(EVENT.CHECK_TODO));
            e.preventDefault();
            break;
        case 'i':
            window.dispatchEvent(EVENT.SWITCH_MODE(MODE.INSERT));
            e.preventDefault();
            break;
        case 'h':
            getApp().dispatchEvent(EVENT.FOCUS_PREV_LIST);
            break;
        case 'H':
            // TODO: goto first line on screen
            break;
        case 'j':
            getTodoList().forEach(ele => ele.dispatchEvent(EVENT.FOCUS_NEXT_TODO));
            break;
        case 'k':
            getTodoList().forEach(ele => ele.dispatchEvent(EVENT.FOCUS_PREV_TODO));
            break;
        case 'l':
            getApp().dispatchEvent(EVENT.FOCUS_NEXT_LIST);
            break;
        case 'L':
            // TODO: goto last line on screen
            break;
        case 'g':
            getTodoList().forEach(ele => ele.dispatchEvent(EVENT.GOTO_TOP));
            break;
        case 'G':
            getTodoList().forEach(ele => ele.dispatchEvent(EVENT.GOTO_END));
            break;
        case 'm':
            getTodoList().forEach(ele => ele.dispatchEvent(EVENT.SELECT_TODO));
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