const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');

/**
 * test for h, l key
 */
describe('Key to move list', function () {
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

    const cursorIsOn = async list => {
        const targetListClass = await this.app.client.$(`.todo-list[data-key="${list}"]`).getAttribute('class');
        assert.equal(targetListClass.split(' ').includes('focused'), true);
        const anotherListClass = await this.app.client.$(`.todo-list:not([data-key="${list}"])`).getAttribute('class');
        assert.equal(anotherListClass.split(' ').includes('focused'), false);
    }

    [].filter.call(allKey, s => !'hl'.includes(s)).forEach(async s => {
        it(`cursor does not move by ${s}`, async () => {
            await this.app.client.keys(s);
            await cursorIsOn('index_list');
        });
    });

    it('default cursor is on index list', async () => {
        await cursorIsOn('index_list');
    });

    it('cursor goes to discarded list by l', async () => {
        await this.app.client.keys('l');
        await cursorIsOn('discarded_list');
    });

    it('cursor goes to index list by h', async () => {
        await this.app.client.keys('l');
        await cursorIsOn('discarded_list');
        await this.app.client.keys('h');
        await cursorIsOn('index_list');
    });

    it('cursor does not move', async () => {
        await this.app.client.keys('h');
        await cursorIsOn('index_list');
        await this.app.client.keys('l');
        await cursorIsOn('discarded_list');
        await this.app.client.keys('l');
        await cursorIsOn('discarded_list');
    });
});