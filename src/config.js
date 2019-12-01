import { ipcRenderer } from 'electron';
import fs from 'fs-extra';
import MODE from "./events/MODE";
import { dispatchNormalModeEvent } from "./events/Dispatcher";

global.App = global.App || {};

App.dataDir = ipcRenderer.sendSync('get-data-dir');
fs.pathExistsSync(global.App.dataDir) || fs.mkdirSync(global.App.dataDir);
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
