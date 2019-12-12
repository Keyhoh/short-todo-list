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

/**
 * @param {Event} e 
 */
export const createTodo = e => {
    getFocusedTodo().dispatchEvent(EVENT.CREATE_TODO);
    e.preventDefault();
};
/**
 * @param {Event} e 
 */
export const checkTodo = e => getFocusedTodo().dispatchEvent(EVENT.CHECK_TODO);
/**
 * @param {Event} e 
 */
export const discardTodo = e => getFocusedTodo().dispatchEvent(EVENT.DISCARD_TODO);
/**
 * @param {Event} e 
 */
export const pullUpTodo = e => getFocusedTodo().dispatchEvent(EVENT.PULL_UP_TODO);
/**
 * @param {Event} e 
 */
export const deleteTodo = e => getFocusedTodo().dispatchEvent(EVENT.DELETE_TODO);
/**
 * @param {Event} e 
 */
export const selectTodo = e => getFocusedTodo().dispatchEvent(EVENT.SELECT_TODO);

/**
 * @param {Event} e 
 */
export const focusNextTodo = e => getFocusedTodoList().dispatchEvent(EVENT.FOCUS_NEXT_TODO);
/**
 * @param {Event} e 
 */
export const focusPrevTodo = e => getFocusedTodoList().dispatchEvent(EVENT.FOCUS_PREV_TODO);
/**
 * @param {Event} e 
 */
export const gotoTop = e => getFocusedTodoList().dispatchEvent(EVENT.GOTO_TOP);
/**
 * @param {Event} e 
 */
export const gotoEnd = e => getFocusedTodoList().dispatchEvent(EVENT.GOTO_END);

/**
 * @param {Event} e 
 */
export const focusNextList = e => getApp().dispatchEvent(EVENT.FOCUS_NEXT_LIST);
/**
 * @param {Event} e 
 */
export const focusPrevList = e => getApp().dispatchEvent(EVENT.FOCUS_PREV_LIST);

/**
 * @param {Event} e 
 */
export const switchMode = e => {
    window.dispatchEvent(EVENT.SWITCH_MODE(MODE.INSERT));
    e.preventDefault();
}
/**
 * @param {Event} e 
 */
export const switchToNormalMode = e => { };
/**
 * @param {Event} e 
 */
export const switchToInsertMode = e => { };