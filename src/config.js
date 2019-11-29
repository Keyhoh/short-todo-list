import { ipcRenderer } from 'electron';

global.App = global.App || {};

App.dataDir = ipcRenderer.sendSync('get-data-dir');