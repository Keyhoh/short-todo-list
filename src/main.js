import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import Store from "./operation/Todo/Store";

global.App = global.App || { dataDir: ipcRenderer.sendSync('get-data-dir') };

const FullList = Store.findAll();

ReactDOM.render(<App todoList={FullList} />, document.getElementById('root'));