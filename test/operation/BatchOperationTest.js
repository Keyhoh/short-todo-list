import assert from 'assert';
import Operation from '../../src/operation/Operation';
import fs from 'fs-extra';
import path from 'path';

global.App = global.App || {};
global.App.dataDir = path.resolve(__dirname, 'temp');
fs.existsSync(global.App.dataDir) || fs.mkdirSync(global.App.dataDir);

describe('Batch operation test', function () {
    describe('Discard all checked todo', function () {
        let files;

        const getAllFiles = () => fs.readdirSync(global.App.dataDir);

        this.beforeEach(async () => {
            files = [];
            for (let i = 0; i < 10; i++) {
                const todo = Operation.create(`create ${i}`, i % 3);
                if (i % 2) Operation.toggleCheck(todo);
                files.push(`${todo.id}.json`);
                await Operation.save(todo);
            }
        });

        this.afterEach(() => files.forEach(f => fs.removeSync(`${global.App.dataDir}/${f}`)));

        it('discards only all checked todo', async () => {
            assert.deepEqual(files, files.filter(f => getAllFiles().includes(f)));
            await Operation.discardAll();
            files.map(f => fs.readJSONSync(`${global.App.dataDir}/${f}`))
                .filter(j => j.checked)
                .forEach(j => assert.equal(j.discarded, true));
        });

        it('does not discard un-checked todo', async () => {
            assert.deepEqual(files, files.filter(f => getAllFiles().includes(f)));
            await Operation.discardAll();
            files.map(f => fs.readJSONSync(`${global.App.dataDir}/${f}`))
                .filter(j => !j.checked)
                .forEach(j => assert.equal(j.discarded, false));
        });
    });

    describe('Delete all discarded todo', function () {
        let files;

        const getAllFiles = () => fs.readdirSync(global.App.dataDir);

        this.beforeEach(async () => {
            files = [];
            for (let i = 0; i < 10; i++) {
                const todo = Operation.create(`create ${i}`, i % 3);
                if (i % 2) Operation.discard(todo);
                files.push(`${todo.id}.json`);
                await Operation.save(todo);
            }
        });

        this.afterEach(() => files.forEach(f => fs.removeSync(`${global.App.dataDir}/${f}`)));

        it('delete only all discarded todo', async () => {
            assert.deepEqual(files, files.filter(f => getAllFiles().includes(f)));
            await Operation.deleteAll();
            files.map(f => `${global.App.dataDir}/${f}`)
                .filter(f => fs.existsSync(f))
                .map(f => fs.readJSONSync(f))
                .forEach(j => assert.equal(j.discarded, false));
        });
    });
});