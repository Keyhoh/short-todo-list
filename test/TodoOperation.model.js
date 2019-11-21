import assert from 'assert';
import Operation from "../src/model/Todo/Operation";
import { isSafeGithubName } from 'app-builder-lib/out/platformPackager';

describe('Todo operation test', function () {
    it('is default title', () => {
        assert.equal(Operation.create().title, 'title');
        assert.equal(Operation.create(undefined).title, 'title');
    });

    it('is able to set title', () => {
        assert.equal(Operation.create('new title').title, 'new title');
    });

    it('occurs error by empty title', ()=>{
        assert.throws(() => Operation.create(''));
        assert.throws(() => Operation.create(null));
    });

    it('is too long title', () =>{
        assert.doesNotThrow(() => Operation.create('01234567'.repeat(8)));
        assert.throws(() => Operation.create('01234567'.repeat(8) + 'a'));
        assert.doesNotThrow(() => Operation.create('０１２３４５６７'.repeat(8)));
        assert.throws(() => Operation.create('０１２３４５６７'.repeat(8) + 'あ'));
    });
});