import EVENT from "./EVENT";
import MODE from "./MODE";
import * as ACTION from "./ACTION";

/**
 * @returns {Element}
 */
const getApp = () => document.querySelector('#app');

/**
 * @returns {Element}
 */
const getFocusedTodoList = () => document.querySelector('.todo-list.focused');

/**
 * @returns {Element}
 */
const getFocusedTodo = () => document.querySelector('.todo-list.focused .todo.focused');

/**
 * @returns {Element} 
 */
const getEnteringTodo = () => document.querySelector('.entering');

export function dispatchSwitchMode(mode) {
    App.mode = mode;
    if (mode === MODE.NORMAL) {
        getEnteringTodo().dispatchEvent(EVENT.SWITCH_TO_NORMAL_MODE);
    } else if (mode === MODE.INSERT) {
        getFocusedTodoList().dispatchEvent(EVENT.SWITCH_TO_INSERT_MODE);
    }
}

/**
 * ノーマルモード時のイベントリスナー
 * 
 * @param {KeyboardEvent} e 
 */
export function dispatchNormalModeEvent(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    switch (e.key) {
        case ' ':
            ACTION.checkTodo(e);
            break;
        case 'd':
            ACTION.discardTodo(e);
            break;
        case 'D':
            ACTION.deleteTodo(e);
            break;
        case 'g':
            ACTION.gotoTop(e);
            break;
        case 'G':
            ACTION.gotoEnd(e);
            break;
        case 'h':
            ACTION.focusPrevList(e);
            break;
        case 'H':
            // TODO: goto first line on screen
            break;
        case 'i':
            ACTION.switchMode(e);
            break;
        case 'j':
            ACTION.focusNextTodo(e);
            break;
        case 'k':
            ACTION.focusPrevTodo(e);
            break;
        case 'l':
            ACTION.focusNextList(e);
            break;
        case 'L':
            // TODO: goto last line on screen
            break;
        case 'm':
            ACTION.selectTodo(e);
            break;
        case 'M':
            // TODO: goto middle line on screen
            break;
        case 'n':
            ACTION.createTodo(e);
            break;
        case 'o':
            // TODO: create todo below
            break;
        case 'O':
            // TODO: create todo above
            break;
        case 'p':
            ACTION.pullUpTodo(e);
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
 * @param {KeyboardEvent} e 
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