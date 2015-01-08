var React = require('react');

var TodoItem = require('./todo-item.jsx');

var TodoList = React.createClass({
  render: function() {
    var handleTodoUpdate = this.props.handleTodoUpdate;
    var todos = this.props.data.map(function(todo) {
      return (
        <TodoItem key={todo._id} data={todo} handleTodoUpdate={handleTodoUpdate} />
      );
    });
    return (
      <div className="todoList">
        {todos}
      </div>
    );
  }
});

module.exports = TodoList;
