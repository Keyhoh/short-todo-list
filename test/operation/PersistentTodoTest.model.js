import assert from 'assert';
import fs from 'fs-extra';
import Operation from "../../src/model/Operation";
import uuid from 'uuid-random';

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
            assert.throws(() => Operation.find());
        });

        it('does not find todo by null', () => {
            assert.throws(() => Operation.find(null));
        });

        it('does not find todo by empty', () => {
            assert.throws(() => Operation.find(''));
        });

        it('does not find todo by illegal', () => {
            assert.throws(() => Operation.find('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'));
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

        it('cannot delete un-discarded todo', done => {
            const targetTodoId = 'f528cf2e-3488-4d1d-a3a2-022c01b3ebca';
            const targetFileName = `${global.App.dataDir}/${targetTodoId}.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            Operation.delete(targetTodoId).catch(reason => {
                assert.equal(reason, 'Cannot delete todo');
                assert.equal(fs.existsSync(targetFileName), true);
                done();
            });
        });

        it('cannot delete todo by undefined', done => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            Operation.delete().catch(reason => {
                assert.equal(reason, 'Illegal id');
                assert.equal(fs.existsSync(targetFileName), true);
                done();
            });
        });

        it('cannot delete todo by null', done => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            Operation.delete(null).catch(reason => {
                assert.equal(reason, 'Illegal id');
                assert.equal(fs.existsSync(targetFileName), true);
                done();
            });
        });

        it('cannot delete todo by empty', done => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            Operation.delete('').catch(reason => {
                assert.equal(reason, 'Cannot find todo');
                assert.equal(fs.existsSync(targetFileName), true);
                done();
            });
        });

        it('cannot delete todo by illegal', done => {
            const targetFileName = `${global.App.dataDir}/f528cf2e-3488-4d1d-a3a2-022c01b3ebca.json`;
            assert.equal(fs.existsSync(targetFileName), true);
            Operation.delete('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').catch(reason => {
                assert.equal(reason, 'Cannot find todo');
                assert.equal(fs.existsSync(targetFileName), true);
                done();
            });
        });
    });
});