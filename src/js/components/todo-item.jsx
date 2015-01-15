var React = require('react');
var AppActions = require('../actions/app-actions.js');

var TodoItem = React.createClass({
  handleChange: function() {
    var todo = this.props.todo;
    AppActions.updateTodo(todo._id, { done: !todo.done });
  },
  render: function() {
    var todo = this.props.todo;
    return (
      <div className="todoItem">
        <form action="">
          <input type="checkbox" name="done" value="done" checked={todo.done} onChange={this.handleChange} />
        </form>
        <h2>{todo.name}</h2>
      </div>
    );
  }
});

module.exports = TodoItem;
