import assert from 'assert';
import Operation from "../../src/model/Operation";

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
            assert.throws(() => Operation.create(''));
            assert.throws(() => Operation.create(null));
        });

        it('is too long title', () => {
            assert.doesNotThrow(() => Operation.create('01234567'.repeat(8)));
            assert.throws(() => Operation.create('01234567'.repeat(8) + 'a'));
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
            assert.throws(() => Operation.create(undefined, null));
            assert.throws(() => Operation.create(undefined, -1));
        });
    });

    describe('Todo details test', function () {
        it('is default details', () => {
            assert.equal(Operation.create().details, '');
        });

        it('is able to set details', () => {
            assert.equal(Operation.create(undefined, undefined, 'todo details').details, 'todo details');
        });

        it('is empty string if passing null', () => {
            assert.equal(Operation.create(undefined, undefined, null).details, '');
        });
    });

    describe('Todo default status test', () => {
        it('is not discarded', () => {
            assert.equal(Operation.create().discarded, false);
        });

        it('is not completed', () => {
            assert.equal(Operation.create().completed, false);
        });
    });
});