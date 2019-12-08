import EVENT from "./EVENT";
import MODE from "./MODE";

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
            getFocusedTodo().dispatchEvent(EVENT.CHECK_TODO);
            // スクロールを防ぐ
            e.preventDefault();
            break;
        case 'd':
            getFocusedTodo().dispatchEvent(EVENT.DISCARD_TODO);
            break;
        case 'D':
            break;
        case 'g':
            getFocusedTodoList().dispatchEvent(EVENT.GOTO_TOP);
            break;
        case 'G':
            getFocusedTodoList().dispatchEvent(EVENT.GOTO_END);
            break;
        case 'h':
            getApp().dispatchEvent(EVENT.FOCUS_PREV_LIST);
            break;
        case 'H':
            // TODO: goto first line on screen
            break;
        case 'i':
            window.dispatchEvent(EVENT.SWITCH_MODE(MODE.INSERT));
            // iが入力されることを防ぐ
            e.preventDefault();
            break;
        case 'j':
            getFocusedTodoList().dispatchEvent(EVENT.FOCUS_NEXT_TODO);
            break;
        case 'k':
            getFocusedTodoList().dispatchEvent(EVENT.FOCUS_PREV_TODO);
            break;
        case 'l':
            getApp().dispatchEvent(EVENT.FOCUS_NEXT_LIST);
            break;
        case 'L':
            // TODO: goto last line on screen
            break;
        case 'm':
            getFocusedTodoList().dispatchEvent(EVENT.SELECT_TODO);
            break;
        case 'M':
            // TODO: goto middle line on screen
            break;
        case 'n':
            getFocusedTodoList().dispatchEvent(EVENT.CREATE_TODO);
            e.preventDefault();
            break;
        case 'o':
            // TODO: create todo below
            break;
        case 'O':
            // TODO: create todo above
            break;
        case 'p':
            getFocusedTodo().dispatchEvent(EVENT.PULL_UP_TODO);
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