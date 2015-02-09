import './todo-form.less';

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
      id: this.generateUUID(),
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

  generateUUID: function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
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
