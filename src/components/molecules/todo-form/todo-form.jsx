import './todo-form.scss';

import React from 'react/addons';

import AppActions from '../../../js/actions/app-actions';

import InputText from '../../atoms/input-text/input-text.jsx';
import InputSubmit from '../../atoms/input-submit/input-submit.jsx';

const TodoForm = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name || '',
    };
  },

  handleSubmit: function(event) {
    event.preventDefault();
    AppActions.addTodo({
      name: this.state.name,
      completed: false,
    });
    this.setState({ name: "" });
  },

  _onChange: function(event) {
    this.setState({
      name: event.target.value
    });
  },

  render: function() {
    return (
      <div className="todoForm">
        <h3>Add a new todo:</h3>
        <form action="" onSubmit={this.handleSubmit}>
          <InputText name="name" value={this.state.name}
            placeholder="Enter todo name here" onChange={this._onChange} />
          <InputSubmit value="+" />
        </form>
      </div>
    );
  }
});

export default TodoForm;
