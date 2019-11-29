import path from 'path';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Store from "../../src/operation/Todo/Store";
import List from "../../src/components/List/ListComponent";
import Todo from "../../src/components/Todo/TodoComponent";

Enzyme.configure({ adapter: new Adapter() });
const debugLog = wrapper => wrapper.html();
chai.use(chaiEnzyme(debugLog));

global.App = { dataDir: path.resolve(__dirname, 'temp') };

describe('List component test', function () {
    /** @type {HTMLElement} */
    let container;
    const TODO_LIST = Store.findAll();

    this.beforeEach(() => {
        container = mount(<List list={TODO_LIST} />);
    });

    this.afterEach(() => {
        container = undefined;
    });

    it('has the right todo', () => {
        TODO_LIST.forEach(todo => {
            expect(container).to.contain(<Todo key={todo.id} todo={todo} />);
        });
    });
});
