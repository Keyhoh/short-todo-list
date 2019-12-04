import React from 'react';
import "./style.scss";
import Operation from '../../operation/Operation';

export default class Todo extends React.Component {
    /** @type {HTMLElement} */
    textInput = null;

    constructor(props) {
        super(props);
        this.state = { title: props.todo.title };
        window.addEventListener('switchToNormalMode', () => this.exit());
    }

    setTextInputRef(element) {
        this.textInput = element;
    }

    componentDidUpdate() {
        const isFocused = document.activeElement === this.textInput;
        if (!isFocused && this.props.entering) {
            this.textInput.focus();
        } else if (isFocused && !this.props.entering) {
            this.textInput.blur();
        }
    }

    exit() {
        if (this.props.todo.title !== this.state.title) {
            Operation.save(Operation.updateTitle(this.props.todo, this.state.title));
        }
    }

    getClassName() {
        return 'todo'
            + (this.props.todo.checked ? ' checked' : '')
            + (this.props.focused ? ' focused' : '')
            + (this.props.selected ? ' selected' : '')
            + (this.props.entering ? ' entering' : '');
    }

    handleChange(e) {
        this.setState({ title: e.target.value });
    }

    render() {
        return <div className={this.getClassName()}>
            <input
                type="text"
                name="title"
                id={this.props.todo.id}
                value={this.state.title}
                onChange={e => this.handleChange(e)}
                ref={ele => this.setTextInputRef(ele)}
            />
        </div >
    }
}