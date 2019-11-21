import assert from 'assert';
import Operation from "../src/model/Todo/Operation";

describe('Todo operation test', function () {
    it('is default title', () => {
        return assert.equal(Operation.create().title, 'title');
    });

    it('is able to set title', () => {
        return assert.equal(Operation.create('new title').title, 'new title');
    });
});