require('./todo-list.scss');

var React = require('react/addons');

var Card = require('../../molecules/card/card.jsx');
var TodoItem = require('../../molecules/todo-item/todo-item.jsx');
var TodoForm = require('../../molecules/todo-form/todo-form.jsx');

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
        <Card>
          <TodoItem key={todo._id} todo={todo} />
        </Card>
      );
    }.bind(this));
    return (
      <div className="todoList">
        {todos}
        <Card>
          <TodoForm />
        </Card>
      </div>
    );
  }
});

module.exports = TodoList;
