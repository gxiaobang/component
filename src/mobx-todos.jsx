
import React from 'react';
import ReactDOM from 'react-dom';

import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';


// 测试mobx
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;

    constructor(title) {
			this.title = title;
		}
}

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

@observer
class TodoListView extends React.Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}

        <a href="javascript:;" onClick={
        	() => {
        		store.todos.splice(store.todos.indexOf(todo), 1);
        	}
        }>删除</a>
    </li>
)

const store = new TodoList();
console.log(store)

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
	}
	render() {
		return (
			<div>
				<TodoListView todoList={store} />
				<input type="text" value={this.state.input} onChange={e => this.setState({ input: e.target.value })} />
				<button onClick={
					() => {
						store.todos.push(new Todo(this.state.input));
						this.setState({ input: '' });
					}
				}>添加</button>

				<button onClick={
					() => {
						store.todos.length = 0;
					}
				}>清空</button>
			</div>
		);
	}
}

export default App;