require('./todo-app.scss');

var React = require('react/addons');

var AppActions = require('../../actions/app-actions');
var TodoStore = require('../../stores/todo-store');

var Header = require('../header/header.jsx');
var TodoList = require('../todo-list/todo-list.jsx');

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
        <Header />
        <div className="main">
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
