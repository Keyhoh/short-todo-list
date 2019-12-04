import { ipcRenderer } from 'electron';
import fs from 'fs-extra';
import MODE from "./events/MODE";
import { dispatchNormalModeEvent, dispatchInsertModeEvent } from "./events/Dispatcher";
import EVENT from "./events/EVENT";

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
    /** @type e.mode {MODE} */
    switch (e.detail) {
        case MODE.NORMAL:
            window.dispatchEvent(EVENT.SWITCH_TO_NORMAL_MODE);
            break;
        case MODE.INSERT:
            window.dispatchEvent(EVENT.SWITCH_TO_INSERT_MODE);
            break;
        default:
            break;
    }
});