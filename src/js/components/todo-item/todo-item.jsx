require('./todo-item.scss');

var React = require('react/addons');
var AppActions = require('../../actions/app-actions');

var TodoItem = React.createClass({

  propTypes: {
    todo: React.PropTypes.object,
  },

  handleCompleted: function() {
    var todo = this.props.todo;
    AppActions.updateTodo(todo._id, { completed: !todo.completed });
  },

  handleDelete: function() {
    AppActions.removeTodo(this.props.todo._id);
  },

  render: function() {
    var todo = this.props.todo;
    var cx = React.addons.classSet;
    var componentClasses = cx({
      'todoItem': true,
      'completed': todo.completed,
    });
    var completedButtonClasses = cx({
      'completed-button': true,
      'complted': todo.completed,
      });
    return (
      <div className={componentClasses}>
        <div className='buttons'>
          <button className='delete-button' onClick={this.handleDelete}>
            &times;
          </button>
          <button className={completedButtonClasses} onClick={this.handleCompleted}>
            &#10003;
          </button>
        </div>
        <h2 className='todo-name'>{todo.name}</h2>
      </div>
    );
  }
});

module.exports = TodoItem;
