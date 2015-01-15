var React = require('react');

var TodoApp = require('./components/todo-app.jsx');
var AppActions = require('./actions/app-actions.js');

// render the top level controller-view component
React.render(
  <TodoApp />, document.getElementById('content')
);
