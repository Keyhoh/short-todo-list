import { ipcRenderer } from 'electron';
import EVENT from './EVENT';
import { REPL_MODE_SLOPPY } from 'repl';

global.App = global.App || {};

App.dataDir = ipcRenderer.sendSync('get-data-dir');

/**
 * キーボードイベントのリスナー
 * 
 * @param {KeyboardEvent} e 
 */
window.addEventListener('keydown', e => {
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
        default:
            break;
    }
});