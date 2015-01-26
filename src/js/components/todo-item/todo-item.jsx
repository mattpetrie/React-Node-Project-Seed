var React = require('react');
var AppActions = require('../../actions/app-actions');

var TodoItem = React.createClass({
  handleCompleted: function() {
    var todo = this.props.todo;
    AppActions.updateTodo(todo._id, { completed: !todo.completed });
  },

  handleDelete: function() {
    AppActions.removeTodo(this.props.todo._id);
  },

  render: function() {
    var todo = this.props.todo;
    var mainClassString = 'todoItem card';
    var buttonClassString = 'completed-button';
    var completedClass = todo.completed ? ' completed' : '';
    mainClassString += completedClass;
    buttonClassString += completedClass;
    return (
      <div className={mainClassString}>
        <div className='buttons'>
          <button className={buttonClassString} onClick={this.handleCompleted}>
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
