require('./todo-list.scss');

var React = require('react/addons');

var TodoItem = require('../todo-item/todo-item.jsx');
var TodoForm = require('../todo-form/todo-form.jsx');

var TodoList = React.createClass({

  propTypes: {
    todos: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      todos: {}
    };
  },

  render: function() {
    var todos = Object.keys(this.props.todos).map(function(todo_id) {
      var todo = this.props.todos[todo_id];
      return (
        <TodoItem key={todo._id} todo={todo} />
      );
    }.bind(this));
    return (
      <div className="todoList">
        {todos}
        <TodoForm />
      </div>
    );
  }
});

module.exports = TodoList;
