import "./config";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import Store from "./operation/Todo/Store";

const FullList = Store.findAll();

window.addEventListener('keydown', e => {
    global.App.mode
});

ReactDOM.render(<App todoList={FullList} />, document.getElementById('root'));