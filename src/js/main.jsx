import React from 'react/addons';
import Router from 'react-router';
import routes from './routes';

React.initializeTouchEvents(true);

document.addEventListener('DOMContentLoaded', (event) => {
  Router.run(routes, (Handler, state) => {
    React.render(<Handler />, document.getElementById('content'));
  });
});