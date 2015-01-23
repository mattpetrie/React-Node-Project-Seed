var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var sinon = require('sinon');
var rewireModule = require('../../../../test/helpers/rewire-module.js');

describe('Todo-App', function() {
  var TodoApp = require('./todo-app.jsx');
  var todoApp;

  var getTodosSpy = sinon.spy();
  var addChangeListenerSpy = sinon.spy();

  rewireModule(TodoApp, {
    TodoList: React.createClass({
      render: function() {
        return (
          <div className='todo-list' />
        );
      }
    }),
    'TodoStore.getAll': sinon.stub().returns(['todo']),
    'TodoStore.addChangeListener': addChangeListenerSpy,
    'AppActions.getTodos': getTodosSpy,
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

  it('registers a change listener with the TodoStore', function() {
    expect(addChangeListenerSpy).to.have.been.called;
  });

  it('Calls the getTodos action on mount', function() {
    expect(getTodosSpy).to.have.been.called;
  });

  it('renders the todo TodoList', function() {
    var todoList = TestUtils.findRenderedDOMComponentWithClass(
      todoApp, 'todo-list'
    );

    expect(todoList).to.exist();
  });
})