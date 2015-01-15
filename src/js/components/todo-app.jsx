var React = require('react');

var TodoStore = require('../stores/todo-store.js');
var TodoList = require('./todo-list.jsx');
var AppActions = require('../actions/app-actions.js');

var TodoApp = React.createClass({
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
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
});

module.exports = TodoApp;
