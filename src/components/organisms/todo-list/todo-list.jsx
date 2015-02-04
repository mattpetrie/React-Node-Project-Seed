import './todo-list.scss';

import React from 'react/addons';

import Card from '../../molecules/card/card.jsx';
import TodoItem from '../../molecules/todo-item/todo-item.jsx';
import TodoForm from '../../molecules/todo-form/todo-form.jsx';

const TodoList = React.createClass({

  propTypes: {
    todos: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      todos: {}
    };
  },

  render: function() {
    let todos = Object.keys(this.props.todos).map(todo_id => {
      let todo = this.props.todos[todo_id];
      return (
        <Card key={todo._id}>
          <TodoItem todo={todo} />
        </Card>
      );
    });
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

export default TodoList;
