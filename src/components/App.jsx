import React from 'react';
import List from "./List/ListComponent";

/**
 * state:
 *      focusedList: フォーカスしているList（Listを特定できれば型は問わない）
 */
export default class App extends React.Component{
    // TODO: StoreからTodoを取得する
    // TODO: Storeから取得したTodoを状態で分類して、状態毎のListを作成する
    // TODO: フォーカスしているListを強調する
    render(){
        return <List list={['A', 'B', 'C']}/>;
    }
}