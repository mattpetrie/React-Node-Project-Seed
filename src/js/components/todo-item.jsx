var React = require('react');
var AppActions = require('../actions/app-actions.js');

var TodoItem = React.createClass({
  handleChange: function() {
    var todo = this.props.todo;
    AppActions.updateTodo(todo._id, { done: !todo.done });
  },

  handleDelete: function() {
    AppActions.removeTodo(this.props.todo._id);
  },

  render: function() {
    var todo = this.props.todo;
    var classString = 'todoItem';
    classString += todo.done ? ' done' : '';
    return (
      <div className={classString}>
        <form action=''>
          <input type='checkbox' name='done' value='done'
             checked={todo.done} onChange={this.handleChange} />
        </form>
        <h2>{todo.name}</h2>
        <button className='delete-button' onClick={this.handleDelete}>
          Delete todo
        </button>
      </div>
    );
  }
});

module.exports = TodoItem;
