var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewireModule = require('../helpers/rewire-module');

describe('Todo-App', function() {
  var TodoApp = require('../../src/js/components/todo-app.jsx');
  var todoApp;

  rewireModule(TodoApp, {
    TodoList: React.createClass({
      render: function() {
        return (
          <div className='todo-list' />
        );
      }
    })
  });

  beforeEach(function() {
    todoApp = TestUtils.renderIntoDocument(
      <TodoApp />
    );
  });

  it('renders', function() {
    var component = TestUtils.findRenderedDOMComponentWithClass(
      todoApp, 'todoApp'
    );

    expect(component).to.exist();
  });

  it('renders the todo TodoList', function() {
    var todoList = TestUtils.findRenderedDOMComponentWithClass(
      todoApp, 'todo-list'
    );

    expect(todoList).to.exist();
  });
})