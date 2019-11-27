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
            focusedList: 'indexList',
            indexList: FullList.filter(todo => !todo.discarded),
            discardedList: FullList.filter(todo => todo.discarded)
        }
    }
    // TODO: StoreからTodoを取得する
    // TODO: Storeから取得したTodoを状態で分類して、状態毎のListを作成する
    // TODO: フォーカスしているListを強調する
    render() {
        return <>
            <List key='index_list' list={this.state.indexList} />
            <List key='discarded_list' list={this.state.discardedList} />
        </>
    }
}