var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewireModule = require('../../../../test/helpers/rewire-module.js');
var mockComponent = require('../../../../test/helpers/mock-component.jsx');

describe('TodoList', function() {
  var TodoList = require('./todo-list');
  var todoList;

  rewireModule(TodoList, {
    TodoItem: mockComponent('todo-item'),

    TodoForm: mockComponent('todo-form'),
  });

  beforeEach(function() {
    var mockTodos = {1: 'todo1', 2: 'todo2'};
    todoList = TestUtils.renderIntoDocument(
      <TodoList todos={mockTodos}/>
    );
  });

  it('renders', function() {
    var component = TestUtils.findRenderedDOMComponentWithClass(
      todoList, 'todoList'
    );

    expect(component).to.exist();
  });

  it('renders a todo for each todo', function() {
    var todoItems = TestUtils.scryRenderedDOMComponentsWithClass(
      todoList, 'todo-item'
    );

    expect(todoItems).to.have.length(2);
  });

  it('renders a todo form at the end of the list', function() {
    var todoForm = TestUtils.findRenderedDOMComponentWithClass(
      todoList, 'todo-form'
    );

    expect(todoForm).to.exist();
  });
});