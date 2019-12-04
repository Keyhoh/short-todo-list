import React from 'react';
import "./style.scss";
import Operation from '../../operation/Operation';
import CLASS_NAME from '../CLASS_NAME';

export default class Todo extends React.Component {
    /** @type {HTMLElement} */
    element = null;

    /** @type {HTMLElement} */
    textInput = null;

    constructor(props) {
        super(props);
        this.state = { title: props.todo.title, checked: props.todo.checked };
    }

    componentDidMount() {
        this.element.addEventListener('checkTodo', () => this.check());
        this.element.addEventListener('switchToNormalMode', () => this.exit());
    }

    componentDidUpdate() {
        const isFocused = document.activeElement === this.textInput;
        if (!isFocused && this.props.entering) {
            this.textInput.focus();
        } else if (isFocused && !this.props.entering) {
            this.textInput.blur();
        }
    }

    check() {
        if (this.props.focused && !this.props.todo.discarded) {
            Operation.toggleCheck(this.props.todo);
            Operation.save(this.props.todo);
            this.setState({ checked: !this.state.checked });
        }
    }

    exit() {
        if (this.props.todo.title !== this.state.title) {
            Operation.save(Operation.updateTitle(this.props.todo, this.state.title));
        }
    }

    getClassName() {
        return CLASS_NAME.TODO
            + (this.props.todo.checked ? ' ' + CLASS_NAME.CHECKED : '')
            + (this.props.focused ? ' ' + CLASS_NAME.FOCUSED : '')
            + (this.props.selected ? ' ' + CLASS_NAME.SELECTED : '')
            + (this.props.entering ? ' ' + CLASS_NAME.ENTERING : '');
    }

    handleChange(e) {
        this.setState({ title: e.target.value });
    }

    render() {
        return <div ref={ele => this.element = ele} className={this.getClassName()}>
            <p>{this.state.title}</p>
            <input
                type="text"
                name="title"
                id={this.props.todo.id}
                value={this.state.title}
                onChange={e => this.handleChange(e)}
                ref={ele => this.textInput = ele}
            />
        </div >
    }
}