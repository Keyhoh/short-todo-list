const { Application } = require('spectron');
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');

describe('Application launch', function () {
    this.timeout(10000);

    beforeEach(() => {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')]
        })
        return this.app.start();
    });

    afterEach(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('show an initial window', () => {
        return this.app.client.getWindowCount().then(count => assert.equal(count, 1));
    })
});