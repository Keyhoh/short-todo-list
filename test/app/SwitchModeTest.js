const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');

describe('Switch mode', function () {
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

    const getMode = async () => await this.app.webContents.executeJavaScript('global.App.mode');

    [].filter.call(allKey, s => !'i'.includes(s)).forEach(async s => {
        it(`mode does not switch from normal mode by ${s}`, async () => {
            await this.app.client.keys(s);
            assert.equal(await getMode(), 'normal');
        });
    });

    [].forEach.call(allKey, async s => {
        it(`mode does not switch from normal mode by <C-${s}>`, async () => {
            await this.app.client.keys(['Control', s]);
            assert.equal(await getMode(), 'normal');
        });
    });

    [].forEach.call(allKey, async s => {
        it(`mode does not switch from normal mode by <A-${s}>`, async () => {
            await this.app.client.keys(['Alt', s]);
            assert.equal(await getMode(), 'normal');
        });
    });

    [].forEach.call(allKey, async s => {
        it(`mode does not switch from insert mode by ${s}`, async () => {
            await this.app.client.keys('i');
            assert.equal(await getMode(), 'insert');
            await this.app.client.keys(s);
            assert.equal(await getMode(), 'insert');
        });
    });

    [].filter.call(allKey, s => !'['.includes(s)).forEach(async s => {
        it(`mode does not switch from insert mode by <C-${s}>`, async () => {
            await this.app.client.keys('i');
            assert.equal(await getMode(), 'insert');
            await this.app.client.keys(['Control', s]);
            assert.equal(await getMode(), 'insert');
        });
    });

    [].forEach.call(allKey, async s => {
        it(`mode does not switch from insert mode by <A-${s}>`, async () => {
            await this.app.client.keys('i');
            assert.equal(await getMode(), 'insert');
            await this.app.client.keys(['Alt', s]);
            assert.equal(await getMode(), 'insert');
        });
    });

    it('default mode is normal', async () => {
        const mode = await this.app.webContents.executeJavaScript('global.App.mode');
        assert.equal(mode, 'normal');
    });

    it('switch mode to insert mode by i', async () => {
        await this.app.client.keys('i');
        assert.equal(await getMode(), 'insert');
    });

    it('switch mode to normal mode by <C-[>', async () => {
        await this.app.client.keys('i');
        assert.equal(await getMode(), 'insert');
        await this.app.client.keys(['Control', '[']);
        assert.equal(await getMode(), 'normal');
    });

    it('switch mode to normal mode by Escape', async () => {
        await this.app.client.keys('i');
        assert.equal(await getMode(), 'insert');
        await this.app.client.keys('Escape');
        assert.equal(await getMode(), 'normal');
    });
});