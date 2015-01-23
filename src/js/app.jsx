var React = require('react');

var TodoApp = require('./components/todo-app/todo-app.jsx');

// render the top level controller-view component
React.render(
  <TodoApp />, document.getElementById('content')
);
