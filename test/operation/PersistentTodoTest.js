import assert from 'assert';
import fs from 'fs-extra';
import uuid from 'uuid-random';
import Operation from "../../src/operation/Operation";
import ERROR_CODE from "../../src/operation/ERROR_CODE";

global.App = global.App || {};
global.App.dataDir = `${__dirname}/temp`;

describe('Persistent todo test', function () {

    this.beforeAll(() => fs.copySync(`${__dirname}/data`, global.App.dataDir));

    describe('Save todo test', function () {
        it('saves todo', async () => {
            const targetTodo = Operation.create(uuid(), Math.floor(Math.random() * 3));
            const savedFileName = `${global.App.dataDir}/${targetTodo.id}.json`;

            assert.throws(() => fs.readFileSync(savedFileName));
            await Operation.save(targetTodo);
            assert.doesNotThrow(() => fs.readFileSync(savedFileName));

            const savedObject = JSON.parse(fs.readFileSync(savedFileName));
            assert.equal(savedObject.id, targetTodo.id);
            assert.equal(savedObject.title, targetTodo.title);
            assert.equal(savedObject.checked, targetTodo.checked);
            assert.equal(savedObject.discarded, targetTodo.discarded);

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

        it('does not find todo by undefined', () => {
            assert.throws(() => Operation.find(), new Error(ERROR_CODE.ILLEGAL_TODO_ID));
        });

        it('does not find todo by null', () => {
            assert.throws(() => Operation.find(null), new Error(ERROR_CODE.ILLEGAL_TODO_ID));
        });

        it('does not find todo by empty', () => {
            assert.throws(() => Operation.find(''), new Error(ERROR_CODE.NOT_FOUND_TODO));
        });

        it('does not find todo by nonexistent id', () => {
            assert.throws(() => Operation.find('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'), new Error(ERROR_CODE.NOT_FOUND_TODO));
        });

        it('does not find todo by illegal id', async () => {
            assert.throws(() => Operation.find('abc'), new Error(ERROR_CODE.NOT_FOUND_TODO));
        });
    });

    describe('Delete todo test', function () {
        it('deletes discarded todo', async () => {
            const targetTodoId = '9d0f6c97-2280-4f14-bdfa-f475cec16f95';
            const targetFileName = `${global.App.dataDir}/${targetTodoId}.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            await Operation.delete(targetTodoId);
            assert.equal(fs.existsSync(targetFileName), false);
        });

        it('cannot delete un-discarded todo', async () => {
            const targetTodoId = 'f528cf2e-3488-4d1d-a3a2-022c01b3ebca';
            const targetFileName = `${global.App.dataDir}/${targetTodoId}.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            try {
                await Operation.delete(targetTodoId);
                assert.fail();
            } catch (error) {
                assert.deepEqual(error, new Error(ERROR_CODE.CANNOT_DELETE_TODO));
                assert.equal(fs.existsSync(targetFileName), true);
            }
        });

        it('cannot delete todo by undefined', async () => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            try {
                await Operation.delete();
                assert.fail();
            } catch (error) {
                assert.deepEqual(error, new Error(ERROR_CODE.ILLEGAL_TODO_ID));
                assert.equal(fs.existsSync(targetFileName), true);
            }
        });

        it('cannot delete todo by null', async () => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            try {
                await Operation.delete(null);
                assert.fail();
            } catch (error) {
                assert.deepEqual(error, new Error(ERROR_CODE.ILLEGAL_TODO_ID));
                assert.equal(fs.existsSync(targetFileName), true);
            }
        });

        it('cannot delete todo by empty', async () => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            try {
                await Operation.delete('');
                assert.fail();
            } catch (error) {
                assert.deepEqual(error, new Error(ERROR_CODE.NOT_FOUND_TODO));
            }
        });

        it('cannot delete todo by illegal', async () => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            try {
                await Operation.delete('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
                assert.fail();
            } catch (error) {
                assert.deepEqual(error, new Error(ERROR_CODE.NOT_FOUND_TODO));
            }
        });
    });
});