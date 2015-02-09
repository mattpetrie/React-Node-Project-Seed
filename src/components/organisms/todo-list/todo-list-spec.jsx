var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewire = require('rewire');
var rewireModule = require('../../../../test/helpers/rewire-module.js');
var mockComponent = require('../../../../test/helpers/mock-component.jsx');

describe('TodoList', function() {
  var TodoList = rewire('./todo-list.jsx');
  var todoList;

  rewireModule(TodoList, {
    Card : mockComponent('card'),
    TodoItem: mockComponent('todo-item'),

    TodoForm: mockComponent('todo-form'),
  });

  beforeEach(function() {
    var mockTodos = {1: {id: 'todo1'}, 2: {id: 'todo2'}};
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