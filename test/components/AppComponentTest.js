import { JSDOM } from 'jsdom';
import path from 'path';
import fs from 'fs-extra';
import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import App from "../../src/components/App";

/** @type {Window} */
global.window = new JSDOM('<!DOCTYPE html><body></body>', { url: 'http://localhost' }).window;
/** @type {Document} */
global.document = window.document;
global.App = { dataDir: path.resolve(__dirname, 'temp') };

describe('App component test', function () {
    /** @type {HTMLElement} */
    let container;

    this.beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            ReactDOM.render(<App />, container);
        });
    });

    this.afterEach(() => {
        document.body.removeChild(container);
        container = undefined;
    });

    it('has two List-Component', () => {
        assert.equal(container.getElementsByClassName('todo-list').length, 2);
    });

    it('default focus is index list', () => {
        assert.equal(container.getElementsByClassName('focused').length, 1);
        assert.equal(container.getElementsByClassName('focused')[0].getAttribute('data-key'), 'index_list');
    });

    it('changes focused list to discarded list by "l"', () => {
        Simulate.keyDown(container.firstChild, { keyCode: 76 });
        assert.equal(container.getElementsByClassName('focused').length, 1);
        assert.equal(container.getElementsByClassName('focused')[0].getAttribute('data-key'), 'discarded_list');

        Simulate.keyDown(container.firstChild, { keyCode: 76 });
        assert.equal(container.getElementsByClassName('focused').length, 1);
        assert.equal(container.getElementsByClassName('focused')[0].getAttribute('data-key'), 'discarded_list');
    });

    it('changes focused list to index list by "h"', () => {
        Simulate.keyDown(container.firstChild, { keyCode: 76 });
        assert.equal(container.getElementsByClassName('focused').length, 1);
        assert.equal(container.getElementsByClassName('focused')[0].getAttribute('data-key'), 'discarded_list');

        Simulate.keyDown(container.firstChild, { keyCode: 72 });
        assert.equal(container.getElementsByClassName('focused').length, 1);
        assert.equal(container.getElementsByClassName('focused')[0].getAttribute('data-key'), 'index_list');

        Simulate.keyDown(container.firstChild, { keyCode: 72 });
        assert.equal(container.getElementsByClassName('focused').length, 1);
        assert.equal(container.getElementsByClassName('focused')[0].getAttribute('data-key'), 'index_list');
    });
});