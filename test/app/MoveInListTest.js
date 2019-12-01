const { Application } = require('spectron');
const electronPath = require('electron');
const fs = require('fs-extra');
const path = require('path');
const assert = require('assert');

describe('Key to move in list', function () {
    this.timeout(10000);

    this.beforeAll(() => {
        fs.copySync(path.resolve(__dirname, 'data'), path.resolve(__dirname, '..', '..', 'node_modules', 'electron', 'dist', 'resources', 'data'));
    });

    this.afterAll(() => {
        fs.removeSync(path.resolve(__dirname, '..', '..', 'node_modules', 'electron', 'dist', 'resources', 'data'));
    });

    this.beforeEach(() => {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..', '..')]
        })
        return this.app.start();
    });

    this.afterEach(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    const allKey = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

    const cursorIsOn = async (list, line) => {
        const todoClassOnTheLine = await this.app.client.$(`.todo-list[data-key="${list}"]>.todo:nth-of-type(${line})`).getAttribute('class');
        const allTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo');
        for (let i = 1; i <= allTodo.length; i++) {
            if (i === line) return;
            /** @type {string} */
            const todoClass = await this.app.client.$(`.todo-list[data-key="${list}"]>.todo:nth-of-type(${i})`).getAttribute('class');
            assert.equal(todoClass.split(' ').includes('focused'), false);
        }
        assert.equal(todoClassOnTheLine.split(' ').includes('focused'), true);
    }

    [].filter.call(allKey, s => !'jkgG'.includes(s)).forEach(async s => {
        it(`cursor does not move by ${s}`, async () => {
            await this.app.client.keys(s);
            await cursorIsOn('index_list', 1);
            await cursorIsOn('discarded_list', 1);
        });
    });

    it('cursor is on the first todo in index list', async () => {
        const dataDir = await this.app.client.electron.ipcRenderer.sendSync('get-data-dir');
        console.log(dataDir);
        await cursorIsOn('index_list', 1);
    });

    it('cursor is on the first todo in discarded list', async () => {
        await cursorIsOn('discarded_list', 1);
    });

    it('cursor moves down by j', async () => {
        await this.app.client.keys('j');
        await cursorIsOn('index_list', 2);
    });

    it('cursor does not move down by j in discarded list', async () => {
        await this.app.client.keys('j');
        await cursorIsOn('discarded_list', 1);
    });

    it('cursor does not move down below the bottom', async () => {
        const allTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo');
        const bottom = allTodo.length;
        let counter = 0;
        while (counter < bottom + 10) {
            await this.app.client.keys('j');
            counter++;
        }
        await cursorIsOn('index_list', bottom);
    })

    it('cursor moves up by k', async () => {
        await this.app.client.keys('j');
        await this.app.client.keys('j');
        await this.app.client.keys('k');
        await cursorIsOn('index_list', 1);
    });

    it('cursor does not move up in unfocused list', async () => {
        await this.app.client.keys('j');
        await this.app.client.keys('j');
        await this.app.client.keys('k');
        await cursorIsOn('discarded_list', 1);
    });

    it('cursor does not move up over the top', async () => {
        await this.app.client.keys('k');
        await this.app.client.keys('k');
        await cursorIsOn('index_list', 1);
    });

    it('cursor goes to bottom by G', async () => {
        const allTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo');
        await this.app.client.keys('G');
        await cursorIsOn('index_list', allTodo.length);
    });

    it('cursor does not go to bottom by G in discarded list', async () => {
        await this.app.client.keys('G');
        await cursorIsOn('discarded_list', 1);
    });

    it('cursor goes to top by g', async () => {
        await this.app.client.keys('j');
        await this.app.client.keys('j');
        await this.app.client.keys('j');
        await this.app.client.keys('j');
        await this.app.client.keys('g');
        await cursorIsOn('index_list', 1);
    });
});