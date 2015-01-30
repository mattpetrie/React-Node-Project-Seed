require('./todo-form.scss');

var React = require('react/addons');
var AppActions = require('../../actions/app-actions');

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name || '',
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    AppActions.addTodo({
      name: this.state.name,
      completed: false,
    })
    this.setState({ name: "" });
  },

  _onChange: function(event) {
    this.setState({
      name: event.target.value
    });
  },

  render: function() {
    return (
      <div className="todoForm card">
        <h3>Add a new todo:</h3>
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.name}
            placeholder="Enter todo name here" onChange={this._onChange} />
          <input type="submit" value="+" />
        </form>
      </div>
    )
  }
});

module.exports = TodoForm;