import { ipcRenderer } from 'electron';
import React from 'react';
import List from "./List/ListComponent";
import Store from "../operation/Todo/Store";

/**
 * state:
 *      focusedList: フォーカスしているList（Listを特定できれば型は問わない）
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);

        global.App = global.App || { dataDir: ipcRenderer.sendSync('get-data-dir') };

        const FullList = Store.findAll();
        this.state = {
            focusedList: 'index_list',
            indexList: FullList.filter(todo => !todo.discarded),
            discardedList: FullList.filter(todo => todo.discarded)
        }
    }

    /**
     * フォーカスするリストを変更する
     * 
     * @param {KeyboardEvent} e 
     */
    switchFocus(e) {
        if (e.keyCode === 76) {
            this.setState({ focusedList: 'discarded_list' });
        } else if (e.keyCode === 72) {
            this.setState({ focusedList: 'index_list' });
        }
    }

    // TODO: フォーカスしているListを強調する
    render() {
        return <div onKeyDown={e => this.switchFocus(e)}>
            <List
                key='index_list'
                dataKey='index_list'
                focused={this.state.focusedList === 'index_list'}
                list={this.state.indexList}
            />
            <List
                key='discarded_list'
                dataKey='discarded_list'
                focused={this.state.focusedList === 'discarded_list'}
                list={this.state.discardedList}
            />
        </div>
    }
}