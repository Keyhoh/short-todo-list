import assert from 'assert';
import Operation from "../../src/model/Operation";
import ERROR_CODE from "../../src/model/ERROR_CODE";

describe('Create todo operation test', function () {
    describe('Todo title test', function () {
        it('is default title', () => {
            assert.equal(Operation.create().title, 'title');
            assert.equal(Operation.create(undefined).title, 'title');
        });

        it('is able to set title', () => {
            assert.equal(Operation.create('new title').title, 'new title');
        });

        it('occurs error by empty title', () => {
            assert.throws(() => Operation.create(''), new Error(ERROR_CODE.EMPTY_TITLE));
            assert.throws(() => Operation.create(null), new Error(ERROR_CODE.EMPTY_TITLE));
        });

        it('is too long title', () => {
            assert.doesNotThrow(() => Operation.create('01234567'.repeat(8)));
            assert.throws(() => Operation.create('01234567'.repeat(8) + 'a'), new Error(ERROR_CODE.TOO_LONG_TITLE));
        });
    });

    describe('Todo priority test', function () {
        it('is default priority', () => {
            assert.equal(Operation.create().priority, 1);
        });

        it('is able to set priority', () => {
            assert.equal(Operation.create(undefined, 0).priority, 0);
            assert.equal(Operation.create(undefined, 1).priority, 1);
            assert.equal(Operation.create(undefined, 2).priority, 2);
        });

        it('is unknown priority', () => {
            assert.throws(() => Operation.create(undefined, null), new Error(ERROR_CODE.UNKNOWN_PRIORITY));
            assert.throws(() => Operation.create(undefined, -1), new Error(ERROR_CODE.UNKNOWN_PRIORITY));
        });
    });

    describe('Todo default status test', () => {
        it('is not discarded', () => {
            assert.equal(Operation.create().discarded, false);
        });

        it('is not checked', () => {
            assert.equal(Operation.create().checked, false);
        });
    });
});