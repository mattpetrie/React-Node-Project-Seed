var React = require('react/addons');

var TodoStore = require('../../stores/todo-store');
var TodoList = require('../todo-list/todo-list.jsx');
var AppActions = require('../../actions/app-actions');

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
