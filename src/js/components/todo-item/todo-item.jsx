var React = require('react');
var AppActions = require('../../actions/app-actions');

var TodoItem = React.createClass({
  handleDone: function() {
    var todo = this.props.todo;
    AppActions.updateTodo(todo._id, { done: !todo.done });
  },

  handleDelete: function() {
    AppActions.removeTodo(this.props.todo._id);
  },

  render: function() {
    var todo = this.props.todo;
    var mainClassString = 'todoItem card';
    var buttonClassString = 'done-button';
    var doneClass = todo.done ? ' done' : '';
    mainClassString += doneClass;
    buttonClassString += doneClass;
    return (
      <div className={mainClassString}>
        <div className='buttons'>
          <button className={buttonClassString} onClick={this.handleDone}>
            &#10003;
          </button>
          <button className='delete-button' onClick={this.handleDelete}>
            &times;
          </button>
        </div>
        <h2>{todo.name}</h2>
      </div>
    );
  }
});

module.exports = TodoItem;
