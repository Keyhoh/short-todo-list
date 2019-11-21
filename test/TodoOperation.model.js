import assert from 'assert';
import Operation from "../src/model/Todo/Operation";

describe('Todo operation test', function () {
    it('is default title', () => {
        assert.equal(Operation.create().title, 'title');
        assert.equal(Operation.create(undefined).title, 'title');
    });

    it('is able to set title', () => {
        assert.equal(Operation.create('new title').title, 'new title');
    });

    it('occurs error by null title', () => {
        assert.throws(() => Operation.create(null));
    });
});