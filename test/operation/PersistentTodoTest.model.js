import assert from 'assert';
import fs from 'fs-extra';
import Operation from '../../src/model/Operation';

global.App = global.App || {};
global.App.dataDir = `${__dirname}/temp`;

describe('Persistent todo test', function () {
    let todo;

    this.beforeAll(() => fs.copySync(`${__dirname}/data`, global.App.dataDir));

    this.beforeEach(() => todo = Operation.create());

    this.afterEach(() => todo = undefined);

    describe('Save todo test', function () {
        it('saves todo', async () => {
            const savedFileName = `${global.App.dataDir}/${todo.id}.json`;

            assert.throws(() => fs.readFileSync(savedFileName));
            await Operation.save(todo);
            assert.doesNotThrow(() => fs.readFileSync(savedFileName));

            const savedObject = JSON.parse(fs.readFileSync(savedFileName));
            assert.equal(savedObject.id, todo.id);
            assert.equal(savedObject.title, todo.title);
            assert.equal(savedObject.checked, todo.checked);
            assert.equal(savedObject.discarded, todo.discarded);

            fs.removeSync(savedFileName);
        });
    });

    describe('Find todo test', function () {
        it('finds todo', () => {
            const targetTodo = Operation.create('find me', 2);
            Operation.toggleCheck(targetTodo);
            const targetTodoId = '2c007903-4602-4852-a16a-92822d759704';

            const foundTodo = Operation.find(targetTodoId);

            assert.equal(foundTodo.id, targetTodoId);
            assert.equal(foundTodo.title, targetTodo.title);
            assert.equal(foundTodo.checked, targetTodo.checked);
            assert.equal(foundTodo.discarded, targetTodo.discarded);
        });

        it('does not find todo', () => {
            assert.throws(() => Operation.find());
            assert.throws(() => Operation.find(null));
            assert.throws(() => Operation.find(''));
            assert.throws(() => Operation.find('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'));
        });
    });

    describe('Delete todo test', function () {
        it('deletes todo', async () => {
            const targetTodoId = "9d0f6c97-2280-4f14-bdfa-f475cec16f95";
            const targetFileName = `${global.App.dataDir}/${targetTodoId}.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            await Operation.delete(targetTodoId);
            assert.equal(fs.existsSync(targetFileName), false);
        });
    });
});