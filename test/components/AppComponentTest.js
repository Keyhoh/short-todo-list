import { JSDOM } from 'jsdom';
import path from 'path';
import fs from 'fs-extra';
import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from "../../src/components/App";

global.window = new JSDOM('<!DOCTYPE html><body></body>', { url: 'http://localhost' }).window;
global.document = window.document;
global.App = { dataDir: path.resolve(__dirname, 'temp') };

describe('App component test', function () {
    let container;

    this.beforeAll(() => {
        fs.copySync(path.resolve(__dirname, 'data'), global.App.dataDir);
    });

    this.beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    this.afterEach(() => {
        document.body.removeChild(container);
        container = undefined;
    });

    it('has two List-Component', () => {
        act(() => {
            ReactDOM.render(<App />, container);
        });
        assert.notEqual(container.getElementsByClassName('todo-list'), null);
        assert.equal(container.getElementsByClassName('todo-list').length, 2);
    });
});