import assert from 'assert';
import fs from 'fs-extra';
import Operation from '../../src/model/Operation';

global.App = global.App || {};
global.App.dataDir = `${__dirname}/data`;

describe('Persistent todo test', function () {
    let todo;

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
});