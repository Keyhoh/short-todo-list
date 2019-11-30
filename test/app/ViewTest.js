const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');
const assert = require('assert');

describe('Application launch', function () {
    this.timeout(10000);

    beforeEach(() => {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..', '..')]
        })
        return this.app.start();
    });

    afterEach(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    describe('Move cursor', () => {
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
        it('cursor is on the first todo in index list', async () => {
            await cursorIsOn('index_list', 1);
        });

        it('cursor is on the first todo in discarded list', async () => {
            await cursorIsOn('discarded_list', 1);
        });

        it('cursor moves down by j', async () => {
            await this.app.client.keys('j');
            await cursorIsOn('index_list', 2);
        });

        it('cursor does not move down by j in unfocused list', async () => {
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

        it('cursor does not move down by k in unfocused list', async () => {
            await this.app.client.keys('j');
            await this.app.client.keys('j');
            await this.app.client.keys('k');
            cursorIsOn('discarded_list', 1);
        });
    });
});