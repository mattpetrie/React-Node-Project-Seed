import './todo-app.scss';

import React from 'react/addons';

import AppActions from '../../../js/actions/app-actions';
import TodoStore from '../../../js/stores/todo-store';

import Header from '../../molecules/header/header.jsx';
import TodoList from '../../organisms/todo-list/todo-list.jsx';

const TodoApp = React.createClass({
  getInitialState: function() {
    return ({ todos: TodoStore.getAll() });
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);

    // fetch the initial list of todos from the server
    AppActions.getTodos();
  },

  _onChange: function() {
    this.setState({ todos: TodoStore.getAll() });
  },

  render: function() {
    return (
      <div className="todoApp">
        <Header />
        <div className="main">
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
});

export default TodoApp;
