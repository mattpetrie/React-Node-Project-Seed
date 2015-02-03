import '../stylesheets/main.scss';

import React from 'react/addons';

import TodoApp from '../components/templates/todo-app/todo-app.jsx';

// render the top level controller-view component
React.render(
  <TodoApp />, document.getElementById('content')
);
