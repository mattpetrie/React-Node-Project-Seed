var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewire = require('rewire');
var rewireModule = require('../../../../test/helpers/rewire-module');
var mockComponent = require('../../../../test/helpers/mock-component.jsx');

describe('TodoItem', function() {
  var TodoItem = rewire('./todo-item.jsx');
  var todoItem, mockTodo;
  var removeTodoSpy = sinon.spy();
  var updateTodoSpy = sinon.spy();

  rewireModule(TodoItem, {
    'AppActions.removeTodo': removeTodoSpy,
    'AppActions.updateTodo': updateTodoSpy,
  });

  beforeEach(function() {
    mockTodo = { _id: 1, name: 'mockTodo', completed: false };
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

  describe('handleCompleted', function() {
    it('calls the updateTodo action with the updated completed state', function() {
      todoItem.handleCompleted();

      expect(updateTodoSpy).to.have.been.calledWith(mockTodo._id, { completed: true });
    });
  });

  describe('#handleDelete', function() {

    it('calls the removeTodo action', function() {
      todoItem.handleDelete();

      expect(removeTodoSpy).to.have.been.called;
    });
  });
});
