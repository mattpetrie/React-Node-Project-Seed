import React from 'react/addons';
import rewire from 'rewire';
import rewireModule from '../../../../test/helpers/rewire-module.js';
import mockComponent from '../../../../test/helpers/mock-component.jsx';

const TestUtils = React.addons.TestUtils;

describe('TodoItem', function() {
  const TodoItem = rewire('./todo-item.jsx');
  let todoItem, mockTodo;
  let removeTodoSpy = sinon.spy();
  let updateTodoSpy = sinon.spy();

  rewireModule(TodoItem, {
    'AppActions.removeTodo': removeTodoSpy,
    'AppActions.updateTodo': updateTodoSpy,
  });

  beforeEach( () => {
    mockTodo = { id: 1, name: 'mockTodo', completed: false };
    todoItem = TestUtils.renderIntoDocument(
      <TodoItem todo={mockTodo} />
    );
  });

  it('renders', () => {
    let component = TestUtils.findRenderedDOMComponentWithClass(
      todoItem, 'todoItem'
    );

    expect(component).to.exist();
  });

  describe('handleCompleted', () => {
    it('calls the updateTodo action with the updated completed state', function() {
      todoItem.handleCompleted();

      expect(updateTodoSpy).to.have.been.calledWith(mockTodo, { completed: true });
    });
  });

  describe('#handleDelete', () => {

    it('calls the removeTodo action', () => {
      todoItem.handleDelete();

      expect(removeTodoSpy).to.have.been.called;
    });
  });
});
