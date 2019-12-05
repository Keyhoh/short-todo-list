import MODE from "./MODE";

export default {
    "CHECK_TODO": new Event('checkTodo'),
    "DISCARD_TODO": new Event('discardTodo'),
    "PULL_UP_TODO": new Event('pullUpTodo'),
    /** @param mode {MODE} */
    "SWITCH_MODE": mode => new CustomEvent('switchMode', { detail: mode }),
    "SWITCH_TO_NORMAL_MODE": new Event('switchToNormalMode'),
    "SWITCH_TO_INSERT_MODE": new Event('switchToInsertMode'),
    "GOTO_TOP": new Event('gotoTop'),
    "GOTO_END": new Event('gotoEnd'),
    "FOCUS_NEXT_LIST": new Event('focusNextList'),
    "FOCUS_PREV_LIST": new Event('focusPrevList'),
    "SELECT_TODO": new Event('selectTodo'),
    "FOCUS_NEXT_TODO": new Event('focusNextTodo'),
    "FOCUS_PREV_TODO": new Event('focusPrevTodo')
}