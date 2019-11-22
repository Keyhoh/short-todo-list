import assert from 'assert';
import Operation from "../../src/model/Operation";

describe('Update todo operation test', function () {
    let todo;

    beforeEach(() => todo = Operation.create());

    afterEach(() => todo = undefined);

    describe('Update title test', function () {
        it('updates todo title', () => {
            assert.equal(todo.title, 'title');
            Operation.updateTitle(todo, 'title has updated');
            assert.equal(todo.title, 'title has updated');
        });

        it('is not able to update with null', () => {
            assert.equal(todo.title, 'title');
            assert.throws(() => Operation.updateTitle(null));
            assert.equal(todo.title, 'title');
        });

        it('is not able to update with empty', () => {
            assert.equal(todo.title, 'title');
            assert.throws(() => Operation.updateTitle(''));
            assert.equal(todo.title, 'title');
        });

        it('is not able to update with too long', () => {
            assert.equal(todo.title, 'title');
            assert.throws(() => Operation.updateTitle(todo, '01234567'.repeat(8) + 'a'));
            assert.equal(todo.title, 'title');
        });
    });

    describe('Update priority test', function () {
        let todo = Operation.create(undefined, 0);

        [...new Array(3).keys()].forEach(p => {
            it(`up priority to ${p + 1}`, () => {
                Operation.upPriority(todo);
                assert.equal(todo.priority, Math.min(p + 1, 2));
            });
        });

        [...new Array(3).keys()].forEach(p => {
            it(`down priority to ${1 - p}`, () => {
                Operation.downPriority(todo);
                assert.equal(todo.priority, Math.max(1 - p, 0));
            });
        });
    });

    describe('Update status test', function () {
        it('checks todo', () => {
            Operation.toggleCheck(todo);
            assert.equal(todo.checked, true);
        });

        it('discards todo', () => {
            Operation.discard(todo);
            assert.equal(todo.discarded, true);
        });
    });
});