const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');

describe('Select todo', function () {
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

    [].filter.call(allKey, s => !'m'.includes(s)).forEach(async s => {
        it(`does not select todo by ${s}`, async () => {
            const selected = await this.app.client.$$('.todo-list>.todo.selected');
            assert.equal(selected.length, 0);
        });
    });

    it('default selected todo is none', async () => {
        const selected = await this.app.client.$$('.todo-list>.todo.selected');
        assert.equal(selected.length, 0);
    });

    it('select focused todo by m', async () => {
        const allTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo');
        for (let i = 1; i <= allTodo.length; i++) {
            this.app.client.keys('m');
            const focused = await this.app.client.$('.todo-list[data-key="index_list"]>.todo.focused>input').getAttribute('id');
            const selected = await this.app.client.$('.todo-list[data-key="index_list"]>.todo.selected>input').getAttribute('id');
            assert.equal(focused, selected);
            this.app.client.keys('j');
        }
    });

    it('does not select unfocused todo by m', async () => {
        const allTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo');
        for (let i = 1; i <= allTodo.length; i++) {
            this.app.client.keys('m');
            const selected = await this.app.client.$('.todo-list[data-key="index_list"]>.todo.selected>input').getAttribute('id');
            for (let j = 1; j <= allTodo.length; j++) {
                if (j === i) continue;
                const unfocused = await this.app.client.$(`.todo-list[data-key="index_list"]>.todo:not(.focused):nth-of-type(${j})>input`).getAttribute('id');
                assert.notEqual(unfocused, selected);
            }
            this.app.client.keys('j');
        }
    });
});