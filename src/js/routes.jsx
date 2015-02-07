import React from 'react/addons';
import Router from 'react-router';
import App from './app.jsx';
import TodoApp from '../components/templates/todo-app/todo-app.jsx';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route handler={App}>
    <DefaultRoute name="todo-app" handler={TodoApp} />
  </Route>
);

export default routes;
