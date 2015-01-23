var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewireModule = require('../helpers/rewire-module');
var expect = chai.expect;
chai.use(sinonChai);

describe('TodoItem', function() {
  var TodoItem = require('../../src/js/components/todo-item.jsx');
  var todoItem, mockTodo;
  var removeTodoSpy = sinon.spy();
  var updateTodoSpy = sinon.spy();

  rewireModule(TodoItem, {
    'AppActions.removeTodo': removeTodoSpy,
    'AppActions.updateTodo': updateTodoSpy,
  });

  beforeEach(function() {
    mockTodo = { _id: 1, name: 'mockTodo', done: false };
    todoItem = TestUtils.renderIntoDocument(
      <TodoItem todo={mockTodo} />
    );
  });

  it('renders', function() {
    var component = TestUtils.findRenderedDOMComponentWithClass(
      todoItem, 'todoItem'
    );

    expect(component).to.exist();
  });

  describe('deleting a todo', function() {

    beforeEach(function() {

      var deleteButton = TestUtils.findRenderedDOMComponentWithClass(
        todoItem, 'delete-button'
      );

      TestUtils.Simulate.click(deleteButton);
    });

    it('calls the remove todo action with the todo id', function() {

      expect(removeTodoSpy).to.have.been.calledWith(mockTodo._id);
    })
  });

  describe('marking a todo done', function() {

    beforeEach(function() {
      var checkbox = TestUtils.findRenderedDOMComponentWithTag(
        todoItem, 'input'
      );

      TestUtils.Simulate.change(checkbox);
    });

    it('calls the update todo action and updates the done state', function() {
      expect(updateTodoSpy).to.have.been.calledWith(
        mockTodo._id, { done: !mockTodo.done }
       );
    })
  });
});