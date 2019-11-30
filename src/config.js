import { ipcRenderer } from 'electron';
import MODE from "./events/MODE";
import { dispatchNormalModeEvent } from "./events/Dispatcher";

global.App = global.App || {};

App.dataDir = ipcRenderer.sendSync('get-data-dir');
App.mode = MODE.NORMAL;
App.preEvent = null;

/**
 * キーボードイベントのリスナー
 * 
 * @param {KeyboardEvent} e 
 */
window.addEventListener('keydown', e => {
    switch (App.mode) {
        case MODE.NORMAL:
            dispatchNormalModeEvent(e);
            break;
        default:
            break;
    }
});
