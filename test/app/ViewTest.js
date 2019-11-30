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
        it('cursor is on the first todo', async () => {
            /** @type {string} */
            const firstTodoClass = await this.app.client.$('.todo-list[data-key="index_list"]>.todo:nth-of-type(1)').getAttribute('class');
            const otherTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo:not(:nth-of-type(1))');
            for (let i = 1; i <= otherTodo.length; i++) {
                if (i === 1) return;
                /** @type {string} */
                const todoClass = await this.app.client.$(`.todo-list[data-key="index_list"]>.todo:nth-of-type(${i})`).getAttribute('class');
                assert.equal(todoClass.split(' ').includes('focused'), false);
            }
            assert.equal(firstTodoClass.split(' ').includes('focused'), true);
        });

        it('cursor moves down by j', async () => {
            await this.app.client.keys('j');
            /** @type {string} */
            const secondTodoClass = await this.app.client.$('.todo-list[data-key="index_list"]>.todo:nth-of-type(2)').getAttribute('class');
            const allTodo = await this.app.client.$$('.todo-list[data-key="index_list"]>.todo');
            for (let i = 1; i <= allTodo.length; i++) {
                if (i === 2) return;
                /** @type {string} */
                const todoClass = await this.app.client.$(`.todo-list[data-key="index_list"]>.todo:nth-of-type(${i})`).getAttribute('class');
                assert.equal(todoClass.split(' ').includes('focused'), false);
            }
            assert.equal(secondTodoClass.split(' ').includes('focused'), true);
        });
    });
});