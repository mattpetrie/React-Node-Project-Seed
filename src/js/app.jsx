import '../stylesheets/main.scss';

import React from 'react/addons';
import Router from 'react-router';

import TodoApp from '../components/templates/todo-app/todo-app.jsx';

let RouteHandler = Router.RouteHandler;

const App = React.createClass({

  render: function() {
    return (
      <div className='App'>
        <RouteHandler />
      </div>
    )
  }
})

export default App
