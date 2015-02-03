require('./todo-form.scss');

var React = require('react/addons');
var AppActions = require('../../../js/actions/app-actions');

var InputText = require('../../atoms/input-text/input-text.jsx');
var InputSubmit = require('../../atoms/input-submit/input-submit.jsx');

var TodoForm = React.createClass({
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

module.exports = TodoForm;