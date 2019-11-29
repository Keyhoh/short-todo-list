import { ipcRenderer } from 'electron';
import MODE from "./events/MODE";
import { dispatchNormalEvent, dispatchWaitEvent } from "./events/Dispatcher";

global.App = global.App || {};

App.dataDir = ipcRenderer.sendSync('get-data-dir');
App.mode = MODE.NORMAL;



/**
 * キーボードイベントのリスナー
 * 
 * @param {KeyboardEvent} e 
 */
window.addEventListener('keydown', e => {
    switch (App.mode) {
        case MODE.NORMAL:
            dispatchNormalEvent(e);
            break;
        case MODE.WAIT:
            dispatchWaitEvent(e);
            break;
        default:
            break;
    }
});
