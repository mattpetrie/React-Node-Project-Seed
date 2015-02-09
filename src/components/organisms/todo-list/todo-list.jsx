import './todo-list.less';

import React from 'react/addons';

import Card from '../../molecules/card/card.jsx';
import TodoItem from '../../molecules/todo-item/todo-item.jsx';
import TodoForm from '../../molecules/todo-form/todo-form.jsx';

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        <Card key={todo.id}>
          <TodoItem todo={todo} />
        </Card>
      );
    });
    return (
      <CSSTransitionGroup transitionName="card" className="todoList" component="div">
        {todos}
        <Card>
          <TodoForm />
        </Card>
      </CSSTransitionGroup>
    );
  }
});

export default TodoList;
