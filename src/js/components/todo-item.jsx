var React = require('react');

var TodoItem = React.createClass({
  handleChange: function() {
    this.props.data.done = !this.props.data.done;
    this.props.handleTodoUpdate(this.props.data);
  },
  render: function() {
    var todo = this.props.data;
    return (
      <div className="todoItem">
        <form action="">
          <input type="checkbox" name="done" value="done" checked={todo.done} onChange={this.handleChange} />
        </form>
        <h2>{todo.name}</h2>
      </div>
    );
  }
});

module.exports = TodoItem;
