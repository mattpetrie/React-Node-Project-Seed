import './todo-item.less';

import React from 'react/addons';
import AppActions from '../../../js/actions/app-actions';

import Button from '../../atoms/button/button.jsx';

const TodoItem = React.createClass({

  propTypes: {
    todo: React.PropTypes.object,
  },

  handleCompleted: function() {
    let todo = this.props.todo;
    AppActions.updateTodo(todo, { completed: !todo.completed });
  },

  handleDelete: function() {
    AppActions.removeTodo(this.props.todo);
  },

  render: function() {
    let todo = this.props.todo;
    let cx = React.addons.classSet;
    let componentClasses = cx({
      'todoItem': true,
      'completed': todo.completed,
    });
    let completedButtonClasses = cx({
      'completed-button': true,
      'complted': todo.completed,
      });
    return (
      <div className={componentClasses}>
        <div className='buttons'>
          <Button className='delete-button' action={this.handleDelete} text='&times;' />
          <Button className={completedButtonClasses} action={this.handleCompleted} text='&#10003;' />
        </div>
        <h2 className='todo-name'>{todo.name}</h2>
      </div>
    );
  }
});

export default TodoItem;
