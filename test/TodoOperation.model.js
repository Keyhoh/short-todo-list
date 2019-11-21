import assert from 'assert';
import Operation from "../src/model/Todo/Operation";
import Priority from "../src/model/Todo/Priority";

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
            assert.equal(Operation.create().priority, Priority.NORMAL);
        });

        it('is able to set priority', () => {
            assert.equal(Operation.create(undefined, 0).priority, Priority.LOW);
            assert.equal(Operation.create(undefined, 1).priority, Priority.NORMAL);
            assert.equal(Operation.create(undefined, 2).priority, Priority.HIGH);
        });

        it('is unknown priority', () => {
            assert.throws(() => Operation.create(undefined, null));
            assert.throws(() => Operation.create(undefined, -1));
        });
    });
});