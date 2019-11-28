import { JSDOM } from 'jsdom';
import path from 'path';
import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import Store from "../../src/operation/Todo/Store";
import List from "../../src/components/List/ListComponent";

/** @type {Window} */
global.window = new JSDOM('<!DOCTYPE html><body></body>', { url: 'http://localhost' }).window;
/** @type {Document} */
global.document = window.document;
global.App = { dataDir: path.resolve(__dirname, 'temp') };

describe('List component test', function () {
    /** @type {HTMLElement} */
    let container;
    const TODO_LIST = Store.findAll();

    this.beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<List list={TODO_LIST} />, container);
        });
    });

    this.afterEach(() => {
        document.body.removeChild(container);
        container = undefined;
    });

    it('has the right amount of todo', () => {
        assert.equal(container.getElementsByClassName('todo').length, TODO_LIST.length);
    });
});
