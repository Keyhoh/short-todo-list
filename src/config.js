import { ipcRenderer } from 'electron';
import fs from 'fs-extra';
import MODE from "./events/MODE";
import { dispatchNormalModeEvent, dispatchInsertModeEvent, dispatchSwitchMode } from "./events/Dispatcher";

global.App = global.App || {};

App.dataDir = ipcRenderer.sendSync('get-data-dir');
fs.pathExistsSync(global.App.dataDir) || fs.mkdirSync(global.App.dataDir);
App.mode = MODE.NORMAL;

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
        case MODE.INSERT:
            dispatchInsertModeEvent(e);
        default:
            break;
    }
});

window.addEventListener('switchMode', e => {
    App.mode = e.detail;
    dispatchSwitchMode(e.detail);
});