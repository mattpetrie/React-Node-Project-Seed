var React = require('react');

var TodoItem = require('../todo-item/todo-item.jsx');
var TodoForm = require('../todo-form/todo-form.jsx');

var TodoList = React.createClass({
  getDefaultProps: function() {
    return {
      todos: {}
    }
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
